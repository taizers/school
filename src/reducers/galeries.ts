import {
  GET_GALERY_SUCCESSED,
  GET_ALL_GALERIES_PAGINATED_SUCCESSED,
  SET_GALERIES_LOADING,
  SET_CREATE_GALERY_MODAL_STATUS,
  SET_UPDATE_GALERY_MODAL_STATUS,
  CLEAR_GALERY,
} from '../constants/types';

const initialState = {
  galeries: null,
  isLoading: false,
  galery: null,
  isOpenCreateGaleryModal: false,
  isOpenUpdateGaleryModal: false,
};

const reducer = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  const { type, payload } = action;

  switch (type) {
    case GET_GALERY_SUCCESSED:
      return {
        ...state,
        galery: payload,
      };
    case GET_ALL_GALERIES_PAGINATED_SUCCESSED:
      return {
        ...state,
        galeries: payload,
      };
    case SET_CREATE_GALERY_MODAL_STATUS:
      return {
        ...state,
        isOpenCreateGaleryModal: payload,
      };
    case SET_UPDATE_GALERY_MODAL_STATUS:
      return {
        ...state,
        isOpenUpdateGaleryModal: payload,
      };
    case CLEAR_GALERY:
      return {
        ...state,
        galery: null,
      };
    case SET_GALERIES_LOADING:
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
