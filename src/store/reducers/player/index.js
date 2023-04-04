import {
  PLAY_MUSIC,
  PLAYLIST_MUSIC,
  PLAY_NEXT,
  PLAY_PREVIOUS,
  TOGGLE_PLAY,
  TOGGLE_LOOP,
  TOGGLE_SHUFFLE,
  SET_PLAYING_STATE,
  CLEAR_PLAYER_STATE,
} from "../../types";

const initialState = {
  musicList: [],
  currentMusicIndex: 0,
  isPlaying: false,
  isLooping: false,
  isShuffling: false,
};

function playerReducer(state = initialState, action) {
  switch (action.type) {
    case PLAY_MUSIC:
      return {
        ...state,
        musicList: action.payload.music,
        currentMusicIndex: 0,
        isPlaying: true,
      };
    case PLAYLIST_MUSIC:
      return {
        ...state,
        musicList: action.payload.music,
        currentMusicIndex: action.payload.index,
        isPlaying: true,
      };
    case PLAY_NEXT:
      return {
        ...state,
        currentMusicIndex: action.payload,
      };
    case PLAY_PREVIOUS:
      return {
        ...state,
        currentMusicIndex: action.payload,
      };
    case TOGGLE_PLAY:
      return {
        ...state,
        isPlaying: !state.isPlaying,
      };
    case TOGGLE_LOOP:
      return {
        ...state,
        isLooping: !state.isLooping,
      };
    case TOGGLE_SHUFFLE:
      return {
        ...state,
        isShuffling: !state.isShuffling,
      };
    case SET_PLAYING_STATE:
      return {
        ...state,
        isPlaying: action.payload,
      };
    case CLEAR_PLAYER_STATE:
      return {
        ...state,
        musicList: [],
        currentMusicIndex: 0,
      };
    default:
      return state;
  }
}

export default playerReducer;
