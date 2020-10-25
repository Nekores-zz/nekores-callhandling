/**
 * by A. Prates, feb-2018
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  AvatarBandCell,
  SimpleTextCell,
  TagsCell,
  NumbersStatusCell2,
  VirtualizedList
} from "components";
import { ReleaseNumbers } from "components/Numbers";
import { translate } from "react-i18next";

class ListNumbers extends Component {
  static propTypes = {
    numbers: PropTypes.array.isRequired,
    numbersCount: PropTypes.number.isRequired,
    allocateNumbers: PropTypes.func.isRequired,
    availableListMode: PropTypes.bool,
    isLoading: PropTypes.bool.isRequired,
    addNumbers: PropTypes.func.isRequired,
    onScrollPositionChange: PropTypes.func.isRequired,
    onScrollPositionSetter: PropTypes.func.isRequired,
    loadMore: PropTypes.func.isRequired,

    t: PropTypes.func.isRequired
  };

  state = {
    dialog: null,
    openRow: null
  };

  ///// RELASE NUMBERS DIALOG SETUP /////

  handleReleaseNumbers = clearSelection => (items, inverted) => {
    // this.props.handle... items, inverted
    inverted
      ? console.log("Bulk release all, except: " + items.length + " items!")
      : console.log("Bulk release on " + items.length + " items!");
    this.closeReleaseNumbersDialog();
    clearSelection();
  };

  closeReleaseNumbersDialog = () => this.setState({ dialog: null });

  openReleaseNumbersDialog = (items, inverted, clearSelection) =>
    this.setState({ dialog: { items, inverted, clearSelection } });

  ReleaseNumbersDialog = () =>
    this.state.dialog ? (
      <ReleaseNumbers
        numbers={this.props.numbers}
        numbersCount={this.props.numbersCount}
        isLoading={this.props.isLoading}
        loadMore={this.props.loadMore}
        selectedItems={this.state.dialog.items}
        inverted={this.state.dialog.inverted}
        onCancel={this.closeReleaseNumbersDialog}
        onConfirm={this.handleReleaseNumbers(this.state.dialog.clearSelection)}
      />
    ) : null;

  ///// LIST SETUP /////

  basicListSchema = [
    {
      display: "hoverBar"
    },
    {
      display: "flex",
      heading: "bandNumber",
      args: ["number", "bandType"],
      render: AvatarBandCell,
      hidden: false
    },
    {
      display: "flex",
      heading: "tags",
      args: ["tags"],
      render: TagsCell,
      hidden: true
    },
    {
      display: "flex",
      heading: "rate",
      args: ["rate"],
      render: SimpleTextCell,
      hidden: true
    }
  ];

  listSchema = this.props.availableListMode
    ? this.basicListSchema
    : [
        ...this.basicListSchema,
        {
          display: "180px",
          heading: "status",
          args: ["status", "serviceName"],
          render: NumbersStatusCell2,
          hidden: false
        }
      ];

  basicBulkActions = [
    {
      label: "updateService",
      onClick: (items, inverted, clearSelection) => {
        inverted
          ? console.log("Bulk updateService all, except: " + items.length + " items!")
          : console.log("Bulk updateService " + items.length + " items!");
        inverted
          ? this.props.allocateNumbers(
              this.props.numbers.filter(n => !items.find(item => item === n))
            )
          : this.props.allocateNumbers(items);
      }
    },
    {
      icon: "more_horiz",
      bulkMenu: [
        {
          label: "otherAction1",
          icon: "settings",
          onClick: (items, inverted, clearSelection) => {
            inverted
              ? console.log("Bulk otherAction1 all, except: " + items.length + " items!")
              : console.log("Bulk otherAction1 on " + items.length + " items!");
          }
        },
        {
          label: "otherAction2",
          icon: "settings",
          onClick: (items, inverted, clearSelection) => {
            inverted
              ? console.log("Bulk otherAction2 all, except: " + items.length + " items!")
              : console.log("Bulk otherAction2 on " + items.length + " items!");
          }
        }
      ]
    }
  ];

  bulkActions = this.props.availableListMode
    ? [
        {
          label: "releaseNumbers",
          icon: "delete",
          onClick: this.openReleaseNumbersDialog
        },
        ...this.basicBulkActions
      ]
    : this.basicBulkActions;

  render() {
    const {
      numbers,
      numbersCount,
      addNumbers,
      isLoading,
      onScrollPositionChange,
      onScrollPositionSetter,
      loadMore,
      t
    } = this.props;

    const ReleaseNumbersDialog = this.ReleaseNumbersDialog;

    return (
      <VirtualizedList
        data={numbers}
        dataCount={numbersCount}
        schema={this.listSchema}
        getKeyFn={item => item.id}
        bulkActions={this.bulkActions}
        handleAddClick={addNumbers}
        onScrollPositionChange={onScrollPositionChange}
        onScrollPositionSetter={onScrollPositionSetter}
        isLoading={isLoading}
        loadMore={loadMore}
        t={t}
      >
        <ReleaseNumbersDialog />
      </VirtualizedList>
    );
  }
}

export default translate("numbers")(ListNumbers);
