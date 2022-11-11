import { NewsItem } from './NewsItem';
import { connect } from 'react-redux';
import { getNews } from '../../actions/news';

const mapStateToProps = (state: {
  news: { isLoading: boolean; news: any };
}) => ({
  isLoading: state.news.isLoading,
  news: state.news.news,
});

const mapDispatchToProps = (dispatch: any) => ({
    getNews: (id: string) => dispatch(getNews(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsItem);
