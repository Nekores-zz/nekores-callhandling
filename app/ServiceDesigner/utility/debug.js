import React, { Component } from 'react'
import { functions, objects, arrays} from 'utils'
import * as reactive from './reactive'
import { matching } from './matching'

const debugOnly = (f) => (...args) => {
  if (debug.isOn) {
    f(...args);
  }
  return args[0];
};

const log = global.log = debugOnly(
  (... args) => {
    console.log(...args)
    return args[0]
  }
)

const plog = (...args0) => (arg1) => {
  log(...args0, arg1);
  return arg1;
};

const flog = (f, ...args0) => (...args) => {
  let result = f(...args);
  log(...args0, ...args, result);
  return result;
};

const track = (cb) => (f) => (...args) => {
  let result = f(...args);
  cb(args, result);
  return result;
};

const timer = () => performance.now();

const profile = (f, ...msgs) => (...args) => {
  let t0 = timer();
  let result = f(...args);
  let t1 = timer();
  log(...msgs, t1 - t0, args, result);
  return result;
};

const record = debugOnly(
  (data) => {
    debug.records.push(data);
    if (debug.records.length > debug.maxRecords) {
      debug.records.shift();
    }
  }
)

const subscribers = reactive.createSubscribers()
const emit = debugOnly(reactive.createEmit(subscribers))
const subscribe = reactive.createSubscribe(subscribers)
export const handlers = (object) => (key, ... args) => object[key]?.(... args)
export const conditional = (conditions, callback) => subscribe(
  (... args) => conditions.every(
    (condition, i) =>
      !condition ||
      matching.isString(condition) && args[i] === condition ||
      matching.isFunction(condition) && condition(... args.slice(0, i + 1))
  )
)
export const print = (... conditions) => conditional(conditions, log)
export const pause = (... conditions) => conditional(conditions, () => { debugger })
export const brackets = objects.map((value) => () => value)
export const debug = window.DEBUG = {
  subscribers, emit, subscribe, print, pause,
  isOn: false,
  records: [],
  maxRecords: 10,
  debugOnly,
  record,
  log, plog, flog, timer, profile, track,
};

