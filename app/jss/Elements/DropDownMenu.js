import { objects } from "utils";

export const styleSheet = theme => ({
  labelInput: {
    height: 36,
    lineHeight: "30px",
    textAlign: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderStyle: "solid",
    position: "relative",
    display: "inline-flex"
  },

  menuList: {
    position: "relative",
    top: "100%"
  },

  largeWidth: {
    width: "250px !important",
    lineHeight: "30px"
  },

  mediumWidth: {
    width: "150px !important",
    lineHeight: "30px"
  },

  smallWidth: {
    width: 60
  },

  mainTextWrapper: {
    width: "calc(100% - 36px)"
  },

  mainText: {
    fontSize: "0.9em !important",
    textTransform: "uppercase"
  },

  menuIcon: {
    position: "relative",
    top: "calc(50% - 12px)"
  },

  menuButton: {
    width: 36,
    float: "right",
    border: "none",
    borderLeftWidth: 1,
    borderLeftStyle: "solid",
    cursor: "pointer",
    boxSizing: "border",
    background: "transparent"
  },

  mainStyle: {
    borderColor: theme.colors.primary.secondaryBlue,
    color: `${theme.colors.primary.secondaryBlue} !important`
  },

  invertStyle: {
    borderColor: theme.colors.primary.white,
    color: `${theme.colors.primary.white} !important`
  },

  menuItems: {}
});
