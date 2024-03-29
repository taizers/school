//AUTH

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESSED = 'LOGIN_SUCCESSED';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT = 'LOGOUT';
export const SIGNUP = 'SIGNUP';
export const SIGNUP_SUCCESSED = 'SIGNUP_SUCCESSED';
export const SIGNUP_FAILED = 'SIGNUP_FAILED';
export const SET_AUTH_LOADING = 'SET_AUTH_LOADING';
export const CHECK_AUTH = 'CHECK_AUTH';
export const CLEAR_AUTH = 'CLEAR_AUTH';

//USERS

export const CREATE_USER = 'CREATE_USER';
export const CREATE_USER_SUCCESSED = 'CREATE_USER_SUCCESSED';
export const GET_ALL_USERS = 'GET_ALL_USERS';
export const GET_ALL_USERS_SUCCESSED = 'GET_ALL_USERS_SUCCESSED';
export const GET_ALL_USERS_FAILED = 'GET_ALL_USERS_FAILED';
export const GET_USER = 'GET_USER';
export const GET_CEO = 'GET_CEO';
export const GET_CEO_SUCCESSED = 'GET_CEO_SUCCESSED';
export const GET_USER_SUCCESSED = 'GET_USER_SUCCESSED';
export const GET_USER_FAILED = 'GET_USER_FAILED';
export const DELETE_USER = 'DELETE_USER';
export const DELETE_USER_SUCCESSED = 'DELETE_USER_SUCCESSED';
export const DELETE_USER_FAILED = 'DELETE_USER_FAILED';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const UPDATE_PROFILE_SUCCESSED = 'UPDATE_PROFILE_SUCCESSED';
export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_USER_SUCCESSED = 'UPDATE_USER_SUCCESSED';
export const SET_USER_MODAL_STATUS = 'SET_USER_MODAL_STATUS';
export const SET_PROFILE_MODAL_STATUS = 'SET_PROFILE_MODAL_STATUS';
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';
export const SET_USERS_LOADING = 'SET_USERS_LOADING';
export const CLEAR_USER = 'CLEAR_USER';

//BOOKS

export const SET_BOOKS_LOADING = 'SET_BOOKS_LOADING';
export const GET_BOOKS = 'GET_BOOKS';
export const GET_AUTHORS = 'GET_AUTHORS';
export const GET_AUTHORS_SUCCESSED = 'GET_AUTHORS_SUCCESSED';
export const GET_BOOKS_SUCCESSED = 'GET_BOOKS_SUCCESSED';

//NEWS

export const SET_NEWS_LOADING = 'SET_NEWS_LOADING';
export const SET_NEWS_MODAL_STATUS = 'SET_NEWS_MODAL_STATUS';
export const GET_NEWS = 'GET_NEWS';
export const GET_ALL_NEWS_PAGINATED = 'GET_ALL_NEWS_PAGINATED';
export const DELETE_NEWS = 'DELETE_NEWS';
export const UPDATE_NEWS = 'UPDATE_NEWS';
export const CREATE_NEWS = 'CREATE_NEWS';
export const GET_NEWS_SUCCESSED = 'GET_NEWS_SUCCESSED';
export const GET_ALL_NEWS_PAGINATED_SUCCESSED =
  'GET_ALL_NEWS_PAGINATED_SUCCESSED';
export const DELETE_NEWS_SUCCESSED = 'DELETE_NEWS_SUCCESSED';
export const UPDATE_NEWS_SUCCESSED = 'UPDATE_NEWS_SUCCESSED';
export const CREATE_NEWS_SUCCESSED = 'CREATE_NEWS_SUCCESSED';
export const CLEAR_NEWS = 'CLEAR_NEWS';
export const GET_NEWS_WIDGET = 'GET_NEWS_WIDGET';
export const GET_NEWS_WIDGET_SUCCESSED = 'GET_NEWS_WIDGET_SUCCESSED';

//GALERIES

export const SET_GALERIES_LOADING = 'SET_GALERIES_LOADING';
export const SET_CREATE_GALERY_MODAL_STATUS = 'SET_CREATE_GALERY_MODAL_STATUS';
export const SET_UPDATE_GALERY_MODAL_STATUS = 'SET_UPDATE_GALERY_MODAL_STATUS';
export const GET_GALERY = 'GET_GALERY';
export const GET_ALL_GALERIES_PAGINATED = 'GET_ALL_GALERIES_PAGINATED';
export const DELETE_GALERY = 'DELETE_GALERY';
export const UPDATE_GALERY = 'UPDATE_GALERY';
export const CREATE_GALERY = 'CREATE_GALERY';
export const GET_GALERY_SUCCESSED = 'GET_GALERY_SUCCESSED';
export const GET_ALL_GALERIES_PAGINATED_SUCCESSED =
  'GET_ALL_GALERIES_PAGINATED_SUCCESSED';
export const DELETE_GALERY_SUCCESSED = 'DELETE_GALERY_SUCCESSED';
export const UPDATE_GALERY_SUCCESSED = 'UPDATE_GALERY_SUCCESSED';
export const CREATE_GALERY_SUCCESSED = 'CREATE_GALERY_SUCCESSED';
export const CLEAR_GALERY = 'CLEAR_GALERY';

