import React, { Component } from "react";
import { Switch } from "react-router-dom";
import Route from "react-router-hooks";
import { translate } from "react-i18next";
import { NavbarSideMenuPage, MainNavbar, HubbubSnackbar, Searchbar } from "components";
import {
  ListAudio,
  AudioFilesSidemenu,
  UploadAudio,
  UploadAudioSidemenu,
  ListAudioSets,
  EditAudioSet,
  AudioSetSidemenu
} from "components/Audio";
import {
  initialAudio,
  audioFiles,
  audioSets,
  onCreateAudioSet,
  onEditAudioSet,
  onDeleteAudioSets,
  onCreateAudioFile,
  onEditAudioFile,
  onDeleteAudioFiles,
  uploadAudioFiles,
  voiceArtists,
  getPlayUrl
} from "config/audioMockData";
import {
  audioFilters,
  audioSortings,
  audioSetFilters,
  audioSetSortings,
  exampleSortings
} from "config/sidemenuMockData";
import { menuItems, userInfo, quickSwitchUsers } from "config/mockData";
import MiniUploading from "../components/Audio/MiniUploading";

// import WarningDialog from "../components/Audio/WarningDialog";

class AudioPage extends Component {
  static defaultProps = {
    initialAudio,
    audioSets,
    onCreateAudioSet,
    onEditAudioSet,
    onDeleteAudioSets,
    audioFiles,
    onCreateAudioFile,
    onEditAudioFile,
    onDeleteAudioFiles,
    uploadAudioFiles
  };

  state = {
    displaySnackbar: false,
    snackbarMessageKey: "",
    messageData: undefined,
    actionFunc: undefined,
    isLoading: false,
    hasMore: false,
    blankAudioFile: {
      ...this.props.initialAudio,
      // please try to use this when mockData doesn't need
      // createdBy: this.props.getCurrentUser().userName,
      createdBy: { firstName: userInfo.firstName, lastName: userInfo.lastName, date: new Date() },
      canBeOverridden: false,
      files: []
    },
    audioFile: {
      ...this.props.initialAudio,
      // please try to use this when mockData doesn't need
      // createdBy: this.props.getCurrentUser().userName,
      createdBy: { firstName: userInfo.firstName, lastName: userInfo.lastName, date: null },
      canBeOverridden: false
    },
    audioFiles: this.props.audioFiles,
    audioSet: null,
    leavePageDialog: false
  };

  navigation = {
    listAudio: () => this.props.history.push("/audio"),
    listAudioSet: id => this.props.history.push("/audio/set/" + id),
    uploadAudio: () => {
      this.handleGoUploadAudio();
      this.props.history.push("/audio/upload");
    },
    editAudio: id => {
      this.setState({
        audioFile: {
          ...initialAudio,
          ...(this.props.audioFiles.find(audioFile => audioFile.id === id) || {})
        }
      });
      this.props.history.push("/audio/upload/edit");
    },
    listAudioSets: () => this.props.history.push("/audio/sets"),
    createAudioSet: () => this.props.history.push("/audio/sets/create"),
    editAudioSet: id => this.props.history.push("/audio/sets/edit/" + id),
    back: () => this.props.history.goBack()
  };

  closeSnackbar = () => this.setState({ displaySnackbar: false });

  handleSearch = value => {
    return new Promise((resolve, reject) => {
      resolve(
        searchResults.filter(item =>
          item.text
            .toString()
            .toLowerCase()
            .includes(value.toString().toLowerCase())
        )
      );
    });
  };

  getAudioSet = id => {
    return new Promise((resolve, reject) => {
      resolve(this.props.audioSets.find(set => set.id === id));
    });
  };

  getTags = fieldName => {
    console.log("Calling getTags for tags filter");
    return new Promise((resolve, reject) => {
      setTimeout(
        () => resolve(["Tag one", "Tag two", "Tag three", "Tag four", "Tag five", "Tag six"]),
        1000
      );
    });
  };

