import { ADD_ITEM_LIST, REMOVE_ITEM_LIST, HAS_ITEM } from "../../types";

const initialState = {
  list: [],
  hasItem: false,
};

function myListReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ITEM_LIST:
      return {
        ...state,
        list: [action.payload, ...state.list],
      };
    case REMOVE_ITEM_LIST:
      return {
        ...state,
        list: action.payload,
      };
    case HAS_ITEM:
      return {
        ...state,
        hasItem: action.payload,
      };
    default:
      return state;
  }
}

export default myListReducer;
