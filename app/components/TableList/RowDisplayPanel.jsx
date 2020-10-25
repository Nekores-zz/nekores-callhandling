/**
 * by A. Prates, aug-2018
 * Modified by: Sajid U. SEPT-2019
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles, withWidth } from "@material-ui/core";
import { HubbubDialog, HubbubDialogHeader, ListAvatar } from "components";
import { styleSheet } from "jss/components/TableList/RowDisplayPanel";

class RowDisplayPanel extends Component {
  static propTypes = {
    rowData: PropTypes.object,
    getHeader: PropTypes.func.isRequired,
    isFavorite: PropTypes.func,
    content: PropTypes.object.isRequired,
    menu: PropTypes.array,
    onStar: PropTypes.any,
    onRun: PropTypes.any,
    onEdit: PropTypes.func,
    onClose: PropTypes.func.isRequired,
    width: PropTypes.string.isRequired
  };

  emptyRowMenu = {
    isOpen: false,
    anchorElement: null,
    row: null
  };

  render() {
    const {
      rowData,
      content,
      onClose,
      onEdit,
      onStar,
      onRun,
      menu,
      getHeader,
      classes
    } = this.props;
    const ContentDisplayer = content.render;

    const header = getHeader(rowData);
    return !!rowData ? (
      <HubbubDialog
        maxWidth="md"
        open={true}
        dialogClass={{ paper: classes.dialogPaper }}
        dialogHeader={
          // header
          <HubbubDialogHeader
            icon={false}
            avatar={<ListAvatar color={header.color} name={header.name} />}
            headerVariation="grey" // "default", "grey", "red" - if null/undefined/false. "default"
            headerTitle={header.name}
            onClose={onClose}
            rowData={rowData}
            menu={menu}
            onEdit={onEdit}
            onStar={onStar}
            onRun={onRun}
          />
        }
        dialogContent={<ContentDisplayer rowData={rowData} {...content.props} />} // content
        // dialogFooter={} // footer
        onClose={onClose}
      />
    ) : null;
  }
}

export default withStyles(styleSheet, { name: "RowDisplayPanel" })(withWidth()(RowDisplayPanel));