  handleSearchResult = url => {};

  scrollPosition = 0;

  scrollPositionSetter = () => {};

  storeScrollPosition = scrollPosition => {
    this.scrollPosition = scrollPosition;
  };

  scrollListToTop = (window.UsersToTop = () => {
    this.scrollPositionSetter(0);
  });

  loadMoreAudio = () => {
    if (this.state.hasMore && !this.state.isLoading) {
      this.setState({ isLoading: true });
    }
  };

  handleScrollPositionSetter = scrollPositionSetter => {
    this.scrollPositionSetter = scrollPositionSetter;
    scrollPositionSetter(this.scrollPosition);
  };

  handleGoUploadAudio = () => {
    this.setState({ audioFile: this.state.blankAudioFile });
  };

  handleAudioFilesFilters = filters => {
    let files = this.props.audioFiles;
    filters.forEach(filter => {
      let isSelected = false;
      filter.values.forEach(value => (isSelected |= value.isSelected));
      if (isSelected) {
        switch (filter.fieldName) {
          case "tags":
            files = files.filter(file => {
              let matched = false;
              filter.values.forEach(
                value => (matched |= value.isSelected && file.tags.indexOf(value.value) !== -1)
              );
              return matched;
            });
            break;
          case "set":
            files = files.filter(file => {
              let matched = false;
              filter.values.forEach(
                value => (matched |= value.isSelected && file.set.name === value.value)
              );
              return matched;
            });
            break;
          case "fileType":
            files = files.filter(file => {
              let matched = false;
              filter.values.forEach(
                value => (matched |= value.isSelected && file.type === value.value)
              );
              return matched;
            });
            break;
          case "status":
            files = files.filter(file => {
              let matched = false;
              filter.values.forEach(
                value => (matched |= value.isSelected && file.status === value.value)
              );
              return matched;
            });
            break;
          case "sourceType":
            files = files.filter(file => {
              let matched = false;
              filter.values.forEach(
                value =>
                  (matched |=
                    value.isSelected &&
                    file.files &&
                    file.files.some(sub => sub.type === value.value))
              );
              return matched;
            });
            break;
          case "createdBy":
            files = files.filter(file => {
              let matched = false;
              filter.values.forEach(
                value =>
                  (matched |=
                    value.isSelected &&
                    file.createdBy &&
                    file.createdBy.firstName + " " + file.createdBy.lastName === value.value)
              );
              return matched;
            });
            break;
          case "dateCreated":
            let from = new Date();
            let to = new Date();
            filter.values.forEach(value => {
              if (value.isSelected) {
                switch (value.value) {
                  case "today":
                    from = new Date(from.getFullYear(), from.getMonth(), from.getDate());
                    to = new Date(from.getTime() + 24 * 60 * 60 * 1000);
                    break;
                  case "yesterday":
                    to = new Date(from.getFullYear(), from.getMonth(), from.getDate());
                    from = new Date(to.getTime() - 24 * 60 * 60 * 1000);
                    break;
                  case "week":
                    from = new Date(from.getTime() - 7 * 24 * 60 * 60 * 1000);
                    let day = from.getDay();
                    from.setDate(from.getDate() - day + (day === 0 ? -6 : 1));
                    from = new Date(from.getFullYear(), from.getMonth(), from.getDate());
                    to = new Date(from.getTime() + 7 * 24 * 60 * 60 * 1000);
                    break;
                  case "month":
                    from.setMonth(from.getMonth() - 1);
                    from.setDate(1);
                    from = new Date(from.getFullYear(), from.getMonth(), from.getDate());
                    to.setDate(1);
                    to = new Date(to.getFullYear(), to.getMonth(), to.getDate());
                    break;
                  case "custom":
                    from =
                      value.filter.values[0].isSelected && new Date(value.filter.values[0].value);
                    to =
                      value.filter.values[1].isSelected && new Date(value.filter.values[1].value);
                    break;
                  default:
                    from = null;
                    to = null;
                    break;
                }
                files = files.filter(file => {
                  return (
                    file.createdBy &&
                    file.createdBy.date &&
                    (!from || file.createdBy.date >= from) &&
                    (!to || file.createdBy.date <= to)
                  );
                });
              }
            });
            break;
        }
      }
    });
    this.setState({ audioFiles: files });
  };

