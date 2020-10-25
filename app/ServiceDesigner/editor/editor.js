import {geometry, events, reactive, objects, arrays, functions, models, debug, matching, observables, selectors} from '../utility';
import { emitEventTo, mergeModules, observeModule, mergeObservables } from './modules';

// Viewport

const bound = (x0, x1) => (x) => x < x0 ? x0 : x > x1 ? x1 : x;
const constrainZoom = bound(2**-4, 2);
const initViewport = (position = geometry.zero, zoom = 1) => ({position, zoom: constrainZoom(zoom)});

const setZoom = (zoom) => (viewport) => initViewport(viewport.position, zoom);
const slide = (offset) => (viewport) => initViewport(geometry.add(viewport.position, offset), viewport.zoom);
const zoomInto = (deltaZoom, anchorPosition) => (viewport) => {
  let zoom = constrainZoom(viewport.zoom + deltaZoom);
  let offset = geometry.multiply((zoom - viewport.zoom) / zoom, geometry.difference(viewport.position, anchorPosition));
  let position = geometry.add(viewport.position, offset);
  return initViewport(position, zoom);
};
const fit = (rectangle, size) => (viewport) => {
  let zoom = Math.min(size.x / geometry.width(rectangle), size.y / geometry.height(rectangle));
  let position = geometry.add(geometry.rectangleCenter(rectangle), geometry.multiply(-0.5 / zoom, size));
  return initViewport(position, zoom);
};

const getTransformString = ({position, zoom}) => `scale(${zoom}) translate(${-position.x} ${-position.y})`;
const transformFromView = ({position, zoom}, point) => geometry.add(geometry.multiply(1 / zoom, point), position);
const transformOffsetFromView = ({position, zoom}, offset) => geometry.multiply(1 / zoom, offset);
const getEventPosition = (viewport, event) => transformFromView(viewport, events.getViewPosition(event));

export const Viewport = {
  create: initViewport, setZoom, slide, zoomInto, fit,
  getTransformString, transformFromView, transformOffsetFromView, getEventPosition
};

// Selection

const empty = {};
const of = (id, typeId = true) => ({[id]: typeId});
const ofMany = (ids) => objects.fromKeys(ids, () => true);
const isSelected = (selection) => (id) => !!selection[id];
const isEmpty = (selection) => objects.isEmpty(selection);

const set = (selection) => (previous) => selection;
const merge = (selection0) => (selection1) => objects.union(selection0, selection1);
const toggle = (selection0) => (selection1) => objects.symmetricDifference(selection0, selection1);
const select = (selection0, shouldMerge = false, shouldToggle = false) => (shouldMerge ? merge : shouldToggle ? toggle : set) (selection0);

const intersection = (selection0, selection1) => objects.intersection(selection0, selection1);
const difference = (selection0, selection1) => objects.difference(selection0, selection1);

export const Selection = {
  empty, of, ofMany, isEmpty, isSelected,
  intersection, difference,
  set, reset: set(empty), merge, toggle, select,
};

// Grid

const initGrid = () => 10;

const setGridSize = (gridSize) => (prev) => Math.max(gridSize, 1);
const snapNumber = (gridSize) => (x) => gridSize > 0 ? Math.round(x / gridSize) * gridSize : x;
const snapPosition = (gridSize) => (p) => geometry.map(snapNumber(gridSize), p);
const padding = (gridSize) => Math.max(gridSize, 20)

export const Grid = {create: initGrid, setGridSize, snapNumber, snapPosition, padding};

// Viewport

export const createViewport = () => {
  let state = observables.of(Viewport.create())
  let transform = observables.map(Viewport.getTransformString, state)

  let selectors = {
    getEventPosition: (event) => Viewport.getEventPosition(state.get(), event),
    transformFromView: (position) => Viewport.transformFromView(state.get(), position),
    transformOffsetFromView: (offset) => Viewport.transformOffsetFromView(state.get(), offset),
  };

  let actions = {
    setZoom: (zoom) => observables.update(state, Viewport.setZoom(zoom)),
    slide: (offset) => observables.update(state, Viewport.slide(offset)),
    zoomInto: (deltaZoom, anchorPosition) => observables.update(state, Viewport.zoomInto(deltaZoom, anchorPosition)),
    fit: (rectangle, size) => observables.update(state, Viewport.fit(rectangle, size)),
  };

  return observables.denote({ ...selectors, ...actions, state, transform, }, 'viewport.')
};

// Selection

export const createSelection = () => {
  let state = observables.of(Selection.empty)

  let actions = {
    set: (selection) => state.set(selection ?? {}),
    reset: () => state.set(Selection.empty),
    merge: (selection) => observables.update(state, Selection.merge(selection)),
    toggle: (selection) => observables.update(state, Selection.toggle(selection)),
    select: (selection, shouldMerge = false, shouldToggle = false) => observables.update(state, Selection.select(selection, shouldMerge, shouldToggle)),
  }

  let ofId = (id) => observables.map((selection) => !!selection[id], state)
  let isEmpty = observables.map(Selection.isEmpty, state)
  let ids = state

  return observables.denote({
    ... actions,
    isEmpty,
    ids,
    ofId,
  }, 'selection.')
}

// Grid

export const createGrid = () => {
  let range = [1, 100]
  let state = observables.of(10)

  let selectors = {
    getGridSize: () => state.get(),
    snapPosition: (position) => Grid.snapPosition(state.get()) (position),
  };

  let actions = {
    setGridSize: (gridSize) => observables.update(state, Grid.setGridSize(gridSize)),
  };

  let padding = observables.map(Grid.padding, state);

  let gridSize = state

  return observables.denote({ range, gridSize, state, padding, ...selectors, ...actions }, 'grid')
}

export const createAsyncTasks = (application) => {
  let asyncTasks = application.asyncTasks

  observables.observe(
    asyncTasks,
    (asyncTasks) => {
      if (asyncTasks.length) {
        requestAnimationFrame(run)
      }
    }
  )

  function run() {
    let tasks = asyncTasks.get().slice()
    var t0 = performance.now()
    do {
      if (!tasks.length) break
      let task = tasks.shift()
      task()
      var t1 = performance.now()
    } while (t1 - t0 < 50)
    if (tasks.length) {
      requestAnimationFrame(run)
    }
  }
}
