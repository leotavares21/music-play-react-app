import {
  ADD_ITEM_LIST,
  REMOVE_ITEM_LIST,
  MAKE_A_NEW_DATA,
  MAKE_A_NEW_DATA_SEARCH,
  HAS_ITEM,
} from "../types";

export function myListCheck(hasItem) {
  return {
    type: HAS_ITEM,
    payload: hasItem,
  };
}

export function handleAddItem(item, id) {
  return (dispatch, getState) => {
    const { list } = getState().myList;
    const { data } = getState().spotify;
    const { searchData } = getState().search;

    const index = data.findIndex(item => item.track.id === id);
    const hasItem = list.filter(item => item.track.id === id);

    if (hasItem.length === 0) {
      if (searchData.length > 0) {
        const SearchIndex = searchData.findIndex(item => item.track.id === id);
        const newSearch = [...searchData];
        newSearch[SearchIndex].track.isIncluded = true;

        item.isIncluded = true;

        dispatch({ type: ADD_ITEM_LIST, payload: item });
        dispatch({ type: MAKE_A_NEW_DATA_SEARCH, payload: newSearch });
      } else {
        const newData = [...data];
        newData[index].track.isIncluded = true;
        item.isIncluded = true;

        dispatch({ type: ADD_ITEM_LIST, payload: item });
        dispatch({ type: MAKE_A_NEW_DATA, payload: newData });
      }
    } else {
      dispatch(myListCheck(true));
    }
  };
}

export function handleRemoveItem(id, isMyListItem) {
  return (dispatch, getState) => {
    const { list } = getState().myList;
    const { searchData } = getState().search;
    const { data } = getState().spotify;

    const newList = list.filter(item => item.track.id !== id);

    if (isMyListItem) {
      dispatch({ type: REMOVE_ITEM_LIST, payload: newList });
      return;
    }

    if (searchData.length > 0) {
      searchData.find(item => item.track.id === id).isIncluded = false;

      dispatch({ type: REMOVE_ITEM_LIST, payload: newList });
      dispatch({ type: MAKE_A_NEW_DATA_SEARCH, payload: searchData });
    } else {
      data.find(item => item.track.id === id).isIncluded = false;

      dispatch({ type: REMOVE_ITEM_LIST, payload: newList });
      dispatch({ type: MAKE_A_NEW_DATA, payload: data });
    }
  };
}
