import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  MAKE_A_NEW_DATA,
  FETCH_FAILURE,
} from "../../types";

const initialState = {
  data: [],
  isLoading: false,
  error: "",
};

function spotifyReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: "",
        isLoading: false,
      };
    case MAKE_A_NEW_DATA:
      return {
        ...state,
        data: action.payload,
      };
    case FETCH_FAILURE:
      return {
        ...state,
        data: [],
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
}

export default spotifyReducer;
