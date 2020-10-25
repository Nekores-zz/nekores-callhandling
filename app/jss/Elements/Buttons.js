export const buttonStylesheet = theme => ({
  root: {
    ...theme.buttons.default,
    minWidth: 100
  },
  disabled: {
    ...theme.buttons.disabled
  }
});

export const primaryButtonStylesheet = theme => ({
  root: {
    ...theme.buttons.action,
    boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.17)",
    "&:hover": {
      ...theme.buttons.actionHover,
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.17)",
      opacity: 1
    },
    "&:focus": {
      background: "#00D864",
      boxShadow: "none",
      opacity: 1
    }
  },
  disabled: {
    ...theme.buttons.primaryButtonDisabled
  }
});

export const secondaryButtonStylesheet = theme => ({
  root: {
    ...theme.buttons.secondary,
    ...theme.buttons.secondaryActive,
    "&:hover": {
      ...theme.buttons.secondaryHover,
      background: "none"
    },
    "&:focus": {
      boxShadow: "none",
      opacity: 0.7,
      background: "none"
    }
  },
  disabled: { ...theme.buttons.secondaryButtonDisabled }
  // hover: {}
});

export const AddButtonStylesheet = theme => ({
  root: {
    ...theme.buttons.addButton,
    "&:hover": {
      ...theme.buttons.addButtonHover
    },
    "&:focus": {
      ...theme.buttons.addButtonPressed
    },
    test: {
      border: "5px solid red"
    }
  },
  disabled: {
    ...theme.buttons.addButtonDisabled
  }
});

export const primaryTextLinkButtonStylesheet = theme => ({
  root: {
    ...theme.buttons.primaryTextLink,
    "&:hover": {},
  },
  disabled: {},
  denseLeft: {
    paddingLeft: 16,
    marginLeft: -16
  },
  denseRight: {
    paddingRight: 16,
    marginRight: -16
  }
});

export const secondaryTextLinkButtonStylesheet = theme => ({
  root: {
    ...theme.buttons.secondaryTextLink
  },
  disabled: {}
  // hover: {}
});

export const thirdTextLinkButtonStylesheet = theme => ({
  root: {
    ...theme.buttons.thirdTextLink
  },
  disabled: {}
  // hover: {}
});

export const actionButtonStylesheet = theme => ({
  root: {
    ...theme.buttons.default,
    ...theme.buttons.action
  },
  disabled: {
    ...theme.buttons.disabled,
    ...theme.buttons.actionDisabled
  }
  // hover: {
  //   ...theme.buttons.actionHover
  // }
});
