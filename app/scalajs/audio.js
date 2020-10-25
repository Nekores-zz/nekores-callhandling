import { facadeOf } from "./sdk/facadeOf";

export * from "./sdk/commonFacade";

export const ListAudioSets = facadeOf("Audio/ListAudioSets");
export const AudioFilesSidemenu = facadeOf("Audio/AudioFilesSidemenu.jsx");
export const EditAudioSet = facadeOf("Audio/EditAudioSet.jsx");
export const ListAudio = facadeOf("Audio/ListAudio.jsx");
export const UploadAudio = facadeOf("Audio/UploadAudio.jsx");
export const EditSharingPage = facadeOf("shared/EditSharingPage.jsx");