import { functions } from './functions'

const { id, noop, constant, argument } = functions

const args = {
  value: argument(0),
  key: argument(1),
}

const empty = {}

const of = (key, value) => ({ [key]: value })

const get = (object, key) => object[key]

const prop = (key) => (object) => object[key]

const keys = (object) => Object.keys(object)

const values = (object) => Object.values(object)

const count = (object) => keys(object).length

const isEmpty = (object) => {
  for (let key in object) {
    return false
  }
  return true
}

const takeAnyKey = (object) => {
  for (let key in object) {
    return key
  }
}

const takeAny = (object) => object[takeAnyKey(object)]

const hasKey = (object, key) => object.hasOwnProperty(key)

const has = (object) => (value, key) => object[key] === value

const includes = (o0, o1) => every(has(o0)) (o1)

const equals = (o0, o1) => o0 === o1 || o0 && o1 && includes(o0, o1) && includes(o1, o0)

const sameKeys = (object0, object1) => {
  return !find((_, key) => !object1[key]) (object0) && !find((_, key) => !object0[key]) (object1)
}

const fromArray = (xs, key = argument(0), value = argument(0)) =>
  xs.reduce((result, x, i) => {
    result[key(x, i)] = value(x, i)
    return result
  }, {})

const fromKeys = (keys, f = constant()) => keys.reduce((result, key, i) => {
  result[key] = f(key, i)
  return result
}, {})

const fromValues = (f = args.value) => (values) => values.reduce((result, value, i) => {
  result[f(value, i)] = value
  return result
}, {})

const pick = (keys, object) => fromKeys(keys, (key) => object[key])

const fold = (f, x0) => (object) => {
  let x = x0
  for (let key in object) {
    x = f(x, object[key], key, object)
  }
  return x
}

const toFunction = (object) => (key) => object[key]

const toArray = (object, f = args.value) => fold((result, value, key, object) => {
  result.push(f(value, key, object))
  return result
}, []) (object)

const map = (f) => fold((result, value, key, object) => {
  result[key] = f(value, key, result, object)
  return result
}, {})

const mapKeys = (f) => fold((result, value, key, object) => {
  result[f(value, key, result, object)] = value
  return result
}, {})

const bimap = (co, contra) => fold((result, value, key, object) => {
  result[contra(value, key, result, object)] = co(value, key, result, object);
  return result;
}, {})

const flatten = (object) => Object.assign({}, ...values(object))

const flatMap = (f) => fold((result, value, key, object) => {
  return Object.assign(result, f(value, key, result, object))
}, {})

const filter = (f) => fold((result, value, key, object) => {
  if (f(value, key, object)) {
    result[key] = value
  }
  return result
}, {})

const compact = filter(Boolean)

const split = (p) => fold((result, value, key) => {
  result[p(value, key) ? 0 : 1][key] = value
  return result
}, [{}, {}])

const group = (groupKey, value = args.value) =>
  fold((result, x, i) => {
    let key = groupKey(x, i)
    if (!result[key]) result[key] = {};
    result[key][i] = value(x, i);
    return result;
  }, {})

const find = (f) => (object) => {
  for (let key in object) {
    if (f(object[key], key)) {
      return key
    }
  }
}

const every = (p) => (object) => {
  for (let key in object) {
    if (!p(object[key], key)) {
      return false
    }
  }
  return true
}

const each = (f) => (object) => {
  for (let key in object) {
    f(object[key], key)
  }
}

const union = (...args) => Object.assign({}, ...args)

const intersect = (object0, object1) => filter((value, key) => object1[key] === value) (object0)

const difference = (object0, object1) => filter((value, key) => object1[key] !== value) (object0)

const symmetricDifference = (object0, object1) => union(difference(object0, object1), difference(object1, object0))

const keysDifference = (object0, object1) => filter((value, key) => !object1.hasOwnProperty(key)) (object0)

const callMethod = (object, key, ...args) => (object[key] || id) (...args)

const minimum = (object, f = id) => fold((m, x, key) => {
  return m === null || f(x, key) < f(object[m], m) ? key : m
}, null) (object)

const diff = symmetricDifference

const zip = (object0, object1, f) => fold(
  (object, _, key) => Object.assign(
    object,
    { [key]: f(object0[key], object1[key], key) },
  ),
  {},
) ({...object0, ...object1})

const zipApply = (object, functions) => zip(object, functions, (f, value, key) => f(value, key))

const withOne = (object, key, value, inPlace = false) => {
  return inPlace ? Object.assign(object, of(key, value)) : { ...object, [key]: value }
}

const withoutKey = (object, key0) => {
  return filter((value, key1) => key0 !== key1) (object)
}

const merge = (o0, o1) => o0 && o1 ? zip(o0, o1, merge) : o0 || o1

export const objects = window.objects = {
  empty, of, keys, prop, values, includes, equals, sameKeys, count, isEmpty, takeAnyKey, takeAny, has, hasKey, pick,
  fromArray, fromKeys, fromValues, toFunction, toArray,
  fold, map, mapKeys, bimap, flatten, flatMap, filter, compact, split, group, find, every, each,
  union, intersect, difference, symmetricDifference, keysDifference,
  diff, callMethod, minimum, zip, zipApply, withOne, withoutKey, merge,
}
