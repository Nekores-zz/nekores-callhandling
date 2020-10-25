export * from "./strings";
import * as strings from "./strings";
import * as arrays from "./arrays";
import { functions } from "./functions";
import { objects } from "./objects";
import * as promise from "./promise";
import * as errors from "./promise";

export { arrays, functions, objects, strings, promise, errors };

export const isEqual = (value, f) => (item) => f(item) === value

export const areEqual = (x, y, f = functions.id, g = functions.id) => f(x) === g(y)

export const not = (p) => (...args) => !p(...args)

export const or = (...args) => args.find(Boolean)

export const updateWhen = (p, f) => (item) => p(item) ? f(item) : item

