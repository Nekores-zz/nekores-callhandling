export const styleSheet = theme => ({
  userAvatarWrapper: {
    display: "flex",
    alignItems: "center"
  },

  userAvatar: {
    width: "90px",
    height: "90px"
  },

  header: {
    boxSizing: "border-box",
    padding: "19px 20px",
    justifyContent: "space-between"
  },

  userInfo: {
    flex: 1,
    marginLeft: "12px",
    paddingLeft: 10,
    paddingBottom: 12,
    wordBreak: "break-all"
  },

  userInfoHeading: {
    ...theme.typography.headline,
    fontSize: "16px",
    display: "block",
    lineHeight: "19px",
    color: theme.colors.primary.black,
    wordBreak: "break-all"
  },

  userInfoEmail: {
    ...theme.typography.secondaryBody,
    fontSize: "14px",
    marginTop: "2px",
    lineHeight: "22px",
    wordBreak: "break-all"
  }
});
