/**
 * Created by Andrzej on 14.02.2018.
 */
export const styleSheet = theme => ({
  list: {
    padding: '0',
    marginLeft: '-34px',
    marginRight: '-34px',
    borderTop: `1px solid ${theme.colors.primary.lightGrey}`,
    [theme.breakpoints.down('xs')]: {
      marginLeft: '-17px',
      marginRight: '-17px',
    }
  },
  listItem: {
    position: 'relative',
    padding: '16px 32px 16px 34px',
    borderColor: theme.colors.primary.lightGrey,
    '&:hover': {
      cursor: 'pointer',
      '&::before': {
        content: `''`,
        display: 'block',
        background: theme.colors.primary.mainBlue,
        width: '6px',
        height: '100%',
        position: 'absolute',
        top: '0',
        left: '0'
      }
    },
    [theme.breakpoints.down('xs')]: {
      paddingLeft: '17px',
    }
  },
  listItemPrimaryText: {
    ...theme.typography.primaryBody,
    fontWeight: '700',
    lineHeight: '20px'
  },
  listItemSecondaryText: {
    ...theme.typography.secondaryBody,
    lineHeight: '20px'
  }
});