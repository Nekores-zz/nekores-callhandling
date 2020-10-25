import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { MenuItem, Checkbox, withStyles, withWidth } from "@material-ui/core";
import { IconButton, Icon, DropDownMenu, PaginationBar } from "components/Elements";
import { Text, Box, Stretch, Row, Column } from "components/LayoutElements";
import { translate } from "react-i18next";
import AudioFileRow from "./AudioFileRow";
import Searchbar from "components/Searchbar/Searchbar";
import { ConfirmDialog } from "components";
import { styleSheet } from "jss/Audio/UploadAudio";

const ListContainer = ({ children }) => (
  <Column borderHalf stretch>
    {children}
  </Column>
);

const ListRow = ({ children, isSelected, ...props }) => (
  <Row borderHalf paddingHalf backgroundHighlight={isSelected} {...props}>
    {children}
  </Row>
);

const ListHeaderRow = ({ children, ...props }) => <ListRow {...props}>{children}</ListRow>;

class AudioFileList extends Component {
  static propTypes = {
    getPlayUrl: PropTypes.func,
    files: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
    isUploadMode: PropTypes.bool,
    uploadModeSelected: PropTypes.string,
    maxHeight: PropTypes.number,

    onDeleteRow: PropTypes.func,
    onDeleteRows: PropTypes.func,
    onFileRename: PropTypes.func,
    onAudioPlayPause: PropTypes.func,
    onUploadModeChange: PropTypes.func,
    onSearchText: PropTypes.func
  };

  state = {
    currentPage: 0,
    pageRows: 10,
    searchText: "",
    deleteDialog: false,
    deleteFiles: [],
    uploadModeExpanded: false,

    audioPlayerInstance: {
      currentPlayingFile: null,
      progress: 0,
      playState: "stop"
    }
  };

  // audioPlayer events
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

