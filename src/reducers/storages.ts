import {
  GET_STORAGE_GROUP_SUCCESSED,
  GET_ALL_STORAGE_GROUPS_SUCCESSED,
  SET_STORAGE_GROUPS_LOADING,
  SET_STORAGE_GROUPS_MODAL_STATUS,
  GET_STORAGE_GROUPS_LIST_SUCCESSED,
  CLEAR_STORAGE_GROUP,
} from '../constants/types';

const initialState = {
  groups: null,
  groupsList: null,
  group: null,
  isLoading: false,
  groupsModalIsOpen: false,
};

const reducer = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  const { type, payload } = action;

  switch (type) {
    case GET_STORAGE_GROUP_SUCCESSED:
      return {
        ...state,
        group: payload,
      };
    case GET_ALL_STORAGE_GROUPS_SUCCESSED:
      return {
        ...state,
        groups: payload,
      };
    case SET_STORAGE_GROUPS_MODAL_STATUS:
      return {
        ...state,
        groupsModalIsOpen: payload,
      };
    case SET_STORAGE_GROUPS_LOADING:
      return {
        ...state,
        isLoading: payload,
      };
    case GET_STORAGE_GROUPS_LIST_SUCCESSED:
      return {
        ...state,
        groupsList: payload,
      };
    case CLEAR_STORAGE_GROUP:
      return {
        ...state,
        group: null,
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
