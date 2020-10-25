export const styleSheet = theme => ({
  searchbarWrapper: {
    display: 'flex',
    flex: '1',
    height: '48px',
    // marginRight: '100px',
    [theme.breakpoints.down('md')]: {
       marginRight: 0
    },
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  formControl: {
    background: 'rgba(255, 255, 255, 0.24)',
    height: '48px',
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: '4px',
    [theme.breakpoints.down('md')]: {
      backgroundColor: theme.colors.primary.white,
      position: 'absolute',
      width: 'calc(100% - 10px)',
      left: '5px',
      zIndex: 20,
      '&.mobileHide': {
        display: 'none'
      }
    },
  },
  searchbarMobileToggle: {
    display: 'none',
    '&:hover': {
      cursor: 'pointer'
    },
    [theme.breakpoints.down('md')]: {
      display: 'block'
    }
  },
  input: {
    borderRadius: '4px',
    padding: '0 14px',
    height: '100%',
    color: theme.colors.primary.white,
    transition: 'background 0.1s linear, color 0.2s linear',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      color: theme.colors.primary.black,
    },

  },
  inputFocused: {
    color: theme.colors.primary.black,
    background: theme.colors.primary.white,
    transition: 'background 0.1s linear, color 0.2s linear',
    '& .searchIcon': {
      color: theme.colors.primary.mediumGrey,
    },

  },
  searchIcon: {
    alignSelf: 'center',
  },
  searchIconAdornment: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  closeSearchIconAdornment: {
    display: 'none',
    [theme.breakpoints.down('md')]: {
      display: 'inline'
    },

  },
  placeholder:{
  
  },
  clearIcon: {
    alignSelf: 'center',
    '&:hover': {
      cursor: 'pointer'
    },
  }
});
