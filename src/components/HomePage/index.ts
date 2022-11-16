import { HomePage } from './HomePage';
import { connect } from 'react-redux';
import { logout, login } from '../../actions/auth';
import { LoginUserType } from '../../constants/tsSchemes';
import { getCEO } from '../../actions/users';

const mapStateToProps = (state: { users: { ceo: any } }) => ({
  ceo: state.users.ceo,
});

const mapDispatchToProps = (dispatch: any) => ({
  getCEO: () => dispatch(getCEO()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
