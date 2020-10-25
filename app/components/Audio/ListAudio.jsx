import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  AvatarSimpleCell,
  AudioStatusCell,
  AudioRowDisplay,
  RowDisplayPanel,
  VirtualizedList,
  ConfirmDialog
} from "components";
import { translate } from "react-i18next";
import { initialAudio } from "config/audioMockData";

const AudioStatusCellWithPlayer = (audioPlayerInstance, handlePlayPause, handleChangeProgress) => ({
  ...props
}) => (
  <AudioStatusCell
    audioPlayerInstance={audioPlayerInstance}
    onPlayPause={handlePlayPause}
    onChangeProgress={handleChangeProgress}
    {...props}
  />
);

const AudioQuickViewRow = getPlayUrl => ({ ...props }) => (
  <AudioRowDisplay getPlayUrl={getPlayUrl} {...props} />
);

class ListAudio extends Component {
  static propTypes = {
    audioFiles: PropTypes.array.isRequired,
    audioFilesCount: PropTypes.number.isRequired,
    archiveAudio: PropTypes.func.isRequired,
    archiveAudios: PropTypes.func.isRequired,
    deleteAudio: PropTypes.func.isRequired,
    deleteAudios: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    loadMore: PropTypes.func.isRequired,
    onScrollPositionChange: PropTypes.func.isRequired,
    onScrollPositionSetter: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
    setId: PropTypes.string,
    getPlayUrl: PropTypes.func.required,
    t: PropTypes.func.isRequired
  };

  state = {
    openRow: null,
    // confirmDialog: null,
    audioPlayerInstance: {
      currentPlayingFile: null,
      progress: 0,
      playState: "stop"
    }
  };

  componentDidMount() {
    this.player.addEventListener("canplay", this.handleCanPlay);
  }

  handleCanPlay = () => {
    this.player.addEventListener("timeupdate", this.handleTimeUpdate);
    this.player.addEventListener("ended", this.handleTimeEnd);
  };

  handleTimeUpdate = () => {
    const { audioPlayerInstance } = this.state;
    audioPlayerInstance.progress = (this.player.currentTime * 100) / this.player.duration;
    this.setState({ audioPlayerInstance });
  };

  handleTimeEnd = () => {
    const { audioPlayerInstance } = this.state;
    this.player.currentTime = 0;
    this.player.pause();

    audioPlayerInstance.progress = 0;
    audioPlayerInstance.playState = "stop";
    this.setState({ audioPlayerInstance });
  };

  handlePlayPause = fileId => () => {
    const { audioPlayerInstance } = this.state;

    if (audioPlayerInstance.currentPlayingFile === fileId) {
      audioPlayerInstance.playState =
        audioPlayerInstance.playState === "playing" ? "pause" : "playing";
    } else {
      audioPlayerInstance.currentPlayingFile = fileId;
      audioPlayerInstance.playState = "playing";
      audioPlayerInstance.progress = 0;
      if (this.player) {
        this.player.currentTime = 0;
      }
    }

    if (this.player) {
      switch (audioPlayerInstance.playState) {
        case "playing":
          this.player.play();
          break;
        case "pause":
          this.player.pause();
          break;
        case "stop":
          this.player.stop();
          audioPlayerInstance.progress = 0;
          this.player.currentTime = 0;
          break;
      }
    }

    this.setState({ audioPlayerInstance });
  };

  handleChangeProgress = progress => {
    const { audioPlayerInstance } = this.state;
    audioPlayerInstance.progress = progress;
    if (this.player) {
      const position = (audioPlayerInstance.progress * this.player.duration) / 100;
      this.player.currentTime = parseFloat(position);
    }
    this.setState({ audioPlayerInstance });
  };

  AudioStatusCellRender = AudioStatusCellWithPlayer(
    this.state.audioPlayerInstance,
    this.handlePlayPause,
    this.handleChangeProgress
  );

