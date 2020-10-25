export const createSubscribers = () => [];

//

export const emitTo = (subscribers, ... args) => {
  for (let subscriber of subscribers) {
    subscriber(... args)
  }
}

export function createEmit(subscribers) {
  return (... args) => emitTo(subscribers, ... args)
}

export const transformEmit = (createHandler) => (emit) => {
  return createHandler(emit)
}

export const mapEmit = (f) => transformEmit(
  (emit) => (... args) => emit(... f(... args))
)

export const filterEmit = (p) => transformEmit(
  (emit) => (... args) => void (p(... args) && emit(... args))
)

//

export const subscribeTo = (subscribers, subscriber) => {
  if (!subscribers.includes(subscriber)) {
    subscribers.push(subscriber)
  }
  return () => unsubscribe(subscribers, subscriber)
}

export const unsubscribeFrom = (subscribers, subscriber) => {
  let index = subscribers.indexOf(subscriber);
  if (index !== -1) {
    subscribers.splice(index, 1)
  }
}

export function createSubscribe(subscribers) {
  return (subscriber) => subscribeTo(subscribers, subscriber)
}

export const transformSubscribe = (createHandler) => (subscribe) => {
	return (subscriber) => subscribe(createHandler(subscriber))
}

export const mapSubscribe = (f) => transformSubscribe(
  (subscriber) => (... args) => subscriber(... f(... args))
)

export const filterSubscribe = (p) => transformSubscribe(
  (subscriber) => (... args) => void (p(... args) && subscriber(... args))
)
