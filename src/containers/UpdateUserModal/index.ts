import { UpdateUserModal } from './UpdateUserModal';
import { connect } from 'react-redux';
import { updateProfile } from '../../actions/users';
import { UserType, UpdateUserType } from '../../constants/tsSchemes';

const mapStateToProps = (state: {
  auth: { isLoading: boolean; authUser: UserType };
}) => ({
  isLoading: state.auth.isLoading,
  user: state.auth.authUser,
});

const mapDispatchToProps = (dispatch: any) => ({
  updateProfile: (data: UpdateUserType) => dispatch(updateProfile(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUserModal);
