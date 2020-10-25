export const FLEX = {
  FULL: 'full-flex',
  NONE: 'none-flex',
};

export const DIRECTION = {
  ROW: 'row',
  COLUMN: 'column',
};

export const JUSTIFY = {
  START: 'justify-start',
  END: 'justify-end',
  CENTER: 'justify-center',
  SPACE_BETWEEN: 'justify-space-between',
  SPACE_AROUND: 'justify-space-around',
  SPACE_EVENLY: 'justify-space-evenly',
};

export const ALIGN = {
  START: 'align-start',
  END: 'align-end',
  CENTER: 'align-center',
  STRETCH: 'align-stretch',
};

export const stylesheet = (theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  [DIRECTION.ROW]: {
    flexDirection: 'row',
    width: '100%',
  },
  [DIRECTION.COLUMN]: {
    flexDirection: 'column',
    height: '100%',
  },
  [FLEX.FULL]: {
    flex: 1,
  },
  [FLEX.NONE]: {
    flex: 0,
  },
  [JUSTIFY.START]: {
    justifyContent: 'flex-start',
  },
  [JUSTIFY.END]: {
    justifyContent: 'flex-end',
  },
  [JUSTIFY.CENTER]: {
    justifyContent: 'center',
  },
  [JUSTIFY.SPACE_BETWEEN]: {
    justifyContent: 'space-between',
  },
  [JUSTIFY.SPACE_AROUND]: {
    justifyContent: 'space-around',
  },
  [JUSTIFY.SPACE_EVENLY]: {
    justifyContent: 'space-evenly',
  },
  [ALIGN.START]: {
    alignItems: 'flex-start',
  },
  [ALIGN.END]: {
    alignItems: 'flex-end',
  },
  [ALIGN.CENTER]: {
    alignItems: 'center',
  },
  [ALIGN.STRETCH]: {
    alignItems: 'stretch',
  },
});
