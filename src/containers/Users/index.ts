import { Users } from './Users';
import { connect } from 'react-redux';

import {
  getAllUsers,
  deleteUser,
  updateUser,
  getUser,
  createUser,
  setUserModalStatus,
  clearUser,
} from '../../actions/users';
import { getGroupsList } from '../../actions/groups';
import { UsersType } from '../../constants/tsSchemes';

const mapStateToProps = (state: {
  users: {
    isLoading: boolean;
    users: { users: Array<any>; page: number; totalPages: number };
    user: any;
    userModalIsOpen: boolean;
  };
  groups: {
    groupsList: any;
  };
}) => ({
  isLoading: state.users.isLoading,
  users: state.users.users,
  user: state.users.user,
  isOpen: state.users.userModalIsOpen,
  groupsList: state.groups.groupsList,
});

const mapDispatchToProps = (dispatch: any) => ({
  getAllUsers: (page: number, limit: number) =>
    dispatch(getAllUsers(page, limit)),
  deleteUser: (id: string) => dispatch(deleteUser(id)),
  getUser: (id: string) => dispatch(getUser(id)),
  updateUser: (data: any, id: string) => dispatch(updateUser(data, id)),
  createUser: (data: any) => dispatch(createUser(data)),
  getGroupsList: () => dispatch(getGroupsList()),
  clearUser: () => dispatch(clearUser()),
  setUserModalStatus: (data: boolean) => dispatch(setUserModalStatus(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);
