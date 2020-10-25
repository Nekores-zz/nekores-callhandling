export const styleSheet = theme => ({
  mainComponent: {
    width: "100%",
    height: "100%",
    overflow: "auto",
    //background: `url("${!!window.assetsPath?(window.assetsPath + '/' + window.buildNumber):""}/img/background.svg") ${theme.colors.background} 100% 100%`
    background: theme.colors.background,
  },

  mainComponentLanding: {
    minWidth: "100vw",
    minHeight: "100vh",
    [theme.breakpoints.down('sm')]: {
      overflowY: "scroll",
      height: "100vh",
      width: "100%",
    },
  }
});
