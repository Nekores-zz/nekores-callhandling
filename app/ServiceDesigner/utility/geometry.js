import { functions, arrays } from 'utils'

// Vectors

export const vector = (x, y) => ({x, y});

export const point = vector;

export const x = (p) => p.x;

export const y = (p) => p.y;

export const zero = point(0, 0);

export const isZero = (v = zero) => v.x === 0 && v.y === 0;

export const areEqual = (v0 = zero, v1 = zero) => v0.x === v1.x && v0.y === v1.y;

export const multiply = (k, v = zero) => vector(k * v.x, k * v.y);

export const add2 = (v0 = zero, v1 = zero) => vector(v0.x + v1.x, v0.y + v1.y);

export const add = (...vs) => vector(
  vs.reduce((x, v) => x + v.x, 0),
  vs.reduce((y, v) => y + v.y, 0),
);

export const dot = (v0 = zero, v1 = zero) => v0.x * v1.x + v0.y * v1.y;

export const difference = (p0 = zero, p1 = zero) => vector(p1.x - p0.x, p1.y - p0.y);

export const distance = (p0 = zero, p1 = zero) => norm(difference(p0, p1));

export const norm = (v = zero) => Math.sqrt(dot(v, v));

export const angle = (v0, v1) => Math.acos(dot(v0, v1) / (norm(v0) * norm(v1)));

export const normalize = (v, n = 1) => isZero(v) ? v : multiply(n / norm(v), v);

export const azimuth = (v) => Math.atan2(v.y, v.x);

export const perpendicular = (v) => vector(-v.y, v.x);

export const project = (v0, v1) => multiply(dot(v0, v1) / dot(v0, v0), v0);

export const radiansToDegrees = (rad) => 180 * rad / Math.PI;

export const map = (f, v = zero) => vector(f(v.x), f(v.y));

export const addTo = (v0) => (v1) => add(v0, v1);

export const distanceTo = (p0) => (p1) => distance(p0, p1);

export const isAscending = (p0, p1) => p0.x <= p1.x && p0.y <= p1.y;

export const min = (points) => point(Math.min(...points.map(x)), Math.min(...points.map(y)));

export const max = (points) => point(Math.max(...points.map(x)), Math.max(...points.map(y)));

// Ranges

export const getRange = (value0, value1 = value0) => value0 <= value1 ? [value0, value1] : [value1, value0];
export const getEmptyRange = () => getRange(NaN, NaN);
export const getDirectedRange = (value0, value1) => value0 <= value1 ? getRange(value0, value1) : getEmptyRange();
export const getRangeOfValues = (xs) => getRange(Math.min(...xs), Math.max(...xs));
export const getRangesUnion = (...rs) => getRange(Math.min(...rs.map(getLowerBound)), Math.max(...rs.map(getUpperBound)));
export const getRangesIntersection = (...rs) => getDirectedRange(Math.max(...rs.map(getLowerBound)), Math.min(...rs.map(getUpperBound)));
export const getLowerBound = (r) => r[0];
export const getUpperBound = (r) => r[1];
export const getRangeSize = (r) => getUpperBound(r) - getLowerBound(r);
export const isRangeNonempty = (r) => getLowerBound(r) <= getUpperBound(r);
export const isRangeEmpty = (r) => !isRangeNonempty(r);
export const isInsideRange = (r, x) => getLowerBound(r) <= x && x <= getUpperBound(r);
export const areRangesIntersecting = (r0, r1) => !(isRangeEmpty(r0) || isRangeEmpty(r1) || getLowerBound(r0) > getUpperBound(r1) || getLowerBound(r1) > getUpperBound(r0));
export const flattenRange = (r0, r1) => getRange(getLowerBound(r0), getUpperBound(r1));
export const flattenMapRange = (f, r) => flattenRange(f(getLowerBound(r)), f(getUpperBound(r)));

export const getRangesLinearMap = ([x0, x1], [y0, y1]) => {
  let dx = x1 - x0;
  let dy = y1 - y0;
  return dx === 0 ?
    (x) => isNaN(x) ? NaN : getRange(y0, y1)
    :
    (x) => getRange(getLinearMap(x0, y0, dy / dx) (x));
};

// Lines, rays, segments

export const implicitLine = (point, gradient) => ({gradient: gradient, constant: dot(gradient, point)});
export const implicitLineLevelFunction = (implicitLine, point) => dot(implicitLine.gradient, point) - implicitLine.constant;

export const parameterizedLine = (source, tangent) => ({source, tangent});
export const parameterizedLineCurve = (parameterizedLine, t) => add(parameterizedLine.source, multiply(t, parameterizedLine.tangent));

