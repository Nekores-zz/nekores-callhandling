import { geometry, events, reactive, objects, arrays, functions, models, debug, matching, generateUid, observables } from '../utility';
import { sides, sidesDirections } from './nodes'

const { max, min } = Math

const { first, last, tail, appendInPlace } = arrays

const { point, vector, multiply, add, addTo, getRectangleVertex, expandRectangle, segmentCrossingRectangle, getShortestPaths, unfoldPath, pathLength, difference, getRectangleVertices, segment, pathSegments, isInsideRectangle, rectangle, } = geometry;

const { not } = matching

const { top, right, bottom, left } = sides

export const concat = (path, ...paths) => {
  return path.concat(...paths.map((p) => tail(p)))
}

function Waypoint(position, canReach = (point) => true) {
    this.position = position
    this.canReach = canReach
  }

  function canReach(w0, w1) {
    return w0.canReach(w1.position) && w1.canReach(w0.position)
  }

  function distance(w0, w1) {
    return geometry.distance(w0.position, w1.position)
  }

  function Path(
    vertices,
    start = new Waypoint(arrays.first(vertices)),
    end = new Waypoint(arrays.last(vertices)),
    length = pathLength(vertices),
  ) {
    this.start = start
    this.vertices = vertices
    this.length = length
    this.end = end
  }

  function vertices(path) {
    return path.vertices
  }

  function end(path) {
    return path.end
  }

  function toPath(waypoint) {
    return new Path([waypoint.position], waypoint, waypoint)
  }

function reverse(path) {
  return new Path(path.vertices.slice().reverse(), path.end, path.start, path.length)
}

function canConnect(path0, path1) {
  return canReach(path0.end, path1.start)
}

function connect(path0, path1) {
  let vertices = [...path0.vertices, ...path1.vertices]
  let length = path0.length + distance(path0.end, path1.start) + path1.length
  return new Path(vertices, path0.start, path1.end, length)
}

function connectShortest(paths0, paths1) {
  var result = null
  for (let path0 of paths0) {
    for (let path1 of paths1) {
      if (canConnect(path0, path1)) {
        let path = connect(path0, path1)
        if (!result || path.length < result.length) {
          result = path
        }
      }
    }
  }
  return result || connect(paths0[0], paths1[0])
}

const canReachFromSide = {
  [top]: (origin) => (point) => point.y <= origin.y,
  [right]: (origin) => (point) => point.x >= origin.x,
  [bottom]: (origin) => (point) => point.y >= origin.y,
  [left]: (origin) => (point) => point.x <= origin.x,
}

function getSlotPath({ position, side, isInput }) {
  let direction = multiply(20, sidesDirections[side])
  let vertices = [position, add(position, direction)]
  let waypoint = new Waypoint(vertices[1], canReachFromSide[side] (vertices[0]))
  return new Path(vertices, waypoint, waypoint)
}

const corners = {
  topRight: 'topRight',
  rightBottom: 'rightBottom',
  bottomLeft: 'bottomLeft',
  leftTop: 'leftTop',
}

const { topRight, rightBottom, bottomLeft, leftTop } = corners

const canReachFromCorner = {
  [topRight]: (origin) => (point) => point.y <= origin.y || point.x >= origin.x,
  [rightBottom]: (origin) => (point) => point.y >= origin.y || point.x >= origin.x,
  [bottomLeft]: (origin) => (point) => point.y >= origin.y || point.x <= origin.x,
  [leftTop]: (origin) => (point) => point.x <= origin.x || point.y <= origin.y,
}

const cornersDirections = {
  [topRight]: vector(1, -1),
  [rightBottom]: vector(1, 1),
  [bottomLeft]: vector(-1, 1),
  [leftTop]: vector(-1, -1),
}

const getRectangleCorner = {
  [topRight]: getRectangleVertex(max, min),
  [rightBottom]: getRectangleVertex(max, max),
  [bottomLeft]: getRectangleVertex(min, max),
  [leftTop]: getRectangleVertex(min, min),
}

