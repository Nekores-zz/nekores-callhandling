/**
 * by Sajid U. OCT-2019 
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  AvatarSimpleCell,
  RowDisplayPanel,
  TagsCell,
  ReportRowDisplay,
  VirtualizedList
} from "components";
import { translate } from "react-i18next";
import {reportExample1} from "config/reportMockData2"

class ListReport extends Component {
  static propTypes = {
    manageReport: PropTypes.func.isRequired,
    isEmpty: PropTypes.bool.isRequired,
    reports: PropTypes.array.isRequired,
    reportsCount: PropTypes.number.isRequired,
    createReport: PropTypes.func, // it might be undefined, depending on user permissions
    isLoading: PropTypes.bool.isRequired,
    onScrollPositionChange: PropTypes.func.isRequired,
    onScrollPositionSetter: PropTypes.func.isRequired,
    loadMore: PropTypes.func.isRequired,
    dialogToggle: PropTypes.func.isRequired,
    t:PropTypes.func.isRequired
  };

  state = {
    openRow: null
  };

  isFavorite = report =>
    report.favoriteUsers && report.favoriteUsers.indexOf(this.props.currentUser) !== -1;

  handleFavoriteClick = report =>
    this.props.handleFavoriteClick(report.toScala(), !this.isFavorite(report));

  handleRunReport = row => this.props.manageReport(row.id);

  listSchema = [
    {
      display: "hoverBar"
    },
    {
      display: "flex",
      heading: "reports",
      args: ["id", "name"],
      render: AvatarSimpleCell,
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
      display: "actions",
      args: [
        { label: "favorite", action: this.handleFavoriteClick, isFavorite: this.isFavorite },
        { label: "run", action: this.handleRunReport, icon: "play_circle_outline" },
        { label: "menu" }
      ],
      hidden: true
    }
  ];

  menu = [
    {
      label: "run",
      icon: "play_circle_outline",
      onClick: this.handleRunReport
    },
    {
      label: "viewSampleReport",
      icon: "remove_red_eye",
      onClick: () => {
        alert("View!");
      }
    },
    {
      label: "edit",
      icon: "edit",
      onClick: () => {
        alert("edit!");
      }
    },
    {
      label: "share",
      icon: "share",
      onClick: () => {
        alert("Share!");
      }
    },
    {
      label: "delete",
      icon: "delete",
      onClick: () => {
        alert("Delete!");
      }
    }
  ];

  bulkActions = [
    {
      icon: "archive",
      onClick: this.openConfirmArchiveReportsDialog
    },
    {
      icon: "edit",
      onClick: (items, inverted, clearSelection) => {
        inverted
          ? console.log(`Bulk edit all, except: ${ items.length} items!`)
          : console.log(`Bulk edit  ${items.length} items!`);
      }
    },
    {
      icon: "delete",
      onClick: (items, inverted, clearSelection) => {
        inverted
          ? console.log(`Bulk delete all, except:${ items.length } items!`)
          : console.log(`Bulk delete ${items.length}  items!`);
      }
    },
    {
      icon: "more_horiz",
      bulkMenu: [
        {
          label: "report",
          icon: "play_circle_outline",
          onClick: (items, inverted, clearSelection) => {
            inverted 
              ? console.log(`Bulk otherAction1 all, except: ${items.length} items!`)
              : console.log(`Bulk otherAction1 on ${items.length} items!`); 
          }
        },
        {
          label: "report",
          icon: "settings",
          onClick: (items, inverted, clearSelection) => {
            inverted
              ? console.log(`Bulk otherAction2 all, except: ${items.length} items!`)
              : console.log(`Bulk otherAction2 on ${items.length} items!`);
          }
        }
      ]
    }
  ];

  sortGroupFn = row => {
    const { t } = this.props;
    return row.isFavorite ? t("favorites") : t("other");
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

  QuickView = () =>
    this.state.openRow ? (
      <RowDisplayPanel
        rowData={this.state.openRow}
        getHeader={row => ({ color: row.id, name: row.name })}
        content={{
          render: ReportRowDisplay,
          props: { thumbnailReportRun: this.handleRunReport }
        }}
        manageReport={this.props.manageReport}
        menu={this.menu}
        onClose={this.closeQuickView}
        onStar={() => {
          alert("Favorite Clicked!");
        }}
        onRun={this.handleRunReport}
        t={this.props.t}
      />
    ) : null;

  render = () => {
    const {
      isEmpty,
      reports,
      reportsCount,
      createReport,
      isLoading,
      onScrollPositionChange,
      onScrollPositionSetter,
      loadMore,
      t
    } = this.props;

    const QuickView = this.QuickView;
    console.log(reportExample1)

    return (
      <VirtualizedList
        isEmpty={isEmpty}
        emptyMessageKeys={{
          startCreatingTitle: "startAddReports",
          startCreatingMsg: "startAddReportsMsg",
          noHitsTitle: "noReportHits",
          noHitsMsg: "noReportHitsMsg"
        }}
        data={reports}
        dataCount={reportsCount}
        schema={this.listSchema}
        getKeyFn={item => item.id}
        getActionPermission={(row, action) => true} // TODO: implement permission check
        getRowMenu={row => this.menu} // TODO: implement permission check
        bulkActions={this.bulkActions}
        sortGroupFn={this.sortGroupFn}
        handleRowClick={this.openQuickView}
        handleAddClick={createReport}
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

export default translate("report", "common")(ListReport);
