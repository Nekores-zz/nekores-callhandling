/**
 * by A. Prates, may-2018
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  AvatarWithLabelSimpleCell,
  BandCell,
  NumbersRowDisplay,
  RowDisplayPanel,
  SimpleTextCell,
  UpdatedAtTwoLinesCell,
  VirtualizedList
} from "components";
import { translate } from "react-i18next";

class ListNumbers extends Component {
  static propTypes = {
    numbers: PropTypes.array.isRequired,
    numbersCount: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
    addNumbers: PropTypes.func.isRequired,
    editNumber: PropTypes.func.isRequired,
    dialogToggle: PropTypes.func.isRequired,
    onScrollPositionChange: PropTypes.func.isRequired,
    onScrollPositionSetter: PropTypes.func.isRequired,
    loadMore: PropTypes.func.isRequired,

    t: PropTypes.func.isRequired
  };

  state = {
    openRow: null
  };

  ///// QUICK-VIEW SETUP /////

  openQuickView = row => {
    this.props.dialogToggle(row);
    this.setState({ openRow: row });
  };

  closeQuickView = () => {
    this.props.dialogToggle(this.state.openRow);
    this.setState({ openRow: null });
  };

  handleEditNumber = number => {
    this.props.editNumber(number.id);
  };

  QuickView = () =>
    this.state.openRow ? (
      <RowDisplayPanel
        rowData={this.state.openRow}
        getHeader={row => ({ color: row.id, name: row.number })}
        content={{ render: NumbersRowDisplay }}
        onClose={this.closeQuickView}
        onEdit={this.handleEditNumber}
        t={this.props.t}
      />
    ) : null;

  ///// LIST SETUP /////

  sortGroupFn = row => {
    const { t } = this.props;
    return row.isFavorite ? t("favorites") : t("other");
  };

  handleFavoriteClick = row => {
    let numbers = [...this.state.numbers];
    let i = numbers.findIndex(n => n.id === row.id);
    numbers[i].isFavorite = !numbers[i].isFavorite;
    numbers = [
      ...numbers.filter(item => item.isFavorite),
      ...numbers.filter(item => !item.isFavorite)
    ];
    this.setState({ numbers: numbers });
  };

  listSchema = [
    {
      display: "hoverBar"
    },
    {
      display: "flex",
      heading: "number",
      args: ["id", "number"],
      render: AvatarWithLabelSimpleCell,
      hidden: false
    },
    {
      display: "180 px",
      heading: "network",
      args: ["network"],
      render: SimpleTextCell,
      hidden: false
    },
    {
      display: "180 px",
      heading: "band",
      args: ["bandType"],
      render: BandCell,
      hidden: true
    },
    {
      display: "180 px",
      heading: "dateAdded",
      args: ["updatedBy"],
      render: UpdatedAtTwoLinesCell,
      hidden: true
    },
    {
      display: "180 px",
      heading: "account",
      args: ["accountName"],
      render: SimpleTextCell,
      hidden: true
    },
    {
      display: "180 px",
      heading: "service",
      args: ["serviceName"],
      render: SimpleTextCell,
      hidden: true
    }
  ];

  bulkActions = [
    {
      label: "configureAndRelease",
      onClick: (items, inverted, clearSelection) => {
        inverted
          ? console.log("Bulk configureAndRelease all, except: " + items.length + " items!")
          : console.log("Bulk configureAndRelease " + items.length + " items!");
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

  render = () => {
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

    const QuickView = this.QuickView;

    return (
      <VirtualizedList
        data={numbers}
        dataCount={numbersCount}
        schema={this.listSchema}
        getKeyFn={item => item.id}
        bulkActions={this.bulkActions}
        handleRowClick={this.openQuickView}
        handleAddClick={addNumbers}
        sortGroupFn={this.sortGroupFn}
        onScrollPositionChange={onScrollPositionChange}
        onScrollPositionSetter={onScrollPositionSetter}
        isLoading={isLoading}
        loadMore={loadMore}
        t={t}
      >
        <QuickView />
      </VirtualizedList>
    );
  };
}

export default translate("numbers")(ListNumbers);
