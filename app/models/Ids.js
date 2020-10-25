import PropTypes from "prop-types";
  
export const Id = {
    propType: PropTypes.string,

    get: (item) => item.id,

    exists: (item) => !!item.id,
};

export const SelectedIds = {
    propType: PropTypes.arrayOf(Id.propType),

    create: (isEnabled = true) => 
        isEnabled ? [] : undefined,

    selectAll: (selectedIds, shouldSelectAll) => 
        SelectedIds.create(!shouldSelectAll),

    clear: () => [],

    select: (selectedIds, id) => SelectedIds.isSelected(selectedIds, id) ? 
        selectedIds : [id, ...selectedIds],

    unselect: (selectedIds, id) => selectedIds && selectedIds.filter(
        (selectedId) => selectedId !== id,
    ),

    toggle: (selectedIds, id, shouldSelect = !SelectedIds.isSelected(selectedIds, id)) => shouldSelect ? 
        SelectedIds.select(selectedIds, id) : SelectedIds.unselect(selectedIds, id),
    
    isEnabled: (selectedIds) => !!selectedIds,
    
    isSelected: (selectedIds, id) => selectedIds && selectedIds.includes(id),
};
