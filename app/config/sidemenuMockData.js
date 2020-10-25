// the copy function that is added to each object is just a mock
// in reality we inject a deep copy function from scala js world

export const exampleFilters = [
  {
    label: "status",
    fieldName: "status",
    filterType: "select",
    values: [
      { label: "active", value: "active", isSelected: false },
      { label: "inactive", value: "inactive", isSelected: false },
      { label: "pending", value: "pending", isSelected: false }
    ],
    copy: function() {
      return this;
    }
  },
  {
    label: "textFilter",
    fieldName: "lastOpenedBy",
    filterType: "text",
    values: [{ label: "enterText", value: "", isSelected: false }],
    copy: function() {
      return this;
    }
  },
  {
    label: "lastOpened",
    fieldName: "lastOpened",
    filterType: "dateRadioSelector",
    values: [
      { label: "today", value: "today", isSelected: false },
      { label: "yesterday", value: "yesterday", isSelected: false },
      { label: "pastWeek", value: "week", isSelected: false },
      { label: "pastMonth", value: "month", isSelected: false },
      {
        label: "custom",
        value: "custom",
        isSelected: false,
        filter: {
          // a recursive filter example (detected because filter is defined inside a value)
          label: "custom",
          fieldName: "custom", // this name must be unique against all the filters tree (flattened)
          filterType: "date",
          values: [
            { label: "from", value: "", isSelected: false },
            { label: "to", value: "", isSelected: false }
          ],
          copy: function() {
            return this;
          }
        }
      }
    ],
    copy: function() {
      return this;
    }
  }
];

export const userFilters = [
  {
    label: "status",
    fieldName: "status",
    filterType: "select",
    values: [
      { label: "active", value: "active", isSelected: false },
      { label: "inactive", value: "inactive", isSelected: false },
      { label: "pending", value: "pending", isSelected: false }
    ],
    copy: function() {
      return this;
    }
  },
  {
    label: "invited",
    fieldName: "invited",
    filterType: "dateRadioSelector",
    values: [
      { label: "today", value: "today", isSelected: false },
      { label: "yesterday", value: "yesterday", isSelected: false },
      { label: "pastWeek", value: "week", isSelected: false },
      { label: "pastMonth", value: "month", isSelected: false },
      {
        label: "custom",
        value: "custom",
        isSelected: false,
        filter: {
          // a recursive filter example (detected because filter is defined inside a value)
          label: "custom",
          fieldName: "custom", // this name must be unique against all the filters tree (flattened)
          filterType: "date",
          values: [
            { label: "from", value: "", isSelected: false },
            { label: "to", value: "", isSelected: false }
          ],
          copy: function() {
            return this;
          }
        }
      }
    ],
    copy: function() {
      return this;
    }
  }
];

export const servicesFilters = [
  {
    label: "status",
    fieldName: "status",
    filterType: "dataSelect",
    values: [
      { label: "Version 1.2", value: "v1", isSelected: false },
      { label: "Version 2.4", value: "v2", isSelected: false },
      { label: "Version 3", value: "v3", isSelected: false }
    ],
    copy: function() {
      return this;
    }
  },
  {
    label: "lastOpenedBy",
    fieldName: "lastOpenedBy",
    filterType: "searchableChipSelector",
    values: [],
    copy: function() {
      return this;
    }
  },
  {
    label: "lastOpened",
    fieldName: "lastOpened",
    filterType: "dateRadioSelector",
    values: [
      { label: "today", value: "today", isSelected: false },
      { label: "yesterday", value: "yesterday", isSelected: false },
      { label: "pastWeek", value: "week", isSelected: false },
      { label: "pastMonth", value: "month", isSelected: false },
      {
        label: "custom",
        value: "custom",
        isSelected: false,
        filter: {
          // a recursive filter example (detected because filter is defined inside a value)
          label: "custom",
          fieldName: "custom", // this name must be unique against all the filters tree (flattened)
          filterType: "date",
          values: [
            { label: "from", value: "", isSelected: false },
            { label: "to", value: "", isSelected: false }
          ],
          copy: function() {
            return this;
          }
        }
      }
    ],
    copy: function() {
      return this;
    }
  }
];

