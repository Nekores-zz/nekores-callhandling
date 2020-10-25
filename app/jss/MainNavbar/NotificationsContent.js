export const styleSheet = theme => ({
  notificationsContentPaper: {
    marginTop: 4,
    position: "relative",
    left: 4,
    width: 420,
    background: theme.colors.primary.white,
    borderRadius: 1,
    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.13)",
    [theme.breakpoints.down("xs")]: {
      width: "calc(100% - 10px)",
      //marginRight: 10,
      marginLeft: 10
    }
  },

  notificationsWrapper: {
    width: "100%",
    maxHeight: "60vh",
    overflowY: "auto"
  },

  notificationsContentTitle: {
    ...theme.typography.notificationHeadline,
    flex: "1",
    lineHeight: "22px"
  },

  notificationsContentTitleWrapper: {
    display: "flex",
    justifyContent: "space-between",
    padding: "16px 25px 17px 21px",
    boxSizing: "border-box"
  },

  notificationsContentIcon: {
    color: theme.colors.secondary.lightBlue,
    height: "23px",
    width: "auto",
    alignSelf: "center",
    "&:hover": {
      cursor: "pointer"
    },
    "& + &": {
      marginLeft: "17px"
    }
  },

  notificationCardsWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // padding: "0px 20px 10px",
    "&:last-of-type": {
      paddingBottom: "20px"
    }
  },

  viewAllButtonWrapper: {
    background: theme.colors.primary.white,
    height: "44px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "sticky",
    bottom: 0,
    borderTop: "1px solid #D8D8D8"
  },

  viewAllButton: {
    ...theme.buttons.thirdTextLink,
    textTransform: "uppercase",
    width: "100%",
    borderRadius: 0
  }
});
