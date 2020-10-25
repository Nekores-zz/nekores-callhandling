export const styleSheet = theme => ({
  sidemenuSection: {
    '&:first-of-type': {
      borderTop: '1px solid #e4e4e4'
    }
  },
  sectionTitleWrapper: {
    height: '56px',
    display: 'flex',
    padding: '0 0 0 20px',
    boxSizing: 'border-box',
    borderBottom: '1px solid #e4e4e4',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  sectionTitleIcon: {
    alignSelf: 'center',
    marginTop: '2px',
    transition: 'transform 0.2s linear',
    fill: '#8e8e8e',
    '&.open': {
      transform: 'rotate(180deg)',
      transition: 'transform 0.2s linear'
    }
  },
  sectionTitle: {
    ...theme.typography.subtitle,
    lineHeight: '56px',
    paddingLeft: '18px'
  }
});