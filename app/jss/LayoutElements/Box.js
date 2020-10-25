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
      width: '100%',
    },
    column: {
      flexDirection: 'column',
      height: '100%',
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
    justifyChildrenpaceEvenly: {
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
    inline: {
      display: 'inline-flex',
    },

    positionRelative: {
      position: 'relative',
    },
    positionAbsolute: {
      position: 'absolute',
    },
    positionFixed: {
      position: 'fixed',
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
      border: `1px solid ${theme.colors.primary.lightGrey}`,
    },
    borderSingle: {
      border: `0.5px solid ${theme.colors.primary.lightGrey}`,
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

  };
};
