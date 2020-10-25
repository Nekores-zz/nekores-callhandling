export const styleSheet = theme => ({
  listItem: {
    paddingLeft: "21px",
    boxSizing: "border-box",
    borderLeft: "3px solid transparent",
    paddingTop: 15,
    paddingBottom: 15,
    "&:hover": {
      borderLeftColor: theme.colors.primary.mainBlue,
      cursor: "pointer"
    }
  },

  userAvatar: {
    width: "55px",
    height: "55px"
  },

  header: {
    boxSizing: "border-box",
    padding: "19px 20px",
    justifyContent: "space-between",
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "pointer"
    }
  },

  userInfo: {
    flex: 1,
    marginLeft: "20px",
    wordBreak: "break-all"
  },

  userInfoHeading: {
    ...theme.typography.headline,
    fontSize: "16px",
    color: theme.colors.primary.black,
    wordBreak: "break-all"
  },

  userInfoEmail: {
    ...theme.typography.secondaryBody,
    fontSize: "14px",
    wordBreak: "break-all"
  },

  userInfoButton: {
    ...theme.buttons.action,
    marginTop: "12px",
    "&:hover": {
      ...theme.buttons.actionHover
    },
    "&:disabled": {
      ...theme.buttons.actionDisabled
    }
  }
});
