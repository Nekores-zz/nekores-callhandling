import { relative } from "path";

export const styleSheet = theme => ({
  root: {
    position: "relative",
    top: 0,
    margin: "auto",
    width: "90%",
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    },
    maxWidth: "1200px",
    minWidth: "339px",
    padding: 0
  },

  formControl: {
    width: "40%",
    //  marginTop: theme.spacing.unit,
    marginBottom: 26
  },

  formControlCompanyD: {
    width: "75%"
  },

  heading: {
    fontSize: theme.typography.pxToRem(16),
    fontWeight: "bold",
    height: "40px",
    display: "flex",
    alignItems: "center"
  },

  expansionPanelSummary: {
    minHeight: "72px",
    alignItems: "center",
    "&>div": {
      alignItems: "center"
    }
  },

  doneIcon: {
    margin: 0,
    color: theme.colors.primary.white,
    backgroundColor: theme.colors.primary.successGreen,
    float: "right"
  },

  companySelect: {
    top: "177px",
    width: "75%"
  },

  column: {
    width: "50%",
    alignItems: "center",
    height: "40px",
    display: "table"
  },

  number: {
    marginRight: 18
  },

  asterisk: {
    color: theme.colors.primary.mainBlue
  },

  textField: {
    width: "100%",
    marginTop: 29
  },

  ensureSelectField: {
    width: 140,
    marginTop: -16
  },

  ensureTextField: {
    width: 140,
    // marginTop: -16
    top: -8,
    [theme.breakpoints.down('sm')]: {
      width: 240,
    }
  },

  ensureTextFieldWithLabel: {
    width: 140,
    [theme.breakpoints.down('sm')]: {
      width: 240,
      top: 15,
      left: 34,
    }
  },

  numberInputWrapper: {
    display: "flex",
    flexDirection: "row",
    left: -14,
    marginRight: 6,
    paddingBottom: 8,
  },

  ensureTextSpecialField: {
    width: 200,
    marginTop: -8,
    [theme.breakpoints.down('sm')]: {
      width: 240,
      left: 32,
    },
  },

  ensureFormSpecialControl: {
    paddingRight: 4,
    paddingBottom: 16,
  },

  ensureFormControl: {
    paddingRight: 4,
    paddingBottom: 16
  },

  enforceSelectField: {
    width: 100
  },

  helperText: {
    marginLeft: 35
  },

  helperTextLabel: {
    top: 16,
    position: "relative",
  },

  errorHelperText: {
    marginLeft: 35,
    position: 'relative',
    top: -16,
    color: `${theme.colors.primary.errorRed} !important`,
    width: 140,
    wordWrap: 'break-word',
    [theme.breakpoints.down('sm')]: {
      width: 240,
    },
  },

  errorHelperTextWithLabel: {
    position: 'relative',
    color: `${theme.colors.primary.errorRed} !important`,
    width: "100%",
    wordWrap: 'break-word',
    top: 12,
    left: 34,
    [theme.breakpoints.down('sm')]: {
      width: 240,
    },
  },

  errorSpecialHelperText: {
    position: 'relative',
    top: -16,
    color: `${theme.colors.primary.errorRed} !important`,
    width: 176,
    wordWrap: 'break-word',
    [theme.breakpoints.down('sm')]: {
      width: 240,
      left: 32,
    },
  },

  gridMargin: {
    marginTop: -4,
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      width: "22px"
    }
  },

  addressLines: {
    position: "relative",
    bottom: 16,
    marginBottom: 16
  },

  gridMarginBottom: {
    marginBottom: 42
  },

  gridUsersMargin: {
    marginBottom: 22
  },

  internalForm: {
    width: "100%",
    display: "block"
  },

  buttons: {
    marginTop: 30,
    marginBottom: 10,
    [theme.breakpoints.down("sm")]: {
      width: "90%",
      marginLeft: "5%"
    }
  },

  internalButtons: {
    width: "100%",
    height: 38,
    marginTop: 15,
    marginBottom: 15
  },

  pageContent: {
    flex: 1,
    maxWidth: 1200,
    marginLeft: "auto",
    marginRight: "auto",
    [theme.breakpoints.down("sm")]: {
      margin: 0,
      overflow: "hidden"
    }
  },

  btnPanel: {
    display: "flex",
    justifyContent: "flex-end"
  },

  save: {
    ...theme.buttons.action
  },

  btnCancel: {
    marginRight: 15,
    [theme.breakpoints.only("xs")]: {
      marginRight: 10
    },
    float: "right"
  },

  parentDomain: {
    color: "black",
    fontWeight: 500,
    fontSize: 15,
    marginBottom: -2
  },

  btnSubmit: {
    float: "right"
  },

  formInput: {
    width: "100%",
    margin: "auto",
    marginLeft: 56,
    marginRight: 16,
    position: "relative",
    bottom: 22
  },

  usersform: {
    marginLeft: 60,
    marginRight: 25,
    position: "relative",
    top: 1
  },

  textFieldWrapper: {
    display: "flex",
    justifyContent: "space-between"
  },

  addCosts: {
    fontSize: 14,
    marginTop: 12
  },

  wrapper: {
    width: "100%",
    top: 32,
    margin: 0,
    marginBottom: 32,
    display: "flex",
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      top: 0,
      bottom: 0
    }
  },

  helper: {
    display: "flex",
    marginBottom: "-16px"
  },

  textHelperDone: {
    fontSize: "0.875rem",
    color: theme.colors.secondary.darkGreen
  },

  textHelperClose: {
    color: theme.colors.primary.errorRed
  },

  avatarHelperAc: {
    height: 13,
    width: 13,
    marginRight: 5,
    position: "relative",
    top: 3
  },

  colorDoneIcon: {
    background: theme.colors.secondary.darkGreen
  },

  colorCloseIcon: {
    background: theme.colors.primary.errorRed
  },

  iconHelper: {
    fontSize: 9
  },

  colorText: {
    color: theme.colors.primary.errorRed
  },

  colorTextDone: {
    color: theme.colors.secondary.darkGreen
  },

  companyDetailsLeft: {
    display: "flex",
    flexDirection: "column",
    width: "100%"
  },

  companyDetailsRight: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    alignItems: "flex-end",
    position: "relative"
  },

  primaryTextBtnRight: {
    marginRight: "-16px"
  },

  primaryTextBtnLeft: {
    marginRight: "77px"
  },

  icon: {
    display: "none"
  },

  selectMenu: {
    height: 70
  },

  formControlPricing: {
    width: "100%"
  },

  addressBtn: {
    position: "relative",
    bottom: 22
  },

  creditBox: {
    display: "flex",
    borderRight: "1px solid lightgrey",
    paddingRight: 32,
    marginRight: "6px",
    position: "relative"
  },

  gridItemCredit: {
    display: "flex",
    background: "rgb(247,247,247)",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column"
    }
  },

  captionCredit: {
    fontSize: 12,
    marginBottom: 3,
    [theme.breakpoints.down("sm")]: {
      marginBottom: 3
    }
  },

  typeCredit: {
    fontSize: 16,
    color: "#595959"
  },

  gridItemCreditInner: {
    color: "#595959",
    position: "relative",
    top: "13px",
    fontSize: 16
  },

  gridPricingRoot: {
    position: "relative",
    top: 22,
    width: "101%",
    marginLeft: "-4px",
    marginBottom: 28
  },

  creditLimitInner: {
    position: "relative",
    top: "4px"
  },

  inputError: {
    color: "red"
  },

  underline: {
    width: "146px",
    "&:after": {
      backgroundColor: "red"
    }
  },

  creditDetails: {
    minWidth: "16%",
    borderLeft: "1px solid lightgrey",
    display: "flex",
    flexDirection: "column",
    paddingLeft: 15,
    marginBottom: 10,
    marginTop: 10,
    [theme.breakpoints.down("sm")]: {
      borderLeft: "none",
      borderBottom: "1px solid lightgrey",
      marginRight: 12,
      marginLeft: 12
    }
  },

  creditInner: {
    position: "relative",
    top: 7,
    [theme.breakpoints.down("sm")]: {
      marginBottom: 12
    }
  },

  prepay: {
    background: "rgb(232,234,246)",
    width: "100%",
    marginBottom: 12,
    marginTop: 5
  },

  prepayLabel: {
    background: "rgb(232,234,246)",
    paddingLeft: 15
  },

  creditCheck: {
    position: "relative",
    bottom: 10,
    [theme.breakpoints.down("sm")]: {
      top: 12,
      bottom: 0
    }
  },

  labelCredit: {
    marginBottom: 4,
    marginRight: 12
  },

  savePrice: {
    marginTop: 4,
    position: "relative",
    top: 12
  },

  gridUsers: {
    width: "100%",
    // border: "1px solid lightgrey",
    // borderLeft: "none",
    // borderRight: "none",
    display: "flex",
    padding: 15
  },

  divider: {
    width: "100%"
  },

  typographyWrapper: {
    marginLeft: 20
  },

  usersClose: {
    position: "absolute",
    right: 0
  },

  actdel: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between"
  },

  yourPlan: {
    width: "100%",
    position: "relative",
    marginBottom: "-12px"
  },

  changePlan: {
    float: "right",
    position: "relative",
    right: "-17px"
  },

  wrapperPricing: {
    display: "flex",
    flexDirection: "column",
    width: "100%"
  },

  yourPlanB: {
    width: "100%",
    position: "relative",
    marginBottom: "-12px"
  },

  customisePlan: {
    position: "absolute",
    right: "-14px"
  },

  btnPlanMargin: {
    marginTop: 44
  },

  customisePlanDiv: {
    width: "100%",
    position: "relative"
  },

  iconDone: {
    color: "white"
  },

  rightItemWidth: {
    width: "100%"
  },

  postZipCode: {
    display: "flex",
    position: "relative",
    justifyContent: "space-between"
  },

  regularExpression: {
    marginTop: 16,
    width: 250
  },

  regularExpressionRemove: {
    marginTop: 24,
    marginLeft: -32,
    marginBottom: -24
  },

  regularExpressionAdd: {
    marginTop: 16,
    width: 250,
    textAlign: "right"
  },

  regularExpressionAddBtn: {
    marginRight: -16
  },

  typographyCredit: {
    fontSize: "16px",
    color: "#595959",
    position: "relative",
    bottom: 4
  },

  locationOn: {
    color: theme.colors.primary.mediumGrey,
    position: "relative",
    right: 2,
    marginRight: 5
  },

  ellipsisAddress: {
    color: theme.colors.primary.darkGrey,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },

  primaryBtnZip: {
    position: "relative",
    left: 8
  },

  addressDialogSelect: {
    width: "100%",
    maxHeight: "285px"
  },

  primaryBtnZipLeft: {
    position: "relative",
    right: 8
  },

  checkbox: {
    height: "100%",
  },

  checkboxWithText: {
    height: 48,
  },

  label: {
    fontSize: 16,
    width: "200%",
    color: "#595959",
    [theme.breakpoints.down('sm')]: {
      width: "100%",
    },
  },

  labelWrapper: {
    position: "relative",
    top: "12px",
  },

  complexityLabel: {
    fontSize: 16,
    width: "200%",
    color: "#595959",
    top: 5,
    position: "relative",
    [theme.breakpoints.down('sm')]: {
      width: "100%",
    },
  },

  creditContainer: {
    borderRight: "1px solid lightgrey",
    display: "flex",
    flexDirection: "column",
    marginRight: 14,
    [theme.breakpoints.down("sm")]: {
      margin: 0,
      marginBottom: 12,
      borderBottom: "1px solid lightgrey",
      border: "none"
    }
  },

  credit: {
    position: "relative",
    right: 10,
    display: "flex",
    marginRight: 30
  },

  currentLimit: {
    marginRight: 14,
    paddingRight: 33,
    paddingTop: 6,
    borderRight: "1px solid lightgrey",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      margin: "none",
      paddingTop: 0,
      border: "none",
      marginBottom: 12,
      marginRight: 0,
      borderBottom: "1px solid lightgrey"
    }
  },

  total: {
    marginRight: 12,
    paddingTop: 3,
    [theme.breakpoints.down("sm")]: {
      paddingTop: 0
    }
  },

  creditLimit: {
    borderLeft: "1px solid lightgrey",
    paddingTop: 6,
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      margin: 0,
      padding: 0,
      border: "none",
      paddingTop: 12,
      borderTop: "1px solid lightgrey",
      marginTop: 3
    },
    marginLeft: 14,
    paddingLeft: 14
  },

  remainPadding: {
    paddingTop: 3,
    color: "#595959",
    fontSize: 16
  },

  gridSetup: {
    display: "flex",
    paddingRight: 22,
    paddingLeft: 22,
    flexDirection: "column"
  },

  paper: {
    minWidth: 300,
    maxWidth: 700,
    [theme.breakpoints.down("sm")]: {
      maxWidth: 400
    }
  },

  menu: {
    maxHeight: 12,
    height: 12,
    position: "relative",
    top: 12
  },

  createSuperUser: {
    marginTop: 37
  }
});
