export const styleSheet = theme => ({

    root:{
      position: 'relative',
      top: '8px',
      left: '8px',
      width: '100%',
    },
    checked:{
      color: 'blue',
      color: theme.colors.primary.secondaryBlue,
    },

    helper:{
      width:'73%',
      position: 'relative',
      left: '34px',
      bottom: '17px',
      fontSize: '13px',
     ...theme.secondarySmallBody,
     '@media only screen and (max-width : 662px)': {
        lineHeight: 1.5
     },

   },
   sectionChipField:{
     marginTop: 23,
     height: 92,
     marginTop: '-6.1px'
   },
    accountDiv:{
      position: 'relative',
      right: '1px',
      marginTop: '-8px',
    },
    chipFields:{
      width: '90%',
    },
    label:{
        color: theme.colors.primary.darkGrey
    },
  lowerWrapper:{
    marginTop: '16px',
    marginBottom: '12px',
  }

});
