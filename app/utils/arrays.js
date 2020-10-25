import { functions } from './functions'

const { id, noop, constant, argument } = functions

const args = {
  value: argument(0),
  key: argument(1),
}

const mod = (n, m) => (n >= 0 ? n % m : (n % m) + m)

export const of = (x) => [x]

export const get = (xs, i) => xs[mod(i, xs.length)]

export const head = ([x0, ...xs]) => x0

export const tail = (xs, headLength = 1) => xs.slice(headLength)

export const first = xs => xs[0]

export const last = xs => xs[xs.length - 1]

export const diff = (xs0, xs1) => (xs0.length > xs1.length ? xs0 : xs1).filter((x, i) => xs0[i] !== xs1[i])

export const equals = (xs0, xs1) => xs0 === xs1 ||
  (xs0 && xs1 && xs0.length === xs1.length && xs0.every((x, i) => xs1[i] === x))

export const pairs = (xs) => tail(xs).map((x, i) => [xs[i], x])

export const aperture = (n, xs) => tail(xs, n - 1).map((x, i) => xs.slice(i, i + n))

export const orderBy = (f, desc = false) => (xs, inPlace = false) =>
  (inPlace ? xs : [...xs]).sort(desc ? (x0, x1) => f(x1) - f(x0) : (x0, x1) => f(x0) - f(x1))

export const orderAscBy = (f) => orderBy(f, false)

export const orderDescBy = (f) => orderBy(f, true)

export const flatten = (as) => [].concat(...as)

export const ofLength = (length, f = args.value) => Array.from({ length }, (_, i) => f(i))

export const compact = (xs) => xs.filter(Boolean)

export const includes = (xs, x) => xs.indexOf(x) !== -1

export const group = (f, xs) => xs.reduce(
  (result, x, i) => {
    let key = f(x, i)
    result[key] = appendInPlace(result[key] || [], x)
    return result
  },
  {},
)

export const remove = (xs, x) => {
  let index = xs.indexOf(x)
  if (index !== -1) {
    xs.splice(index, 1)
  }
  return xs
}

export const unfold = (f, p = Boolean) => (x) => {
  let result = []
  while (p(x)) {
    result.push(x)
    x = f(x)
  }
  return result
}

export const insertByDescending = (xs, x, f = id) => {
  let order = f(x);
  let index = xs.findIndex(x => order > f(x));
  if (index === -1) {
    xs.push(x);
  } else {
    xs.splice(index, 0, x);
  }
  return xs;
}

export const cycle = (xs, x) => {
  xs.unshift(x)
  xs.pop()
}

export const rotate = (xs, n) => {
  return xs.slice(n).concat(xs.slice(0, n))
}

export const reverseInPlace = (xs) => xs.reverse()

export const reverse = (xs) => xs.slice().reverse()

export const appendInPlace = (xs, x) => {
  xs.push(x)
  return xs
}

export const appendImmutable = (xs, x) => [...xs, x]

export const append = (xs, x, inPlace = false) =>
  (inPlace ? appendInPlace : appendImmutable) (xs, x)

export const unique = (xs) => [...new Set(xs)]

export const union = (as) => unique([].concat(...as))

export const argmin = (xs, f = id) =>
  xs.reduce((result, x, i) => {
    let value = f(x, i)
    return !result || value < result[1] ? [x, value] : result
  }, null)

export const flatProduct = (xs, ys, f) => {
  let result = []
  for (let x of xs) {
    for (let y of ys) {
      result.push(f(x, y))
    }
  }
  return result
}

export const without = (x) => (xs) => xs.filter(t => t !== x)

