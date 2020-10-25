/*
 * Copyright (c) 2019. call-handling services [https://www.callhandling.co.uk/]
 * Author: 4ητonio Prατєs [antonioprates@gmail.com], may-2018 - dec-2019
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  AvatarVersionCell,
  RowDisplayPanel,
  TagsCell,
  VersionRowDisplay,
  VersionStatusCell,
  VirtualizedList,
  UpdatedAtTwoLinesCell
} from "components";
import { translate } from "react-i18next";

class ManageServiceVersions extends Component {
  static propTypes = {
    isEmpty: PropTypes.bool.isRequired,
    versions: PropTypes.array.isRequired,
    versionsCount: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
    addVersion: PropTypes.func.isRequired,
    editVersion: PropTypes.func.isRequired,
    archiveVersion: PropTypes.func.isRequired,
    dialogToggle: PropTypes.func.isRequired,
    onScrollPositionChange: PropTypes.func.isRequired,
    onScrollPositionSetter: PropTypes.func.isRequired,
    loadMore: PropTypes.func.isRequired,

    t: PropTypes.func.isRequired
  };

  state = {
    openRow: null
  };

  editVersion = row => this.props.editVersion(row.toScala());

  archiveVersion = row => this.props.archiveVersion(row.toScala());

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
        getHeader={row => ({
          color: row.id,
          name: this.props.t("versionName", {
            version: row.versionNumber.majorVersion + "." + row.versionNumber.minorVersion
          })
        })}
        content={{ render: VersionRowDisplay }}
        menu={this.menu}
        onClose={this.closeQuickView}
        onEdit={this.editVersion}
        t={this.props.t}
      />
    ) : null;

  ///// LIST SETUP /////

  sortGroupFn = row => {
    const { t } = this.props;
    return row.status === "nv" ? t("otherVersions") : t("activeVersions");
  };

  listSchema = [
    {
      display: "hoverBar"
    },
    {
      display: "flex",
      heading: "versions",
      args: ["id", "versionNumber"],
      render: AvatarVersionCell,
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
      display: "200px",
      heading: "lastOpened",
      args: ["updatedBy"],
      render: UpdatedAtTwoLinesCell,
      hidden: true
    },
    {
      display: "flex",
      heading: "status",
      args: ["status"],
      render: VersionStatusCell,
      hidden: true
    },
    {
      display: "actions",
      args: [
        { label: "edit", action: this.editVersion, icon: "edit" },
        { label: "archive", action: this.archiveVersion, icon: "archive" }
      ],
      hidden: true
    }
  ];

  menu = [
    {
      label: "archive",
      icon: "archive",
      onClick: this.props.archiveVersion
    }
  ];

  bulkActions = [
    {
      icon: "edit",
      onClick: (items, inverted, clearSelection) => {
        inverted
          ? console.log("Bulk edit all, except: " + items.length + " items!")
          : console.log("Bulk edit " + items.length + " items!");
      }
    },
    {
      icon: "archive",
      onClick: (items, inverted, clearSelection) => {
        inverted
          ? console.log("Bulk archive all, except: " + items.length + " items!")
          : console.log("Bulk archive " + items.length + " items!");
      }
    }
  ];

  render = () => {
    const {
      isEmpty,
      versions,
      versionsCount,
      addVersion,
      isLoading,
      onScrollPositionChange,
      onScrollPositionSetter,
      loadMore,

      t
    } = this.props;

    const QuickView = this.QuickView;

    return (
      <VirtualizedList
        isEmpty={isEmpty}
        emptyMessageKeys={{
          startCreatingTitle: "startAddServices",
          startCreatingMsg: "startAddServicesMsg",
          noHitsTitle: "noServiceHits",
          noHitsMsg: "noServiceHitsMsg"
        }}
        data={versions}
        dataCount={versionsCount}
        schema={this.listSchema}
        getKeyFn={item => item.id}
        getActionPermission={(row, action) => true} // TODO: implement permission check
        bulkActions={this.bulkActions}
        handleRowClick={this.openQuickView}
        handleAddClick={addVersion}
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

export default translate("services")(ManageServiceVersions);