  handleGoCreateAudioSet = () => {
    this.navigation.createAudioSet();
  };

  handleCreateAudioSet = audioSet => {
    this.setState({
      displaySnackbar: true,
      snackbarMessageKey: "SetAdded",
      messageData: {
        set: audioSet.name
      }
    });
    this.props.onCreateAudioSet(audioSet);
    this.navigation.listAudioSets();
  };

  handleGoEditAudioSet = audioSetId => {
    // this.setState({ audioSet: audioSet });
    this.navigation.editAudioSet(audioSetId);
  };

  handleEditAudioSet = audioSet => {
    this.props.onEditAudioSet(audioSet);
    this.navigation.listAudioSets();
  };

  handleDeleteAudioSets = deletedAudioSets => {
    this.props.onDeleteAudioSets(deletedAudioSets);
    this.navigation.listAudioSets();
  };

  handleOpenAudioSet = audioSetId => {
    this.navigation.listAudioSet(audioSetId);
  };

  handleAudioFileChange = audioFile => {
    // Set change of file
    const { files } = audioFile;
    let isSaveEnabled = files && files.length;
    Array.prototype.map.call(files, file => {
      if (file.state === "uploading") {
        isSaveEnabled = false;
        return true;
      }
    });

    // window.onbeforeunload = () => true;

    this.setState({ audioFile: audioFile });
  };

  handleLeaveWhileUploading = prevProps => {
    // window.onbeforeunload = () => true;//!isSaveEnabled && (() => leaveMessage);
    this.setState({ leavePageDialog: true });
  };

  handleStayOnPage = () => {
    this.setState({ leavePageDialog: false });
  };

  handleLeavePage = () => {
    this.setState({ leavePageDialog: false });
  };

  fileHandlers = props => {
    return {
      onAddFile: fileList => {
        props.audioFile.files.splice(props.audioFile.files.length, 0, ...fileList);
      },
      onDeleteFile: fileId => {
        let index = props.audioFile.files.findIndex(file => file.id === fileId);
        if (index >= 0) {
          props.audioFile.files.splice(index, 1);
        }
      },
      onRenameFile: (fileId, newName) => {
        let index = 0;
        let file = props.audioFile.files[index];
        while (file) {
          if (file.id === fileId) {
            file.name = newName;
          } else {
            file = props.audioFile.files[++index];
          }
        }
      },
      getFileUploadMeta: () => {
        return {
          fieldName: "files",
          apiRequestContext: "",
          apiUrl: "https://hubbub.free.beeceptor.com/audio/upload"
        };
      }
    };
  };

  handleUploadAudio = () => {
    let audioFile = this.state.audioFile;
    audioFile = {
      ...audioFile,
      status: "Complete"
    };
    this.props.onCreateAudioFile(audioFile);
    this.setState({ audioFile: audioFile });

    this.navigation.listAudio();
  };

  handleEditAudio = () => {
    this.props.onEditAudioFile(this.state.audioFile);
    this.navigation.listAudio();
  };

  handleDeleteAudios = audioFiles => {
    this.props.onDeleteAudioFiles(audioFiles);
    this.navigation.listAudio();
  };

  dialogToggle = () => console.log("Calling dialogToggle");

  ListAudio = () => (
    <ListAudio
      audioFiles={this.state.audioFiles}
      audioFilesCount={this.state.audioFiles.length}
      uploadAudio={this.handleGoUploadAudio}
      getPlayUrl={getPlayUrl}
      archiveAudio={() => {}}
      archiveAudios={() => {}}
      deleteAudio={() => {}}
      deleteAudios={this.handleDeleteAudios}
      isLoading={this.state.isLoading}
      loadMore={this.loadMoreAudio}
      onScrollPositionChange={this.storeScrollPosition}
      onScrollPositionSetter={this.handleScrollPositionSetter}
      navigation={this.navigation}
    />
  );