export const reportsFilters = [
  {
    label: "status",
    fieldName: "status",
    filterType: "select",
    values: [
      { label: "active", value: "active", isSelected: false },
      { label: "inactive", value: "inactive", isSelected: false },
      { label: "pending", value: "pending", isSelected: false }
    ],
    copy: function() {
      return this;
    }
  },
  {
    label: "textFilter",
    fieldName: "lastOpenedBy",
    filterType: "text",
    values: [{ label: "enterText", value: "", isSelected: false }],
    copy: function() {
      return this;
    }
  },
  {
    label: "lastOpened",
    fieldName: "lastOpened",
    filterType: "dateRadioSelector",
    values: [
      { label: "today", value: "today", isSelected: false },
      { label: "yesterday", value: "yesterday", isSelected: false },
      { label: "pastWeek", value: "week", isSelected: false },
      { label: "pastMonth", value: "month", isSelected: false },
      {
        label: "custom",
        value: "custom",
        isSelected: false,
        filter: {
          // a recursive filter example (detected because filter is defined inside a value)
          label: "custom",
          fieldName: "custom", // this name must be unique against all the filters tree (flattened)
          filterType: "date",
          values: [
            { label: "from", value: "", isSelected: false },
            { label: "to", value: "", isSelected: false }
          ],
          copy: function() {
            return this;
          }
        }
      }
    ],
    copy: function() {
      return this;
    }
  }
];

export const accountFilters = [
  {
    label: "type",
    fieldName: "type",
    filterType: "accountType",
    values: [
      { label: "reseller", value: "reseller", isSelected: false },
      { label: "normal", value: "normal", isSelected: false },
      { label: "group", value: "group", isSelected: false }
    ],
    copy: function() {
      return this;
    }
  },
  {
    label: "status",
    fieldName: "status",
    filterType: "accountStatus",
    values: [
      { label: "active", value: "Active", isSelected: false },
      { label: "incomplete", value: "Incomplete", isSelected: false },
      { label: "suspended", value: "Suspended", isSelected: false },
      { label: "archived", value: "Archived", isSelected: false }
    ],
    copy: function() {
      return this;
    }
  },
  {
    label: "lastUpdated",
    fieldName: "lastUpdated",
    filterType: "dateRadioSelector",
    values: [
      { label: "today", value: "today", isSelected: false },
      { label: "yesterday", value: "yesterday", isSelected: false },
      { label: "pastWeek", value: "week", isSelected: false },
      { label: "pastMonth", value: "month", isSelected: false },
      {
        label: "custom",
        value: "custom",
        isSelected: false,
        filter: {
          // a recursive filter example (detected because filter is defined inside a value)
          label: "custom",
          fieldName: "custom", // this name must be unique against all the filters tree (flattened)
          filterType: "date",
          values: [
            { label: "from", value: "", isSelected: false },
            { label: "to", value: "", isSelected: false }
          ],
          copy: function() {
            return this;
          }
        }
      }
    ],
    copy: function() {
      return this;
    }
  }
];

export const exampleSortings = [
  {
    sortBy: "source",
    values: [
      { label: "lastOpened", value: "lastOpened", isSelected: true },
      { label: "createdDate", value: "createdDate", isSelected: false },
      { label: "name", value: "name", isSelected: false },
      { label: "status", value: "status", isSelected: false }
    ],
    copy: function() {
      return this;
    }
  },
  {
    sortBy: "direction",
    values: [
      { label: "ascending", value: "asc", isSelected: true },
      { label: "descending", value: "desc", isSelected: false }
    ],
    copy: function() {
      return this;
    }
  }
];

export const accountSortings = [
  {
    sortBy: "source",
    values: [
      { label: "lastUpdated", value: "lastUpdated", isSelected: true },
      { label: "name", value: "name", isSelected: false }
    ],
    copy: function() {
      return this;
    }
  },
  {
    sortBy: "direction",
    values: [
      { label: "ascending", value: "asc", isSelected: true },
      { label: "descending", value: "desc", isSelected: false }
    ],
    copy: function() {
      return this;
    }
  }
];

export const numbersFilters = [
  {
    label: "range",
    fieldName: "range",
    filterType: "narrowDataCheckbox",
    values: [
      { label: "0303", value: "0303", isSelected: false },
      { label: "0300", value: "0300", isSelected: false },
      { label: "0333", value: "0333", isSelected: false },
      { label: "0202", value: "0202", isSelected: false },
      { label: "08080", value: "08080", isSelected: false },
      { label: "0800", value: "0800", isSelected: false },
      { label: "0845", value: "0845", isSelected: false },
      { label: "0123", value: "0123", isSelected: false }
    ],
    copy: function() {
      return this;
    }
  },
  {
    label: "band",
    fieldName: "band",
    filterType: "narrowCheckbox",
    values: [
      { label: "gold", value: "gold", isSelected: false },
      { label: "bronze", value: "bronze", isSelected: false },
      { label: "silver", value: "silver", isSelected: false },
      { label: "standard", value: "standard", isSelected: false }
    ],
    copy: function() {
      return this;
    }
  },
  {
    label: "accounts",
    fieldName: "accounts",
    filterType: "text",
    values: [{ label: "searchAccounts", value: "", isSelected: false }],
    copy: function() {
      return this;
    }
  },
  {
    label: "services",
    fieldName: "services",
    filterType: "text",
    values: [{ label: "searchServices", value: "", isSelected: false }],
    copy: function() {
      return this;
    }
  }
];

