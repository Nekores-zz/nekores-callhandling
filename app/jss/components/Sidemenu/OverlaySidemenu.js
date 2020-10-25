export const styleSheet = (theme) => ({
  drawer: {

  },
  paper: {
    overflowY: 'auto',
    width: theme.layoutSizes.drawerWidth,
    [theme.breakpoints.down('xs')]: {
      width: '90%',
    },
  },
  sidemenuContent: {
    height: '100%',
    paddingTop: 20,
  },
});