/**
 * by A. Prates, may-2018
 */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { styleSheet } from "jss/Services/ServiceElements";
import {
  AvatarSimpleCell,
  SimpleTextCell,
  NumbersStatusCell,
  AvatarBandCell,
  HubbubList
} from "components";
import { translate } from "react-i18next";

class ServiceNumbersDisplay extends PureComponent {
  static propTypes = {
    serviceNumbers: PropTypes.array.isRequired,

    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  listSchema = [
    {
      display: "flex",
      heading: "number",
      args: ["id", "number"],
      render: AvatarSimpleCell,
      hidden: false
    },
    {
      display: "flex",
      heading: "tags",
      args: ["tags"],
      render: SimpleTextCell,
      hidden: true
    },
    {
      display: "flex",
      heading: "band",
      args: ["band", "bandColor", "bandIcon"],
      render: AvatarBandCell,
      hidden: true
    },
    {
      display: "flex",
      heading: "rate",
      args: ["rate"],
      render: SimpleTextCell,
      hidden: true
    },
    {
      display: "flex",
      heading: "status",
      args: ["status"],
      render: NumbersStatusCell,
      hidden: false
    }
  ];

  render() {
    const { serviceNumbers, classes, t } = this.props;

    return (
      <HubbubList
        className={classes.numbersTable}
        data={serviceNumbers}
        dataCount={serviceNumbers.length}
        schema={this.listSchema}
        getKeyFn={item => item.id}
        headerVariation="blue" // "blue", "darkblue"
        t={t}
      />
    );
  }
}

export default withStyles(styleSheet, { name: "ServiceNumbersDisplay" })(
  translate("services")(ServiceNumbersDisplay)
);