export const audioFilters = [
  {
    label: "tags",
    fieldName: "tags",
    filterType: "tags",
    values: [],
    copy: function() {
      return this;
    } // now loaded dynamically
  },
  {
    label: "audioFileSet",
    fieldName: "set",
    filterType: "narrowDataCheckbox",
    values: [
      { label: "Set 1", value: "Set 1", isSelected: false },
      { label: "Set 2", value: "Set 2", isSelected: false },
      { label: "Set 3", value: "Set 3", isSelected: false },
      { label: "Set 4", value: "Set 4", isSelected: false },
      { label: "Set 5", value: "Set 5", isSelected: false },
      { label: "Set 6", value: "Set 6", isSelected: false }
    ],
    copy: function() {
      return this;
    }
  },
  {
    label: "fileType",
    fieldName: "fileType",
    filterType: "checkbox",
    values: [
      { label: "singleFile", value: "singleFile", isSelected: false },
      { label: "multiVersion", value: "multiVersion", isSelected: false }
    ],
    copy: function() {
      return this;
    }
  },
  {
    label: "status",
    fieldName: "status",
    filterType: "checkbox",
    values: [
      { label: "complete", value: "Complete", isSelected: false },
      { label: "pending", value: "Pending", isSelected: false },
      { label: "placeholder", value: "Placeholder", isSelected: false },
      { label: "inProgress", value: "InProgress", isSelected: false }
    ],
    copy: function() {
      return this;
    }
  },
  {
    label: "sourceType",
    fieldName: "sourceType",
    filterType: "checkbox",
    values: [
      { label: "file", value: "file", isSelected: false },
      { label: "phone", value: "phone", isSelected: false },
      { label: "browser", value: "browser", isSelected: false },
      { label: "professional", value: "professional", isSelected: false }
    ],
    copy: function() {
      return this;
    }
  },
  {
    label: "createdBy",
    fieldName: "createdBy",
    filterType: "text",
    values: [{ label: "searchNames", value: "", isSelected: false }],
    copy: function() {
      return this;
    }
  },
  {
    label: "dateCreated",
    fieldName: "dateCreated",
    filterType: "dateRadioSelector",
    values: [
      { label: "today", value: "today", isSelected: false },
      { label: "yesterday", value: "yesterday", isSelected: false },
      { label: "pastWeek", value: "week", isSelected: false },
      { label: "pastMonth", value: "month", isSelected: false },
      {
        label: "custom",
        value: "custom",
        isSelected: false,
        filter: {
          // a recursive filter example (detected because filter is defined inside a value)
          label: "custom",
          fieldName: "custom", // this name must be unique against all the filters tree (flattened)
          filterType: "date",
          values: [
            { label: "from", value: "", isSelected: false },
            { label: "to", value: "", isSelected: false }
          ],
          copy: function() {
            return this;
          }
        }
      }
    ],
    copy: function() {
      return this;
    }
  }
];

export const audioSortings = [
  {
    sortBy: "source",
    values: [
      { label: "lastOpened", value: "lastOpened", isSelected: true },
      { label: "createdDate", value: "createdDate", isSelected: false },
      { label: "name", value: "name", isSelected: false },
      { label: "status", value: "status", isSelected: false }
    ],
    copy: function() {
      return this;
    }
  },
  {
    sortBy: "direction",
    values: [
      { label: "ascending", value: "asc", isSelected: true },
      { label: "descending", value: "desc", isSelected: false }
    ],
    copy: function() {
      return this;
    }
  }
];

export const audioSetFilters = [
  {
    label: "dateCreated",
    fieldName: "dateCreated",
    filterType: "date",
    values: [
      { label: "from", value: "", isSelected: false },
      { label: "to", value: "", isSelected: false }
    ],
    copy: function() {
      return this;
    }
  }
];

export const audioSetSortings = [
  {
    sortBy: "source",
    values: [
      { label: "lastOpened", value: "lastOpened", isSelected: true },
      { label: "createdDate", value: "createdDate", isSelected: false },
      { label: "name", value: "name", isSelected: false }
    ],
    copy: function() {
      return this;
    }
  },
  {
    sortBy: "direction",
    values: [
      { label: "ascending", value: "asc", isSelected: true },
      { label: "descending", value: "desc", isSelected: false }
    ],
    copy: function() {
      return this;
    }
  }
];
