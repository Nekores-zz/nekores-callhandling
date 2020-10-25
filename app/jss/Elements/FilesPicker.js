export const dropAreaStylesheet = (theme) => ({

  dashedBorder: {
    border: `1px dashed ${theme.colors.primary.lightGrey}`,
  },

});

export const verticalPickerStylesheet = (theme) => ({

  label: {
    color: "rgba(0, 0, 0, 0.47)"
  },

  icon: {
    color: "rgba(0, 0, 0, 0.47)"
  },

  italic: {
    fontStyle: "italic",
  },

});

export const horizontalPickerStylesheet = (theme) => ({

  label: {
    color: "rgba(0, 0, 0, 0.47)"
  },

  icon: {
    color: "rgba(0, 0, 0, 0.47)"
  },

  italic: {
    fontStyle: "italic",
  },

});

export const filesPickerStylesheet = (theme) => ({

  fileInput: {
    width: 0,
    height: 0,
    opacity: 0,
    zIndex: -1,
  },

});

// export const styleSheet = theme => ({
//   outer: {
//     border: `1px dashed ${theme.colors.primary.lightGrey}`,
//     padding: 8
//   },

//   container: {
//     border: `2px solid ${theme.colors.primary.lightGrey}`,
//     padding: 8,
//     color: "rgba(0, 0, 0, 0.47)"
//   },

//   dragOver: {
//     border: `1px dashed ${theme.colors.primary.lightGrey}`,
//     color: "rgba(0, 0, 0, 0.87)"
//   },

//   browseButton: {
//     ...theme.buttons.default,
//     ...theme.buttons.secondaryTextLink,
//     color: theme.colors.primary.darkGrey,
//     border: `1px solid ${theme.colors.primary.darkGrey}`,
//     "&:hover": {
//       color: theme.colors.primary.black,
//       border: `1px solid ${theme.colors.primary.black}`
//     }
//   },

//   or: {
//     fontStyle: "italic",
//     lineHeight: "1.5"
//   },

//   uploadIcon: {
//     fontSize: 30,
//     verticalAlign: "middle",
//     marginRight: 8
//   },

//   uploadIconV: {
//     fontSize: 50,
//     verticalAlign: "middle",
//     marginRight: 8
//   },

//   fileInput: {
//     opacity: 0,
//     zIndex: -1,
//     position: "absolute"
//   },

//   verticalLine: {
//     width: 1,
//     height: 20,
//     backgroundColor: theme.colors.primary.lightGrey,
//     marginLeft: "auto",
//     marginRight: "auto"
//   },

//   horizontalLine: {
//     width: 80,
//     height: 1,
//     backgroundColor: theme.colors.primary.lightGrey,
//     marginLeft: "12px",
//     marginRight: "12px",
//     marginTop: "12px"
//   },

//   horizontal: {
//     display: "flex"
//   },

//   mobile: {
//     marginBottom: 20
//   }
// });
