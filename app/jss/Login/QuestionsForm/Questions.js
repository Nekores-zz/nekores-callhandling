export const styleSheet = theme => ({
  wrapper: {
    paddingTop: '18px'
  },
  questionWrapper: {
    '& + &': {
      marginTop: '35px'
    }
  }
});