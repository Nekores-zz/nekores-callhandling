import React, { Component } from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";
import {
  AvatarSimpleCell,
  AudioSetRowDisplay,
  RowDisplayPanel,
  VirtualizedList,
  Text,
  ConfirmDialog
} from "components";

class ListAudioSets extends Component {
  static propTypes = {
    audioSets: PropTypes.array.isRequired,
    openAudioSetClickHandler: PropTypes.func.isRequired,
    createAudioSetClickHandler: PropTypes.func.isRequired,
    editAudioSet: PropTypes.func.isRequired,
    deleteAudioSets: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    loadMore: PropTypes.func,
    onScrollPositionChange: PropTypes.func.isRequired,
    onScrollPositionSetter: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired
  };

  state = {
    openRow: null
  };

  editAudioSet(component) {
    return audioSet => component.props.editAudioSet(audioSet.id);
  }

  openAudioSetClickHandler(component) {
    return audioSet => component.props.openAudioSetClickHandler(audioSet.id);
  }

  ///// Quickview Setup /////
  openQuickView = row => {
    this.setState({ openRow: row });
  };

  closeQuickView = () => {
    this.setState({ openRow: null });
  };

  QuickView = () =>
    this.state.openRow ? (
      <RowDisplayPanel
        rowData={this.state.openRow}
        getHeader={row => ({ color: row.id, name: row.name })}
        content={{ render: AudioSetRowDisplay }}
        onClose={this.closeQuickView}
        onEdit={this.editAudioSet(this)}
        t={this.props.t}
        onStar={false}
      />
    ) : null;

  ///// REMOVE AUDIO SET DIALOG SETUP /////
  removeAudioSets = (isAllDelete, audioSets) => {
    // this.props.deleteAudioSets(isAllDelete, audioSets.map(audioSet => audioSet.toScala()));
    this.props.deleteAudioSets(audioSets.map(audioSet => audioSet.toScala()));
  };

  handleRemoveAudioSets = clearSelection => (audioSets, inverted) => {
    inverted ? this.removeAudioSets(true, audioSets) : this.removeAudioSets(false, audioSets);
    this.closeConfirmRemoveAudioSetDialog();
    clearSelection();
  };

  closeConfirmRemoveAudioSetDialog = () => this.setState({ confirmDialog: null });

  openConfirmRemoveAudioSetDialog = (audioSets, inverted, clearSelection) => {
    let audioSetsList = audioSets;
    if (!Array.isArray(audioSetsList)) {
      audioSetsList = [audioSets];
      inverted = false;
      clearSelection = () => {};
    }
    this.setState({
      openRow: null,
      confirmDialog: { audioSets: audioSetsList, inverted, clearSelection }
    });
  };

  ConfirmRemoveAudioSetDialog = () =>
    this.state.confirmDialog ? (
      <ConfirmDialog
        dialogMessage={this.props.t("countAudioSetsWillBeRemoved", {
          count: this.state.confirmDialog.inverted
            ? this.props.audioSets.length - this.state.confirmDialog.audioSets.length
            : this.state.confirmDialog.audioSets.length
        })}
        confirmMessage={this.props.t("iUnderstandRemoveAudioSetsMsg")}
        selectedItems={this.state.confirmDialog.audioSets}
        inverted={this.state.confirmDialog.inverted}
        onCancel={this.closeConfirmRemoveAudioSetDialog}
        onConfirm={this.handleRemoveAudioSets(this.state.confirmDialog.clearSelection)}
      />
    ) : null;

  listSchema = [
    {
      display: "hoverBar"
    },
    {
      display: "flex",
      heading: "groups",
      args: ["id", "name"],
      render: AvatarSimpleCell,
      hidden: false
    },
    {
      display: "spacer",
      hidden: true
    },
    {
      display: "actions",
      args: [
        { label: "quickView", action: this.openQuickView, icon: "remove_red_eye" },
        { label: "edit", action: this.editAudioSet(this), icon: "edit" }
      ],
      hidden: true
    }
  ];

  bulkActions = [
    {
      icon: "more_horiz",
      bulkMenu: [
        {
          label: "delete",
          icon: "delete",
          onClick: this.openConfirmRemoveAudioSetDialog
          // onClick: (items, inverted, clearSelection) => {
          //   let audioSets = this.props.audioSets;
          //   if (inverted) {
          //     this.props.deleteAudioSets(
          //       audioSets.filter(set => !items.find(item => item.id === set.id))
          //     );
          //   } else {
          //     this.props.deleteAudioSets(items);
          //   }
          //   clearSelection();
          // }
        }
      ]
    }
  ];

  sortGroupFn = row => {
    const { t } = this.props;
    return row.isFavourite ? t("favorites") : t("other");
  };

  render() {
    const { t, audioSets } = this.props;
    const QuickView = this.QuickView;
    const ConfirmRemoveAudioSetDialog = this.ConfirmRemoveAudioSetDialog;

    return (
      <VirtualizedList
        data={audioSets}
        dataCount={audioSets.length} // TODO: dataCount has to come from api to allow lazy loading
        schema={this.listSchema}
        getKeyFn={item => item.id}
        getActionPermission={(row, action) => true} // TODO: implement permission check
        sortGroupFn={this.sortGroupFn}
        bulkActions={this.bulkActions}
        handleRowClick={this.openAudioSetClickHandler(this)}
        handleAddClick={this.props.createAudioSetClickHandler}
        isLoading={this.props.isLoading}
        loadMore={this.props.loadMore}
        onScrollPositionChange={this.props.onScrollPositionChange}
        onScrollPositionSetter={this.props.onScrollPositionSetter}
        t={t}
        headless
      >
        <QuickView />
        <ConfirmRemoveAudioSetDialog />
      </VirtualizedList>
    );
  }
}

export default translate("audio")(ListAudioSets);
