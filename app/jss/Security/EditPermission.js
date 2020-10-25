export const styleSheet = theme => ({
  paper: {
    padding: 32,
    margin: 32,
    textAlign: "left",
    [theme.breakpoints.down("sm")]: {
      margin: 0
    }
  },

  page: {
    height: "100%"
  },

  pageContent: {
    flex: 1,
    maxWidth: 1200,
    marginLeft: "auto",
    marginRight: "auto",
    [theme.breakpoints.down("sm")]: {
      margin: 0,
      overflowX: "hidden"
    }
  },

  marginTopSmall: {
    marginTop: 16
  },

  marginTopMedium: {
    marginTop: 24
  },

  marginTopLarge: {
    marginTop: 32
  },

  marginTopExtraLarge: {
    marginTop: 48
  },

  marginBottomSmall: {
    marginBottom: 16
  },

  marginBottomMedium: {
    marginBottom: 24
  },

  marginBottomLarge: {
    marginBottom: 32
  },

  marginBottomExtraLarge: {
    marginBottom: 48
  },

  enableOnChildAccountsOptions: {
    paddingLeft: 50
  },

  enableOnChildAccountsOption: {
    height: 32
  },

  select: {
    display: "flex",
    width: 300
  },

  selectedAccountsHeader: {
    backgroundColor: theme.colors.primary.secondaryBlue
  },

  excludedAccountsHeader: {
    backgroundColor: theme.colors.primary.mainBlue
  },

  secondaryButton: {
    color: "currentColor",
    border: "1px solid currentColor"
  },

  list: {
    border: `1px solid ${theme.colors.primary.lightGrey}`
  },

  inputAdornmentIcon: {
    fontSize: 16
  },

  marginRight: {
    marginRight: 20
  },

  chip: {
    margin: "0 8px 8px 0"
  },

  buttons: {
    marginTop: 20,
    marginBottom: 3
  },

  accountRowSelect: {
    marginTop: 0
  },

  accountRowSelectWrap: {
    marginRight: 24
  }
});
