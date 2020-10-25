/*
 * Copyright (c) 2019. call-handling services [https://www.callhandling.co.uk/]
 * Author: 4ητonio Prατєs [antonioprates@gmail.com], may-2018 - sep-2019
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  AvatarSimpleCell,
  RowDisplayPanel,
  ServiceRowDisplay,
  TwoLinesCell,
  UpdatedAtTwoLinesCell,
  VirtualizedList,
  ConfirmDialog
} from "components";
import { translate } from "react-i18next";

class ListServices extends Component {
  static propTypes = {
    isEmpty: PropTypes.bool.isRequired,
    services: PropTypes.array.isRequired,
    servicesCount: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
    createService: PropTypes.func.isRequired,
    manageService: PropTypes.func.isRequired,
    archiveServices: PropTypes.func.isRequired,
    archiveAllServicesExcept: PropTypes.func.isRequired,
    dialogToggle: PropTypes.func.isRequired,
    onScrollPositionChange: PropTypes.func.isRequired,
    onScrollPositionSetter: PropTypes.func.isRequired,
    loadMore: PropTypes.func.isRequired,

    t: PropTypes.func.isRequired
  };

  state = {
    openRow: null,
    confirmDialog: null
  };

  ///// CONFIRM ARCHIVE DIALOG SETUP /////

  archiveServices = services => this.props.archiveServices(services.map(service => service.id));

  archiveAllServicesExcept = services =>
    this.props.archiveAllServicesExcept(services.map(service => service.id));

  handleArchiveServices = clearSelection => (services, inverted) => {
    const promise = inverted
      ? this.archiveAllServicesExcept(services)
      : this.archiveServices(services);
    console.log(promise);
    promise.then(response => console.log(response)).catch(failure => console.log(failure));
    this.closeConfirmArchiveServicesDialog();
    clearSelection();
  };

  closeConfirmArchiveServicesDialog = () => this.setState({ confirmDialog: null });

  openConfirmArchiveServicesDialog = (services, inverted, clearSelection) =>
    this.setState({ confirmDialog: { services, inverted, clearSelection } });

  ConfirmArchiveServicesDialog = () =>
    this.state.confirmDialog ? (
      <ConfirmDialog
        dialogMessage={this.props.t("countServicesWillBeArchived", {
          count: this.state.confirmDialog.inverted
            ? this.props.servicesCount - this.state.confirmDialog.services.length
            : this.state.confirmDialog.services.length
        })}
        confirmMessage={this.props.t("iUnderstandArchiveServicesMsg")}
        selectedItems={this.state.confirmDialog.services}
        inverted={this.state.confirmDialog.inverted}
        onCancel={this.closeConfirmArchiveServicesDialog}
        onConfirm={this.handleArchiveServices(this.state.confirmDialog.clearSelection)}
      />
    ) : null;

  ///// QUICK-VIEW SETUP /////

  openQuickView = row => {
    this.props.dialogToggle(row);
    this.setState({ openRow: row });
  };

  closeQuickView = () => {
    this.props.dialogToggle(this.state.openRow);
    this.setState({ openRow: null });
  };

  QuickView = () =>
    this.state.openRow ? (
      <RowDisplayPanel
        rowData={this.state.openRow}
        getHeader={row => ({ color: row.id, name: row.name })}
        content={{ render: ServiceRowDisplay }}
        menu={this.menu}
        onClose={this.closeQuickView}
        onEdit={this.handleEditRowContent}
        t={this.props.t}
      />
    ) : null;

  ///// LIST SETUP /////

  handleMenuClick = row => console.log("Call action on item: " + row.id);

  handleEditRowContent = row => this.props.manageService(row.id);

  handleArchiveService = row => this.openConfirmArchiveServicesDialog([row], false, () => {});

  listSchema = [
    {
      display: "hoverBar"
    },
    {
      display: "flex",
      heading: "services",
      args: ["id", "name"],
      render: AvatarSimpleCell,
      hidden: false
    },
    {
      display: "200px",
      heading: "lastOpened",
      args: ["updatedBy"],
      render: UpdatedAtTwoLinesCell,
      hidden: true
    },
    {
      display: "180px",
      heading: "status",
      args: ["status", "statusFrom"],
      render: TwoLinesCell,
      hidden: true
    },
    {
      display: "spacer",
      hidden: true
    },
    {
      display: "actions",
      args: [{ label: "menu" }],
      hidden: true
    }
  ];

  menu = [
    {
      label: "design",
      icon: "edit",
      onClick: this.handleMenuClick
    },
    {
      label: "debug",
      icon: "bug_report",
      onClick: this.handleMenuClick
    },
    {
      label: "monitor",
      icon: "dvr",
      onClick: this.handleMenuClick
    },
    {
      label: "archive",
      icon: "archive",
      onClick: this.handleArchiveService
    }
  ];

  listMenu = [
    {
      label: "manage",
      icon: "settings",
      onClick: this.handleEditRowContent
    },
    ...this.menu
  ];

  bulkActions = [
    {
      icon: "archive",
      onClick: this.openConfirmArchiveServicesDialog
    },
    {
      icon: "edit",
      onClick: (items, inverted, clearSelection) => {
        inverted
          ? console.log("Bulk edit all, except: " + items.length + " items!")
          : console.log("Bulk edit " + items.length + " items!");
      }
    },
    {
      icon: "delete",
      onClick: (items, inverted, clearSelection) => {
        inverted
          ? console.log("Bulk delete all, except: " + items.length + " items!")
          : console.log("Bulk delete " + items.length + " items!");
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

  render() {
    const {
      isEmpty,
      services,
      servicesCount,
      createService,
      isLoading,
      onScrollPositionChange,
      onScrollPositionSetter,
      loadMore,

      t
    } = this.props;

    const QuickView = this.QuickView;
    const ConfirmArchiveServicesDialog = this.ConfirmArchiveServicesDialog;

    return (
      <VirtualizedList
        isEmpty={isEmpty}
        emptyMessageKeys={{
          startCreatingTitle: "startAddServices",
          startCreatingMsg: "startAddServicesMsg",
          noHitsTitle: "noServiceHits",
          noHitsMsg: "noServiceHitsMsg"
        }}
        data={services}
        dataCount={servicesCount}
        schema={this.listSchema}
        getKeyFn={item => item.id}
        getActionPermission={(row, action) => true} // TODO: implement permission check
        getRowMenu={row => this.listMenu} // TODO: implement permission check
        bulkActions={this.bulkActions}
        handleRowClick={this.openQuickView}
        handleAddClick={createService}
        onScrollPositionChange={onScrollPositionChange}
        onScrollPositionSetter={onScrollPositionSetter}
        isLoading={isLoading}
        loadMore={loadMore}
        t={t}
      >
        <QuickView />

        <ConfirmArchiveServicesDialog />
      </VirtualizedList>
    );
  }
}

export default translate("services")(ListServices);
