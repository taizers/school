import { Galeries } from './Galeries';
import { connect } from 'react-redux';
import {
  getAllGaleriesPaginated,
  createGalery,
  updateGalery,
  deleteGalery,
  getGalery,
  setCreateGaleryModalStatus,
  setUpdateGaleryModalStatus,
} from '../../actions/galeries';

const mapStateToProps = (state: {
  galeries: {
    isLoading: boolean;
    galeries: any;
    galery: any;
    isOpenCreateGaleryModal: boolean;
    isOpenUpdateGaleryModal: boolean;
  };
}) => ({
  isLoading: state.galeries.isLoading,
  galeries: state.galeries.galeries,
  galery: state.galeries.galery,
  isCreateModalOpen: state.galeries.isOpenCreateGaleryModal,
  isUpdateModalOpen: state.galeries.isOpenUpdateGaleryModal,
});

const mapDispatchToProps = (dispatch: any) => ({
  getAllGaleriesPaginated: (page: number, limit: number) =>
    dispatch(getAllGaleriesPaginated(page, limit)),
  createGalery: (data: any) => dispatch(createGalery(data)),
  updateGalery: (data: any, id: string) => dispatch(updateGalery(data, id)),
  deleteGalery: (id: string) => dispatch(deleteGalery(id)),
  getGalery: (id: string) => dispatch(getGalery(id)),
  setCreateGaleryModalStatus: (data: boolean) =>
    dispatch(setCreateGaleryModalStatus(data)),
  setUpdateGaleryModalStatus: (data: boolean) =>
    dispatch(setUpdateGaleryModalStatus(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Galeries);
