export const styleSheet = theme => ({
  filters: {
    position: "relative",
    marginBottom: 20
  },

  clearAllButton: {
    position: "absolute",
    top: -46,
    right: 6,
    textAlign: "center",
    display: "block",
    padding: "6px 8px !important"
  },

  textField: {
    width: 220
  },

  sidemenuSubheader: {
    ...theme.typography.sectionHeaders,
    color: theme.colors.primary.black,
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    fontWeight: "bold"
  },

  filtersCheckbox: {
    width: 28,
    height: 28,
    marginLeft: 28
  },

  filtersCheckboxLabel: {
    color: theme.colors.primary.darkGrey
  },

  narrowCheckboxLabel: {
    color: theme.colors.primary.darkGrey,
    width: 72
  },

  narrowCheckboxGroup: {
    display: "inline"
  },

  formGroupSelect: {
    marginTop: -24,
    marginLeft: 20,
    marginBottom: 8,
    marginRight: 20
  },

  grayedOutSelectOption: {
    color: theme.colors.primary.softerGrey,
    fontSize: 16,
    marginTop: -1,
    marginBottom: -4,
    padding: 0
  },

  formGroupText: {
    marginTop: -8,
    marginLeft: 20,
    marginBottom: 8,
    marginRight: 20
  },

  chip: {
    margin: 4
  },

  chipArea: {
    paddingLeft: 12,
    paddingRight: 4
  },

  dateInputField: {
    marginLeft: 20,
    width: 220,
    marginBottom: 16,
    [theme.breakpoints.only("xs")]: {
      width: "100%"
    }
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

  asterisk: {
    color: theme.colors.primary.secondaryBlue
  },

  label: {
    ...theme.typography.secondaryBody,
    textAlign: "left"
  },

  searchableChipSelector: {
    marginLeft: 20,
    marginTop: -10
  },

  tagsPureText: {
    marginTop: -8,
    marginLeft: 8
  }
});
