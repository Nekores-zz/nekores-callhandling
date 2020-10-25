const noop = () => {}

const id = x => x

const constant = x => () => x

const apply = (f, x) => f(x)

const argument = (n = 0) => (...args) => args[n]

const call = f => f()

const tap = (f, x) => (f(x), x)

const spreadArgs = f => args => f(...args)

const compose = (f0, f1) => arg => f1(f0(arg))

const partialApply = (f, ...args0) => (...args1) => f(...args0, ...args1)

const curry = (f, n, ...args0) => (...args1) =>
  args0.length + args1.length >= n ?
    f(...args0, ...args1)
    :
    curry(f, n, ...args0, ...args1);

const pipe = fs => x0 => fs.reduce((x, f) => f(x), x0);

const swap = f => (x0, x1) => f(x1, x0);

const memoizeLatest = (f, equals) => {
  let memo = null;
  return (...args) => {
    if (!memo || !equals(args, memo.args)) {
      let result = f(...args);
      memo = { args, result };
    }
    return memo.result;
  };
}

const memoize = (f) => {
  let memo = new Map();
  return arg => {
    if (!memo.has(arg)) {
      memo.set(arg, f(arg));
    }
    return memo.get(arg);
  };
};

const wrap = (wrapper, f) => (...args) => wrapper(f, ...args);

const post = (handler, f) => (...args) => {
  let result = f(...args);
  handler(args, result);
  return result;
};

const withSideEffect = post;

const withCatch = (f, handler = constant(null)) => (...args) => {
  try {
    let result = f(...args);
    return result;
  } catch (e) {
    let result = handler(args, e);
    return result;
  }
};

const name = (f) => f.name || 'ƒ'

const withName = (name, f) => {
  Object.defineProperty(f, "name", { value: name });
  return f;
};

const distinct = (f, equals) => {
  var last = undefined;
  return (...args) => {
    let result = f(...args);
    let changed = !equals(result, last);
    return (last = changed ? result : last);
  };
};

const distinctBy = (f, getter) => distinct(f, (x0, x1) => getter(x0) === getter(x1))

export const functions = {
  noop,
  id,
  constant,
  apply,
  argument,
  call,
  tap,
  spreadArgs,
  compose,
  partialApply,
  curry,
  pipe,
  swap,
  memoizeLatest,
  memoize,
  wrap,
  post,
  withSideEffect,
  withCatch,
  name,
  withName,
  distinct,
  distinctBy,
};
