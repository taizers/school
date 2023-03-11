import { News } from './News';
import { connect } from 'react-redux';
import {
  getAllNewsPaginated,
  createNews,
  updateNews,
  deleteNews,
  setNewsModalStatus,
  getNews,
} from '../../actions/news';

const mapStateToProps = (state: {
  auth: {
    isAuth: boolean;
  };
  news: {
    isLoading: boolean;
    allNews: any;
    news: any;
    newsModalIsOpen: boolean;
  };
}) => ({
  isAuth: state.auth.isAuth,
  isLoading: state.news.isLoading,
  allNews: state.news.allNews,
  news: state.news.news,
  isOpen: state.news.newsModalIsOpen,
});

const mapDispatchToProps = (dispatch: any) => ({
  getAllNewsPaginated: (page: number, limit: number) =>
    dispatch(getAllNewsPaginated(page, limit)),
  createNews: (data: any) => dispatch(createNews(data)),
  updateNews: (data: any, id: string) => dispatch(updateNews(data, id)),
  deleteNews: (id: string) => dispatch(deleteNews(id)),
  getNews: (id: string) => dispatch(getNews(id)),
  setNewsModalStatus: (data: boolean) => dispatch(setNewsModalStatus(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(News);
