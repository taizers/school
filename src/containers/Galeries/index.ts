import { Galeries } from './Galeries';
import { connect } from 'react-redux';
import { getAllGaleriesPaginated, createGalery, updateGalery, deleteGalery, setGaleriesModalStatus } from '../../actions/galeries';

const mapStateToProps = (state: {
    galeries: { isLoading: boolean; galeries: any; galeriesModalIsOpen: boolean };
}) => ({
  isLoading: state.galeries.isLoading,
  galeries: state.galeries.galeries,
  isOpen: state.galeries.galeriesModalIsOpen,
});

const mapDispatchToProps = (dispatch: any) => ({
    getAllGaleriesPaginated: (page: number, limit: number) => dispatch(getAllGaleriesPaginated(page, limit)),
  createGalery: (data: any) => dispatch(createGalery(data)),
  updateGalery: (data: any) => dispatch(updateGalery(data)),
  deleteGalery: (id: string) => dispatch(deleteGalery(id)),
  setGaleriesModalStatus: (data: boolean) => dispatch(setGaleriesModalStatus(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Galeries);
