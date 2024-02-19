// import PropTypes from 'prop-types';
import HeaderModals from '../chared/HeaderModals';
import { Carousel, Modal } from 'react-bootstrap';
import '../prendas/IconCss/style.Icon.css';
import '../compras/Css/carousel-styles.css';
import useCompras from '../../hooks/useCompras';
import BotonNegro from '../chared/BotonNegro';
import { useState } from 'react';

export const ModalVerDetallesCompra = () => {
    const {
        detallesCompra,
        setDetallesCompra,
        showDetalles,
        handleCloseDetalles,
        handleShow,
    } = useCompras();

    const [carouselIndex, setCarouselIndex] = useState(0);


    const eliminarDetalle = (id) => {
        // Encuentra el índice del detalle con el id proporcionado
        const indiceAEliminar = detallesCompra.findIndex(
            (detalle) => detalle.id === id
        );

        if (indiceAEliminar !== -1) {
            // Copia del array original
            const nuevosDetalles = [...detallesCompra];

            // Eliminar el elemento en la posición especificada
            nuevosDetalles.splice(indiceAEliminar, 1);

            // Actualizar el estado con el nuevo array
            setDetallesCompra([...nuevosDetalles]);

            // Calcular el nuevo índice del Carousel
            const nuevoIndice = Math.max(0, indiceAEliminar - 1);

            // Actualizar el estado del índice del Carousel
            setCarouselIndex(nuevoIndice);
        }
    };

    return (
        <div>
            <Modal
                show={showDetalles}
                onHide={() => {
                    handleCloseDetalles();
                    handleShow();
                }}
                className='modal d-flex align-items-center justify-content-center '
            >
                <div className='modal-content'>
                    <HeaderModals
                        title={'Detalles agregados de compras'}
                        handleClose={() => {
                            handleCloseDetalles();
                            handleShow();
                        }}
                    />
                    <div>
                        <div className='modal-body '>
                            {detallesCompra.length !== 0 ? (
                                <form
                                    action=''
                                    className='row g-3 needs-validation'
                                >
                                    <Carousel
                                        activeIndex={carouselIndex}
                                        onSelect={(selectedIndex) =>
                                            setCarouselIndex(selectedIndex)
                                        }
                                    >
                                        {detallesCompra.map(
                                            (detalle, index) => (
                                                <Carousel.Item key={detalle.id}>
                                                    <div className='row'>
                                                        <p className='text-center mt-4'>
                                                            Detalle #{index + 1} -  {detallesCompra.length}
                                                        </p>
                                                        <div className='col-md-12 '>
                                                            <label
                                                                htmlFor='producto'
                                                                className='col-form-label'
                                                            >
                                                                Producto
                                                                comprado:
                                                            </label>
                                                            <input
                                                                type='text'
                                                                className='form-control'
                                                                value={
                                                                    detalle.producto
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
                                                        <div className='col-md-12 '>
                                                            <label
                                                                htmlFor='nombre'
                                                                className='col-form-label'
                                                            >
                                                                Total del
                                                                detalle:
                                                            </label>
                                                            <input
                                                                type='text'
                                                                className='form-control'
                                                                value={
                                                                    detalle.precio *
                                                                    detalle.cantidad
                                                                }
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className='col-md-12 pl-1 pt-3 text-center'>
                                                        <BotonNegro
                                                            text={
                                                                'Eliminar detalle'
                                                            }
                                                            onClick={() =>
                                                                eliminarDetalle(
                                                                    detalle.id
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </Carousel.Item>
                                            )
                                        )}
                                    </Carousel>

                                    {/* Resto del formulario... */}
                                </form>
                            ) : (
                                <p>No hay detalles de compra disponibles.</p>
                            )}
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

// ModalVerDetallesCompra.propTypes = {
//     detallesCompra: PropTypes.object.isRequired,
// };
