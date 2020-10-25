export const styleSheet = theme => ({
  //// style used by ServiceNameInput, ServiceDescriptionInput, ServiceTagsInput /////
  textField: {
    width: "96%",
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    }
  },

  //// ServiceDateIntervalInput style classes /////
  inputStartTime: {
    marginRight: "30px",
    [theme.breakpoints.only("xs")]: {
      width: "100%"
    }
  },
  inputEndTime: {
    marginRight: "30px",
    [theme.breakpoints.only("xs")]: {
      width: "100%",
      marginTop: "30px"
    }
  },
  asterisk: {
    color: theme.colors.primary.secondaryBlue
  },
  helperText: {
    color: theme.colors.primary.secondaryBlue
  },
  errorText: {
    color: theme.colors.primary.errorRed
  },
  underline: {
    "&:before": {
      borderBottom: `1px solid ${theme.colors.primary.lightGrey} !important`
    },
    "&:after": {
      borderBottom: `2px solid ${theme.colors.primary.secondaryBlue} !important`
    },
    "&:hover:before": {
      borderBottom: `2px solid ${theme.colors.primary.lightGrey} !important`
    }
  },
  label: {
    ...theme.typography.secondaryBody,
    textAlign: "left"
  },

  //// ServiceTemplateInput style classes ////
  templateGrid: {
    marginBottom: 30
  },
  templateItem: {
    width: "33%",
    [theme.breakpoints.only("sm")]: {
      width: "50%"
    },
    [theme.breakpoints.only("xs")]: {
      width: "100%"
    }
  },
  templatePaper: {
    textAlign: "left"
  },
  templateSelectedPaper: {
    border: "2px solid",
    borderColor: theme.colors.primary.secondaryBlue,
    textAlign: "left"
  },
  templateTitle: {
    ...theme.typography.headline,
    paddingRight: "15px",
    paddingLeft: "15px",
    paddingTop: "5px"
  },
  templateDesc: {
    paddingRight: "15px",
    paddingLeft: "15px",
    paddingTop: "1.5px",
    paddingBottom: "5px"
  },
  templateButtons: {
    textAlign: "right",
    height: "50px"
  },

  //// ServiceVersionInput style classes ////
  versionSelector: {
    width: "60%",
    [theme.breakpoints.only("xs")]: {
      width: "100%"
    }
  },
  versionSelectorPopover: {
    width: "100%"
  },
  versionSearch: {
    width: "100%",
    padding: 5,
    underlineStyle: {
      display: "none"
    }
  },

  listPanel: {
    maxHeight: "250px",
    overflow: "auto",
    overflowX: "hidden"
  },
  versionSearchIcon: {
    color: theme.colors.primary.mediumGrey
  },
  versionItem: {
    height: 60
  },
  versionAvatar: {
    marginRight: 16
  },
  versionLabel: {
    display: "block"
  },
  versionName: {
    ...theme.typography.primaryBody
  },
  versionTags: {
    ...theme.typography.secondarySmallBody
  },
  popover: {
    boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
    width: "50%",
    [theme.breakpoints.only("xs")]: {
      width: "100%"
    }
  },
  infoIcon: {
    color: theme.colors.primary.mediumGrey,
    marginBottom: -6
  },

  //// ServiceNumbersDisplay style classes ////
  numbersTable: {
    "&>thead": {
      backgroundColor: theme.colors.primary.mainBlue
    }
  },
  numbersHead: {
    ...theme.typography.subtitle,
    color: theme.colors.primary.white
  },
  numbersHideOnMobile: {
    [theme.breakpoints.only("xs")]: {
      display: "none"
    },
    [theme.breakpoints.only("sm")]: {
      display: "none"
    }
  },
  numbersCell: {
    ...theme.typography.subtitle,
    color: theme.colors.primary.darkGrey
  },
  numbersDoneCell: {
    ...theme.typography.subtitle,
    color: theme.colors.primary.darkGrey
  },
  numbersAvatarCell: {
    width: 40,
    paddingTop: 8,
    paddingBottom: 8
  },
  numbersAvatarCellHideOnMobile: {
    width: 40,
    paddingTop: 8,
    paddingBottom: 8,
    [theme.breakpoints.only("sm")]: {
      display: "none"
    },
    [theme.breakpoints.only("xs")]: {
      display: "none"
    }
  },
  numbersAvailableIcon: {
    color: theme.colors.primary.successGreen,
    paddingRight: 8,
    height: "0.7em"
  },
  numbersAvailableCell: {
    ...theme.typography.subtitle,
    color: theme.colors.primary.successGreen
  },
  numbersBasketIcon: {
    color: theme.colors.primary.darkGrey,
    paddingRight: 8,
    height: "0.7em"
  }
});
