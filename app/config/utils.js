const nameCapitalized = name => name.charAt(0).toUpperCase() + name.slice(1);
/**
 * Write mock data similar to JsWriter macro. We use JsWriter macro to generate javascript object from scala case class*/
export const generateJsWriter = obj => {
  Object.keys(obj).reduce((prev, propertyName) => {
    const name = nameCapitalized(propertyName);
    if (obj.hasOwnProperty(propertyName) && typeof obj[propertyName] !== "function") {
      prev["field" + name] = propertyName;
      prev["set" + name] = value => {
        prev[propertyName] = value;
        return { ...prev };
      };
    }
    return prev;
  }, obj);
  obj.toScala = () => obj;
  return obj;
};

const SearchableData = {
  ordering: [
    generateJsWriter({
      field: "",
      reverse: false
    })
  ],
  filter: generateJsWriter({}),
  page: generateJsWriter({
    index: 0,
    perPage: 0,
    totalRecords: 0,
    lastItemId: "",
    projectionTypeId: 0
  }),
  data: [],
  isLoading: false
};

/**
 * This should take data as array type
 * @param data Array
 * @returns {{search: (function(*): Promise<unknown>), loadMore: (function(*, *, *): Promise<unknown>)}}
 */
export const listSearchable = data => {
  const ob = {
    search: queryString =>
      new Promise((resolve, reject) => {
        console.log("**search**" + queryString);
        let s = SearchableData;
        s["data"] = data;
        resolve({ ...s });
      }),
    loadMore: (filter, page, ordering) =>
      new Promise((resolve, reject) => {
        console.log("**loadMore**" + filter);
        console.log(filter);
        console.log(page);
        console.log(ordering);
        let s = SearchableData;
        s["data"] = data;
        s["ordering"] = ordering;
        s["filter"] = filter;
        s["page"] = page;
        resolve({ ...s });
      }),
    getSelectedItems: selectedIds =>
      new Promise((resolve, reject) => {
        console.log("**getSelectedItems**" + selectedIds);
        let s = SearchableData;
        s["data"] = data.filter(d => selectedIds.find(id => id === d.id));
        resolve({ ...s });
      })
  };
  return ob;
};