  ListAudioSidemenu = () => (
    <AudioFilesSidemenu
      activeSection={"audioFiles"}
      audioSet={this.state.audioSet}
      audioFiles={this.state.audioFiles}
      count={this.state.audioFiles.length}
      filters={audioFilters}
      handleFilters={_ => this.setState({})} // {this.handleAudioFilesFilters}
      isFiltersOpen={false}
      getTags={this.getTags}
      sorting={audioSortings}
      handleSorting={_ => this.setState({})}
      isSortingOpen={false}
      navigation={this.navigation}
    />
  );

  UploadAudio = ({ match }) => (
    <UploadAudio
      isCreate={true}
      getPlayUrl={getPlayUrl}
      audioSets={this.props.audioSets}
      audioSet={this.props.audioSets.find(set => set.id === match.params.id)}
      audioFile={this.state.audioFile}
      voiceArtists={voiceArtists}
      onAudioFileChange={this.handleAudioFileChange}
      onCreateNewSet={this.handleCreateAudioSet}
      onSubmit={this.handleUploadAudio}
      onCancel={this.navigation.listAudio}
      navigation={this.navigation}
      {...this.fileHandlers(this.props)}
    />
  );

  UploadAudioSidemenu = ({ match }) => (
    <UploadAudioSidemenu
      isCreate={true}
      handleBack={this.navigation.back}
      navigation={this.navigation}
      audioSet={audioSets.find(set => set.id === match.params.id)}
    />
  );

  EditAudio = () => (
    <UploadAudio
      isCreate={false}
      getPlayUrl={getPlayUrl}
      audioSets={this.props.audioSets}
      voiceArtists={voiceArtists}
      onAudioFileChange={this.handleAudioFileChange}
      onCreateNewSet={this.handleCreateAudioSet}
      onSubmit={this.handleEditAudio}
      onCancel={this.navigation.listAudio}
      navigation={this.navigation}
      audioFile={this.state.audioFile}
      {...this.fileHandlers(this.props)}
    />
  );

  EditAudioSidemenu = () => (
    <UploadAudioSidemenu
      isCreate={false}
      handleBack={this.navigation.back}
      navigation={this.navigation}
      audioFile={this.state.audioFile}
    />
  );

  ListAudioSets = () => (
    <ListAudioSets
      audioSets={this.props.audioSets}
      navigation={this.navigation}
      createAudioSetClickHandler={this.handleGoCreateAudioSet}
      openAudioSetClickHandler={this.handleOpenAudioSet}
      editAudioSet={this.handleGoEditAudioSet}
      deleteAudioSets={this.handleDeleteAudioSets}
      isLoading={this.state.isLoading}
      loadMore={this.loadMoreAudio}
      dialogToggle={this.dialogToggle}
      onScrollPositionChange={this.storeScrollPosition}
      onScrollPositionSetter={this.handleScrollPositionSetter}
    />
  );

  ListAudioSetsSidemenu = () => (
    <AudioFilesSidemenu
      activeSection={"audioSets"}
      audioSet={null}
      count={this.props.audioFiles.length}
      filters={audioFilters}
      handleFilters={_ => this.setState({})}
      isFiltersOpen={false}
      getTags={this.getTags}
      sorting={exampleSortings}
      handleSorting={_ => this.setState({})}
      isSortingOpen={false}
      navigation={this.navigation}
    />
  );

  CreateAudioSet = () => (
    <EditAudioSet
      onSubmit={this.handleCreateAudioSet}
      onCancel={this.navigation.back}
      navigation={this.navigation}
    />
  );

