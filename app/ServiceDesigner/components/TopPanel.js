import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {withStyles, Icon, Popover, Button, MenuList, MenuItem, Typography, Grid, ButtonBase} from '@material-ui/core';
import {Tooltip, TooltipContent, TooltipTarget} from './Tooltip';
import {Slider} from './Slider';

const padStylesheet = (theme) => ({
  group: {
    paddingLeft: 20,
  },
});

export const TopPanelPad = withStyles(padStylesheet, {name: 'TopPanelPad'}) (React.memo(
  ({children, classes}) => (
    <div className={classes.group}>
    </div>
  )
));

export class ZoomSelect extends PureComponent {
  render() {
    let { options, value, onChange, classes } = this.props;
    return (
      <TopPanelDropdown hint={'Zoom'} label={`${value * 100| 0}%`}>
        <MenuList>
          {options.map((option, i) => (
            <MenuItem
              key={i}
              onClick={(event) => onChange(option, event)}
              selected={option === value}
              disableGutters
            >
              {`${option * 100 | 0}%`}
            </MenuItem>
          ))}
        </MenuList>
      </TopPanelDropdown>
    );
  }
}

export class GridSizeSelect extends PureComponent {
  renderLabel = () =>
    <>
      <Icon fontSize="small">grid_on</Icon>
      &nbsp;
      {this.props.value}
    </>

  render() {
    let { range, value, onChange, classes } = this.props;
    return (
      <TopPanelDropdown label={this.renderLabel()} hint={'Grid size'}>
        <Typography>Grid size</Typography>
        <Grid container direction='row' alignItems='center'>
          <Grid item style={{flex: 1}}>
            <Slider value={value} onChange={onChange} min={range[0]} max={range[1]} step={1}/>
          </Grid>
          <span>{value}</span>
        </Grid>
      </TopPanelDropdown>
    );
  }
}

const topPanelButtonStylesheet = (theme) => ({
  button: {
    paddingLeft: 20,
    paddingRight: 20,
    color: theme.colors.white,
    cursor: 'pointer',
  },
  disabled: {
    color: '#c8c8c8',
    cursor: 'auto',
  },
});

export const TopPanelButton = withStyles(topPanelButtonStylesheet, {name: 'TopPanelButton'}) (
  class TopPanelButton extends PureComponent {
    render() {
      let {icon, hint, onClick, isDisabled, classes} = this.props;
      return (
        <Tooltip placement='bottom' content={<TooltipContent text={hint}/>}>
          <ButtonBase
            onClick={isDisabled ? undefined : onClick}
            className={clsx(classes.button, {[classes.disabled]: isDisabled})}
          >
            {icon}
          </ButtonBase>
        </Tooltip>
      );
    }
  }
);

const dropdownStylesheet = (theme) => ({
  button: {
    color: theme.colors.white,
    paddingLeft: 20,
    paddingRight: 20,
  },
  popover: {
    padding: 20,
    minWidth: 200,
  },
});

export const TopPanelDropdown = withStyles(dropdownStylesheet, {name: 'TopPanelDropdown'}) (
  class TopPanelDropdown extends PureComponent {
    state = {
      isOpen: false,
      anchor: null,
    };

    handleToggle = (isOpen) => (event) => {
      this.setState({isOpen, anchor: event.target});
    };

    render() {
      let {children, label, hint, classes} = this.props;
      let {isOpen, anchor} = this.state;
      return (
        <Fragment>
          <Tooltip placement='bottom' content={<TooltipContent text={hint}/>}>
            <Button className={classes.button} onClick={this.handleToggle(true)}>
              {label}
              <Icon>{isOpen ? 'arrow_drop_down' : 'arrow_drop_down'}</Icon>
            </Button>
          </Tooltip>
          <Popover
            open={isOpen} onClose={this.handleToggle(false)}
            anchorEl={anchor}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            classes={{paper: classes.popover}}
          >
            {children}
          </Popover>
        </Fragment>
      );
    }
  }
);

const titleStylesheet = (theme) => ({
  title: {
    ...theme.typography.serviceDesignerTitle,
    color: theme.colors.white,
  },
});

export const Title = withStyles(titleStylesheet, {name: 'Title'}) (
  ({children, classes}) => (
    <div className={classes.title}>
      {children}
    </div>
  )
);

const topPanelStylesheet = (theme) => ({
  topPanel: {
    width: '100%',
    height: 56,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.darkGray,
    boxShadow: '0 2px 4px -1px rgba(0, 0, 0, .2), 0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12)',
  },
});

export const TopPanel = withStyles(topPanelStylesheet, {name: 'TopPanel'}) (
  class TopPanel extends PureComponent {
    static propTypes = {
      classes: PropTypes.any.isRequired,
    };

    static defaultProps = {
    };

    render() {
      let {children, classes} = this.props;
      return (
        <div className={classes.topPanel}>
          {children}
        </div>
      );
    }
  }
);