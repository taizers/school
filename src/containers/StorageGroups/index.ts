import { StorageGroups } from './StorageGroups';
import { connect } from 'react-redux';

import {
  getAllStorageGroups,
  deleteStorageGroup,
  updateStorageGroup,
  getStorageGroup,
  createStorageGroup,
  setStorageGroupsModalStatus,
  clearStorageGroup,
} from '../../actions/storages';

const mapStateToProps = (state: {
  storages: {
    groups: any;
    groupsModalIsOpen: boolean;
    isLoading: boolean;
  };
}) => ({
  isLoading: state.storages.isLoading,
  groups: state.storages.groups,
  isOpen: state.storages.groupsModalIsOpen,
});

const mapDispatchToProps = (dispatch: any) => ({
  getAllStorageGroups: (page: number, limit: number) =>
    dispatch(getAllStorageGroups(page, limit)),
  deleteStorageGroup: (id: string) => dispatch(deleteStorageGroup(id)),
  updateStorageGroup: (data: any, id: string) =>
    dispatch(updateStorageGroup(data, id)),
  createStorageGroup: (data: any) => dispatch(createStorageGroup(data)),
  setStorageGroupsModalStatus: (data: boolean) =>
    dispatch(setStorageGroupsModalStatus(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StorageGroups);
