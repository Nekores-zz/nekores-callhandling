/*
 * Copyright (c) 2019. call-handling services [https://www.callhandling.co.uk/]
 * Author: 4ητonio Prατєs [antonioprates@gmail.com], jun-2018 - oct-2019
 */

import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { SidemenuOption } from "../Sidemenu";
import { translate } from "react-i18next";
import { styleSheet } from "jss/Services/ListServicesSidemenu";

class SidemenuSort extends Component {
  static propTypes = {
    sorting: PropTypes.arrayOf(
      PropTypes.shape({
        sortBy: PropTypes.string.isRequired,
        values: PropTypes.arrayOf(
          PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.string,
            isSelected: PropTypes.bool
          })
        )
      })
    ),

    onChange: PropTypes.func.isRequired,

    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  handleSortBy = (item, value) => () => {
    const sorting = this.props.sorting.map(s => s.copy());
    const itemCopy = sorting.find(i => i.sortBy === item.sortBy);
    const updateIndex = sorting.indexOf(itemCopy);
    itemCopy.values.forEach(v => (v.isSelected = v.value === value.value));
    sorting[updateIndex] = itemCopy;
    this.props.onChange(sorting);
  };

  render = () => {
    const { sorting, classes, t } = this.props;

    return (
      <div className={classes.sort}>
        {sorting.map(item => (
          <Fragment key={item.sortBy}>
            {item.values.map(value => (
              <SidemenuOption
                key={value.value}
                value={value.value}
                isActive={value.isSelected}
                onSelect={this.handleSortBy(item, value)}
              >
                {t(value.label)}
              </SidemenuOption>
            ))}
            <br />
          </Fragment>
        ))}
      </div>
    );
  };
}

export default withStyles(styleSheet, { name: "SidemenuSort" })(translate("filters")(SidemenuSort));
