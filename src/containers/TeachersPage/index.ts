import { TeachersPage } from './TeachersPage';
import { connect } from 'react-redux';
import {
  getAllGroups,
  createGroup,
  updateGroup,
  deleteGroup,
  getGroup,
  setGroupsModalStatus,
} from '../../actions/groups';

const mapStateToProps = (state: {
  auth: {
    isAuth: boolean;
    role: string;
  };
  groups: {
    isLoading: boolean;
    groups: any;
    group: any;
    groupsModalIsOpen: boolean;
  };
}) => ({
  isLoading: state.groups.isLoading,
  isAuth: state.auth.isAuth,
  role: state.auth.role,
  groups: state.groups.groups,
  group: state.groups.group,
  isOpen: state.groups.groupsModalIsOpen,
});

const mapDispatchToProps = (dispatch: any) => ({
  getAllGroups: () => dispatch(getAllGroups()),
  createGroup: (data: any) => dispatch(createGroup(data)),
  updateGroup: (data: any, id: string) => dispatch(updateGroup(data, id)),
  deleteGroup: (id: string) => dispatch(deleteGroup(id)),
  getGroup: (id: string) => dispatch(getGroup(id)),
  setGroupsModalStatus: (data: boolean) => dispatch(setGroupsModalStatus(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeachersPage);
