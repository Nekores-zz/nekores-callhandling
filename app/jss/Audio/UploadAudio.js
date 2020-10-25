import { relative } from "path";

export const styleSheet = theme => ({
  createNewSet: {
    marginLeft: -10
  },

  tooltipOverridden: {
    padding: theme.spacing.unit * 2,
    fontSize: "1em"
  },

  audioButtonsContainer: {
    // marginTop: theme.spacing.unit * 2,
  },

  audioOptions: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    "&:first-child": {
      paddingLeft: 0
    },
    "&:last-child": {
      paddingRight: 0
    }
  },

  audioOption: {
    paddingLeft: theme.spacing.unit * 2,
    background: theme.colors.primary.lightGrey
  },

  audioButtonPanels: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },

  singleFileButton: {
    border: `0.5px solid ${theme.colors.primary.lightGrey}`,
    cursor: "pointer",
    "&:hover": {
      border: `0.5px solid ${theme.colors.primary.secondaryBlue}`
    }
  },

  iconContainer: {
    position: "relative"
  },

  information: {
    cursor: "pointer",
    // paddingTop: 6,
    paddingLeft: 8,
    position: "relative",
    top: 3
  },

  mark: {
    background: "white",
    zIndex: 10,
    position: "absolute",
    left: "calc(50% + 10px)",
    top: 2
  },

  typeClass: {
    fontSize: "0.8em",
    position: "relative",
    bottom: -4
  },

  typeIconClass: {
    marginRight: 2,
    marginLeft: theme.spacing.unit * 2,
    position: "relative",
    bottom: -4
  },

  fileName: {
    fontSize: "1.2em",
    fontWeight: 600
  },

  playPauseButton: {
    marginTop: "auto",
    marginBottom: "auto"
  },

  uploadFileListHeader: {
    position: "relative",
    background: theme.colors.primary.secondaryBlue,
    color: theme.colors.primary.white,
    border: `1px solid ${theme.colors.primary.secondaryBlue}`
  },

  uploadFileListHeaderText: {
    color: "white"
  },

  uploadFileListSelect: {
    width: 200
  },

  checkboxIcon: {
    marginLeft: -4
  },

  noFilesAdded: {
    fontWeight: 400,
    fontStyle: "italic",
    color: theme.colors.primary.mediumGrey,
    height: 50,
    lineHeight: "50px"
  },

  mediumIcon: {
    fontSize: "1.2em",
    width: "40px",
    height: "40px",
    lineHeight: "40px"
  },

  circularProgress: {
    color: theme.colors.primary.secondaryBlue
  },

  searchBar: {
    height: 36
  },

  audioFileRowsWrapper: {
    maxHeight: 600,
    overflowY: "scroll"
  },

  audioFileRowWrapper: {
    width: "100%"
  },

  audioFileRowHoverWrapper: {
    background: "#eee"
  },

  searchResult: {
    background: "#eee",
    color: theme.colors.primary.mediumGrey
  },

  overridenText: {
    fontSize: "1em",
    marginLeft: -16
  },

  rowFileName: {
    textOverflow: "ellipsis",
    overflow: "hidden",
    width: "250px",
  },

  miniProgress: {
    position: "relative",
    top: -3,
    height: "24px !important",
    color: theme.colors.primary.secondaryBlue,
    minWidth: "200px",
  },

  singleProgress: {
    position: "relative",
    top: -24,
    height: "0px !important",
    color: theme.colors.primary.secondaryBlue,
  }
});

export const largeMainIconStylesheet = theme => ({
  root: {
    fontSize: "1.5em",
    width: "60px",
    height: "60px",
    textAlign: "center",
    lineHeight: "60px",
    backgroundColor: theme.colors.primary.secondaryBlue,
    color: theme.colors.primary.white,
    borderRadius: "50%"
  }
});
