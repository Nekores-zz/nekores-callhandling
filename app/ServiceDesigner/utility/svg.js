import * as geometry from './geometry';

export const move = (p) => `M ${p.x} ${p.y}`;

export const line = (p) => `L ${p.x} ${p.y}`;

export const corner = (p0, p, p1, r) => {
  let v0 = geometry.normalize(geometry.difference(p, p0), r);
  let v1 = geometry.normalize(geometry.difference(p, p1), r);
  let c0 = geometry.add(p, v0);
  let c1 = geometry.add(p, v1);
  return `L ${c0.x | 0} ${c0.y | 0} Q ${p.x | 0} ${p.y | 0} ${c1.x | 0} ${c1.y | 0}`;
};