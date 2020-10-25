import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Button, Grid, Icon, withStyles, withWidth } from "@material-ui/core";
import { styleSheet } from "jss/LayoutElements/SelectFile";

class SelectFile extends Component {
  static propTypes = {
    onFilesChange: PropTypes.func.isRequired,
    dndLabel: PropTypes.string.isRequired,
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    width: PropTypes.string.isRequired,
    mode: PropTypes.string,
    fileTypes: PropTypes.string
  };

  static defaultProps = {
    mode: "horizontal"
  };

  state = {
    isDragOver: false
  };

  VerticalLine = () => <div className={this.props.classes.verticalLine} />;

  HorizontalLine = () => <div className={this.props.classes.horizontalLine} />;

  SelectFileButton = () => (
    <Fragment>
      <Button
        onClick={this.handleBrowse}
        variant="outlined"
        classes={{ root: this.props.classes.browseButton }}
      >
        Browse files
      </Button>
      <input
        ref={this.handleFileInputRef}
        type="file"
        accept={this.props.fileTypes}
        onChange={this.handleFilesChange}
        className={this.props.classes.fileInput}
      />
    </Fragment>
  );

  isMobile = () => {
    return this.props.width === "xs";
  };

  handleDragEnter = event => {
    event.preventDefault();
    this.setState({ isDragOver: true });
  };

  handleDragOver = event => {
    event.preventDefault();
    this.setState({ isDragOver: true });
  };

  handleDragLeave = event => {
    this.setState({ isDragOver: false });
  };

  handleDrop = event => {
    event.stopPropagation();
    event.preventDefault();

    const files = event.dataTransfer.files;

    if (files) {
      this.props.onFilesChange(files);
    }
  };

  handleFileInputRef = node => {
    this.fileInput = node;
  };

  handleBrowse = event => {
    event.stopPropagation();
    if (this.fileInput) {
      this.fileInput.value = null;
      this.fileInput.click();
    }
  };

  handleFilesChange = event => {
    this.props.onFilesChange(event.target.files);
  };

  renderSpace = mode => {
    return mode === "horizontal" ? (
      " "
    ) : (
      <Fragment>
        <br />
        <br />
      </Fragment>
    );
  };

  renderOr = mode => {
    return mode === "horizontal" ? (
      <Grid item className={this.props.classes.or}>
        <this.VerticalLine /> or <this.VerticalLine />
      </Grid>
    ) : (
      <Grid item className={clsx(this.props.classes.or, this.props.classes.horizontal)}>
        <this.HorizontalLine /> or <this.HorizontalLine />
      </Grid>
    );
  };

  render() {
    const { mode, dndLabel, classes, className } = this.props;
    const { isDragOver } = this.state;

    return this.isMobile() ? (
      <div className={classes.mobile}>
        <this.SelectFileButton />
      </div>
    ) : (
      <div className={classes.outer + " " + className}>
        <Grid
          container
          justify="space-around"
          alignItems="center"
          direction={mode === "horizontal" ? "row" : "column"}
          className={clsx(classes.container, isDragOver ? classes.dragOver : "")}
          onDragEnter={this.handleDragEnter}
          onDragOver={this.handleDragOver}
          onDragLeave={this.handleDragLeave}
          onDrop={this.handleDrop}
        >
          <Grid item className={classes.dndLabel}>
            {this.renderSpace(mode)}

            <center>
              <Icon className={mode === "horizontal" ? classes.uploadIcon : classes.uploadIconV}>
                backup
              </Icon>
            </center>

            {this.renderSpace(mode)}

            {dndLabel}

            {this.renderSpace(mode)}
          </Grid>

          {this.renderOr(mode)}

          <Grid item className={classes.selectFileCell}>
            {this.renderSpace(mode)}

            <this.SelectFileButton />

            {this.renderSpace(mode)}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withWidth()(withStyles(styleSheet, { name: "SelectFile" })(SelectFile));
