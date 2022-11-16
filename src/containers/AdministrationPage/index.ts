import { AdministrationPage } from './AdministrationPage';
import { connect } from 'react-redux';
import { getAdministrationGroup } from '../../actions/groups';

const mapStateToProps = (state: {
  groups: {
    isLoading: boolean;
    administrationGroup: any;
  };
}) => ({
  isLoading: state.groups.isLoading,
  group: state.groups.administrationGroup,
});

const mapDispatchToProps = (dispatch: any) => ({
  getAdministrationGroup: () => dispatch(getAdministrationGroup()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdministrationPage);