const getCornerWaypoint = (rectangle, corner) => {
  let position0 = getRectangleCorner[corner] (rectangle)
  let direction = multiply(20, cornersDirections[corner])
  let position1 = add(position0, direction)
  let canReach = canReachFromCorner[corner] (position0)
  return new Waypoint(position1, canReach)
}

const cornersClockwiseFromTop = [topRight, rightBottom, bottomLeft, leftTop]

const cornersBySide = {
  [top]: cornersClockwiseFromTop,
  [right]: arrays.rotate(cornersClockwiseFromTop, 1),
  [bottom]: arrays.rotate(cornersClockwiseFromTop, 2),
  [left]: arrays.rotate(cornersClockwiseFromTop, 3),
}

export function connectPoint(point) {
  return connectWaypoint(new Waypoint(point))
}

export function connectWaypoint(waypoint) {
  return connectPath(toPath(waypoint))
}

export function connectPath(path) {
  return [path]
}

export function connectNode(slot, rectangle, canReach = Boolean) {
  let path = getSlotPath(slot)
  let paths = [path]
  if (canReach(path.end.position)) {
    let clockwise = path
    let conterclockwise = path
    let corners = cornersBySide[slot.side].slice()
    while (corners.length && (clockwise || conterclockwise)) {
      if (corners.length && clockwise) {
        let waypoint = getCornerWaypoint(rectangle, corners.shift())
        clockwise = canReach(waypoint.position) ? connect(clockwise, toPath(waypoint)) : null
        clockwise && paths.push(clockwise)
      }
      if (corners.length && conterclockwise) {
        let waypoint = getCornerWaypoint(rectangle, corners.pop())
        conterclockwise = canReach(waypoint.position) ? connect(conterclockwise, toPath(waypoint)) : null
        conterclockwise && paths.push(conterclockwise)
      }
    }
  }
  return slot.isInput ? paths.map(reverse) : paths
}

export function connectAll(arg0, arg1, ...args) {
  return args.reduce(
    (result, arg) => {
      let waypoint = end(arrays.last(result))
      let path = connectShortest(connectWaypoint(waypoint), arg)
      result.push(path)
      return result
    },
    [connectShortest(arg0, arg1)]
  ).map(vertices)
}

// Proper path search

const pathSearchWithRectObstacles = (obstacleRects) => (fromPosition, toPosition) => {
  let waypoints = arrays.flatten(obstacleRects.map(getRectangleVertices))
  let vertices = [fromPosition, toPosition, ...waypoints]
  let obstaclesWithGap = obstacleRects.map(expandRectangle(vector(-1, -1)))
  let isAdjacent = (v0) => (v1) => v0 !== v1 && !obstaclesWithGap.find(segmentCrossingRectangle(segment(v0, v1)))
  let getVertexEdges = functions.memoize((vertex) => vertices.filter(isAdjacent(vertex)))
  let shortestPaths = getShortestPaths(getVertexEdges, fromPosition, toPosition)
  let shortestPath = unfoldPath(shortestPaths, toPosition)
  return arrays.first(shortestPath) === fromPosition ? shortestPath : [fromPosition, toPosition]
}

export function properPath(fromSlot, toSlot, elbowPositions, nodeObstacles) {
  let obstacleRects = objects.values(nodeObstacles).map(expandRectangle(vector(20, 20)))
  let pathSearch = pathSearchWithRectObstacles(obstacleRects)
  let connectProper = (path0, path1) => concat(path0, pathSearch(last(path0), first(path1)), path1)
  let [path0, path1, ... paths] = [
    vertices(getSlotPath(fromSlot)),
    ... elbowPositions.map(arrays.of),
    vertices(reverse(getSlotPath(toSlot))),
  ]
  return paths.reduce(
    (result, next) => appendInPlace(
      result,
      connectProper(last(result).slice(-1), next)
    ),
    [connectProper(path0, path1)]
  )
}
