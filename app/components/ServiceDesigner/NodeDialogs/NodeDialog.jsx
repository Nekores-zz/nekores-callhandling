import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";
import {
  Dialog,
  withStyles,
} from "@material-ui/core";
import { PrimaryTextLink } from "components/Elements";
import NodeDialogHeader from "./NodeDialogHeader";
import NodeDialogFooter from "./NodeDialogFooter";
import NodeDialogContent from "./NodeDialogContent";

const nodeDialogStyleSheet = theme => ({
  dialogPaper: {
    minWidth: 600,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      minWidth: "100%"
    }
  },
  eventActions: {
    whiteSpace: "nowrap",
    paddingLeft: 12,
    paddingRight: 12
  }
});
const NodeDialog = withStyles(nodeDialogStyleSheet, { name: "NodeDialog" })(
  translate(["servicedesigner", "common"])(
    class NodeDialog extends PureComponent {
      static propTypes = {
        node: PropTypes.object.isRequired,
        nodeType: PropTypes.object.isRequired,
        onClose: PropTypes.func,
        nodeDialogsByNodeTypes: PropTypes.object.isRequired
      };

      state = {
        isEdit: false,
        node: this.props.node,
        content: null
      };

      handleEdit = () => {
        this.setState({ isEdit: true });
      };

      handleCloseEdit = () => {
        this.setState({ isEdit: false });
      };

      handleSaveEdit = ({ id, name, description }) => {
        const { node } = this.state;
        node.name = name;
        node.description = description;
        this.setState({ node, isEdit: false });
      };

      handleSaveNode = () =>
        this.callbackOnSubmit({
          name: this.state.node.name || "",
          description: this.state.node.description || ""
        }).then(res => this.props.onClose()); // Call function from node type dialog component

      handleEventActions = () => {};

      componentDidMount() {
        const { node } = this.props;
        const { nodeType } = node;
        console.log(nodeType);
        this.setState({
          content: this.props.nodeDialogsByNodeTypes[nodeType](
            node,
            callbackOnSubmit => (this.callbackOnSubmit = callbackOnSubmit) //store function from Node type dialog. We will trigger this function when we hit submit
          )
        });
      }

      render() {
        const { nodeType, onClose, t, classes } = this.props;
        const { node, isEdit, content } = this.state;

        return (
          <Dialog open={true} classes={{ paper: classes.dialogPaper }}>
            <NodeDialogHeader
              node={node}
              nodeType={nodeType}
              onClose={onClose}
              onEdit={this.handleEdit}
              onCloseEdit={this.handleCloseEdit}
              onSaveEdit={this.handleSaveEdit}
            />
            <NodeDialogContent disabled={isEdit} node={node} content={content} />
            <NodeDialogFooter
              eventActions={
                <PrimaryTextLink className={classes.eventActions} onClick={this.handleEventActions}>
                  {t("eventActions")}
                </PrimaryTextLink>
              }
              onSave={this.handleSaveNode}
              onClose={this.props.onClose}
              disabled={isEdit}
            />
          </Dialog>
        );
      }
    }
  )
);

export default NodeDialog;
