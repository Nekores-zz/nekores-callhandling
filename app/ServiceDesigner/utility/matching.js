import { functions, objects, arrays } from 'utils'

const logMatching = (msg, f) => f
// functions.withSideEffect(f, (args, result) => {
// 	if (!result) {
// 		// console.log('not matching', args, result, msg);
// 		// debugger;
// 	}
// });

const isAny = (value) => true;

const isTyped = (type) => logMatching('isTyped ' + type, (value) => typeof value === type);

const and = (...predicates) => logMatching(['and', predicates], (value) => predicates.every((predicate) => predicate(value)))

const or = (...predicates) => logMatching(['or', predicates], (value) => predicates.find((predicate) => predicate(value)));

const not = (predicate) => logMatching(['not', predicate], (value) => !predicate(value));

const equals = (constant) => logMatching(['equals', constant], (value) => value === constant);

const isUndefined = isTyped('undefined');

const isNumber = isTyped('number');

const isString = isTyped('string');

const isBoolean = isTyped('boolean');

const isFunction = isTyped('function');

const isObjectOrNullOrArray = isTyped('object');

const isNull = and(isObjectOrNullOrArray, equals(null));

const isArray = logMatching('isArray', and(isObjectOrNullOrArray, Array.isArray));

const isArrayOf = (predicate) => and(isArray, (array) => array.every(predicate));

const isObject = and(isObjectOrNullOrArray, not(isNull), not(isArray));

const hasShape = (shape) => and(isObject, (object) => objects.every((predicate, key) => predicate(object[key])) (shape));

const hasProperties = (props) => hasShape(objects.map((v0) => (v1) => v1 === v0) (props));

const isTruthy = logMatching('isTruthy', (value) => !!value);

const isFalsy = logMatching('isFalsy', (value) => !value);

const assert = (predicate, msg = '') => (value) => {
	if (predicate(value)) {
		return value;
	} else {
		throw new Error(msg, value);
	}
};

export const isVector = hasShape({
	x: isNumber,
	y: isNumber,
});

export const isPosition = isVector
export const isDirection = isVector
export const isSize = isVector

export const string = (search) => (string) => isString(string) && string.includes(search)
export const query = (strings, searches, caseSensitive = false) => {
	if (!caseSensitive) {
		strings = strings.map(s => s.toLowerCase())
		searches = searches.map(s => s.toLowerCase())
	}
	for (let search of searches) {
		let matches = and(search.split(' ').map(string))
		if (strings.find(matches)) {
			return true
		}
	}
}

export const matching = window.matching = {
	isAny, isTyped, and, or, not, equals, isUndefined, isNumber,isString, isBoolean, isFunction,
	isObjectOrNullOrArray, isNull, isArray, isArrayOf, isObject, hasShape, hasProperties, isTruthy, isFalsy,
	assert, isVector, isPosition, isDirection, isSize, string, query,
};