  CreateAudioSetSidemenu = () => (
    // TODO: implement a EditAudioSidemenu, according to UX (pages 10-70):
    // https://drive.google.com/drive/folders/1umqC4rT600OPqNHTfNMGbnY0cFM1DbZY
    <AudioFilesSidemenu
      activeSection={"audioSets"}
      audioSet={null}
      audioFiles={this.props.audioFiles}
      count={this.props.audioFiles.length}
      filters={audioFilters}
      handleFilters={_ => this.setState({})}
      isFiltersOpen={false}
      getTags={this.getTags}
      sorting={exampleSortings}
      handleSorting={_ => this.setState({})}
      isSortingOpen={false}
      navigation={this.navigation}
    />
  );

  EditAudioSet = ({ match }) => (
    <EditAudioSet
      onSubmit={this.handleEditAudioSet}
      onCancel={this.navigation.back}
      navigation={this.navigation}
      getAudioSet={() => this.getAudioSet(match.params.id)}
    />
  );

  EditAudioSetSidemenu = () => (
    // TODO: implement a EditAudioSidemenu, according to UX (pages 10-70):
    // https://drive.google.com/drive/folders/1umqC4rT600OPqNHTfNMGbnY0cFM1DbZY
    <AudioFilesSidemenu
      activeSection={"audioSets"}
      audioSet={null}
      audioFiles={this.props.audioFiles}
      count={this.props.audioFiles.length}
      filters={audioFilters}
      handleFilters={_ => this.setState({})}
      isFiltersOpen={false}
      getTags={this.getTags}
      sorting={exampleSortings}
      handleSorting={_ => this.setState({})}
      isSortingOpen={false}
      navigation={this.navigation}
    />
  );

  AudioSet = ({ match }) => {
    return (
      <ListAudio
        audioFiles={audioFiles.filter(file => file.set.id === match.params.id)}
        audioFilesCount={audioFiles.filter(file => file.set.id === match.params.id).length}
        // uploadAudio={() => this.navigation.uploadAudio(match.params.id)}
        uploadAudio={() => this.navigation.uploadAudio}
        getPlayUrl={getPlayUrl}
        editAudio={this.handleGoEditAudio}
        archiveAudio={() => {}}
        archiveAudios={() => {}}
        deleteAudio={() => {}}
        deleteAudios={() => {}}
        isLoading={this.state.isLoading}
        loadMore={this.loadMoreAudio}
        onScrollPositionChange={this.storeScrollPosition}
        onScrollPositionSetter={this.handleScrollPositionSetter}
        navigation={this.navigation}
      />
    );
  };

  AudioSetSidemenu = ({ match }) => {
    return (
      <AudioSetSidemenu
        audioSet={this.props.audioSets.find(set => set.id === match.params.id)}
        audioFiles={this.props.audioFiles}
        filters={audioSetFilters}
        handleFilters={_ => this.setState({})}
        isFiltersOpen={false}
        sorting={audioSetSortings}
        handleSorting={_ => this.setState({})}
        isSortingOpen={false}
        navigation={this.navigation}
      />
    );
  };

  audioSearchbar = () => (
    <Searchbar
      mode="filter"
      placeholder="searchAudioFiles"
      handleSearch={this.handleSearch}
      handleSearchResult={this.handleSearchResult}
    />
  );

  audioSetsSearchbar = () => (
    <Searchbar
      mode="filter"
      placeholder="searchAudioSets"
      handleSearch={this.handleSearch}
      handleSearchResult={this.handleSearchResult}
    />
  );

  audioNavbar = toggleDrawer => (
    <MainNavbar
      name="Company Name"
      searchbar={this.audioSearchbar}
      handleMainMenuClick={toggleDrawer}
      userInfo={{ data: userInfo, loading: false }}
      menuItems={{ data: menuItems, loading: false }}
      quickSwitchUsers={quickSwitchUsers}
    />
  );

