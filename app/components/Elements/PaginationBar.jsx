import React, { PureComponent, Component } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { styleSheet } from "jss/Elements/PaginationBar";
import { withStyles, MenuItem, FormControl, InputLabel, Select } from "@material-ui/core";
import { Button, Icon } from "components/Elements";
import { Stretch, Box } from "components/LayoutElements";

class PaginationBar extends Component {
  static propTypes = {
    rowsPerPageOptions: PropTypes.array.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    OnRowsPerPageChange: PropTypes.func,
    totalRows: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    OnGotoPage: PropTypes.func
  };

  handleRowsPerPageChange = event => {
    this.props.OnRowsPerPageChange(event.target.value);
  };

  gotoPage = page => {
    this.props.OnGotoPage(page);
  };

  handleGotoPage = page => event => {
    this.gotoPage(page);
  };

  handleGoFirstPage = () => {
    this.gotoPage(0);
  };

  handleGoLastPage = () => {
    this.gotoPage(Math.ceil(this.props.totalRows / this.props.rowsPerPage) - 1);
  };

  handleGoPreviousPage = () => {
    if (this.props.currentPage > 0) this.gotoPage(this.props.currentPage - 1);
  };

  handleGoNextpage = () => {
    if (this.props.currentPage < Math.ceil(this.props.totalRows / this.props.rowsPerPage) - 1)
      this.gotoPage(this.props.currentPage + 1);
  };

  render = () => {
    const {
      className,
      classes,
      rowsPerPageOptions,
      rowsPerPage,
      totalRows,
      currentPage
    } = this.props;
    const pageCount = Math.ceil(totalRows / rowsPerPage);
    const pageButtons = [];
    if (currentPage > 1) {
      pageButtons.push({ label: "...", status: "disabled" });
    }
    if (currentPage != 0) {
      pageButtons.push({ label: currentPage, status: "normal" });
    }
    pageButtons.push({ label: currentPage + 1, status: "selected" });
    if (currentPage != pageCount - 1) {
      pageButtons.push({ label: currentPage + 2, status: "normal" });
    }
    if (currentPage < pageCount - 2) {
      pageButtons.push({ label: "...", status: "disabled" });
    }

    return (
      <div className={classes.paginationWrapper}>
        <Box padding>
          <Box>
            <FormControl className={clsx(classes.formControl, classes.rowsPerPage)}>
              <InputLabel htmlFor="rows-per-page">Rows Per Page</InputLabel>
              <Select
                value={rowsPerPage}
                onChange={this.handleRowsPerPageChange}
                inputProps={{
                  id: "rows-per-page"
                }}
              >
                {rowsPerPageOptions.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Stretch />
          <Box>
            <Box classes={{ box: classes.navButtonGroup }}>
              <Box classes={{ box: classes.navButton }}>
                <Button onClick={this.handleGoFirstPage} className={classes.selected}>
                  <Icon>first_page</Icon>
                </Button>
              </Box>
              {pageButtons.map((page, index) => (
                <Box key={index} classes={{ box: classes.navButton }}>
                  <Button
                    disabled={page.status === "disabled"}
                    onClick={this.handleGotoPage(page.label - 1)}
                    className={clsx(classes[page.status])}
                  >
                    {page.label}
                  </Button>
                </Box>
              ))}
              <Box>
                <Button onClick={this.handleGoLastPage} className={classes.selected}>
                  <Icon>last_page</Icon>
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </div>
    );
  };
}

export default withStyles(styleSheet, { name: "PaginationBar" })(PaginationBar);
