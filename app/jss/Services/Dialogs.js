export const styleSheet = theme => ({
  wideDialogPanel: {
    width: 650,
    paddingLeft: 50
  },

  wideDialogElement: {
    width: 544,
    marginBottom: 20
  },

  wideDialogTitle: {
    padding: 40,
    paddingLeft: 50
  },
  onConfirmPara: {
    color: theme.colors.primary.errorRed,
    fontSize: 16
  },

  wideDialogButtons: {
    padding: 40,
    paddingRight: 50,
    paddingLeft: 50,
    marginBottom: 40
  },

  buttons: {
    paddingRight: 24,
    marginBottom: 24
  },

  versionItem: {
    paddingTop: 4,
    height: 80,
    width: "100%",
    display: "table-cell",
    verticalAlign: "middle"
  },

  versionAvatar: {
    marginRight: 16,
    display: "inline-grid",
    verticalAlign: "top"
  },

  versionLabel: {
    display: "inline-grid"
  },

  versionName: {
    ...theme.typography.primaryBody
  },

  versionTags: {
    ...theme.typography.secondarySmallBody
  }
});
