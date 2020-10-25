export const styleSheet = theme => ({
  row: {
    position: "relative",
    cursor: "pointer",
    backgroundColor: theme.colors.primary.white
  },
  rowSelected: {
    backgroundColor: theme.colors.primary.backgroundGrey
  },
  shadowEmulatedRow: {
    cursor: "pointer",
    //backgroundColor: theme.colors.primary.white
    //if theme.colors.primary.white changes, the line below has to be updated manualy
    background:
      "linear-gradient(90deg, rgba(0,0,0,0) 6px, #ffffff 6px, #ffffff 90%, rgba(0,0,0,0) 90%, rgba(0,0,0,0)),linear-gradient(-90deg, rgba(0,0,0,0) 6px, #ffffff 6px, #ffffff 90%, rgba(0,0,0,0) 90%, rgba(0,0,0,0))"
  },
  shadowEmulatedRowSelected: {
    //backgroundColor: theme.colors.primary.backgroundGrey,
    //if theme.colors.primary.backgroundGrey changes, the line below has to be updated manualy
    background:
      "linear-gradient(90deg, rgba(0,0,0,0) 6px, #F2F2F2 6px, #F2F2F2 90%, rgba(0,0,0,0) 90%, rgba(0,0,0,0)),linear-gradient(-90deg, rgba(0,0,0,0) 6px, #F2F2F2 6px, #F2F2F2 90%, rgba(0,0,0,0) 90%, rgba(0,0,0,0))"
  }
});
