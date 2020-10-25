export const styleSheet = theme => ({
  paper: {
    marginTop: 1,
    width: 420,
    borderRadius: "1px",
    background: theme.colors.secondary.white,
    borderRadius: 1,
    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.13)",
    [theme.breakpoints.down("xs")]: {
      width: "calc(100vw - 10px)",
      //marginRight: 10,
      marginLeft: 10
    }
  },

  menuWrapper: {
    width: "100%",
    maxHeight: "60vh",
    overflowY: "auto"
  },

  usersMenuFooter: {
    background: theme.colors.primary.white,
    display: "flex",
    justifyContent: "space-between",
    padding: "9px 5px",
    position: "sticky",
    bottom: 0
  },

  usersMenuFooterButton: {
    ...theme.buttons.thirdTextLink,
    textTransform: "uppercase"
  }
});
