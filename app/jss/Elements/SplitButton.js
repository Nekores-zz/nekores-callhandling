import { objects } from "utils";

export const styleSheet = theme => ({
  labelInput: {
    height: 48,
    lineHeight: "42px",
    textAlign: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderStyle: "solid",
    position: "relative",
    display: "inline-flex",
  },

  menuList: {
    position: "relative",
    top: "100%",
  },

  largeWidth: {
    width: 200,
    height: 48,
    lineHeight: "48px",
  },

  mediumWidth: {
    width: 120,
    height: 36,
    lineHeight: "36px",
  },

  smallWidth: {
    width: 60,
  },

  mainTextWrapper: {
    width: 200,
  },

  mainText: {
    fontSize: "0.9em !important",
    textTransform: "uppercase",
  },

  menuIcon: {
  },

  menuButton: {
    width: 48,
    float: "right",
    border: "none",
    borderLeftWidth: 1,
    borderLeftStyle: "solid",
    cursor: "pointer",
    boxSizing: "border",
    background: "transparent",
  },

  mainStyle: {
    borderColor: theme.colors.primary.secondaryBlue,
    color: `${theme.colors.primary.secondaryBlue} !important`,
  },

  invertStyle: {
    borderColor: theme.colors.primary.white,
    color: `${theme.colors.primary.white} !important`,
  },

  menuItems: {
  }
});
