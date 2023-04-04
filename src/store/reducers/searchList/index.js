import {
  SET_SEARCH_QUERY,
  RESET_OFFSET,
  FETCH_SEARCH_REQUEST,
  FETCH_SEARCH_SUCCESS,
  MAKE_A_NEW_DATA_SEARCH,
  LOAD_MORE_SEARCH_REQUEST,
  LOAD_MORE_SEARCH,
  STOP_FETCH_SEARCH,
  FETCH_SEARCH_FAILURE,
} from "../../types";

const initialState = {
  searchData: [],
  searchTerm: "",
  searchOffset: 20,
  searchIsLoading: false,
  isLoadingMore: false,
  dontLoadMore: false,
  error: false,
};

function searchReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SEARCH_QUERY:
      return {
        ...state,
        searchTerm: action.payload,
      };
    case RESET_OFFSET:
      return {
        ...state,
        searchOffset: 0,
        searchData: [],
      };
    case FETCH_SEARCH_REQUEST:
      return {
        ...state,
        searchIsLoading: true,
        searchOffset: 0,
      };
    case FETCH_SEARCH_SUCCESS:
      return {
        ...state,
        searchData: [...state.searchData, ...action.payload.data],
        searchIsLoading: false,
      };
    case MAKE_A_NEW_DATA_SEARCH:
      return {
        ...state,
        searchData: action.payload,
      };
    case LOAD_MORE_SEARCH_REQUEST:
      return {
        ...state,
        isLoadingMore: action.payload,
      };
    case LOAD_MORE_SEARCH:
      return {
        ...state,
        searchData: [...state.searchData, ...action.payload.data],
        searchOffset: action.payload.offset,
        isLoadingMore: false,
      };
    case STOP_FETCH_SEARCH:
      return {
        ...state,
        isLoadingMore: false,
        dontLoadMore: true,
      };
    case FETCH_SEARCH_FAILURE:
      return {
        ...state,
        error: true,
        searchIsLoading: false,
        isLoadingMore: false,
      };
    default:
      return state;
  }
}

export default searchReducer;
