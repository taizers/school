import { News } from './News';
import { connect } from 'react-redux';
import { getAllNewsPaginated, createNews, updateNews, deleteNews, setNewsModalStatus, getNews } from '../../actions/news';

const mapStateToProps = (state: {
  news: { isLoading: boolean; allNews: any, newsModalIsOpen: boolean };
}) => ({
  isLoading: state.news.isLoading,
  allNews: state.news.allNews,
  isOpen: state.news.newsModalIsOpen,
});

const mapDispatchToProps = (dispatch: any) => ({
  getAllNewsPaginated: (page: number, limit: number) => dispatch(getAllNewsPaginated(page, limit)),
  createNews: (data: any) => dispatch(createNews(data)),
  updateNews: (data: any) => dispatch(updateNews(data)),
  deleteNews: (id: string) => dispatch(updateNews(id)),
  setNewsModalStatus: (data: boolean) => dispatch(setNewsModalStatus(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(News);

