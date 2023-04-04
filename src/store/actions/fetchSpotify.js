import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAILURE,
} from "../types";
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

      const getToken = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${btoa(
            `${import.meta.env.VITE_SPOTIFY_CLIENT_ID}:${
              import.meta.env.VITE_SPOTIFY_CLIENT_SECRET
            }`
          )}`,
        },
        body: "grant_type=client_credentials",
      });

      const token = await getToken.json();

      const res = await api.get("playlists/37i9dQZEVXbMXbN3EUUhlg", {
        headers: { Authorization: `Bearer ${token.access_token}` },
      });

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