//NEWS

export const SET_GROUPS_LOADING = 'SET_GROUPS_LOADING';
export const SET_GROUPS_MODAL_STATUS = 'SET_GROUPS_MODAL_STATUS';
export const GET_GROUP = 'GET_GROUP';
export const GET_ALL_GROUPS = 'GET_ALL_GROUPS';
export const DELETE_GROUP = 'DELETE_GROUP';
export const UPDATE_GROUP = 'UPDATE_GROUP';
export const CREATE_GROUP = 'CREATE_GROUP';
export const GET_GROUP_SUCCESSED = 'GET_GROUP_SUCCESSED';
export const GET_ALL_GROUPS_SUCCESSED = 'GET_ALL_GROUPS_SUCCESSED';
export const DELETE_GROUP_SUCCESSED = 'DELETE_GROUP_SUCCESSED';
export const UPDATE_GROUP_SUCCESSED = 'UPDATE_NEWS_SUCCESSED';
export const CREATE_GROUP_SUCCESSED = 'CREATE_GROUP_SUCCESSED';
export const CLEAR_GROUP = 'CLEAR_GROUP';
export const GET_ADMINISTRATION_GROUP = 'GET_ADMINISTRATION_GROUP';
export const GET_ADMINISTRATION_GROUP_SUCCESSED =
  'GET_ADMINISTRATION_GROUP_SUCCESSED';
export const GET_GROUPS_LIST = 'GET_GROUPS_LIST';
export const GET_GROUPS_LIST_SUCCESSED = 'GET_GROUPS_LIST_SUCCESSED';

//STORAGE

export const SET_STORAGE_GROUPS_LOADING = 'SET_STORAGE_GROUPS_LOADING';
export const SET_STORAGE_GROUPS_MODAL_STATUS =
  'SET_STORAGE_GROUPS_MODAL_STATUS';
export const GET_STORAGE_GROUP = 'GET_STORAGE_GROUP';
export const GET_ALL_STORAGE_GROUPS = 'GET_ALL_STORAGE_GROUPS';
export const DELETE_STORAGE_GROUP = 'DELETE_STORAGE_GROUP';
export const UPDATE_STORAGE_GROUP = 'UPDATE_STORAGE_GROUP';
export const CREATE_STORAGE_GROUP = 'CREATE_STORAGE_GROUP';
export const GET_STORAGE_GROUP_SUCCESSED = 'GET_STORAGE_GROUP_SUCCESSED';
export const GET_ALL_STORAGE_GROUPS_SUCCESSED =
  'GET_ALL_STORAGE_GROUPS_SUCCESSED';
export const DELETE_STORAGE_GROUP_SUCCESSED = 'DELETE_STORAGE_GROUP_SUCCESSED';
export const UPDATE_STORAGE_GROUP_SUCCESSED = 'UPDATE_STORAGE_GROUP_SUCCESSED';
export const CREATE_STORAGE_GROUP_SUCCESSED = 'CREATE_STORAGE_GROUP_SUCCESSED';
export const GET_STORAGE_GROUPS_LIST = 'GET_STORAGE_GROUPS_LIST';
export const GET_STORAGE_GROUPS_LIST_SUCCESSED =
  'GET_STORAGE_GROUPS_LIST_SUCCESSED';
export const DELETE_STORAGE_FILE = 'DELETE_STORAGE_FILE';
export const DELETE_STORAGE_FILE_SUCCESSED = 'DELETE_STORAGE_FILE_SUCCESSED';
export const CREATE_STORAGE_FILE = 'CREATE_STORAGE_FILE';
export const CREATE_STORAGE_FILE_SUCCESSED = 'CREATE_STORAGE_FILE_SUCCESSED';
export const CLEAR_STORAGE_GROUP = 'CLEAR_STORAGE_GROUP';

//PAGES

export const SET_PAGES_LOADING = 'SET_PAGES_LOADING';
export const SET_CREATE_PAGE_MODAL_STATUS = 'SET_CREATE_PAGE_MODAL_STATUS';
export const SET_UPDATE_PAGE_MODAL_STATUS = 'SET_UPDATE_PAGE_MODAL_STATUS';
export const GET_PAGE = 'GET_PAGE';
export const GET_PAGES = 'GET_PAGES';
export const GET_PAGES_LIST = 'GET_PAGES_LIST';
export const DELETE_PAGE = 'DELETE_PAGE';
export const UPDATE_PAGE = 'UPDATE_PAGE';
export const CREATE_PAGE = 'CREATE_PAGE';
export const GET_PAGE_SUCCESSED = 'GET_PAGE_SUCCESSED';
export const GET_PAGES_SUCCESSED = 'GET_PAGES_SUCCESSED';
export const GET_PAGES_LIST_SUCCESSED = 'GET_PAGES_LIST_SUCCESSED';
export const DELETE_PAGE_SUCCESSED = 'DELETE_PAGE_SUCCESSED';
export const UPDATE_PAGE_SUCCESSED = 'UPDATE_PAGE_SUCCESSED';
export const CREATE_PAGE_SUCCESSED = 'CREATE_PAGE_SUCCESSED';
export const CLEAR_PAGE = 'CLEAR_PAGE';
