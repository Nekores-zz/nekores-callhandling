export const styleSheet = theme => ({
  root: {
    position: "relative",
    cursor: "text"
  },

  value: {
    lineHeight: "32px",
    textAlign: "left"
  },

  label: {
    fontSize: "12px",
    color: theme.colors.primary.mediumGrey,
    marginBottom: "4px"
  },

  placeholder: {
    paddingBottom: 7,
    textAlign: "left",
    ...theme.typography.secondaryBody
  },

  underline: {
    left: 0,
    right: 0,
    bottom: 0,
    height: 1,
    position: "absolute",
    transition: "background-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    backgroundColor: theme.colors.primary.lightGrey
  },

  hoverUnderline: {
    height: 2
  },

  inputAdornment: {
    float: "right",
    marginTop: 20
  }
});
