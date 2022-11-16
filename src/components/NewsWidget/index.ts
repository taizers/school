import { NewsWidget } from './NewsWidget';
import { connect } from 'react-redux';
import { getNewsWidget } from '../../actions/news';

const mapStateToProps = (state: { news: { widget: any } }) => ({
  newsWidget: state.news.widget,
});

const mapDispatchToProps = (dispatch: any) => ({
  getNewsWidget: (count: number) => dispatch(getNewsWidget(count)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsWidget);
