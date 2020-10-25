export const styleSheet = theme => ({
  include: {
    marginLeft: 32,
    [theme.breakpoints.only("sm")]: {
      marginLeft: 0
    },
    top: 20,
    marginBottom: 20
  },

  includeChipInput: {
    width: "100%"
  }
});