  AudioQuickViewRowRender = AudioQuickViewRow(fileId => this.props.getPlayUrl(fileId, "_"));

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
      display: "30%",
      heading: "status",
      args: ["status", fileId => this.props.getPlayUrl(fileId, "_")],
      render: this.AudioStatusCellRender,
      hidden: true
    },
    {
      display: "spacer",
      hidden: true
    }
  ];

  ///// Quickview Setup /////
  openQuickView = row => {
    this.setState({ openRow: { ...initialAudio, ...row } });
  };

  closeQuickView = () => {
    this.setState({ openRow: null });
  };

  QuickView = () => {
    return this.state.openRow ? (
      <RowDisplayPanel
        rowData={this.state.openRow}
        getHeader={row => ({ color: row.id, name: row.name })}
        content={{ render: this.AudioQuickViewRowRender }}
        menu={this.menu}
        onClose={this.closeQuickView}
        onEdit={file => this.props.navigation.editAudio(file.id)}
        t={this.props.t}
        onStar={false}
      />
    ) : null;
  };

  ///// REMOVE AUDIO DIALOG SETUP /////
  removeAudios = (isAllDelete, audios) => {
    // this.props.deleteAudios(isAllDelete, audios.map(audio => audio.toScala()));
    this.props.deleteAudios(audios.map(audio => audio.toScala()));
  };

  handleRemoveAudios = clearSelection => (audios, inverted) => {
    inverted ? this.removeAudios(true, audios) : this.removeAudios(false, audios);
    this.closeConfirmRemoveAudioDialog();
    clearSelection();
  };

  closeConfirmRemoveAudioDialog = () => this.setState({ confirmDialog: null });

  openConfirmRemoveAudioDialog = (audios, inverted, clearSelection) => {
    let audioList = audios;
    if (!Array.isArray(audioList)) {
      audioList = [audios];
      inverted = false;
      clearSelection = () => {};
    }
    this.setState({
      openRow: null,
      confirmDialog: { audios: audioList, inverted, clearSelection }
    });
  };

  ConfirmRemoveAudioDialog = () =>
    this.state.confirmDialog ? (
      <ConfirmDialog
        dialogMessage={this.props.t("countAudiosWillBeRemoved", {
          count: this.state.confirmDialog.inverted
            ? this.props.audioFilesCount - this.state.confirmDialog.audios.length
            : this.state.confirmDialog.audios.length
        })}
        confirmMessage={this.props.t("iUnderstandRemoveAudiosMsg")}
        selectedItems={this.state.confirmDialog.audios}
        inverted={this.state.confirmDialog.inverted}
        onCancel={this.closeConfirmRemoveAudioDialog}
        onConfirm={this.handleRemoveAudios(this.state.confirmDialog.clearSelection)}
      />
    ) : null;

  bulkActions = [
    {
      icon: "archive",
      onClick: (items, inverted, clearSelection) => {
        // this is just an example
        inverted
          ? console.log("Bulk archive all, except: " + items.length + " items!")
          : console.log("Bulk archive " + items.length + " items!");
        console.log(items);
        clearSelection();
      }
    },
    {
      icon: "more_horiz",
      bulkMenu: [
        {
          label: "delete",
          icon: "delete",
          onClick: this.openConfirmRemoveAudioDialog
          // onClick: (items, inverted, clearSelection) => {
          //   openConfirmRemoveAudioDialog(items, inverted, clearSelection);
          //   // // this is just an example
          //   // if (inverted) {
          //   //   this.props.deleteAudios(
          //   //     this.props.audioFiles.filter(audio => !items.find(item => item.id === audio.id))
          //   //   );
          //   // } else {
          //   //   this.props.deleteAudios(items);
          //   // }
          //   // clearSelection();
          //   // clearSelection();
          // }
        }
      ]
    }
  ];

  menu = [
    {
      label: "delete",
      icon: "delete",
      onClick: this.openConfirmRemoveAudioDialog
    }
  ];

  render = () => {
    const {
      audioFiles,
      audioFilesCount,
      isLoading,
      loadMore,
      onScrollPositionChange,
      onScrollPositionSetter,
      t
    } = this.props;
    const { audioPlayerInstance } = this.state;

    const QuickView = this.QuickView;
    const ConfirmRemoveAudioDialog = this.ConfirmRemoveAudioDialog;
    return (
      <VirtualizedList
        data={audioFiles}
        dataCount={audioFilesCount}
        schema={this.listSchema}
        getKeyFn={item => item.id}
        bulkActions={this.bulkActions}
        handleRowClick={this.openQuickView}
        handleAddClick={() => this.props.navigation.uploadAudio(this.props.setId)}
        isLoading={isLoading}
        loadMore={loadMore}
        onScrollPositionChange={onScrollPositionChange}
        onScrollPositionSetter={onScrollPositionSetter}
        t={t}
        headless
      >
        <QuickView />
        <ConfirmRemoveAudioDialog />
        <audio ref={node => (this.player = node)} controls={true} preload="auto" hidden={true}>
          {audioPlayerInstance.currentPlayingFile && (
            <source
              src={this.props.getPlayUrl(audioPlayerInstance.currentPlayingFile, "_")}
              type="audio/mp3"
            />
          )}
        </audio>
      </VirtualizedList>
    );
  };
}

export default translate("audio")(ListAudio);
