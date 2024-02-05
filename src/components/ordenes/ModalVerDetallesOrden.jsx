// import PropTypes from 'prop-types';
import HeaderModals from '../chared/HeaderModals';
import { Carousel, Modal } from 'react-bootstrap';
import '../prendas/IconCss/style.Icon.css';
import '../compras/Css/carousel-styles.css';
import useOrden from '../../hooks/useOrden';
import BotonNegro from '../chared/BotonNegro';
import { useEffect, useState } from 'react';

export const ModalVerDetallesOrden = () => {
    const {
        detallesOrden,
        setDetallesOrden,
        showDetalles,
        handleCloseDetalles,
        handleShow,

    } = useOrden();

    useEffect(() => {
        console.log(detallesOrden)
    },[detallesOrden])

    const [carouselIndex, setCarouselIndex] = useState(0);

    const eliminarDetalle = (id) => {
        // Encuentra el índice del detalle con el id proporcionado
        const indiceAEliminar = detallesOrden.findIndex(
            (detalle) => detalle.id === id
        );

        if (indiceAEliminar !== -1) {
            // Copia del array original
            const nuevosDetalles = [...detallesOrden];

            // Eliminar el elemento en la posición especificada
            nuevosDetalles.splice(indiceAEliminar, 1);

            // Actualizar el estado con el nuevo array
            setDetallesOrden([...nuevosDetalles]);

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
                        title={'Detalles Agregados Compra'}
                        handleClose={() => {
                            handleCloseDetalles();
                            handleShow();
                        }}
                    />
                    <div>
                        <div className='modal-body '>
                            {detallesOrden.length !== 0 ? (
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
                                        {detallesOrden.map(
                                            (detalle, index) => (
                                                <Carousel.Item key={detalle.id}>
                                                    <div className='row'>
                                                        <p className='text-center mt-4'>
                                                            Detalle #{index + 1}
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
                                                                    detalle.fk_producto
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
                                                                Subtotal:
                                                            </label>
                                                            <input
                                                                type='text'
                                                                className='form-control'
                                                                value={
                                                                    detalle.subtotal
                                                                }
                                                                readOnly
                                                            />
                                                        </div>
                                                        <div className='col-md-12 '>
                                                            <label
                                                                htmlFor='nombre'
                                                                className='col-form-label'
                                                            >
                                                                Descripción:
                                                            </label>
                                                            <input
                                                                type='text'
                                                                className='form-control'
                                                                value={
                                                                    detalle.descripcion
                                                                }
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className='col-md-12 pl-1 pt-3 text-center'>
                                                        <BotonNegro
                                                            text={
                                                                'Eliminar Detalle'
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
