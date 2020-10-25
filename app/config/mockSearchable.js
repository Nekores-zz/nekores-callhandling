export const getMockSearchable = (allItems, setState, initialized = false) => {
  const _searchable = {
    allItems,
    setState,
    page: initialized ? 1 : 0,
    items: initialized ? allItems : [],
    itemsCount: allItems.length,
    isLoading: false
  };

  const loadCallback = (s, q) => () => {
    s.items = s.allItems.filter(item => item.name.match(new RegExp(q, "i")));
    s.items = s.items.slice(0, 10 * s.page < s.itemsCount ? 10 * s.page : s.itemsCount);
    s.isLoading = false;
    s.setState();
  };

  _searchable.search = _query => {
    _searchable.isLoading = true;
    _searchable.page = 1;
    _searchable.setState();
    setTimeout(loadCallback(_searchable, _query), 1000);
  };

  _searchable.loadMore = () => {
    _searchable.isLoading = true;
    _searchable.page++;
    _searchable.setState();
    setTimeout(loadCallback(_searchable), 1000);
  };

  // hack on to get state updated with mock data (has to get init on page level)
  _searchable.setSetState = fn => (_searchable.setState = fn);

  return _searchable;
};
