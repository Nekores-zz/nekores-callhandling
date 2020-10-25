import React, { Component } from 'react'
import { functions, objects, arrays} from 'utils'
import * as reactive from './reactive'
import { matching } from './matching'
import { debug, brackets, handlers } from './debug'

const emit = reactive.mapEmit(
  (... args) => ['observables', ... args]
) (debug.emit)

setupDebug(emit)

class Transition {
  static num = 0
  num = ++Transition.num
  isScheduled = false
  isCommitting = false

  queue = []
  enqueued = {}

  constructor() {
    emit('transition', this)
  }

  enqueue = (observable) => {
    if (!this.enqueued[observable.id]) {
      emit('enqueue', observable)
      this.enqueued[observable.id] = true
      this.queue.push(observable)
    }
  }

  commit = functions.withName(
    `commit ${this.num}`,
    () => {
      if (!this.isCommitting) {
        emit('commit', this)
        this.isCommitting = true
        while (this.queue.length) {
          let observable = this.queue.shift()
          observable.get()
        }
        this.isCommitting = false
        return true
      }
    }
  )

  scheduleCommit = () => {
    if (!this.isScheduled) {
      this.isScheduled = true
      requestAnimationFrame(this.commit)
    }
  }

  get log() {
    return this.debug = this.debug ?? []
  }
}

var transition = new Transition()

function commit() {
  return transition.commit()
}

class Observable {
  static id = 0
  id = ++Observable.id

  // Public

  value = undefined
  onChange = reactive.createSubscribers()

  get = functions.withName(
    `(Observable.get ${observableName(this)})`,
    () => this.read(),
  )

  // Private

  syncedAt = null
  isLocked = false

  sync() {

  }

  read() {
    if (transition !== this.syncedAt) {
      if (this.isLocked) {
        debugger
        throw new Error()
      }
      this.isLocked = true
      emit('sync', this)
      this.sync()
      this.isLocked = false
      this.syncedAt = transition
    }
    return this.value
  }

  write(value) {
    if (value !== this.value) {
      if (transition === this.syncedAt) {
        transition.commit()
        transition = new Transition()
        transition.scheduleCommit()
      }
      emit('change', this)
      this.value = value
      reactive.emitTo(this.onChange, value)
      return true
    }
  }

  // Interaction among observables

  observables = {}

  callback = functions.withName(
    `(Observable.callback ${observableName(this)})`,
    () => {
      if (transition !== this.syncedAt) {
        transition.enqueue(this)
      }
    }
  )

  startObserving(observable) {
    observable.addObserver(this.callback)
  }

  stopObserving(observable) {
    observable.removeObserver(this.callback)
  }

  // Turning unneeded ones off

  isActive() {
    return this.onChange.length > 0
  }

  activate() {
    for (let id in this.observables) {
      this.startObserving(this.observables[id])
    }
    emit('activated', this)
  }

  deactivate() {
    for (let id in this.observables) {
      this.stopObserving(this.observables[id])
    }
    emit('deactivated', this)
  }

  addObserver(callback) {
    if (!this.isActive()) {
      this.activate()
    }
    reactive.subscribeTo(this.onChange, callback)
  }

  removeObserver(callback) {
    reactive.unsubscribeFrom(this.onChange, callback)
    if (!this.isActive()) {
      this.deactivate()
    }
  }

  addObservable(observable) {
    if (!this.observables[observable.id]) {
      if (this.isActive()) {
        this.startObserving(observable)
      }
      this.observables[observable.id] = observable
    }
  }

  removeObservable(observable) {
    if (this.observables[observable.id]) {
      if (this.isActive()) {
        this.stopObserving(observable)
      }
      delete this.observables[observable.id]
    }
  }

  // For debug purposes

  denote(name) {
    this.name = name
    return this
  }
}

function denote(object, prefix = '') {
  for (let name in object) {
    let value = object[name]
    if (isObservable(value)) {
      value.denote(prefix + name)
    }
  }
  return object
}

const isObservable = (value) => value instanceof Observable
const get = (arg) => isObservable(arg) ? arg.get() : arg
const observableId = (observable) => observable.id
const observableName = (observable) => observable.name || observable.id

const observe = (observable, handler = functions.noop) => {
  observable.addObserver(handler)
  return functions.withName(
    `(removeObserver ${observable.name} ${functions.name(handler)})`,
    () => observable.removeObserver(handler)
  )
}

const update = (observable, getValue) => {
  return observable.set(getValue(observable.get()))
}

class IndependentValue extends Observable {
  set = functions.withName(
    `(IndependentValue.set ${observableName(this)})`,
    (value) => {
      emit('set', this, value)
      return this.write(value)
    }
  )

  constructor(initialValue) {
    super()
    this.set(initialValue)
  }
}

class DependentValue extends Observable {
  args = null

  constructor(dependencies, selector) {
    super()
    this.dependencies = dependencies
    this.selector = selector
    for (let dependency of dependencies) {
      if (isObservable(dependency)) {
        this.addObservable(dependency)
      } else {
        throw new Error()
      }
    }
    this.denote(`(${functions.name(selector)} ${dependencies.map(observableName).join(' ')})`)
  }

  sync() {
    let args = this.dependencies.map(get)
    let hasChanged = !this.args || !arrays.equals(args, this.args)
    if (hasChanged) {
      this.args = args
      let value = this.selector(... args)
      this.write(value)
    }
  }
}

