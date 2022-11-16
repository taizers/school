import { SubMenu } from './SubMenu';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import {
  getPages,
  setCreatePageModalStatus,
  createPage,
  getPagesList,
} from '../../actions/pages';

const mapStateToProps = (state: {
  auth: { isAuth: boolean };
  pages: {
    pages: any;
    pagesList: any;
    isLoading: boolean;
    pagesCreateModalIsOpen: boolean;
  };
}) => ({
  isAuth: state.auth.isAuth,
  isOpen: state.pages.pagesCreateModalIsOpen,
  isLoading: state.pages.isLoading,
  pages: state.pages.pages,
  pagesList: state.pages.pagesList,
});

const mapDispatchToProps = (dispatch: any) => ({
  logout: (history: any) => dispatch(logout(history)),
  getPages: () => dispatch(getPages()),
  createPage: (data: any) => dispatch(createPage(data)),
  setCreatePageModalStatus: (data: boolean) => dispatch(setCreatePageModalStatus(data)),
  getPagesList: () => dispatch(getPagesList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SubMenu);
