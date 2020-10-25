import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {styleSheet} from 'jss/components/Sidemenu/SidemenuContent/SidemenuSections';
import Grid from '@material-ui/core/Grid';
import SidemenuSection from '../SideMenuContent/SidemenuSection';

class SidemenuSections extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSection: -1
    }
  }

  toggleActiveSection = sectionIndex => {
    this.setState({activeSection: sectionIndex !== this.state.activeSection ? sectionIndex : -1});
  };

  isOpened = sectionId => {
    return sectionId === this.state.activeSection;
  };

  render() {
    const {classes} = this.props;

    return (
      <Grid container spacing={0} className={classes.container}>
        <Grid item xs={12}>
          <SidemenuSection sectionIndex={0} toggleSection={this.toggleActiveSection} open={this.isOpened(0)} title="Filters"/>
          <SidemenuSection sectionIndex={1} toggleSection={this.toggleActiveSection} open={this.isOpened(1)} title="Sort"/>
          <SidemenuSection sectionIndex={2} toggleSection={this.toggleActiveSection} open={this.isOpened(2)} title="More"/>
          <SidemenuSection sectionIndex={3} toggleSection={this.toggleActiveSection} open={this.isOpened(3)} title="Help"/>
        </Grid>
      </Grid>)
  }
}

export default withStyles(styleSheet, {name: 'SidemenuSections'})(SidemenuSections);