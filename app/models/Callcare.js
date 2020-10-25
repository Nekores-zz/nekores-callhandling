export const Missing = {
  create: () => {},

  key: "Missing",

  getErrorMsg: error => {
    return {
      title: {
        columnName: error.data.columnName,
        columnNo: error.data.columnNo
      },
      content: {
        columnName: error.data.columnName
      }
    };
  },

  getColumn: error => {
    return {
      columnName: error.data.columnName,
      columnNo: error.data.columnNo
    };
  },

  getRows: () => {
    return null;
  }
};

export const Duplicate = {
  create: () => {},

  key: "Duplicate",

  getErrorMsg: error => {
    return {
      title: {
        columnName: error.data.columnName,
        columnNo: error.data.columnNo
      },
      content: {
        value: error.data.value
      }
    };
  },

  getColumn: error => {
    return {
      columnName: error.data.columnName,
      columnNo: error.data.columnNo
    };
  },

  getRows: () => {
    return null;
  }
};

export const Invalid = {
  create: () => {},

  key: "Invalid",

  getErrorMsg: error => {
    return {
      title: {
        columnName: error.data.columnName,
        columnNo: error.data.columnNo
      },
      content: {
        columnName: error.data.columnName,
        failReason: error.data.failReason,
        value: error.data.value,
        detail: error.data.detail
      }
    };
  },

  getColumn: error => {
    return {
      columnName: error.data.columnName,
      columnNo: error.data.columnNo
    };
  },

  getRows: () => {
    return null;
  }
};

export const Wrongformat = {
  create: () => {},

  key: "Wrongformat",

  getErrorMsg: error => {
    return {
      title: {
        columnName: error.data.columnName,
        columnNo: error.data.columnNo
      },
      content: {
        columnName: error.data.columnName,
        expectedFormat: error.data.expectedFormat
      }
    };
  },

  getColumn: error => {
    return {
      columnName: error.data.columnName,
      columnNo: error.data.columnNo
    };
  },

  getRows: () => {
    return null;
  }
};

export const Unknown = {
  create: () => {},

  key: "Unknown",

  getErrorMsg: error => {
    return {
      title: {
        columnName: error.data.columnName,
        columnNo: error.data.columnNo
      },
      content: {
        referenceCode: error.data.referenceCode,
        detail: error.data.detail
      }
    };
  },

  getColumn: error => {
    return null;
  },

  getRows: () => {
    return null;
  }
};

export const Collision = {
  create: () => ({}),

  key: "Collision",

  getErrorMsg: error => {
    let fromColumns = "",
      toColumns = "";
    for (const x of error.data.fromColumns) {
      fromColumns += x.collidingColumnName + "(Col " + x.collidingColumnNo + ")";
      if (error.data.fromColumns[error.data.fromColumns.length - 1] != x) fromColumns += ",";
      fromColumns += " ";
    }
    for (const x of error.data.toColumns) {
      toColumns += x.collidingColumnName + "(Col " + x.collidingColumnNo + ")";
      if (error.data.toColumns[error.data.toColumns.length - 1] != x) toColumns += ",";
      toColumns += " ";
    }

    return {
      title: {
        fromColumns: fromColumns,
        toColumns: toColumns
      },
      content: {}
    };
  },

  getInsertedRows: error => {
    return error.data.insertedRows;
  },

  getDetailError: error => {},

  getColumn: error => {
    return {
      columnName: error.data.fromColumns[0].collidingColumnName,
      columnNo: error.data.fromColumns[0].collidingColumnNo
    };
  },

  getRows: (rowNumber, error) => {
    let ids = "";
    error.data.insertedRows.forEach(row => {
      ids += row.rowId + ", ";
    });
    if (ids.length > 2) ids = ids.substr(0, ids.length - 2);
    return {
      key: "CollisionRowErrors",
      data: {
        ids: ids,
        rowNumber: rowNumber
      }
    };
  }
};

export const RowError = {
  create: () => ({}),

  getErrorByIndex: (errors, rowIndex, errIndex) => {
    return errors[rowIndex].errors[errIndex];
  },

  getColumn: error => {
    const errorFormat = RowError.getErrorFormat(error);
    return errorFormat && errorFormat.getColumn(error);
  },

  getColumnRelatedErrors: (errs, err) => {
    const relatedErrors = [];
    for (let row of errs) {
      for (let error of row.errors) {
        if (RowError.getColumn(error) == RowError.getColumn(error)) {
          relatedErrors.push({
            rowNumber: row.rowNumber,
            error: error
          });
        }
      }
    }
    return relatedErrors;
  },

  getErrorCount: rowError => {
    return rowError.numberOfErrors;
  },

  isDetailExist: error => {
    const errorFormat = RowError.getErrorFormat(error);
    return errorFormat.getDetailError != undefined;
  },

  getErrorFormat: error => {
    const errorFormats = [Collision, Missing, Unknown, Wrongformat, Invalid, Duplicate];
    for (const format of errorFormats) if (format.key === error.key) return format;
  },

  getErrorMsg: error => {
    return RowError.getErrorFormat(error).getErrorMsg(error);
  },

  getRows: (rowNumber, error) => {
    return RowError.getErrorFormat(error).getRows(rowNumber, error);
  }
};

export const CallcareErrors = {
  create: () => {},

  getErrorsCount: errors => {
    let count = 0;
    errors.forEach(error => {
      count += RowError.getErrorCount(error);
    });
    return count;
  }
};
