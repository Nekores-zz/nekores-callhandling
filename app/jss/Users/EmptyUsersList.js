export const styleSheet = (theme) => ({
  paper: {
    padding: 32,
    margin: 32,
    textAlign: 'center',
  },
  pageContent: {
    maxWidth: 1200,
    marginLeft: 'auto',
    marginRight: 'auto',
    [theme.breakpoints.down('sm')]: {
      margin: 0,
      overflowX: 'hidden',
    },
  },
  text: {
    maxWidth: 700,
    margin: '16px auto',
  },
  inviteUsersFab: {
    background: '#00E676',
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
    '&:hover': {
      background: '#00E676',
      opacity: 0.85,
    },
  },
});