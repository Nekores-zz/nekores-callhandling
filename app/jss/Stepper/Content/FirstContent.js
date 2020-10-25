export const styleSheet = theme => ({
    excludeChipInput: {
      width: 400,
      [theme.breakpoints.only("xs")]: {
        width: "100%"
      }
    },

    rangeWrapper:{
      position: 'relative',
    },
    rangeContainer:{
      position: 'relative',
      right: '15px',
      bottom: '5px',
      marginBottom: '23px',

    },
    formControl: {
      width: '93%',
    },
    firstControl:{
       position: 'relative',
       left: '12px',
    },
   chipInputWrapper:{
     overflow: 'auto'
   },

    secondControl:{
      position: 'relative',
      left: '12px',
      marginLeft: '12px',
      marginRight: '32px',
      [theme.breakpoints.only('xs')]: {
         marginLeft: 0,
         marginRight: 0,
      },
    },
    checkBox:{
      position: 'relative',
      marginTop: '22px',
    },
    chip:{
    color: theme.colors.primary.mediumGrey,
    bottom: '9px',
    marginTop: '12px',
    marginRight: '5px',
     height: '32px',
     position: 'relative',

    },

    input:{
      marginBottom: '-3px',
      fontSize: '15px',
    },
        inputContainer:{
          position: 'relative',
          top: '5px',
          width:'112px',

          lineHeight: '12px',
          [theme.breakpoints.only('xs')]: {
            marginRight: 12,
            marginBottom: '12px'
          },
          [theme.breakpoints.down('xs')]: {
            marginRight: 12,
            marginBottom: '12px'
          },


        },

        deleteIcon:{
          color: theme.colors.primary.darkGrey,
        },
        textField:{
          width: '272px',
          position: 'relative',
          bottom: '3px',
          marginBottom: '11px',
          [theme.breakpoints.only('xs')]: {
             width: '98%',
          },

        },
        textFielddiv:{
          width: '100%',
        },
        checked:{
           color: theme.colors.primary.secondaryBlue
        },
        checkDiv:{
            position: 'relative',
           paddingRight: '7.5%',

            [theme.breakpoints.only('xs')]: {
               paddingRight: 4,
            },

       },
        label: {
          color: theme.colors.primary.darkGrey,
        fontWeight: 300,
          fontSize: '15px',
          position: 'relative',
          right: '2px',

        },
        field:{
          position: 'relative',
          left: '32px',
          bottom: '5px',
          [theme.breakpoints.only('xs')]: {
             left: 0,
          },
        },
        menuList:{
          position: 'relative',
          bottom: '5px',
        },
        fcontrolWrap:{
           textAlign: 'left',
           width: 'auto',
        },
        formGrp:{
           position: 'relative',

        },
        checkBoxes:{
          display: 'inline-block',
          position: 'relative',
          marginLeft: '10px',
          [theme.breakpoints.only('sm')]: {
             marginLeft: 0,
          },
          top: '21px',
        },
        divform:{
          marginLeft: '12px',
          marginBottom: '-12px',
        },
        exclude:{
          position: 'relative',
          paddingRight: '7.5%',
          left: '12px',
          marginTop: '26px',
          marginBottom: '-3px',
         paddingRight: '7.5%',
          [theme.breakpoints.only('xs')]: {
              paddingRight: 8,
          },
          [theme.breakpoints.only('sm')]: {
             marginRight: -1
          },
          '@media only screen \
      and (min-width: 600px)\
      and (max-width : 690px)': {
          paddingRight:'6vw',
      },
    },

    fromRange:{
      display: 'inline',
      position: 'relative',
      left: '34px',
      [theme.breakpoints.only('xs')]: {
         position: 'relative',
         left: 6
      },

      [theme.breakpoints.only('lg')]: {
         width: '102%',
      },
    },

    new:{
      position: 'relative',
      bottom: '9px',
      marginTop: '5px',
      width: '66%',
      [theme.breakpoints.only('xs')]: {
         width: '100%',
      },
      '@media only screen and (min-width : 550px)': {
          width: '66%'
      },
      [theme.breakpoints.only('sm')]: {

         width: '66%',
      },
      marginBottom: '5px',
    },

    divtxt:{
      position: 'relative',
      top: '12px',
      marginBottom: '9px',
    },
    band:{
      width: '55.6%',
      positon: 'relative',
      left: '37px',
      bottom: 31,

      '@media only screen and (max-width : 550px)': {
     width: '82%'
      },
    },
    padding:{
        padding: 0
      },
      chipInput:{
      position: 'relative',
      marginTop: '-2px',
      display: 'flex',
      flexWrap: 'wrap',
      overflow: 'hidden',
      },
      chipContainer:{
       display: 'flex',
       flexWrap: 'wrap',
       marginBottom: '-2px',
        overflow: 'hidden',
      },

      inputRoot:{
      width: '12px',
      marginTop: '6px',
      },
      chip:{
      marginTop: '5px',
      }
});
