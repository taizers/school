import {
  DELETE_USER,
  DELETE_USER_FAILED,
  DELETE_USER_SUCCESSED,
  GET_ALL_USERS,
  GET_ALL_USERS_FAILED,
  GET_ALL_USERS_SUCCESSED,
  GET_USER,
  GET_USER_FAILED,
  GET_USER_SUCCESSED,
  SET_USERS_LOADING,
  UPDATE_USER,
  UPDATE_USER_FAILED,
  UPDATE_USER_SUCCESSED,
  UPDATE_PROFILE_SUCCESSED,
  UPDATE_PROFILE,
  SET_PROFILE_MODAL_STATUS,
  SET_USER_MODAL_STATUS,
  CREATE_USER,
  CREATE_USER_SUCCESSED,
  CLEAR_USER,
  GET_CEO_SUCCESSED,
  GET_CEO,
} from '../constants/types';
import { UpdateUserType, UserType, UsersType } from '../constants/tsSchemes';

export const createUser = (data: UsersType) => ({
  type: CREATE_USER,
  payload: data,
});

export const createUserSuccessed = (data: UsersType) => ({
  type: CREATE_USER_SUCCESSED,
  payload: data,
});

export const getAllUsers = (page: number, limit: number) => ({
  type: GET_ALL_USERS,
  payload: { page, limit },
});

export const getAllUsersSuccessed = (data: UsersType) => ({
  type: GET_ALL_USERS_SUCCESSED,
  payload: data,
});

export const getUser = (id: string) => ({
  type: GET_USER,
  payload: id,
});

export const getUserSuccessed = (data: UserType) => ({
  type: GET_USER_SUCCESSED,
  payload: data,
});

export const getCEO = () => ({
  type: GET_CEO,
});

export const getCEOSuccessed = (data: UserType) => ({
  type: GET_CEO_SUCCESSED,
  payload: data,
});

export const updateUser = (data: UpdateUserType, id: string) => ({
  type: UPDATE_USER,
  payload: { data, id },
});

export const updateProfile = (data: UpdateUserType) => ({
  type: UPDATE_PROFILE,
  payload: data,
});

export const updateProfileSuccessed = (data: {
  id: string;
  name: string;
  email: string;
}) => ({
  type: UPDATE_PROFILE_SUCCESSED,
  payload: data,
});

export const deleteUser = (id: string) => ({
  type: DELETE_USER,
  payload: id,
});

export const deleteUserSuccessed = () => ({
  type: DELETE_USER_SUCCESSED,
});

export const setUsersLoading = (bool: boolean) => ({
  type: SET_USERS_LOADING,
  payload: bool,
});

export const setUserModalStatus = (bool: boolean) => ({
  type: SET_USER_MODAL_STATUS,
  payload: bool,
});

export const setProfileModal = (bool: boolean) => ({
  type: SET_PROFILE_MODAL_STATUS,
  payload: bool,
});

export const clearUser = () => ({
  type: CLEAR_USER,
});
