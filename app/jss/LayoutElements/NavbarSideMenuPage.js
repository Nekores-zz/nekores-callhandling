export const styleSheet = theme => ({
  container: {
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    overflow: "hidden",
    [theme.breakpoints.only("xs")]: {
      overflowY: "scroll",
      WebkitOverflowScrolling: "touch"
    }
  },

  appbar: {
    zIndex: 10
  },

  page: {
    flex: 1,
    position: "relative",
    overflowY: "hidden",
    zIndex: 0
  },

  content: {
    height: "100%",
    overflowY: "auto",
    overflowX: "hidden"
  },

  desktopContentDrawerOpen: {
    [`@media(max-width: ${2 * theme.layoutSizes.drawerWidth +
      theme.layoutSizes.contentMaxWidth}px)`]: {
      marginLeft: theme.layoutSizes.drawerWidth
    }
  }
});
