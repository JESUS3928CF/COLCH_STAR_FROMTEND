// import PropTypes from 'prop-types';
import HeaderModals from '../chared/HeaderModals';
import { Carousel } from 'react-bootstrap';
import '../prendas/IconCss/style.Icon.css';
import '../compras/Css/carousel-styles.css';
import useCompras from '../../hooks/useCompras';

export const ModalVerDetallesCompra = () => {
    const { detallesCompra } = useCompras();
    console.log('Detalles de Compra:', detallesCompra);

    return (
        <div>
            <div className='modal' id='modalDetalleAgregarCompra'>
                <div className='modal-dialog modal-dialog-centered '>
                    <div className='modal-content'>
                        <HeaderModals title={'Detalles Agregados Compra'} />
                        <div>
                            <div className='modal-body '>
                                {detallesCompra ? (
                                    <form
                                        action=''
                                        id='formularioagregarCompra'
                                        className='row g-3 needs-validation'
                                    >
                                        <Carousel>
                                            {detallesCompra.map(
                                                (detalle, index) => (
                                                    <Carousel.Item key={index}>
                                                        <div className='row'>
                                                            <p className='text-center mt-4'>
                                                                Detalle #
                                                                {index + 1}
                                                            </p>
                                                            <div className='col-md-12 '>
                                                                <label
                                                                    htmlFor='producto'
                                                                    className='col-form-label'
                                                                >
                                                                    Producto
                                                                    Comprado:
                                                                </label>
                                                                <input
                                                                    type='text'
                                                                    className='form-control'
                                                                    value={
                                                                        detalle.fk_prenda ==
                                                                        ''
                                                                            ? 'Impresión de estampados'
                                                                            : detalle.fk_prenda
                                                                    }
                                                                    readOnly
                                                                />
                                                            </div>
                                                            <div className='col-md-6 '>
                                                                <label
                                                                    htmlFor='cantidad'
                                                                    className='col-form-label'
                                                                >
                                                                    Cantidad:
                                                                </label>
                                                                <input
                                                                    type='text'
                                                                    className='form-control'
                                                                    value={
                                                                        detalle.cantidad
                                                                    }
                                                                    readOnly
                                                                />
                                                            </div>
                                                            <div className='col-md-6 '>
                                                                <label
                                                                    htmlFor='nombre'
                                                                    className='col-form-label'
                                                                >
                                                                    Precio:
                                                                </label>
                                                                <input
                                                                    type='text'
                                                                    className='form-control'
                                                                    value={
                                                                        detalle.precio
                                                                    }
                                                                    readOnly
                                                                />
                                                            </div>
                                                        </div>
                                                    </Carousel.Item>
                                                )
                                            )}
                                        </Carousel>

                                        {/* Resto del formulario... */}
                                    </form>
                                ) : (
                                    <p>
                                        <p>
                                            No hay detalles de compra
                                            disponibles.
                                        </p>
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ModalVerDetallesCompra.propTypes = {
//     detallesCompra: PropTypes.object.isRequired,
// };
