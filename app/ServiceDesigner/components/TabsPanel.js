import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {withStyles, Grid, Icon, List, ListItem, ListItemText, ListItemSecondaryAction} from '@material-ui/core';
import {Paper, Node, Link, Divider, Divide} from '../components';

const styleSheet = (theme) => ({
  container: {
    width: 300,
    height: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
    backgroundColor: theme.colors.gray,
  },
  column: {
    
  },
  tab: {
    padding: 10,
    flex: 1,
    cursor: 'pointer',
    backgroundColor: theme.colors.darkGray,
    ...theme.typography.serviceDesignerMenu,
    color: theme.colors.darkWhite,
    textAlign: 'center',
  },
  activeTab: {
    backgroundColor: theme.colors.gray,
    ...theme.typography.serviceDesignerMenu,
    color: theme.colors.white,
  },
});

export const TabsPanelContainer = withStyles(styleSheet, {name: 'TabsPanelContainer'}) (
    class TabsPanelContainer extends PureComponent {
    static propTypes = {
      classes: PropTypes.any.isRequired,
    };

    static defaultProps = {
    };

    render() {
      let {tabs, activeTab, onSelect, children, classes} = this.props;
      return (
        <div className={classes.container}>
          <Grid container direction="column" alignItems="stretch" wrap="nowrap" className={classes.column}>
            <Grid item container direction="row" wrap="nowrap" alignItems="center">
              {tabs.map((tab, i) => (
                <Fragment key={i}>
                  <Grid item onClick={() =>onSelect(tab)} className={clsx(classes.tab, {[classes.activeTab]: tab === activeTab})}>
                    {tab}
                  </Grid>
                  <Divider variant='vertical'/>
                </Fragment>
              ))}
            </Grid>
            {children}
          </Grid>
        </div>
      );
    }
  }
);

export const Items = withStyles(
  (theme) => ({
    container: {
      userSelect: 'none',
      color: theme.colors.white,
      ...theme.typography.serviceDesignerMenu,
    },
  }),
  {name: 'Items'},
) (
  ({children, classes}) => (
    <Grid container direction="column" alignItems="stretch" wrap="nowrap" className={classes.container}>
      {children}
    </Grid>
  )
);

export const Item = withStyles(
  (theme) => ({
    item: {
      position: 'relative',
      padding: 20,
      paddingLeft: 25,
      cursor: 'pointer',
      color: theme.colors.white,
      ...theme.typography.serviceDesignerMenu,
    },
    secondaryItem: {
      padding: 10,
    },
    selectedItem: {
      backgroundColor: theme.colors.darkGray,
    },
  }),
  {name: 'Item'},
) (
  ({children, secondary, onClick, isSelected, classes, ...handlers}) => (
    <Grid
      onClick={onClick} {...handlers}
      item container
      direction="row" wrap="nowrap" alignItems="center"
      className={clsx(classes.item, {[classes.selectedItem]: isSelected, [classes.secondaryItem]: secondary})}
    >
      {children}
    </Grid>
  )
);

export const ItemIcon = withStyles(
  (theme) => ({
    icon: {
      color: theme.colors.white,
    },
    secondary: {
      color: theme.colors.darkWhite,
    },
  }),
  {name: 'ItemIcon'},
) (
  ({children, secondary, classes}) => (
    <Icon classes={{root: clsx(classes.icon, {[classes.secondary]: secondary})}}>
      {children}
    </Icon>
  )
);

export const ItemLabel = withStyles(
  (theme) => ({
    itemLabel: {
      paddingLeft: 10,
      flex: 1,
      color: theme.colors.darkWhite,
      ...theme.typography.serviceDesignerMenu,
    },
    secondary: {
      color: theme.colors.darkWhite,
    },
  }),
  {name: 'ItemLabel'},
) (
  ({children, secondary, classes}) => (
    <span className={clsx(classes.itemLabel, {[classes.secondary]: secondary})}>
      {children}
    </span>
  )
);

export const TabsPanelContent = {Items, Item, ItemLabel, ItemIcon};