export const composedLevelFunction = (parameterizedLine, implicitLine, t = 0) => implicitLineLevelFunction(implicitLine, parameterizedLineCurve(parameterizedLine, t));
export const composedLevelsRate = (parameterizedLine, implicitLine) => dot(parameterizedLine.tangent, implicitLine.gradient);

export const findLinesIntersectionParameter = (parameterizedLine, implicitLine) => - composedLevelFunction(parameterizedLine, implicitLine) / composedLevelsRate(parameterizedLine, implicitLine);
export const lineParameter = (parameterizedLine, point) => dot(normalize(parameterizedLine.tangent), difference(parameterizedLine.source, point)) / norm(parameterizedLine.tangent);

export const ray = (source, direction) => ({source, direction});
export const source = ({source}) => source;
export const direction = ({direction}) => direction;
export const implicitRay = (ray) => implicitLine(source(ray), perpendicular(direction(ray)));
export const parameterizedRay = (ray) => parameterizedLine(source(ray), direction(ray));
export const isRayParameter = (t) => t >= 0;

export const segment = (point0, point1) => [point0, point1];
export const getSegmentFirst = (segment) => segment[0];
export const getSegmentSecond = (segment) => segment[1];
export const segmentDirection = (segment) => difference(getSegmentFirst(segment), getSegmentSecond(segment));
export const implicitSegment = (segment) => implicitLine(getSegmentFirst(segment), perpendicular(segmentDirection(segment)));
export const parameterizedSegment = (segment) => parameterizedLine(getSegmentFirst(segment), segmentDirection(segment));
export const isSegmentParameter = (t) => 0 <= t && t <= 1;
export const getSegmentRange = (getProjection, s) => getRange(getProjection(getSegmentFirst(s)), getProjection(getSegmentSecond(s)));

export const rayCrossingSegment = (ray) => (segment) => {
  let parameterizedLine = parameterizedRay(ray);
  let implicitLine = implicitSegment(segment);
  let t = findLinesIntersectionParameter(parameterizedLine, implicitLine);
  let point = parameterizedLineCurve(parameterizedLine, t);
  let s = lineParameter(parameterizedSegment(segment), point);
  return isRayParameter(t) && isSegmentParameter(s)? sign(composedLevelsRate(parameterizedLine, implicitLine)) : 0;
};

export const segmentsCrossing = (segment0) => (segment1) => {
  let parameterizedLine = parameterizedSegment(segment0);
  let implicitLine = implicitSegment(segment1);
  let t = findLinesIntersectionParameter(parameterizedLine, implicitLine);
  let point = parameterizedLineCurve(parameterizedLine, t);
  let s = lineParameter(parameterizedSegment(segment1), point);
  return isSegmentParameter(t) && isSegmentParameter(s) ? point : null;
};

// Polygonal paths

export const vertex = (vertices, i) => arrays.get(vertices, i);
export const edge = (vertices, i) => segment(vertex(vertices, i), vertex(vertices, i + 1));

export const path = (vertices) => vertices;
export const start = (vertices) => vertices[0];
export const end = (vertices) => arrays.last(vertices);
export const pathLength = (vertices) => sum((v, i) => i > 0 ? distance(v, vertices[i - 1]) : 0, vertices)
export const pathSegments = (vertices) => arrays.ofLength(vertices.length - 1, (i) => edge(vertices, i));
export const segmentCrossingPath = (vertices) => (segment) => pathSegments(vertices).find(segmentsCrossing(segment));
export const pathsCrossing = (vertices0) => (vertices1) => pathSegments(vertices0).find(segmentCrossingPath(vertices1));

export const polygon = (vertices) => vertices;
export const polygonContour = (vertices) => [...vertices, start(vertices)];
export const polygonSides = (vertices) => arrays.ofLength(vertices.length, (i) => edge(vertices, i));
export const normalAtVertex = (v0, v, v1) => multiply(-padding, add(normalize(difference(v, v0)), normalize(difference(v, v1))));
export const windingNumber = (vertices, point) => sum(rayCrossingSegment(ray(point, difference(point, vertices[0]))), polygonSides(vertices));
export const isInsidePolygon = (vertices, point) => windingNumber(vertices, point) % 2 > 0;
export const pathCrossesPolygon = (path) => (polygon) => isInsidePolygon(polygon, start(path)) || pathsCrossing(path) (polygonContour(polygon));

// Path finding

export const getDirectionDifference = (v0, v1) => (v) => angle(difference(v0, v1), difference(v0, v));

