
export const styleSheet = (theme) => ({
  bdrLeftNone: {
    borderLeft: "0 !important"
  },
  root: {
    overflow: "auto",
    border: `1px solid ${theme.colors.primary.lightGrey}`
  },
  table: {
    width:"100.03%",
    "& td": {
      border: `1px solid  ${theme.colors.primary.lightGrey}`,
      borderBottom: 0,
      maxWidth: "110px !important",
      minWidth: "110px !important",
    },
    "& tr":{
      height: "45px"
    },
    "& tr.dynamicDataRow:nth-child(even)": {
      backgroundColor: theme.colors.primary.backgroundGrey
    },
    "& th": {
      maxWidth: "110px !important",
      borderBottom: 0
    },
    "& th:last-child": {
      paddingRight: 0
    },
    "& td:last-child": {
      borderRight: "0"
    },
    "& td:first-child": {
      borderLeft: "0",
      paddingRight: "0"
    }
  },
  displayTable: {
    width: "100%",
    display: "table"
  },
  tableHead: {
    background: "#2196f3",
    width: "100%",
    display: "table",
    "& th": {
      color: `${theme.colors.primary.white} !important`,
      fontSize: "14px"
    }
  },
  paddingNone: {
    padding: "0 !important"
  },
  accordionSummaryStyle: {
    minHeight: "45px",
    margin: "0 !important",
    background: theme.colors.secondary.lightestBlue,
    "& p": {
      fontSize: "14px",
      color: "#333",
      margin: 0,
      textTransform: "uppercase"
    }
  },
  accordionRootStyle: {
    boxShadow: "none",
    margin: "0 !important"
  },
  accordionDetailStyle: {
    padding: 0,
    display: "block !important"
  },

  tableFooter: {
    "& td": {
      fontWeight: "bold",
      textTransform:"uppercase"
    },
    "& tr": {
      backgroundColor: theme.colors.primary.white
    }
  }
});
