import { StorageFiles } from './StorageFiles';
import { connect } from 'react-redux';

import {
  createStorageFile,
  deleteStorageFile,
  getStorageGroup,
  setStorageGroupsModalStatus,
} from '../../actions/storages';

const mapStateToProps = (state: {
  storages: {
    group: any;
    groupsModalIsOpen: boolean;
    isLoading: boolean;
  };
}) => ({
  isLoading: state.storages.isLoading,
  group: state.storages.group,
  isOpen: state.storages.groupsModalIsOpen,
});

const mapDispatchToProps = (dispatch: any) => ({
  getStorageGroup: (id: string, page: number, limit: number) =>
    dispatch(getStorageGroup(id, page, limit)),
  deleteStorageFile: (id: string, groupId: string) =>
    dispatch(deleteStorageFile(id, groupId)),
  createStorageFile: (data: any, id: string) =>
    dispatch(createStorageFile(data, id)),
  setStorageGroupsModalStatus: (data: boolean) =>
    dispatch(setStorageGroupsModalStatus(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StorageFiles);
