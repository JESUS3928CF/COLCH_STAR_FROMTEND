import diseno from '../../imgNavbar/1153861.png';
import HeaderModals from '../chared/HeaderModals';

export const DetalleDiseno = () => {
    return (
        <div className='modal' id='modalDetalles'>
            <div className='modal-dialog modal-dialog-centered'>
                <div className='modal-content'>
                    <HeaderModals title='Imagen del diseño' />
                    <div className='formulario'>
                        <div className='modal-body'>
                            <div className='container'>
                                <div className='col'> 
                                    <div className='row'>
                                        <div>
                                            <img
                                                src={diseno}
                                                width='400px'
                                                height='250px'
                                                alt=''
                                            />
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
};