  audioSetsNavbar = toggleDrawer => (
    <MainNavbar
      name="Company Name"
      searchbar={this.audioSetsSearchbar}
      handleMainMenuClick={toggleDrawer}
      userInfo={{ data: userInfo, loading: false }}
      menuItems={{ data: menuItems, loading: false }}
      quickSwitchUsers={quickSwitchUsers}
    />
  );

  noSearchbarNavbar = toggleDrawer => (
    <MainNavbar
      name="Company Name"
      handleMainMenuClick={toggleDrawer}
      userInfo={{ data: userInfo, loading: false }}
      menuItems={{ data: menuItems, loading: false }}
      quickSwitchUsers={quickSwitchUsers}
    />
  );

  render() {
    const { t } = this.props;
    return (
      <>
        {!!this.state.audioFile && <MiniUploading audioFile={this.state.audioFile} />}
        {/* <WarningDialog
          open={this.state.leavePageDialog}
          title={t("confirmDeleteTitle")}
          confirmLabel={t("leavePage")}
          cancelLabel={t("stayOnPage")}
          mainContent={t("warningLeaveUploading")}
          confirmation={t("confirmLeaveUploading")}
          onCancel={this.handleStayOnPage}
          onConfirm={this.handleLeavePage}
        /> */}
        <HubbubSnackbar
          open={this.state.displaySnackbar}
          closeCallback={this.closeSnackbar}
          messageKey={this.state.snackbarMessageKey}
          closeOnClickAway={true}
          messageData={this.state.messageData}
          actionFunc={this.state.actionFunc}
        />
        <NavbarSideMenuPage
          navbar={f => (
            <Switch>
              <Route path="/audio" exact component={() => this.audioNavbar(f)} />
              <Route path="/audio/sets" exact component={() => this.audioSetsNavbar(f)} />
              <Route path="/audio/*" exact component={() => this.noSearchbarNavbar(f)} />
            </Switch>
          )}
          location={this.props.location.pathname}
          snackbar={{
            displaySnackbar: this.state.displaySnackbar,
            snackbarMessageKey: this.state.snackbarMessageKey,
            messageData: this.state.messageData,
            closeSnackbar: this.closeSnackbar,
            actionFunc: this.state.actionFunc
          }}
          sidemenuContent={
            <Switch>
              <Route path="/audio" exact component={this.ListAudioSidemenu} />
              <Route path="/audio/upload" exact component={this.UploadAudioSidemenu} />
              <Route path="/audio/upload/edit" exact component={this.EditAudioSidemenu} />
              <Route path="/audio/upload/:id" exact component={this.UploadAudioSidemenu} />
              <Route path="/audio/sets" exact component={this.ListAudioSetsSidemenu} />
              <Route path="/audio/sets/create" exact component={this.CreateAudioSetSidemenu} />
              <Route path="/audio/sets/edit/:id" exact component={this.EditAudioSetSidemenu} />
              <Route path="/audio/set/:id" exact component={this.AudioSetSidemenu} />
            </Switch>
          }
        >
          <Switch>
            <Route path="/audio" exact component={this.ListAudio} />
            <Route
              path="/audio/upload"
              exact
              component={this.UploadAudio}
              // onLeave={this.handleLeaveWhileUploading}
            />
            <Route
              path="/audio/upload/edit"
              exact
              component={this.EditAudio}
              // onLeave={this.handleLeaveWhileUploading}
            />
            <Route
              path="/audio/upload/:id"
              exact
              component={this.UploadAudio}
              // onLeave={this.handleLeaveWhileUploading}
            />
            <Route path="/audio/sets" exact component={this.ListAudioSets} />
            <Route path="/audio/sets/create" exact component={this.CreateAudioSet} />
            <Route path="/audio/sets/edit/:id" exact component={this.EditAudioSet} />
            <Route path="/audio/set/:id" exact component={this.AudioSet} />
          </Switch>
        </NavbarSideMenuPage>
      </>
    );
  }
}

// export default AudioPage;
export default translate(["audio", "common"])(AudioPage);
