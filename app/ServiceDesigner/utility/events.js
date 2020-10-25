import * as geometry from './geometry';

const endEvent = (event) => {
  event.stopPropagation();
  if (event.nativeEvent) {
    event.nativeEvent.stopImmediatePropagation();
  }
  event.preventDefault();
};

const getPagePosition = (event) => {
  let x = event.pageX;
  let y = event.pageY;
  return geometry.point(x, y);
};

const getViewPosition = (event) => {
  let {offsetX: x, offsetY: y} = event.nativeEvent || event;
  return geometry.point(x, y);
};

const isShift = (event) => event.shiftKey;

const isCtrl = (event) => event.ctrlKey;

const keyCodeHandlers = (handlersByKeyCode) => (event, ...args) => {
  let handler = handlersByKeyCode[event.keyCode]
  if (handler) {
    handler(event, ...args)
  }
}

export const events = { endEvent, getPagePosition, getViewPosition, isShift, isCtrl, keyCodeHandlers }
