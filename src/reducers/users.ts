import {
  GET_ALL_USERS_SUCCESSED,
  GET_USER_SUCCESSED,
  SET_USERS_LOADING,
  UPDATE_USER_SUCCESSED,
  SET_USER_MODAL_STATUS,
  SET_PROFILE_MODAL_STATUS,
  CLEAR_USER,
  GET_CEO_SUCCESSED,
} from '../constants/types';

const initialState = {
  user: null,
  users: null,
  ceo: null,
  isLoading: false,
  userModalIsOpen: false,
  profileModalIsOpen: false,
};

const reducer = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  const { type, payload } = action;

  switch (type) {
    case CLEAR_USER:
      return {
        ...state,
        user: null,
      };
    case SET_USERS_LOADING:
      return {
        ...state,
        isLoading: payload,
      };
    case SET_PROFILE_MODAL_STATUS:
      return {
        ...state,
        profileModalIsOpen: payload,
      };
    case SET_USER_MODAL_STATUS:
      return {
        ...state,
        userModalIsOpen: payload,
      };
    case GET_ALL_USERS_SUCCESSED:
      return {
        ...state,
        users: payload,
      };
    case GET_CEO_SUCCESSED:
      return {
        ...state,
        ceo: payload,
      };
    case GET_USER_SUCCESSED:
      return {
        ...state,
        user: payload,
      };
    case UPDATE_USER_SUCCESSED:
      return {
        ...state,
        user: payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
