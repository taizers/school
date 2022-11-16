import {
  GET_GROUP_SUCCESSED,
  GET_ALL_GROUPS_SUCCESSED,
  SET_GROUPS_LOADING,
  SET_GROUPS_MODAL_STATUS,
  GET_ADMINISTRATION_GROUP_SUCCESSED,
  GET_GROUPS_LIST_SUCCESSED,
  CLEAR_GROUP,
} from '../constants/types';

const initialState = {
  groups: null,
  groupsList: null,
  group: null,
  administrationGroup: null,
  isLoading: false,
  groupsModalIsOpen: false,
};

const reducer = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  const { type, payload } = action;

  switch (type) {
    case GET_GROUP_SUCCESSED:
      return {
        ...state,
        group: payload,
      };
    case GET_ALL_GROUPS_SUCCESSED:
      return {
        ...state,
        groups: payload,
      };
    case SET_GROUPS_MODAL_STATUS:
      return {
        ...state,
        groupsModalIsOpen: payload,
      };
    case SET_GROUPS_LOADING:
      return {
        ...state,
        isLoading: payload,
      };
    case GET_ADMINISTRATION_GROUP_SUCCESSED:
      return {
        ...state,
        administrationGroup: payload,
      };
    case GET_GROUPS_LIST_SUCCESSED:
      return {
        ...state,
        groupsList: payload,
      };
    case CLEAR_GROUP:
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
