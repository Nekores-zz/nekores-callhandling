export let styleSheet = theme => ({
  notificationCard: {
    width: "100%",
    display: "flex",
    borderTop: "1px solid #D8D8D8",
    borderBottom: "1px solid #D8D8D8",
    borderRadius: 0,
    boxShadow: "none",
    padding: "10px 0px 10px 0px",
    "&:hover": {
      backgroundColor: "#f3f7fa",
      cursor: "pointer"
    },

    "& + &": {
      borderTop: 0
    }
  },
  notificationCardRead: {
    backgroundColor: "white"
  },
  notificationCardUnread: {
    backgroundColor: "#e8f4fe"
  },
  notificationItemTime: {
    ...theme.typography.secondarySmallBody,
    height: "15px",
    margin: "10px 0",
    display: "flex",
    fontSize: "14px",
    fontWeight: "normal",
    alignItems: "center",
    marginBottom: "4px"
  },
  notificationItemTimeIconIos: {
    height: "15px",
    marginRight: "3px",
    fill: theme.colors.primary.mediumGrey
  },
  notificationItemTimeIcon: {
    height: "15px",
    //widht: '24px',
    fontSize: "15px",
    marginRight: "8px",
    fill: theme.colors.primary.mediumGrey
  },
  notificationItemButton: {
    ...theme.buttons.thirdTextLink,
    paddingLeft: "0",
    paddingRight: "0",
    textAlign: "left",
    minWidth: "0",
    textTransform: "uppercase",
    fontWeight: "500",
    "&:hover": {
      background: "none"
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "12px",
      width: "auto",
      minWidth: "auto"
    }
  },
  notificationItemIcon: {
    minWidth: "58px",
    maxWidth: "58px",
    display: "flex",
    justifyContent: "center",
    paddingTop: "11px"
  },
  notificationItemIconAlert: {
    //width: '46px',
    fontSize: "46px",
    color: theme.colors.primary.errorRed
  },
  cardContent: {
    padding: "12px 12px 0 0"
  },
  cardActions: {
    padding: "0"
  },
  notificationItemText: {
    ...theme.typography.primaryBody,
    fontSize: "14px",
    lineHeight: "18px",
    color: theme.colors.primary.darkGrey
  },
  notificationItemIconNotification: {
    width: "38px",
    height: "38px",
    boxShadow: "none"
  }
});