export const getShortestPaths = (getVertexEdges, startVertex, endVertex) => {
  let shortestPaths = new Map();
  let distances = new Map([[startVertex, 0]]);
  let queue = [startVertex];
  while (queue.length > 0) {
    let fromVertex = queue.pop();
    for (let toVertex of getVertexEdges(fromVertex)) {
      let d = distances.get(fromVertex) + distance(fromVertex, toVertex);
      if (!distances.has(toVertex) || d < distances.get(toVertex)) {
        shortestPaths.set(toVertex, fromVertex);
        distances.set(toVertex, d);
        arrays.insertByDescending(queue, toVertex, (vertex) => distances.get(vertex));
      }
    }
  }
  return shortestPaths;
};

export const unfoldPath = (shortestPaths, lastVertex) => {
  let shortestPath = arrays.unfold((vertex) => shortestPaths.get(vertex)) (lastVertex);
  shortestPath.reverse();
  return shortestPath;
};

// Rectangles

export const rectangle = (point0, point1 = point0) => ({point0, point1});
export const rectangleOfSize = (position, size) => rectangle(position, add(position, size))
export const getRectangleVertex = (x, y) => ({point0, point1}) => point(x(point0.x, point1.x), y(point0.y, point1.y))
export const rectanglePoint = (u, v) => (r) => add(minorCorner(r), vector(u * width(r), v * height(r)))
export const minorCorner = ({point0, point1}) => min([point0, point1]);
export const majorCorner = ({point0, point1}) => max([point0, point1]);
export const rectangleCenter = ({point0, point1}) => multiply(0.5, add(point0, point1));
export const position = (r) => minorCorner(r);
export const width = ({point0, point1}) => Math.abs(point1.x - point0.x);
export const height = ({point0, point1}) => Math.abs(point1.y - point0.y);
export const isRightRectangle = ({point0, point1}) => isAscending(point0, point1);
export const setRectangleRight = (r) => rectangle(minorCorner(r), majorCorner(r));
export const isInsideRectangle = (r) => (point) => isAscending(minorCorner(r), point) && isAscending(point, majorCorner(r));
export const getOverlap = (r0, r1) => rectangle(max([minorCorner(r0), minorCorner(r1)]), min([majorCorner(r0), majorCorner(r1)]));
export const areOverlapping = (r0, r1) => isRightRectangle(getOverlap(r0, r1));
export const getRectangleVertices = ({point0, point1}) => [point0, point(point0.x, point1.y), point1, point(point1.x, point0.y)];
export const mergeRectangles = (rs) => rectangle(min(rs.map(minorCorner)), max(rs.map(majorCorner)));
export const expandRectangle = (v) => (r) => rectangle(difference(v, r.point0), add(r.point1, v));
export const getRectangleRange = (getProjection, r) => getRangeOfValues([r.point0, r.point1].map(getProjection));

export const segmentCrossingRectangle = (s) => (r) => {
  let segmentHorizontalProjection = s.map(x);
  let segmentVerticalProjection = s.map(y);
  let segmentHorizontalRange = getRangeOfValues(segmentHorizontalProjection);
  let segmentVerticalRange = getRangeOfValues(segmentVerticalProjection);
  let rectangleHorizontalRange = getRectangleRange(x, r);
  let rectangleVerticalRange = getRectangleRange(y, r);
  let horizontalIntersectionRange = getRangesIntersection(segmentHorizontalRange, rectangleHorizontalRange);
  let verticalIntersectionRange = getRangesIntersection(segmentVerticalRange, rectangleVerticalRange);
  let getSegmentY = getRangesLinearMap(segmentHorizontalProjection, segmentVerticalProjection);
  let getSegmentX = getRangesLinearMap(segmentVerticalProjection, segmentHorizontalProjection);
  let horizontalIntersectionVerticalRange = flattenMapRange(getSegmentY, horizontalIntersectionRange);
  let verticalIntersectionHorizontalRange = flattenMapRange(getSegmentX, verticalIntersectionRange);
  return areRangesIntersecting(horizontalIntersectionRange, verticalIntersectionHorizontalRange)
    || areRangesIntersecting(verticalIntersectionRange, horizontalIntersectionVerticalRange);
};

export const pathCrossingRectangle = (rectangle) => (vertices) => pathSegments(vertices).find((segment) => segmentCrossingRectangle(segment) (rectangle));

// Math

export const sign = (x) => x > 0 ? 1 : x < 0 ? -1 : 0;
export const sum = (f, xs) => xs.reduce((s, x, i) => s + f(x, i), 0);
export const getLinearMap = (x0, y0, k) => (x) => y0 + k * (x - x0);
