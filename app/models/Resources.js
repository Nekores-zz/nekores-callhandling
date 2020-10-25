import PropTypes from "prop-types";

export const ResourcesItem = {
    propType: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string,
        type: PropTypes.string,
        typeName: PropTypes.string,
        relation: PropTypes.string,
        relationName: PropTypes.string,
        children: PropTypes.arrayOf(PropTypes.string),
    }),

    createOneResourceItem: (id, name) => ({ id, name }),

    createSelection: (resourcesItem) => ({
        id: resourcesItem.id,
        type: resourcesItem.type,
        relation: resourcesItem.relation,
    }),

    isSame: (resourcesItem0) => (resourcesItem1) => (
        resourcesItem0.id === resourcesItem1.id &&
        resourcesItem0.type === resourcesItem1.type &&
        resourcesItem0.relation === resourcesItem1.relation
    ),

    isntSame: (resourcesItem0) => (resourcesItem1) => 
        !ResourcesItem.isSame(resourcesItem0) (resourcesItem1),
};

export const ResourcesItems = {
    propType: PropTypes.shape({
        items: PropTypes.arrayOf(ResourcesItem.propType).isRequired,
        resources: PropTypes.objectOf(PropTypes.string).isRequired,
    }),

    getChildrenItems: (resourcesItems, parentItem) => 
        parentItem.children.map(
            (id) => ResourcesItem.createOneResourceItem(id, resourcesItems.resources[id]),
        ),

    getSelectedItem: (resourcesItems, selection) => {
        return resourcesItems.items.find(ResourcesItem.isSame(selection)) 
            || ResourcesItems.getOneResourceItem(resourcesItems) (selection.id);
    },
};

export const ResourcesSelections = {
    propType: PropTypes.arrayOf(ResourcesItem.propType),

    create: (isEnabled) => 
        isEnabled ? [] : undefined,

    selectAll: (selection, shouldSelectAll) => 
        ResourcesSelections.create(!shouldSelectAll),

    isSelected: (selections, item) => 
        selections.find(ResourcesItem.isSame(item)),

    toggle: (selections, item) => 
        ResourcesSelections.isSelected(selections, item) ? 
            selections.filter(ResourcesItem.isntSame(item)) 
            : 
            [ResourcesItem.createSelection(item), ...selections]
};

