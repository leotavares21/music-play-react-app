import {
  SET_SEARCH_QUERY,
  RESET_OFFSET,
  FETCH_SEARCH_REQUEST,
  FETCH_SEARCH_SUCCESS,
  LOAD_MORE_SEARCH_REQUEST,
  LOAD_MORE_SEARCH,
  STOP_FETCH_SEARCH,
  FETCH_SEARCH_FAILURE,
} from "../types";
import { encode } from "base-64";
import api from "../../services/api";
import convertDurationToTimeString from "../../utils/convertDurationToTimeString";

export function setSearchTerm(term) {
  return {
    type: SET_SEARCH_QUERY,
    payload: term,
  };
}

export function resetOffset() {
  return {
    type: RESET_OFFSET,
  };
}

export function fetchSearchRequest() {
  return {
    type: FETCH_SEARCH_REQUEST,
  };
}

export function fetchSearchSuccess(data) {
  return {
    type: FETCH_SEARCH_SUCCESS,
    payload: data,
  };
}

export function loadMoreSearchRequest(dontLoad) {
  let isLoadingMore;

  if (dontLoad) {
    isLoadingMore = false;
  } else {
    isLoadingMore = true;
  }

  return {
    type: LOAD_MORE_SEARCH_REQUEST,
    payload: isLoadingMore,
  };
}

export function loadMore(data, offset) {
  return {
    type: LOAD_MORE_SEARCH,
    payload: { data, offset },
  };
}

export function stopFetchSearch() {
  return {
    type: STOP_FETCH_SEARCH,
  };
}

export function fetchSearchFailure(error) {
  return {
    type: FETCH_SEARCH_FAILURE,
    payload: error,
  };
}

export function getSearch() {
  return async (dispatch, getState) => {
    const { searchTerm } = getState().search;
    const { list } = getState().myList;

    dispatch(fetchSearchRequest());

    try {
      const getToken = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${encode(
            `${import.meta.env.VITE_SPOTIFY_CLIENT_ID}:${
              import.meta.env.VITE_SPOTIFY_CLIENT_SECRET
            }`
          )}`,
        },
        body: "grant_type=client_credentials",
      });

      const token = await getToken.json();

      const res = await api.get(
        `https://api.spotify.com/v1/search?query=${searchTerm}&limit=20&offset=0&type=track`,
        {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }
      );

      const fetchData = res.data.tracks.items.map(data => ({
        isIncluded:
          list.find(listItem => listItem.track.id === data.id) !== undefined,
        track: {
          ...data,
          duration: convertDurationToTimeString(data.duration_ms),
        },
      }));

      dispatch({
        type: FETCH_SEARCH_SUCCESS,
        payload: { data: fetchData },
      });
    } catch (err) {
      dispatch(fetchSearchFailure(err));
      console.log(err.message);
    }
  };
}

export function loadMoreSearch() {
  return async (dispatch, getState) => {
    const { searchTerm, searchOffset, dontLoadMore } = getState().search;
    const { list } = getState().myList;

    dispatch(loadMoreSearchRequest(dontLoadMore));

    try {
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

      const offset = searchOffset + 20;

      const token = await getToken.json();

      const res = await api.get(
        `https://api.spotify.com/v1/search?query=${searchTerm}&limit=20&offset=${offset}&type=track`,
        {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }
      );

      const fetchData = res.data.tracks.items.map(data => ({
        isIncluded:
          list.find(listItem => listItem.track.id === data.id) !== undefined,
        track: {
          ...data,
          duration: convertDurationToTimeString(data.duration_ms),
        },
      }));

      if (fetchData.length === 0) {
        dispatch(stopFetchSearch());
        return;
      }

      dispatch({
        type: LOAD_MORE_SEARCH,
        payload: { data: fetchData, offset },
      });
    } catch (err) {
      dispatch(fetchSearchFailure(err));
      console.log(err.message);
    }
  };
}
