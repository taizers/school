import { Page } from './Page';
import { connect } from 'react-redux';
import {
  getPage,
  setUpdatePageModalStatus,
  updatePage,
  getPagesList,
  deletePage,
} from '../../actions/pages';

const mapStateToProps = (state: {
  auth: { isAuth: boolean };
  pages: {
    isLoading: boolean;
    pagesUpdateModalIsOpen: boolean;
    page: any;
    pagesList: any;
  };
}) => ({
  isLoading: state.pages.isLoading,
  isAuth: state.auth.isAuth,
  isOpen: state.pages.pagesUpdateModalIsOpen,
  page: state.pages.page,
  pagesList: state.pages.pagesList,
});

const mapDispatchToProps = (dispatch: any) => ({
  getPage: (id: string) => dispatch(getPage(id)),
  deletePage: (id: string, history: any) => dispatch(deletePage(id, history)),
  setUpdatePageModalStatus: (data: boolean) =>
    dispatch(setUpdatePageModalStatus(data)),
  updatePage: (data: any, id: string) => dispatch(updatePage(data, id)),
  getPagesList: () => dispatch(getPagesList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Page);
