import { functions, objects, arrays } from 'utils'
import { reactive } from './reactive';

const logCatch = (args, e) => {
  console.log('catch', args, e);
};

const withCatch = (arg) => arg;
	// typeof arg === 'function' ? functions.withCatch(arg, logCatch) :
	// typeof arg === 'object' ? objects.map((f) => functions.withCatch(f, logCatch)) (arg) : arg;

const fromObservable = (observable) => withCatch(observable.get);

const fromObservableItem = (key, observableItems) => observableItems.get()[key].get();

const get = withCatch((selector) => selector());

const fold = (f, value, args, ...selectors) => {
	if (!args) args = selectors.map(get);
	var memo = {value, args};
	return functions.withName('selectorsFold', () => {
		let args = selectors.map(get);
		if (!arrays.equals(args, memo.args)) {
			let value = f(memo.value, args, memo.args);
			// console.log(`fold ${name}`, {value, args, memo});
			memo = {args, value};
		}
		return memo.value;
	});
};

const map = (f, ...selectors) => {
	var memo = null;
	return functions.withName('selectorsMap', () => {
		let args = selectors.map(get);
		let areEqual = memo && arrays.equals(args, memo.args);
		if (!areEqual) {
			let result = f(...args);
			// console.log(`map ${f.name}`, {areEqual, args, result, memo});
			memo = {result, args};
		}
		return memo.result;
	});
};

const fromFunction = (f) => {
  let memo = {};
  return functions.withName('fromFunction', (arg) => {
    if (!memo.hasOwnProperty(arg)) {
      memo[arg] = f(arg);
    }
    return memo[arg];
  });
};

const toFunction = (s) => (...args) => s(...args) ();

const ofFunction = (getSelector) => () => (...args) => getSelector(...args) ();

const flatten = (s) => () => s() ();

const flattenMap = (f, ...selectors) => {
  return flatten(map(f, ...selectors));
};

const distinct = (selector, equals, name = '') => {
	var memo = null;
	return functions.withName('selectorsDistinct', () => {
		let value = selector();
		let isEqual = memo && equals(value, memo.value);
		if (!memo || !isEqual) {
			memo = {value};
			// console.log(`distinct ${name}`, {isEqual, value, memo});
		}
		return memo.value;
	});
};

const fromCollectionItems = (collectionSelector) => (id) => () => collectionSelector() [id];

const mapCollection = (getItem, collectionSelector) => {
  return distinct(
    fold(
      (prev, [items], [prevItems]) => objects.map(
        (item, itemId) => prevItems[itemId] === item ? prev[itemId] : getItem(item, itemId),
      ) (items),
      {},
      [{}],
      collectionSelector,
    ),
    objects.equals,
  );
};

const flattenMapCollection = (collectionSelector, getItemSelector) => {
  return distinct(
    map(
      objects.map(get),
      mapCollection(collectionSelector, getItemSelector),
    ),
    objects.equals,
  );
};

const item = (key, collectionSelector) => map(
	(items) => items[key],
	collectionSelector,
);

const bind = (f, ...argSelectors) => (...args) => {
	return f(...argSelectors.map(get), ...args);
};

export const selectors = {get, fromFunction, toFunction, ofFunction, fromObservable, fromObservableItem, fold, map, flatten, flattenMap, distinct, fromCollectionItems, mapCollection, flattenMapCollection, bind, item};

