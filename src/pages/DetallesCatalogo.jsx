import PropTypes from 'prop-types';
import HeaderModals from '../components/chared/HeaderModals';
import { FcApproval, FcCancel } from 'react-icons/fc';
import styles from '../css-general/estilosReutilizables.module.css';

const DetallesCatalogo = () => {
    return (
        <div>
            <div>
            <div className='modal' id='modalDetalles'>
                <div className='modal-dialog modal-dialog-centered modal '>
                    <div className='modal-content '>
                        <HeaderModals title='Imagen del producto' NoReset={true} />
                        <div className='formulario'>
                            <div className='modal-body'>
                                <div className='container'>
                                    <div className='col'>
                                        <div className='row'>
                                            
                                            <p>hola</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            
        </div>
    );
}

export default DetallesCatalogo;
