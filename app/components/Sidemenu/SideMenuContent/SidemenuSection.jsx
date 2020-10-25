import React, { Component } from "react";
import { Grid, Icon, withStyles } from "@material-ui/core";
import { styleSheet } from "jss/components/Sidemenu/SidemenuContent/SidemenuSection";

class SidemenuSection extends Component {
  constructor(props) {
    super(props);
  }

  toggleSection = () => {
    this.props.toggleSection(this.props.sectionIndex);
  };

  render() {
    const { classes, title, open } = this.props;

    return (
      <Grid container spacing={0} className={classes.sidemenuSection}>
        <Grid
          item
          xs={12}
          className={classes.sectionTitleWrapper}
          onClick={this.toggleSection}
        >
          <Icon className={`${classes.sectionTitleIcon} ${open ? "open" : ""}`}>
            keyboar_arrow_down
          </Icon>
          <span className={classes.sectionTitle}>{title}</span>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styleSheet, { name: "SidemenuSection" })(
  SidemenuSection
);
