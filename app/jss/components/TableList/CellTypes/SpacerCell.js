export const styleSheet = theme => ({
  cell: {
    flex: '1 1 0',
    paddingTop: 12,
    paddingRight: 0,
    paddingBottom: 12,
    paddingLeft: 0,
    width: 0,
    ...theme.typography.primaryBody,
    overflowX: 'hidden',
  }
});
