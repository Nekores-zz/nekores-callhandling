const description =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Emenim ad minim veniam, quis nostrud exercitation ullamco.";

const tags = ["Tag one", "Tag two", "Tag three"];

const createdBy = { firstName: "Elizabeth", lastName: "Smith", date: new Date() };

export const regions = [{ code: "uk", name: "United Kingdom" }, { code: "eu", name: "Europe" }];

export const languages = [
  { code: "en", name: "English" },
  { code: "fr", name: "Franch" },
  { code: "it", name: "Italian" }
];

export const voiceArtists = [
  {
    name: "Robert Blackwood",
    from: "Dublin, Ireland",
    price: 0.25,
    vat: 1.0,
    currency: "£",
    avatarUrl: "https://i.pravatar.cc/150?img=5",
    region: "uk",
    languages: ["en"]
  },
  {
    name: "Blackwood Robert",
    from: "Ireland, Ireland",
    price: 0.25,
    vat: 1.0,
    currency: "£",
    avatarUrl: "https://i.pravatar.cc/150?img=5",
    region: "eu",
    languages: ["en", "fr", "it"]
  },
  {
    name: "Blackwood Blackwood",
    from: "Ireland, Dublin",
    price: 0.25,
    vat: 1.0,
    currency: "£",
    avatarUrl: "https://i.pravatar.cc/150?img=5",
    region: "us",
    languages: ["en"]
  }
];

export const initialAudioSet = (() => {
  const audioSet = {
    name: "",
    description: "",
    tags: [],
    sharingEnabled: false,

    fieldSharingEnabled: "sharingEnabled",
    fieldName: "name",
    fieldDescription: "description",
    fieldTags: "tags"
  };

  audioSet.setName = name => {
    audioSet.name = name;
    return audioSet;
  };

  audioSet.setDescription = description => {
    audioSet.description = description;
    return audioSet;
  };

  audioSet.setTags = tags => {
    audioSet.tags = tags;
    return audioSet;
  };

  audioSet.toScala = () => audioSet;

  return audioSet;
})();

export const audioSets = [
  {
    ...initialAudioSet,
    id: "1",
    name: "Set 1",
    tags: tags,
    isFavourite: true,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Emenim ad minim veniam, quis nostrud exercitation ullamco.",
    toScala: function() {
      return this;
    }
  },
  {
    ...initialAudioSet,
    id: "2",
    name: "Set 2",
    tags: tags,
    isFavourite: true,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Emenim ad minim veniam, quis nostrud exercitation ullamco.",
    toScala: function() {
      return this;
    }
  },
  {
    ...initialAudioSet,
    id: "3",
    name: "Set 3",
    tags: tags,
    isFavourite: true,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Emenim ad minim veniam, quis nostrud exercitation ullamco.",
    toScala: function() {
      return this;
    }
  },
  {
    ...initialAudioSet,
    id: "4",
    name: "Set 4",
    tags: tags,
    isFavourite: false,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Emenim ad minim veniam, quis nostrud exercitation ullamco.",
    toScala: function() {
      return this;
    }
  },
  {
    ...initialAudioSet,
    id: "5",
    name: "Set 5",
    tags: tags,
    isFavourite: false,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Emenim ad minim veniam, quis nostrud exercitation ullamco.",
    toScala: function() {
      return this;
    }
  },
  {
    ...initialAudioSet,
    id: "6",
    name: "Set 6",
    tags: tags,
    isFavourite: false,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Emenim ad minim veniam, quis nostrud exercitation ullamco.",
    toScala: function() {
      return this;
    }
  }
];

const getAudioSet = audioSetId => {
  return audioSets.find(audioSet => audioSet.id == audioSetId);
};

export const onCreateAudioSet = audioSet => {
  const id = Math.max.apply(Math, audioSets.map(item => item.id)) + 1;
  audioSets.push({
    id: id,
    isFavourite: false,
    ...audioSet
  });
};

export const onEditAudioSet = audioSet => {
  audioSets[audioSets.findIndex(set => audioSet.id === set.id)] = audioSet;
};

export const onDeleteAudioSets = deletedAudioSets => {
  deletedAudioSets.forEach(set => audioSets.splice(audioSets.indexOf(set), 1));
};

export const onCreateAudioFile = audioFile => {
  const id = Math.max.apply(Math, audioFiles.map(item => item.id)) + 1;
  const newAudioFile = { id: id, ...audioFile };
  audioFiles.push(newAudioFile);
  return newAudioFile;
};

export const onEditAudioFile = audioFile => {
  audioFiles[audioFiles.findIndex(audio => audioFile.id === audio.id)] = audioFile;
};

export const onDeleteAudioFiles = deletedAudioFiles => {
  deletedAudioFiles.forEach(audio => audioFiles.splice(audioFiles.indexOf(audio), 1));
};

