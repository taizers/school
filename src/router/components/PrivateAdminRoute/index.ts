import { PrivateAdminRoute } from './PrivateAdminRoute';
import { connect } from 'react-redux';

const mapStateToProps = (state: {
  auth: { isAuth: boolean; role: string };
}) => ({
  isAuth: state.auth.isAuth,
  role: state.auth.role,
});

export default connect(mapStateToProps)(PrivateAdminRoute);
