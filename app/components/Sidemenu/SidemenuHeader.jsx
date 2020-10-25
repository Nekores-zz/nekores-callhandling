import React, { Component } from "react";
import {
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Icon,
  withStyles
} from "@material-ui/core";
import { styleSheet } from "jss/components/Sidemenu/SidemenuHeader";

class SidemenuHeader extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Grid container spacing={0} className={classes.sidemenuHeader}>
        <Grid item xs={12} className={classes.sidemenuHeaderTitleWrapper}>
          <h1 className={classes.sidemenuHeaderTitle}>Category</h1>
        </Grid>
        <Grid item xs={12}>
          <List component="nav">
            <ListItem button>
              <ListItemIcon>
                <Icon className={classes.iconActive}>picture_in_picture</Icon>
              </ListItemIcon>
              <ListItemText
                primary="Subcategory 1"
                classes={{ primary: `${classes.subcategoryText} active` }}
              />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
              <Icon >picture_in_picture</Icon>
              </ListItemIcon>
              <ListItemText
                primary="Subcategory 2"
                classes={{ primary: classes.subcategoryText }}
              />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styleSheet, { name: "SidemenuHeader" })(
  SidemenuHeader
);
