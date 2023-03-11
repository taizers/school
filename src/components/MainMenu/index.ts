import { MainMenu } from './MainMenu';
import { connect } from 'react-redux';
import { logout, login } from '../../actions/auth';
import { LoginUserType } from '../../constants/tsSchemes';

const mapStateToProps = (state: {
  auth: { isAuth: boolean; role: string; user: any };
}) => ({
  isAuth: state.auth.isAuth,
  role: state.auth.role,
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch: any) => ({
  logout: (history: any) => dispatch(logout(history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);
