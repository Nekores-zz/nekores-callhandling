export const styleSheet = theme => ({
  AssignedNumbersRowName: {
    position: "relative",
    cursor: "pointer",
    width: "fit-content",
    display: "inline",
    alignItems: "flex-start",
    height: 40
  },
  avatarIco: {
    color: theme.colors.primary.white,
    height: 40,
    width: 40
  },
  crossBtn: {
    color: theme.colors.secondary.lightBlue,
    fontSize: 22,
    marginRight: 11
  },
  plusBtn: {
    color: theme.colors.primary.darkGrey,
    fontSize: 22,
    marginRight: 11
  },
  selectNumbersChip: {
    height: 40,
    fontSize: 14,
    borderRadius: 50,
    margin: 15,
    marginBottom: 3
  }
});
