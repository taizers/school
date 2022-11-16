import {
  GET_GROUP,
  GET_ALL_GROUPS,
  DELETE_GROUP,
  GET_GROUP_SUCCESSED,
  GET_ALL_GROUPS_SUCCESSED,
  DELETE_GROUP_SUCCESSED,
  SET_GROUPS_LOADING,
  UPDATE_GROUP_SUCCESSED,
  UPDATE_GROUP,
  CREATE_GROUP_SUCCESSED,
  CREATE_GROUP,
  SET_GROUPS_MODAL_STATUS,
  GET_ADMINISTRATION_GROUP,
  GET_ADMINISTRATION_GROUP_SUCCESSED,
  GET_GROUPS_LIST,
  GET_GROUPS_LIST_SUCCESSED,
  CLEAR_GROUP,
} from '../constants/types';
import { UpdateUserType, UserType, UsersType } from '../constants/tsSchemes';
import { data } from 'jquery';

export const getAllGroups = () => ({
  type: GET_ALL_GROUPS,
});

export const getAllGroupsSuccessed = (data: any) => ({
  type: GET_ALL_GROUPS_SUCCESSED,
  payload: data,
});

export const getGroup = (id: string) => ({
  type: GET_GROUP,
  payload: id,
});

export const getGroupSuccessed = (data: any) => ({
  type: GET_GROUP_SUCCESSED,
  payload: data,
});

export const updateGroup = (data: any, id: string) => ({
  type: UPDATE_GROUP,
  payload: { data, id },
});

export const updateGroupSuccessed = (data: any) => ({
  type: UPDATE_GROUP_SUCCESSED,
  payload: data,
});

export const deleteGroup = (id: string) => ({
  type: DELETE_GROUP,
  payload: id,
});

export const deleteGroupSuccessed = () => ({
  type: DELETE_GROUP_SUCCESSED,
});

export const createGroup = (data: any) => ({
  type: CREATE_GROUP,
  payload: data,
});

export const createGroupSuccessed = (data: any) => ({
  type: CREATE_GROUP_SUCCESSED,
  payload: data,
});

export const setGroupsModalStatus = (isOpen: boolean) => ({
  type: SET_GROUPS_MODAL_STATUS,
  payload: isOpen,
});

export const setGroupsLoading = (is_loading: boolean) => ({
  type: SET_GROUPS_LOADING,
  payload: is_loading,
});

export const clearGroup = () => ({
  type: CLEAR_GROUP,
});

export const getAdministrationGroup = () => ({
  type: GET_ADMINISTRATION_GROUP,
});

export const getAdministrationGroupSuccessed = (data: any) => ({
  type: GET_ADMINISTRATION_GROUP_SUCCESSED,
  payload: data,
});

export const getGroupsList = () => ({
  type: GET_GROUPS_LIST,
});

export const getGroupsListSuccessed = (data: any) => ({
  type: GET_GROUPS_LIST_SUCCESSED,
  payload: data,
});
