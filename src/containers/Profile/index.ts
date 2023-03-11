import { Profile } from './Profile';
import { connect } from 'react-redux';
import { LoginUserType, UserType } from '../../constants/tsSchemes';
import { updateProfile, setProfileModal } from '../../actions/users';

const mapStateToProps = (state: {
  users: { profileModalIsOpen: boolean };
  auth: { isLoading: boolean; authUser: UserType };
}) => ({
  isLoading: state.auth.isLoading,
  user: state.auth.authUser,
  isOpen: state.users.profileModalIsOpen,
});

const mapDispatchToProps = (dispatch: any) => ({
  updateProfile: (data: any) => dispatch(updateProfile(data)),
  setProfileModal: (data: boolean) => dispatch(setProfileModal(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
