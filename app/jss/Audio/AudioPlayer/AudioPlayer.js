export const audioPlayerButtonStylesheet = theme => ({
  root: {
    backgroundColor: theme.colors.primary.secondaryBlue,
    color: theme.colors.primary.white,
    "&:hover": {
      backgroundColor: theme.colors.primary.secondaryBlue,
      color: theme.colors.primary.white,
      opacity: 0.87
    }
  }
  // hover: {
  // 	backgroundColor: theme.colors.primary.secondaryBlue,
  // 	color: theme.colors.primary.white,
  // 	opacity: 0.87,
  // },
});

export const playbackPositionStylesheet = theme => ({
  container: {
    width: "100%",
    minWidth: 200
  }
});

export const recordIconStylesheet = theme => ({
  root: {
    backgroundColor: theme.colors.primary.secondaryBlue,
    color: theme.colors.primary.white,
    borderRadius: "50%"
  }
});

export const miniAudioPlayerStylesheet = theme => ({
  icon: {
    paddingRight: 8,
    fontSize: "24px",
    marginRight: "8px",
    marginBottom: "-6px",
    cursor: "pointer",
  },

  completeLabel: {
    fontSize: 16,
    whiteSpace: "nowrap",
    textTransform: "capitalize",
    color: theme.colors.primary.secondaryBlue,
    textTransform: "uppercase"
  },

  progress: {
    position: "relative",
    top: -6,
    height: "24px !important",
    width: "calc(100% - 32px) !important",
    color: theme.colors.primary.secondaryBlue
  }
});
