export const styleSheet = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    fontWeight: 500,
    position: 'relative',
    right: 8
  },
  dialog:{
    border: '1px solid black',
  },
  paper:{
    width: '40%',
    maxWidth: 652,
    minHeight: '12vh',
    overflowY: 'auto',
    overflowX: 'hidden',
    maxHeight: '100vh',
    //marginTop: 93,
    [theme.breakpoints.down("xs")]: {
      minWidth: '93%'
    },
    [theme.breakpoints.only("sm")]: {
      minWidth: '90%'
    },
    [theme.breakpoints.only("md")]: {
      minWidth: '50%'
    }
  },
  dialogTitleWrapper:{
      background:theme.colors.primary.mainBlue,
      position: 'relative',
      height: 70,
      marginLeft: '-5px'
  },
  underline:{
    width: '85%',
    [theme.breakpoints.up("md")]: {
      width: '90%'
    }
  },
  gridWrapper:{
      margin: 'auto',
      marginTop: 11,
      marginBottom: 2,
     // minHeight: 265
  },
  formControl:{
     marginBottom: 12,
  },
  innerPanelText:{
      position: 'relative',
       right: 8
  },
  exPanel:{
      padding: 8,
      paddingRight: 1
  },
  expandIcon:{
    position: 'relative',
    left: 12
  },
  input:{
    backgroundColor: theme.colors.primary.mainBlue,
    color: 'white',
    outline: 'none',
    border: 'none',
  
    width: '88%',
    fontSize: 16,
    '&::placeholder': {
     color: 'white'
   },
  },

  clearIcon:{
     color: 'white'
  },
  clearIconDetails:{
     position: 'relative',
     bottom: 72,
     color: 'white'
  },
  preview:{
    fill: 'white',
    position: 'relative',
    right: 1
  },
  selectPlan:{
    position: 'relative',
    right: 15,
    top: 22
  },
  previewBtn:{
    position: 'relative',
    right: 13,
    bottom: 10,
  },
  headerText:{
    float: 'left',
    fontSize: 18,
    color: 'white',
    position: 'relative',
    left: 12,
    minWidth: 122
  },
  
  headerTextDetails:{
    position: 'relative',
    bottom: 47,
    fontSize: 18,
    left: 36,
    color: 'white',
  },
  searchIconWrapper:{
    position: 'relative',
    float: 'right',
    bottom: 12,
    
    marginRight: -20
  },
  searchIconForInput:{
   position: 'absolute',
   bottom: 12,
   right: 4,
   top: '12px'
  },
  searchIcon:{
    color: 'white'
  },
  list:{
    width: '100%'
  },
  listItem:{
    '&:hover': {
     borderLeft: '4px solid #3F51B5'
   },
  },
  itemId:{
    fontWeight: 500,
  },
 
  avatarIcon:{
    position: 'relative',
    bottom: 12,
    left: 5,
    marginTop: '-2px'
  },
  iconAv:{
    position: 'relative',
    top: 1
  },
  radio:{
    position: 'relative',
    left: 3,
    width: 36,
    bottom: 12
  },
  planDetailsText:{
    padding: 26
  },
  expandIcon:{
    color: 'black'
  },
  dialogActions:{
    display: 'flex',
     position: 'relative',
     padding: 12
  },
  typoWrapper:{
     display: 'flex',
     flexDirection: 'column',
     width: '100%',
     marginTop: 4,
     position: 'relative',
     left: 22,
     top: 10,
     marginBottom: 12
  },
  nextIcon:{
    position: 'relative',
    left: 12
  },
  textField:{
    width: '100%'
  },
  addressDialogSelect: {
  
    top: -1,
    width: "100%",
    overflow: "auto",
   // maxHeight: "105px"
  },
  menu:{
  
 },
  

});
