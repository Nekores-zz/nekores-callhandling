export const styleSheet = theme => ({
  dialogPaper: {
    overflow: "hidden",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      height: "100%"
    }
  },

  expandedPanel: {
    marginTop: 0,
    marginBottom: 0
  },

  dialogContent: {
    overflowX: "hidden",
    overflowY: "auto"
  },

  dialogContentAnimating: {
    overflow: "hidden"
  },

  heading: {
    boxShadow: "none",
    backgroundColor: theme.colors.primary.lightGrey,
    position: "relative",
    padding: 24,
    [theme.breakpoints.down("sm")]: {
      padding: 0
    },
    [theme.breakpoints.up("md")]: {
      width: "820px"
    }
  },

  mobileMenu: {
    width: "100%",
    textAlign: "right",
    padding: 8
  },

  mobileHeader: {
    padding: 24
  },

  text: {
    ...theme.typography.headline
  },

  contentWrapper: {
    marginTop: 24,
    marginBottom: 24
  },

  contentText: {
    ...theme.typography.primaryBody,
    bottom: 10
  },

  expansionPanel: {
    marginLeft: -24,
    marginRight: -24,
    marginBottom: -24
  },

  summary: {
    ...theme.typography.primaryBody,
    color: theme.colors.primary.black,
    marginTop: 24,
    marginBottom: 24
  },

  isFavoriteOn: {
    cursor: "pointer",
    color: theme.colors.secondary.yellow
  },

  isFavoriteOff: {
    cursor: "pointer"
  },

  sectionTitleWrapper: {
    height: "56px",
    display: "flex",
    padding: "0 0 0 20px",
    boxSizing: "border-box",
    "&:hover": {
      cursor: "pointer"
    }
  },

  sectionTitleIcon: {
    alignSelf: "center",
    marginTop: "2px",
    marginRight: "20px",
    transition: "transform 0.2s linear",
    fill: "#8e8e8e",
    "&.open": {
      transform: "rotate(180deg)",
      transition: "transform 0.2s linear"
    }
  },

  sectionContent: {
    padding: "24px",
    marginLeft: "10px",
    marginRight: "10px"
  },

  sectionTitle: {
    ...theme.typography.subtitle,
    lineHeight: "56px",
    paddingLeft: "8px"
  },

  marginBottom: {
    marginBottom: 30
  },

  marginBottomLess: {
    marginBottom: 15
  },

  marginTop: {
    marginTop: 15
  },

  marginTopLess: {
    marginTop: 2
  },

  avatarList: {
    marginLeft: "-20px",
    marginTop: "-15px"
  },

  grid: {
    flexWrap: "nowrap",
    marginBottom: 20
  },

  gridRight: {
    flexShrink: 1
  },

  avatar: {
    width: 250,
    height: 250,
    [theme.breakpoints.down("sm")]: {
      width: 75,
      height: 75
    },
    marginTop: 8,
    marginRight: 16
  },

  pill: {
    ...theme.typography.secondaryBody,
    fontSize: 12
  },

  roleChipFix: {
    margin: 0
  },
  thumbnailIcon: {
    cursor: "pointer",
    fontSize: "80px",
    position: "relative",
    right: "12px",
    color: "black",
    top: "5px",
    transition: "0.2s all ease-in-out",
    "&:hover": {
      color: theme.colors.primary.darkGrey
    }
  }
});