class Reference extends Observable {
  reference = undefined

  constructor(observable) {
    super()
    if (isObservable(observable)) {
      this.observable = observable
      this.addObservable(observable)
    } else {
      throw new Error()
    }
    this.denote(`(* ${observableName(observable)})`)
  }

  sync() {
    let reference = this.observable.get()
    this.refer(reference)
    let value = isObservable(reference) ? reference.get() : reference
    this.write(value)
  }

  refer(reference) {
    if (reference !== this.reference) {
      if (isObservable(this.reference)) {
        this.removeObservable(this.reference)
      }
      this.reference = reference
      if (isObservable(this.reference)) {
        this.addObservable(this.reference)
      }
    }
  }
}

const of = (initialValue) => {
  return new IndependentValue(initialValue);
};

const map = (getValue, ... observables) => {
  return new DependentValue(observables, getValue)
};

const switchTo = (observable) => {
  return new Reference(observable)
};

const switchMap = (getObservable, ... observables) => {
  return switchTo(map(getObservable, ... observables))
};

const fromObject = (object = {}) => {
  return map(
    () => objects.map(get) (object),
    ... objects.values(object),
  )
}

const fromArray = (observables = []) => {
  return map(
    (... values) => values,
    ... observables,
  )
}

const distinct = (isEqual, observable) => {
  return map(
    functions.distinct(functions.id, isEqual),
    observable,
  )
}

const distinctMapToObject = (getValue, ... observables) => {
  return map(
    functions.distinct(getValue, objects.equals),
    ... observables,
  )
}

const distinctMapToArray = (getValue, ... observables) => {
  return map(
    functions.distinct(getValue, arrays.equals),
    ... observables,
  )
}

const scan = (getValue, ...observables) => {
  var memo
  return map(
    (... args) => memo = getValue(memo) (... args),
    ... observables,
  )
}

const fromKeys = (collectionObservable, getItem) => {
  let getItems = (previous = {}) => objects.map((value, key) => previous[key] ?? getItem(key))
  return distinct(
    objects.equals,
    scan(getItems, collectionObservable)
  )
}

const property = (id, itemsObservable) => {
  let getItem = (items) => items[id]
  return map(getItem, itemsObservable)
}

function drillDown(observable, object) {
  return objects.map(
    (f, key) => switchMap(f, observable)
  ) (object)
}

function entry(id, observable) {
  let selector = (current) => (object) => object[id] ?? current
  return scan(selector, observable)
}

const resolve = (object = {}) => {
  let [observables, values] = objects.split(isObservable) (object)
  return map(
    (value) => objects.union(values, value),
    fromObject(observables),
  )
}

const withGetObservable = (getObservable, C) => (
  class WithGetObservable extends Component {
    name = `<${functions.name(C)}/>`
    propsObservable = of(this.props).denote(`${this.name}.props`)
    observable = switchMap(getObservable, this.propsObservable).denote(`${this.name}.state`)

    state = {
      observedProps: this.observable.get(),
    }

    update = (observedProps) => {
      this.setState({ observedProps })
    }

    componentDidMount() {
      this.deactivate = observe(this.observable, this.update)
    }

    componentWillUnmount() {
      this.deactivate()
    }

    shouldComponentUpdate(props, state) {
      return !objects.equals(state.observedProps, this.state.observedProps)
    }

    UNSAFE_componentWillReceiveProps(props) {
      if (!objects.equals(props, this.props)) {
        this.propsObservable.set(props)
      }
    }

    render() {
      emit('render', this, C)
      let { observedProps } = this.state
      return matching.isObject(observedProps) ? <C {... observedProps}/> : null
    }
  }
)

const withObservables = (C) => withGetObservable(resolve, C)

export const observables = {
  Transition, Observable,
  commit, get, update, observe, denote,
  of, map, switchTo, switchMap,
  fromObject, fromArray, distinct, distinctMapToObject, distinctMapToArray,
  property, entry, fromKeys, resolve, drillDown,
  withGetObservable, withObservables,
};

Object.assign(window, { observables, Observable, Transition })

function setupDebug(emit) {
  let observables = {}
  let transitions = []
  let cascade = (observable) => objects.flatMap(cascade) (observable.observables)
  let cycle = (head, ... chain) => head === arrays.last(chain) ?
    chain : objects.find((observable) => cycle(head, ... chain, observable)) (head.observables)
  debug.subscribe(handlers({
    loaded() {

    },
    observables: handlers({
      observable(observable) {
        // observables[observable.id] = observable
      },
      activated(observable) {
        observables[observable.id] = observable
      },
      deactivated(observable) {
        delete observables[observable.id]
      },
      sync(observable) {
        transition.log.push({ sync: observable })
      },
      set(observable, value) {
        transition.log.push({ set: observable })
      },
      change(observable, value) {
        transition.log.push({ change: observable })
      },
      enqueue(observable) {
        transition.log.push({ enqueue: observable })
      },
      commit() {
        transition.log.push('commit')
      },
      transition(transition) {
        transitions.push(transition)
        if (transitions.length > 100) {
          transitions.shift()
        }
      },
      render(instance, Component) {

      },
    }),
  }))

  let OBSERVABLES = {
    observables, transitions,
    cascade, cycle,
  }

  Object.assign(window, { OBSERVABLES })
}