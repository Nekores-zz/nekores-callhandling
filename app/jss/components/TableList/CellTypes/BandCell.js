export const styleSheet = theme => ({
  root:{
    display: 'flex',
    alignItems: 'baseline'
  },
  bandCell: {
     height: '18px',
     width: '18px',
     borderRadius: 22
  },
  simpleText: {
    ...theme.typography.subtitle,
    color: theme.colors.primary.darkGrey,
    position: 'relative',
    left: '12px',
    bottom: '3px',
  }
});
