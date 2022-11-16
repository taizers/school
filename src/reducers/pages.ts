import {
  GET_PAGE_SUCCESSED,
  GET_PAGES_SUCCESSED,
  GET_PAGES_LIST_SUCCESSED,
  SET_UPDATE_PAGE_MODAL_STATUS,
  SET_CREATE_PAGE_MODAL_STATUS,
  SET_PAGES_LOADING,
  CLEAR_PAGE,
} from '../constants/types';

const initialState = {
  page: null,
  pages: null,
  pagesList: null,
  isLoading: false,
  pagesCreateModalIsOpen: false,
  pagesUpdateModalIsOpen: false,
};

const reducer = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PAGE_SUCCESSED:
      return {
        ...state,
        page: payload,
      };
    case GET_PAGES_SUCCESSED:
      return {
        ...state,
        pages: payload,
      };
    case GET_PAGES_LIST_SUCCESSED:
      return {
        ...state,
        pagesList: payload,
      };
    case SET_CREATE_PAGE_MODAL_STATUS:
      return {
        ...state,
        pagesCreateModalIsOpen: payload,
      };
    case SET_UPDATE_PAGE_MODAL_STATUS:
      return {
        ...state,
        pagesUpdateModalIsOpen: payload,
      };
    case SET_PAGES_LOADING:
      return {
        ...state,
        isLoading: payload,
      };
    case CLEAR_PAGE:
      return {
        ...state,
        page: null,
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
