import {functions, arrays, objects, geometry, debug, observables, events, reactive, selectors} from '../utility'; 
 
const {
  point, vector, add, difference, multiply, distance, min, max, getRectangleRange, pathSegments,
  rectangle, setRectangleRight, isInsideRectangle, areOverlapping, getRectangleVertices, pathCrossingRectangle,
} = geometry;

const cellSize = 200

export const createCells = () => ({})
 
export const createIndex = (column, row) => `${Math.floor(column)}:${Math.floor(row)}`

export const addIndex = (cells, index) => objects.withOne(cells, index, true, true)

export const addCells = (cells0, cells1) => Object.assign(cells0, cells1)
 
export const rectangleToCellIndices = (rectangle, l = cellSize) => {
  let toCell = (x) => x / l
  let [column0, column1] = getRectangleRange(geometry.x, rectangle).map(toCell)
  let [row0, row1] = getRectangleRange(geometry.y, rectangle).map(toCell)
  let result = createCells()
  for (let row = row0; row <= row1; ++row) {
    for (let column = column0; column <= column1; ++column) {
        addIndex(result, createIndex(column, row))
    }
  }
  return result
}
 
export const segmentToCellIndices = (v0, v1, l = cellSize) => {
  let toCell = (x) => x / l
  let result = createCells()
  let cell0 = geometry.map(toCell, v0)
  let cell1 = geometry.map(toCell, v1)
  let delta = difference(cell0, cell1)
  let n = Math.ceil(Math.max(Math.abs(delta.x), Math.abs(delta.y)))
  for (let i = 0; i <= n; ++i) {
    let cell = add(cell0, multiply(i / n, delta))
    addIndex(result, createIndex(cell.x, cell.y))
  }
  return result
}
 
export const pathToCellIndices = (vertices, l = cellSize) => {
  let toCell = (x) => x / l
  let result = createCells()
  for (let [vertex0, vertex1] of pathSegments(vertices)) {
    let cells = segmentToCellIndices(vertex0, vertex1, l)
    addCells(result, cells)
  }
  return result
}

export const createLookup = () => ({})
 
export const addCellsForId = (lookup, cells, id) => {
  for (let index in cells) {
    if (lookup[index]) {
      lookup[index][id] = true
    } else {
      lookup[index] = { [id]: true }
    }    
  }
  return lookup
}

export const getIds = (lookup, cells) => {
  return objects.flatMap(
    (value, index) => lookup[index]
  ) (cells)
}