export const initialAudio = (() => {
  const audio = {
    name: "",
    description: "",
    tags: [],
    setId: null,
    status: "",
    createdBy: null,
    type: "",
    files: [],

    fieldName: "name",
    fieldDescription: "description",
    fieldTags: "tags",
    fieldSet: "set",
    fieldStatus: "status",
    fieldCreatedBy: "createdBy",
    fieldType: "type",
    fieldFiles: "files"
  };

  audio.setName = name => {
    audio.name = name;
    return audio;
  };

  audio.setDescription = description => {
    audio.description = description;
    return audio;
  };

  audio.setTags = tags => {
    audio.tags = tags;
    return audio;
  };

  audio.setSet = set => {
    audio.set = set;
    return audio;
  };

  audio.setStatus = status => {
    audio.status = status;
    return audio;
  };

  audio.setCreatedBy = createdBy => {
    audio.createdBy = createdBy;
    return audio;
  };

  audio.setFiles = files => {
    audio.files = files;
    return audio;
  };

  audio.toScala = () => audio;

  return audio;
})();

export const uploadAudioFiles = [
  { id: "88291", name: "Audio 1.mp3", type: "file" },
  { id: "88292", name: "Audio 2.mp3", type: "phone" },
  { id: "88293", name: "Audio 3.mp3", type: "browser" },
  { id: "88294", name: "Audio 4.mp3", type: "file" },
  { id: "88295", name: "Audio 5.mp3", type: "file" },
  { id: "88296", name: "Audio 6.mp3", type: "professional" },
  { id: "88297", name: "Audio 7.mp3", type: "file" },
  { id: "88298", name: "Audio 8.mp3", type: "phone" },
  { id: "88299", name: "Audio 9.mp3", type: "file" },
  { id: "88300", name: "Audio 10.mp3", type: "browser" }
];

export const audioFiles = [
  {
    ...initialAudio,
    id: "180134",
    name: "Audio 1",
    description,
    tags,
    setId: 1,
    set: getAudioSet(1),
    createdBy,
    status: "Complete",
    type: "singleFile",
    files: [{ ...uploadAudioFiles[0], state: "pause" }],
    toScala: function() {
      return this;
    }
  },
  {
    ...initialAudio,
    id: "280134",
    name: "Audio 2",
    description,
    tags,
    setId: 2,
    set: getAudioSet(2),
    createdBy,
    status: "Pending",
    type: "multiVersion",
    files: [uploadAudioFiles[0], uploadAudioFiles[2], uploadAudioFiles[5]],
    toScala: function() {
      return this;
    }
  },
  {
    ...initialAudio,
    id: "380134",
    name: "Audio 3",
    description,
    tags,
    setId: 1,
    set: getAudioSet(3),
    createdBy,
    status: "Placeholder",
    type: "addFileLater",
    toScala: function() {
      return this;
    }
  },
  {
    ...initialAudio,
    id: "480134",
    name: "Audio 4",
    description,
    tags,
    setId: 2,
    set: getAudioSet(1),
    createdBy,
    status: "Inprogress",
    type: "multiVersion",
    files: [uploadAudioFiles[0], uploadAudioFiles[2], uploadAudioFiles[5]],
    toScala: function() {
      return this;
    }
  },
  {
    ...initialAudio,
    id: "580134",
    name: "Audio 5",
    description,
    tags,
    setId: 3,
    set: getAudioSet(3),
    createdBy,
    status: "Complete",
    toScala: function() {
      return this;
    }
  },
  {
    ...initialAudio,
    id: "680134",
    name: "Audio 6",
    description,
    tags,
    setId: 4,
    set: getAudioSet(4),
    createdBy,
    status: "Inprogress",
    toScala: function() {
      return this;
    }
  },
  {
    ...initialAudio,
    id: "780134",
    name: "Audio 7",
    description,
    tags,
    setId: 5,
    set: getAudioSet(5),
    createdBy,
    status: "Inprogress",
    toScala: function() {
      return this;
    }
  },
  {
    ...initialAudio,
    id: "780133",
    name: "Audio 8",
    description,
    tags,
    setId: 6,
    set: getAudioSet(6),
    createdBy,
    status: "Pending",
    type: "multiVersion",
    files: [uploadAudioFiles[0], uploadAudioFiles[2], uploadAudioFiles[5]],
    toScala: function() {
      return this;
    }
  },
  {
    ...initialAudio,
    id: "78013566",
    name: "Audio 9",
    description,
    tags,
    setId: 6,
    set: getAudioSet(6),
    createdBy,
    status: "Pending",
    type: "singleFile",
    files: [{ ...uploadAudioFiles[0], state: "uploading" }],
    toScala: function() {
      return this;
    }
  }
];

export const getPlayUrl = id => {
  return "http://www.music.helsinki.fi/tmt/opetus/uusmedia/esim/a2002011001-e02-128k.mp3";
};

export const getAudioSetFromId = id => {
  return audioSets.find(item => item.id == id);
};
