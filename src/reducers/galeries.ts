import { 
  GET_GALERY_SUCCESSED, 
  GET_ALL_GALERIES_PAGINATED_SUCCESSED, 
  SET_GALERIES_LOADING,
  SET_GALERIES_MODAL_STATUS
} from '../constants/types';

const initialState = {
  galeries: {},
  isLoading: false,
  galery: {},
  galeriesModalIsOpen: false,
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
    case SET_GALERIES_MODAL_STATUS:
      return {
        ...state,
        galeriesModalIsOpen: payload,
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
