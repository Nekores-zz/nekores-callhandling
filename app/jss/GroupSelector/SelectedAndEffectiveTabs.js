export const styleSheet = theme => ({
  clearAllBtn: {
    color: theme.colors.primary.white,
    backgroundColor: theme.colors.primary.mainBlue,
    "&:disabled": {
      color: theme.colors.primary.mainBlue,
      backgroundColor: theme.colors.primary.mainBlue
    }
  },

  roleRow: {
    height: 60
  },

  listHeaderLight: {
    backgroundColor: theme.colors.primary.backgroundGrey,
    color: theme.colors.primary.black
  },

  grayToolbar: {
    backgroundColor: theme.colors.primary.backgroundGrey,
    ...theme.typography.primaryBody
  },

  listPaper: {
    flex: 1,
    alignSelf: "stretch",
    justifySelf: "stretch",
    boxShadow: "none",
    border: "1px solid",
    borderRadius: 0,
    borderColor: theme.colors.primary.lightGrey
  },

  paperGrid: {
    height: 360
  },

  compact: {
    height: 260
  },

  stretch: {
    height: "calc(90vh - 255px)"
  },

  stretch2: {
    height: "calc(90vh - 372px)"
  },

  rolesHeader: {
    paddingLeft: 24,
    paddingRight: 24,
    height: 64,
    backgroundColor: theme.colors.primary.mainBlue,
    color: theme.colors.primary.white
  },

  effectiveRolesHeader: {
    backgroundColor: theme.colors.primary.secondaryBlue
  },

  list: {
    flex: 1,
    overflowY: "auto"
  },

  effectiveRolesList: {
    backgroundColor: theme.colors.primary.backgroundGrey
  },

  icon: {
    width: 28,
    height: 28,
    fontSize: 14
  },

  tabEffectiveHeader: {
    height: 64,
    backgroundColor: theme.colors.primary.secondaryBlue,
    color: theme.colors.primary.white
  },

  tabSelectedHeader: {
    height: 64,
    backgroundColor: theme.colors.primary.mainBlue,
    color: theme.colors.primary.white
  },

  indicator: {
    backgroundColor: theme.colors.primary.white,
    height: 4
  },

  tabLabel: {
    fontSize: 16,
    textTransform: "none",
    height: 64,
    width: 210
  }
});
