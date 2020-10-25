import * as geometry from './geometry'
import * as svg from './svg'
export { geometry, svg }
export * from 'utils'
export * from './events'
export * from './debug'
export * from './reactive'
export * from './observables'
export * from './selectors'
export * from './matching'

const diffObjects = (x0, x1, path = []) => {
	return objects.map(
		(_, key) => diff(x0[key], x1[key])
	) (
		objects.symmetricDifference(x0, x1)
	);
};

const diffArrays = (a0, a1, path = []) => {
	return arrays.ofLength(Math.max(a0.length, a1.length))
		.filter((_, i) => a0[i] !== a1[i])
		.map((_, i) => diff(a0[i], a1[i]));
};

export const diff = (x0, x1) => {
	return (
		x0 === x1 ? undefined :
		typeof x0 !== typeof x1 ? {x0, x1} :
		typeof x0 === 'object' ? diffObjects(x0, x1) :
		typeof x0 === 'array' ? diffArrays(x0, x1) :
		{x0, x1}
	);
};

// Object.assign(window, { geometry });