  handlePlayPause = fileId => {
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
  // end of audioPlayer events

  handleRowsPerPageChange = rows => {
    const page = Math.ceil((this.state.pageRows * (this.state.currentPage + 1)) / rows) - 1;
    this.setState({ pageRows: rows, currentPage: page });
  };

  handleGotoPage = page => {
    this.setState({ currentPage: page });
  };

  handleSearch = searchText => {
    this.setState({ searchText: searchText, currentPage: 0 });
    return new Promise((resolve, reject) => {
      reject(null);
    });
  };

  clearSearchbar = () => {
    this.setState({ searchText: "", currentPage: 0 });
  };

  handleRowSelect = audioFile => {
    audioFile.selected = !audioFile.selected;
    this.setState({});
  };

  handleSelectAll = files => () => {
    let isAllSelected = true;
    Array.prototype.forEach.call(files, file => {
      if (file.state !== "uploading" && !file.selected) {
        isAllSelected = false;
        return false;
      }
    });
    Array.prototype.forEach.call(
      files,
      file => file.state !== "uploading" && (file.selected = !isAllSelected)
    );
    this.setState({});
  };

  handleDeleteSelection = files => () => {
    const deleteFiles = Array.prototype.filter.call(files, file => file.selected === true);
    console.log(deleteFiles);
    this.setState({ deleteFiles: deleteFiles, deleteDialog: true });
  };

  handleConfirmDeleteDialog = () => {
    this.props.onDeleteRows(this.state.deleteFiles);
    this.setState({ deleteDialog: false });
  };

  handleCancelDeleteDialog = () => {
    this.setState({ deleteFiles: [], deleteDialog: false });
  };

  handleClearSelection = files => () => {
    Array.prototype.forEach.call(files, file => (file.selected = false));
    this.setState({});
  };

  handleExpandUploadMode = expanded => {
    this.setState({ uploadModeExpanded: expanded });
  };

  handleUploadModeChange = mode => event => {
    this.props.onUploadModeChange(mode);
    this.setState({ uploadModeExpanded: false });
  };

  render = () => {
    const {
      t,
      files,
      classes,
      isUploadMode,
      uploadModeSelected,
      maxHeight,
      onUploadModeChange
    } = this.props;

    const { audioPlayerInstance, currentPage, pageRows, searchText, deleteDialog } = this.state;

    const uploadingFilesLength = Array.prototype.filter.call(
      files,
      file => file.state === "uploading"
    ).length;
    const searchedFiles = Array.prototype.filter.call(
      files,
      file => file.name.indexOf(searchText) != -1
    );
    const uploadedFilesLength = searchedFiles.filter(file => file.state !== "uploading").length;

    let selectedCount = 0;
    searchedFiles.forEach(file => (selectedCount += !!file.selected));
    return (
      <div>
        {files.map(file => {
          return (
            <audio controls={true} preload="auto">
              <source src={this.props.getPlayUrl(file.id)} type="audio/mp3" />
            </audio>
          );
        })}
        <ListContainer>
          <audio ref={node => (this.player = node)} controls={true} preload="auto" hidden={true}>
            {audioPlayerInstance.currentPlayingFile && (
              <source
                src={this.props.getPlayUrl(audioPlayerInstance.currentPlayingFile)}
                type="audio/mp3"
              />
            )}
          </audio>
          {!!selectedCount ? (
            <ListHeaderRow classes={{ box: classes.uploadFileListHeader }}>
              <Box paddingLeftHalf>
                <IconButton
                  onClick={this.handleSelectAll(searchedFiles)}
                  color="inherit"
                  className={classes.checkboxIcon}
                >
                  {selectedCount === uploadedFilesLength ? (
                    <Icon>check_box</Icon>
                  ) : (
                    <Icon>check_box_outline_blank</Icon>
                  )}
                </IconButton>
              </Box>
              <Box paddingLeftHalf>
                <Text className={classes.uploadFileListHeaderText}>
                  {t("rowsSelected", { selectedCount })}
                </Text>
              </Box>
              <Stretch />

              <Box>
                <Box>
                  <IconButton
                    onClick={this.handleDeleteSelection(searchedFiles)}
                    className={classes.uploadFileListHeaderText}
                  >
                    <Icon fontSize="small">delete</Icon>
                  </IconButton>
                  <ConfirmDialog
                    open={deleteDialog}
                    headerTitle={t("confirmDeleteMultiTitle")}
                    primaryMessage={t("stillWantToDelete")}
                    dialogMessage={t("removeMultiForever")}
                    confirmLabel={t("confirmDelete")}
                    onConfirm={this.handleConfirmDeleteDialog}
                    onCancel={this.handleCancelDeleteDialog}
                  />
                </Box>
                <Box paddingLeftHalf>
                  <IconButton
                    onClick={this.handleClearSelection(searchedFiles)}
                    className={classes.uploadFileListHeaderText}
                  >
                    <Icon fontSize="small">close</Icon>
                  </IconButton>
                </Box>
              </Box>
            </ListHeaderRow>
          ) : (
            <ListHeaderRow classes={{ box: classes.uploadFileListHeader }}>
              <Box paddingLeft>
                <Text className={classes.uploadFileListHeaderText}>
                  {uploadingFilesLength
                    ? t("uploading")
                    : t("audiosCount", { audioCount: files ? files.length : 0 })}
                </Text>
              </Box>
              <Stretch />
              {files && (
                <Box paddingRightHalf>
                  <Searchbar
                    placeholder="searchFiles"
                    handleSearch={this.handleSearch}
                    handleSearchResult={() => {}}
                    clearSearchbar={this.clearSearchbar}
                    defaultSearchText=""
                    className={classes.searchBar}
                  />
                  {/* <IconButton className={classes.uploadFileListHeaderText} onClick={onSearchText}>
                <Icon>search</Icon>
              </IconButton> */}
                </Box>
              )}
              {isUploadMode && (
                // <Box paddingHalf>
                <Box paddingRightHalf paddingLeft>
                  <DropDownMenu
                    onExpand={this.handleExpandUploadMode}
                    expanded={this.state.uploadModeExpanded}
                    selected={t(uploadModeSelected)}
                    inverted
                    fullWidth
                    className="largeWidth"
                  >
                    <MenuItem
                      value="uploadFiles"
                      onClick={this.handleUploadModeChange("uploadFiles")}
                    >
                      <Text>
                        <Icon>folder</Icon> {t("uploadFiles")}
                      </Text>
                    </MenuItem>
                    <MenuItem
                      value="recordFromPhone"
                      onClick={this.handleUploadModeChange("recordFromPhone")}
                    >
                      <Text>
                        <Icon>phone</Icon> {t("recordFromPhone")}
                      </Text>
                    </MenuItem>
                    <MenuItem
                      value="recordFromBrowser"
                      onClick={this.handleUploadModeChange("recordFromBrowser")}
                    >
                      <Text>
                        <Icon>language</Icon> {t("recordFromBrowser")}
                      </Text>
                    </MenuItem>
                    <MenuItem
                      value="professional"
                      onClick={this.handleUploadModeChange("professional")}
                    >
                      <Text>
                        <Icon>account_box</Icon> {t("professional")}
                        <Text variant="thirdSmallOutlined">{t("paid")}</Text>
                      </Text>
                    </MenuItem>
                  </DropDownMenu>
                </Box>
                // </Box>
              )}
            </ListHeaderRow>
          )}
          {searchText && searchText !== "" && (
            <Row classes={{ box: classes.searchResult }} padding>
              {t("resultsFound", { searchedCount: searchedFiles.length })}
            </Row>
          )}
          {!files || !files.length ? (
            <Box>
              <Text className={classes.noFilesAdded}>{t("noFilesAdded")}</Text>
            </Box>
          ) : (
            <Row>
              <Column>
                {Array.prototype.map.call(
                  Array.prototype.slice.call(
                    searchedFiles,
                    pageRows * currentPage,
                    Math.min(files.length, pageRows * (currentPage + 1))
                  ),
                  (audioFile, i) => (
                    <AudioFileRow
                      audioPlayerInstance={audioPlayerInstance}
                      onPlayPause={this.handlePlayPause}
                      onChangeProgress={this.handleChangeProgress}
                      audioFile={audioFile}
                      key={i}
                      isUploadMode={isUploadMode}
                      isUploading={audioFile.state === "uploading"}
                      onDeleteRow={this.props.onDeleteRow}
                      onFileRename={this.props.onFileRename}
                      // onAudioPlayPause={this.props.onAudioPlayPause}
                      onRowSelect={this.handleRowSelect}
                    />
                  )
                )}
              </Column>
            </Row>
          )}
          {!!(searchedFiles && searchedFiles.length) && (
            <Row>
              <PaginationBar
                rowsPerPageOptions={[10, 20, 50]}
                rowsPerPage={pageRows}
                OnRowsPerPageChange={this.handleRowsPerPageChange}
                totalRows={searchedFiles.length}
                currentPage={currentPage}
                OnGotoPage={this.handleGotoPage}
              />
            </Row>
          )}
        </ListContainer>
      </div>
    );
  };
}

export default withWidth()(
  withStyles(styleSheet, { name: "AudioFileList" })(translate(["audio", "common"])(AudioFileList))
);
