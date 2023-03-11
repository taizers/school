import {
  LOGIN_SUCCESSED,
  SET_AUTH_LOADING,
  CLEAR_AUTH,
  UPDATE_PROFILE_SUCCESSED,
} from '../constants/types';

const initialState = {
  authUser: {},
  isLoading: false,
  isAuth: false,
  role: '',
};

const reducer = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESSED:
      return {
        ...state,
        authUser: payload,
        role: payload?.role,
        isAuth: true,
      };
    case UPDATE_PROFILE_SUCCESSED:
      return {
        ...state,
        authUser: payload,
        role: payload?.role,
      };
    case CLEAR_AUTH:
      return initialState;
    case SET_AUTH_LOADING:
      return {
        ...state,
        isLoading: payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
