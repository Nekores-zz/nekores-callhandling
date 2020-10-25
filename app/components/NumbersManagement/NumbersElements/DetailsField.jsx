/**
 * review by A. Prates, feb-2019
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Avatar, MenuItem, TextField, withStyles } from "@material-ui/core";
import { styleSheet } from "jss/NumbersManagement/NumbersElements/DetailsField";
import { bands } from "utils/bands";

class DetailsField extends Component {
  static propTypes = {
    number: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    band: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
  };

  select = number => event =>
    this.props.handleChange(number, event.target.value);

  render() {
    const { number, band, classes } = this.props;
    const filteredBands = bands.filter(b => b !== band);

    return (
      <div className={classes.textFieldWrapper}>
        <TextField
          label={number}
          value={number}
          onChange={this.select(number)}
          SelectProps={{ classes: { icon: classes.icon } }}
          InputProps={{
            disableUnderline: true,
            style: { padding: 0, margin: 0 }
          }}
          InputLabelProps={{ className: classes.label, shrink: false }}
          className={classes.select}
          margin="dense"
          select
        >
          {filteredBands.map((bandOption, index) => (
            <MenuItem
              key={index}
              className={classes.menuItem}
              value={bandOption}
            >
              <Avatar
                className={classes.avatar}
                style={{ background: bandOption.color }}
              />
              {bandOption.name}
            </MenuItem>
          ))}
        </TextField>
      </div>
    );
  }
}
export default withStyles(styleSheet, { name: "DetailsField" })(DetailsField);
