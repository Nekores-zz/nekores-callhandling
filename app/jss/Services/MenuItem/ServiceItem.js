import { styleSheet as menuItemStyleSheet } from "jss/Shared/MenuItem";

export const styleSheet = theme => {
  const menuItem = menuItemStyleSheet(theme);

  return {
    // here we take a copy of our generic MenuItem classes
    ...menuItem,

    // we may add new or override any classes of generic MenuItem below

    example: {
      // css
    }
  };
};
