export const styleSheet = theme => ({
  checkbox: {
    width: 40,
    height: 40
  },

  filters: {
    position: "relative",
    marginBottom: 20
  },

  sort: {
    marginBottom: 20
  },

  clearAllButton: {
    position: "absolute",
    top: -56,
    right: 0
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

  listCounterButton: {
    width: "100%",
    justifyContent: "flex-start",
    //marginBottom: 10,
    //marginTop: 10,
    paddingTop: 16,
    paddingBottom: 16
  },

  formGroupSelect: {
    marginTop: -24,
    marginLeft: 20,
    marginBottom: 8,
    marginRight: 20
  },

  grayedOutSelectOption: {
    color: "#A1A1A1",
    fontSize: "16px",
    marginTop: -1,
    marginBottom: -4,
    padding: 0
  },

  formGroupInput: {
    marginTop: -8,
    marginLeft: 20,
    marginBottom: 8,
    marginRight: 20
  },

  formGroupLastOpenedBy: {
    marginTop: -20,
    marginLeft: 20,
    marginBottom: 8,
    marginRight: 20
  },

  listSelectedOption: {
    background: theme.colors.primary.mainBlue
  },

  listSelectedCounterButton: {
    width: "100%",
    justifyContent: "flex-start",
    //marginBottom: 10,
    //marginTop: 10,
    paddingTop: 16,
    paddingBottom: 16,
    color: theme.colors.primary.white
  }
});
