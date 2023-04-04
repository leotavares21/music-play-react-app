import { FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAILURE } from "../types";
import api from "../../services/api";

import convertDurationToTimeString from "../../utils/convertDurationToTimeString";

export function fetchRequest() {
  return {
    type: FETCH_REQUEST,
  };
}

export function fetchSuccess(data) {
  return {
    type: FETCH_SUCCESS,
    payload: data,
  };
}

export function fetchFailure(error) {
  return {
    type: FETCH_FAILURE,
    payload: error,
  };
}

export function getData() {
  return async (dispatch, getState) => {
    try {
      const { list } = getState().myList;

      dispatch(fetchRequest());

      const res = await api.get("playlists/37i9dQZEVXbMXbN3EUUhlg");

      const fetchData = res.data.tracks.items.map(data => ({
        isIncluded:
          list.find(listItem => listItem.track.id === data.track.id) !==
          undefined,
        track: {
          ...data.track,
          duration: convertDurationToTimeString(data.track.duration_ms),
        },
      }));

      dispatch(fetchSuccess(fetchData));
    } catch (err) {
      const errorMsg = err.message;
      dispatch(fetchFailure(errorMsg));
    }
  };
}
