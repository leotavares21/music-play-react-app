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
} from "../types";

export function playMusic(music) {
  return {
    type: PLAY_MUSIC,
    payload: music,
  };
}

export function playListMusic(music, index) {
  return {
    type: PLAYLIST_MUSIC,
    payload: { music, index },
  };
}

export function playNext() {
  return (dispatch, getState) => {
    const state = getState().player;
    const { musicList, isShuffling, currentMusicIndex } = state;

    const hasNext = isShuffling || currentMusicIndex + 1 < musicList.length;

    if (isShuffling) {
      const nextRandomMusicIndex = Math.floor(Math.random() * musicList.length);
      dispatch({ type: PLAY_NEXT, payload: nextRandomMusicIndex });
    } else if (hasNext) {
      dispatch({ type: PLAY_NEXT, payload: currentMusicIndex + 1 });
    }
  };
}

export function playPrevious() {
  return (dispatch, getState) => {
    const state = getState().player;
    const { currentMusicIndex } = state;

    const hasPrevious = currentMusicIndex > 0;

    if (hasPrevious) {
      dispatch({ type: PLAY_PREVIOUS, payload: currentMusicIndex - 1 });
    }
  };
}

export function togglePlay() {
  return {
    type: TOGGLE_PLAY,
  };
}

export function toggleLoop() {
  return {
    type: TOGGLE_LOOP,
  };
}

export function toggleShuffle() {
  return {
    type: TOGGLE_SHUFFLE,
  };
}

export function setPlayingState(state) {
  return {
    type: SET_PLAYING_STATE,
    payload: state,
  };
}

export function clearPlayerState() {
  return {
    type: CLEAR_PLAYER_STATE,
  };
}
