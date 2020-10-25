export const styleSheet = theme => ({
  noSelect: {
    WebkitTouchCallout: "none" /* iOS Safari */,
    WebkitUserSelect: "none" /* Safari */,
    KhtmlUserSelect: "none" /* Konqueror HTML */,
    MozUserSelect: "none" /* Firefox */,
    MsUserSelect: "none" /* Internet Explorer/Edge */,
    UserSelect: "none"
  },

  selected: {
    backgroundColor: theme.colors.primary.backgroundGrey
  }
});
