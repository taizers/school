import { Galery } from './Galery';
import { connect } from 'react-redux';
import { getGalery,  } from '../../actions/galeries';

const mapStateToProps = (state: {
    galeries: { isLoading: boolean; galeries: any; galery: any; galeriesModalIsOpen: boolean };
}) => ({
  isLoading: state.galeries.isLoading,
  galery: state.galeries.galery,
});

const mapDispatchToProps = (dispatch: any) => ({
  getGalery: (id: string) => dispatch(getGalery(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Galery);
