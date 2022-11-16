import {
  GET_STORAGE_GROUP,
  GET_ALL_STORAGE_GROUPS,
  DELETE_STORAGE_GROUP,
  GET_STORAGE_GROUP_SUCCESSED,
  GET_ALL_STORAGE_GROUPS_SUCCESSED,
  DELETE_STORAGE_GROUP_SUCCESSED,
  SET_STORAGE_GROUPS_LOADING,
  UPDATE_STORAGE_GROUP_SUCCESSED,
  UPDATE_STORAGE_GROUP,
  CREATE_STORAGE_GROUP_SUCCESSED,
  CREATE_STORAGE_GROUP,
  SET_STORAGE_GROUPS_MODAL_STATUS,
  GET_STORAGE_GROUPS_LIST,
  GET_STORAGE_GROUPS_LIST_SUCCESSED,
  CLEAR_STORAGE_GROUP,
  CREATE_STORAGE_FILE,
  CREATE_STORAGE_FILE_SUCCESSED,
  DELETE_STORAGE_FILE,
  DELETE_STORAGE_FILE_SUCCESSED,
} from '../constants/types';
import { UpdateUserType, UserType, UsersType } from '../constants/tsSchemes';
import { data } from 'jquery';

export const getAllStorageGroups = (page: number, limit: number) => ({
  type: GET_ALL_STORAGE_GROUPS,
  payload: { page, limit },
});

export const getAllStorageGroupsSuccessed = (data: any) => ({
  type: GET_ALL_STORAGE_GROUPS_SUCCESSED,
  payload: data,
});

export const getStorageGroup = (id: string, page: number, limit: number) => ({
  type: GET_STORAGE_GROUP,
  payload: { id, page, limit },
});

export const getStorageGroupSuccessed = (data: any) => ({
  type: GET_STORAGE_GROUP_SUCCESSED,
  payload: data,
});

export const updateStorageGroup = (data: any, id: string) => ({
  type: UPDATE_STORAGE_GROUP,
  payload: { data, id },
});

export const updateStorageGroupSuccessed = (data: any) => ({
  type: UPDATE_STORAGE_GROUP_SUCCESSED,
  payload: data,
});

export const deleteStorageGroup = (id: string) => ({
  type: DELETE_STORAGE_GROUP,
  payload: id,
});

export const deleteStorageGroupSuccessed = () => ({
  type: DELETE_STORAGE_GROUP_SUCCESSED,
});

export const createStorageGroup = (data: any) => ({
  type: CREATE_STORAGE_GROUP,
  payload: data,
});

export const createStorageGroupSuccessed = (data: any) => ({
  type: CREATE_STORAGE_GROUP_SUCCESSED,
  payload: data,
});

export const setStorageGroupsModalStatus = (isOpen: boolean) => ({
  type: SET_STORAGE_GROUPS_MODAL_STATUS,
  payload: isOpen,
});

export const setStorageGroupsLoading = (is_loading: boolean) => ({
  type: SET_STORAGE_GROUPS_LOADING,
  payload: is_loading,
});

export const clearStorageGroup = () => ({
  type: CLEAR_STORAGE_GROUP,
});

export const getStorageGroupsList = () => ({
  type: GET_STORAGE_GROUPS_LIST,
});

export const getStorageGroupsListSuccessed = (data: any) => ({
  type: GET_STORAGE_GROUPS_LIST_SUCCESSED,
  payload: data,
});

export const createStorageFile = (data: any, groupId: string) => ({
  type: CREATE_STORAGE_FILE,
  payload: { data, groupId },
});

export const createStorageFileSuccessed = (data: any) => ({
  type: CREATE_STORAGE_FILE_SUCCESSED,
  payload: data,
});

export const deleteStorageFile = (deleteId: string, groupId: string) => ({
  type: DELETE_STORAGE_FILE,
  payload: { deleteId, groupId },
});

export const deleteStorageFileSuccessed = (data: any) => ({
  type: DELETE_STORAGE_FILE_SUCCESSED,
  payload: data,
});
