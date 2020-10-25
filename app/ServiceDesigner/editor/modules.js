import {functions, arrays, objects, matchings, geometry, debug, handlers, observables, events, reactive} from '../utility'

export const emitEventTo = (eventsHandlers, key, ...args) => {
  debug.emit('event', key, ... args, eventsHandlers)
  for (let eventsHandler of eventsHandlers) {
    let eventHandler = eventsHandler[key]
    if (eventHandler) {
      eventHandler(...args)
    }
  }
}

debug.subscribe(handlers({
  event(... args) {
    log(... args)
  }
}))

export const createEventEmitter = (application) => (key, ...args) => {
  emitEventTo(application.eventsHandlers.get(), key, ...args)
  observables.commit()
}

export class ModulesComponent {
  constructor(key, combine, initial) {
    this.key = key
    this.initial = initial
    this.combine = combine
    this.pick = functions.withName(`pick:${key}`, (m) => m && m[key])
  }
}

class Engine {
  constructor(... modulesComponents) {
    this.modulesComponents = objects.fromValues((mc) => mc.key) (modulesComponents)

    this.emptyModule = objects.map(
      (mc, key) => observables.of(mc.initial).denote('emptyModule.' + key)
    ) (this.modulesComponents)
  }

  createModule(components = {}, name = '') {
    return {
      ... this.emptyModule,
      ... name ? observables.denote(components, `${name}.`) : components,
    }
  }
}

function combineEventsHandlers(values) {
  return observables.distinctMapToArray(
    (... eventsHandlers) => arrays.flatten(eventsHandlers.filter(Boolean)),
    ... values,
  )
}

function combineDraftActions(values) {
  return observables.distinctMapToArray(
    (... draftActions) => arrays.flatten(draftActions.filter(Boolean)),
    ... values,
  )
}

function combineAsyncTasks(values) {
  return observables.distinctMapToArray(
    (... asyncTasks) => arrays.flatten(asyncTasks.filter(Boolean)),
    ... values,
  )
}

function combineParams(values) {
  return observables.distinctMapToObject(
    (... params) => objects.union(...params.filter(Boolean)),
    ... values,
  )
}

function combineRenderings(values) {
  return observables.distinctMapToObject(
    (... renderings) => renderings.reduce(
      (result, renderings) => {
        for (let key in renderings) {
          let rendering = [].concat(renderings[key])
          if (result[key]) {
            result[key].push(... rendering)
          } else {
            result[key] = rendering
          }
        }
        return result
      }, {}
    ),
    ... values,
  )
}

const engine = new Engine(
  new ModulesComponent('eventsHandlers', combineEventsHandlers, {}),
  new ModulesComponent('renderings', combineRenderings, {}),
  new ModulesComponent('draftActions', combineDraftActions, []),
  new ModulesComponent('asyncTasks', combineAsyncTasks, []),
  new ModulesComponent('params', combineParams, {}),
)

export const createModule = (components = {}, name = '') => engine.createModule(components, name)

export function mergeModules(modules, name = '') {
  let components = objects.map(
    (mc) => mc.combine(modules.map(mc.pick).filter(Boolean))
  ) (engine.modulesComponents)
  return createModule(components, name)
}

export function observeModule(observable, name = '') {
  let components = objects.map(
    (mc) => observables.switchMap(mc.pick, observable)
  ) (engine.modulesComponents)
  return createModule(components, name)
}

export class DynamicModule {
  constructor(components, observable, name) {
    Object.assign(this, components, observeModule(observable))
    observables.denote(this, `${name}.`)
  }
}

export class ComplexModule extends DynamicModule {
  constructor(components, submodulesObservable, name) {
    let observable = observables.map(
      (submodules) => mergeModules([components, ... submodules]),
      submodulesObservable,
    )
    super(components, observable, name)
  }
}

export class Container {
  observable = observables.of([])

  store(instance) {
    observables.update(
      this.observable,
      (instances) => [... instances, instance],
    )
  }

  drop(instance) {
    observables.update(
      this.observable,
      (instances) => instances.filter(i => i !== instance)
    )
  }

  create(init, ... args) {
    return new Promise(
      (resolve) => {
        let close = (... results) => {
          this.drop(instance)
          resolve(... results)
        }
        let instance = init(close, ... args)
        this.store(instance)
      }
    )
  }

  denote(name = '') {
    if (name) {
      this.observable.denote(name)
    }
    return this
  }
}