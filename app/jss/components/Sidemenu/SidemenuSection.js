export const styleSheet = (theme) => ({
  sectionTitleWrapper: {
    height: '56px',
    display: 'block',
    padding: '0 0 0 20px',
    boxSizing: 'border-box',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  sectionTitleIcon: {
    //alignSelf: 'top',
    marginBottom: '-6px',
    //paddingTop: '5px',
    transition: 'transform 0.2s linear',
    fill: '#8e8e8e',
    '&.open': {
      transform: 'rotate(180deg)',
      transition: 'transform 0.2s linear',
      //paddingTop: '5px',
    }
  },
  sectionTitle: {
    ...theme.typography.subtitle,
    lineHeight: '56px',
    paddingLeft: '8px'
  }
});