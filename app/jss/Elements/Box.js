export const stylesheet = (theme) => {
  let padding = 16;
  return {
    box: {
      display: 'flex',
    },
    container: {
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexWrap: 'nowrap',
    },
    row: {
      flexDirection: 'row',
    },
    column: {
      flexDirection: 'column',
    },
    justifyChildrenStart: {
      justifyContent: 'flex-start',
    },
    justifyChildrenEnd: {
      justifyContent: 'flex-end',
    },
    justifyChildrenCenter: {
      justifyContent: 'center',
    },
    justifyChildrenSpaceBetween: {
      justifyContent: 'space-between',
    },
    justifyChildrenpaceAround: {
      justifyContent: 'space-around',
    },
    justifyChildrenSpaceEvenly: {
      justifyContent: 'space-evenly',
    },
    alignChildrenStart: {
      alignItems: 'flex-start',
    },
    alignChildrenEnd: {
      alignItems: 'flex-end',
    },
    alignChildrenCenter: {
      alignItems: 'center',
    },
    alignChildrenStretch: {
      alignItems: 'stretch',
    },

    stretch: {
      flex: 1,
    },
    noStretch: {
      flex: 0,
    },
    wrap: {
      flexWrap: 'wrap',
    },
    nowrap: {
      flexWrap: 'nowrap',
    },

    alignStart: {
      alignSelf: 'flex-start',
    },
    alignEnd: {
      alignSelf: 'flex-end',
    },
    alignCenter: {
      alignSelf: 'center',
    },
    alignStretch: {
      alignSelf: 'stretch',
    },

    fullWidth: {
      width: '100%',
    },
    fullHeight: {
      height: '100%',
    },
    fill: {
      width: '100%',
      height: '100%',
    },

    background: {
      backgroundColor: theme.colors.primary.lightGrey,
    },
    backgroundPrimary: {
      backgroundColor: theme.colors.primary.mainBlue,
    },
    backgroundSecondary: {
      backgroundColor: theme.colors.primary.secondaryBlue,
    },
    backgroundAction: {
      backgroundColor: theme.colors.primary.actionGreen,
    },
    backgroundHighlight: {
      backgroundColor: theme.colors.primary.backgroundGrey,
    },

    borderHalf: {
      border: `0.5px solid ${theme.colors.primary.lightGrey}`,
    },
    borderTopHalf: {
      borderTop: `0.5px solid ${theme.colors.primary.lightGrey}`,
    },
    borderRightHalf: {
      borderRight: `0.5px solid ${theme.colors.primary.lightGrey}`,
    },
    borderLeftHalf: {
      borderLeft: `0.5px solid ${theme.colors.primary.lightGrey}`,
    },
    borderBottomHalf: {
      borderBottom: `0.5px solid ${theme.colors.primary.lightGrey}`,
    },
    border: {
      border: `1px solid ${theme.colors.primary.lightGrey}`,
    },
    borderTopNone: {
      borderTop: `none`,
    },
    borderBottomNone: {
      borderBottom: `none`,
    },
    borderTop: {
      borderTop: `1px solid ${theme.colors.primary.lightGrey}`,
    },
    borderRight: {
      borderRight: `1px solid ${theme.colors.primary.lightGrey}`,
    },
    borderBottom: {
      borderBottom: `1px solid ${theme.colors.primary.lightGrey}`,
    },
    borderLeft: {
      borderLeft: `1px solid ${theme.colors.primary.lightGrey}`,
    },
    borderDouble: {
      border: `2px solid ${theme.colors.primary.lightGrey}`,
    },
    borderDark: {
      borderColor: `${theme.colors.primary.lightGrey}`,
    },
    borderColorSecondary: {
      borderColor: theme.colors.primary.secondaryBlue,
    },
    borderWhite: {
      borderColor: theme.colors.primary.white,
    },

    roundCorners: {
      borderRadius: 3,
    },
    round: {
      borderRadius: '50%',
    },
    shadow: {
      boxShadow: '0 1px 4px rgba(0, 0, 0, .6)',
    },

    paddingDouble: {
      padding: 2 * padding,
    },
    padding: {
      padding: padding,
    },
    paddingHalf: {
      padding: padding / 2,
    },
    paddingNone: {
      padding: 0,
    },
    paddingTopDouble: {
      paddingTop: 2 * padding,
    },
    paddingTop: {
      paddingTop: padding,
    },
    paddingTopHalf: {
      paddingTop: padding / 2,
    },
    paddingRightQuad: {
      paddingRight: 4 * padding,
    },
    paddingRightDouble: {
      paddingRight: 2 * padding,
    },
    paddingRight: {
      paddingRight: padding,
    },
    paddingRightHalf: {
      paddingRight: padding / 2,
    },
    paddingRightNone: {
      paddingRight: 0,
    },
    paddingBottomDouble: {
      paddingBottom: 2 * padding,
    },
    paddingBottom: {
      paddingBottom: padding,
    },
    paddingBottomHalf: {
      paddingBottom: padding / 2,
    },
    paddingBottomNone: {
      paddingBottom: 0,
    },
    paddingLeftDouble: {
      paddingLeft: 2 * padding,
    },
    paddingLeft: {
      paddingLeft: padding,
    },
    paddingLeftHalf: {
      paddingLeft: padding / 2,
    },
    paddingLeftNone: {
      paddingLeft: 0,
    },

    fontSizeXS: {
      fontSize: 12,
    },
    fontSizeS: {
      fontSize: 14,
    },
    fontSizeM: {
      fontSize: 16,
    },
    fontSizeL: {
      fontSize: 20,
    },
    fontSizeXL: {
      fontSize: 24,
    },
    fontWeightMedium: {
      fontWeight: 600,
    },
    textDarkGrey: {
      color: theme.colors.primary.darkGrey,
    },
    textMediumGrey: {
      color: theme.colors.primary.mediumGrey,
    },
    textSecondary: {
      color: theme.colors.primary.secondaryBlue,
    },
    textWhite: {
      color: theme.colors.primary.white,
    },
    textBlack: {
      color: theme.colors.primary.black,
    },
    bold: {
      fontWeight: "bold",
    },
    italic: {
      fontStyle: 'italic',
    },
    uppercase: {
      textTransform: 'uppercase',
    },

    verticalScroll: {
      overflowY: 'auto',
    },
    noOverflow: {
      overflowY: 'hidden',
    },
    inline: {
      display: 'inline-flex',
    },
    absolute: {
      position: 'absolute',
    },
    top: {
      top: 0,
    },
    right: {
      right: 0,
    },
    bottom: {
      bottom: 0,
    },
    left: {
      left: 0,
    },
  };
};

