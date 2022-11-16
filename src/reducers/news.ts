import {
  GET_NEWS_SUCCESSED,
  GET_ALL_NEWS_PAGINATED_SUCCESSED,
  SET_NEWS_LOADING,
  SET_NEWS_MODAL_STATUS,
  CLEAR_NEWS,
  GET_NEWS_WIDGET_SUCCESSED,
} from '../constants/types';

const initialState = {
  allNews: null,
  widget: null,
  isLoading: false,
  news: null,
  newsModalIsOpen: false,
};

const reducer = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  const { type, payload } = action;

  switch (type) {
    case GET_NEWS_SUCCESSED:
      return {
        ...state,
        news: payload,
      };
    case GET_NEWS_WIDGET_SUCCESSED:
      return {
        ...state,
        widget: payload,
      };
    case GET_ALL_NEWS_PAGINATED_SUCCESSED:
      return {
        ...state,
        allNews: payload,
      };
    case SET_NEWS_MODAL_STATUS:
      return {
        ...state,
        newsModalIsOpen: payload,
      };
    case SET_NEWS_LOADING:
      return {
        ...state,
        isLoading: payload,
      };
    case CLEAR_NEWS:
      return {
        ...state,
        news: null,
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
