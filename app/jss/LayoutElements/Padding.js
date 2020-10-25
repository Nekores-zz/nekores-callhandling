export const PADDING = {
  DOUBLE: 'paddingDouble',
  SINGLE: 'paddingSingle',
  HALF: 'paddingHalf',
  NONE: 'paddingNone',
};

export const TOP = {
  DOUBLE: 'topPaddingDouble',
  SINGLE: 'topPaddingSingle',
  HALF: 'topPaddingHalf',
  NONE: 'topPaddingNone',
};

export const RIGHT = {
  DOUBLE: 'rightPaddingDouble',
  SINGLE: 'rightPaddingSingle',
  HALF: 'rightPaddingHalf',
  NONE: 'rightPaddingNone',
};

export const BOTTOM = {
  DOUBLE: 'bottomPaddingDouble',
  SINGLE: 'bottomPaddingSingle',
  HALF: 'bottomPaddingHalf',
  NONE: 'bottomPaddingNone',
};

export const LEFT = {
  DOUBLE: 'leftPaddingDouble',
  SINGLE: 'leftPaddingSingle',
  HALF: 'leftPaddingHalf',
  NONE: 'leftPaddingNone',
};

const padding = 24;

export const stylesheet = (theme) => ({
  [PADDING.DOUBLE]: {
    padding: 2 * padding,
  },
  [PADDING.SINGLE]: {
    padding: padding,
  },
  [PADDING.HALF]: {
    padding: padding / 2,
  },
  [PADDING.NONE]: {
    padding: 0,
  },
  [TOP.DOUBLE]: {
    paddingTop: 2 * padding,
  },
  [TOP.SINGLE]: {
    paddingTop: padding,
  },
  [TOP.HALF]: {
    paddingTop: padding / 2,
  },
  [TOP.NONE]: {
    paddingTop: 0,
  },
  [RIGHT.DOUBLE]: {
    paddingRight: 2 * padding,
  },
  [RIGHT.SINGLE]: {
    paddingRight: padding,
  },
  [RIGHT.HALF]: {
    paddingRight: padding / 2,
  },
  [RIGHT.NONE]: {
    paddingRight: 0,
  },
  [BOTTOM.DOUBLE]: {
    paddingBottom: 2 * padding,
  },
  [BOTTOM.SINGLE]: {
    paddingBottom: padding,
  },
  [BOTTOM.HALF]: {
    paddingBottom: padding / 2,
  },
  [BOTTOM.NONE]: {
    paddingBottom: 0,
  },
  [LEFT.DOUBLE]: {
    paddingLeft: 2 * padding,
  },
  [LEFT.SINGLE]: {
    paddingLeft: padding,
  },
  [LEFT.HALF]: {
    paddingLeft: padding / 2,
  },
  [LEFT.NONE]: {
    paddingLeft: 0,
  },
});
