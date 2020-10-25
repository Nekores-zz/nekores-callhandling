import PropTypes from "prop-types";

export const DiodeSearchable = PropTypes.shape({
  search: PropTypes.func.isRequired, // String => Callback // gets a query string and expects props to update accordingly from search
  items: PropTypes.array.isRequired, // Seq[A] // array of items loaded so far... (ListResponse type from backend, being paginated)
  itemsCount: PropTypes.number, // Option[Long] // cannot be inferred from items.length as search results are lazily loaded
  loadMore: PropTypes.func.isRequired, // () => Callback // requests more items onScrolledToEnd if items.length < itemsCount
  isLoading: PropTypes.bool.isRequired // Boolean // displays loader if true
});

export const SearchableData = PropTypes.shape({
  // look at app/config/utils.js file for better understanding
  ordering: PropTypes.array.isRequired,
  filter: PropTypes.object.isRequired,
  page: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired
});

export const PromiseSearchable = PropTypes.shape({
  search: PropTypes.func.isRequired, // String => SearchableData
  loadMore: PropTypes.func.isRequired, // (filter, page, ordering) => SearchableData
  getSelectedItems: PropTypes.func.isRequired // string[] => SearchableData
});

export const PROMISE = "promise";
export const DIODE = "diode";