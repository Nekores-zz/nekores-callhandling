import { objects } from "utils";

export const iconButtonStylesheet = theme => ({
  root: {
    ...theme.buttons.default,
    flex: 0,

    "&:hover": {}
  },
  disabled: {
    ...theme.buttons.disabled
  },
  medium: {
    padding: 12,
    fontSize: "1.5rem"
  },
  small: {
    padding: 3,
    fontSize: "1.125rem"
  },
  ...theme.backgroundColors,
  ...theme.textColors
});
