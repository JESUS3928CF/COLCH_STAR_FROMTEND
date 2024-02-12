// import PropTypes from 'prop-types';
import HeaderModals from '../chared/HeaderModals';
import { Carousel, Modal } from 'react-bootstrap';
import '../prendas/IconCss/style.Icon.css';
import '../compras/Css/carousel-styles.css';
import useOrden from '../../hooks/useOrden';
import BotonNegro from '../chared/BotonNegro';
import { useState } from 'react';
import { EditarDetallesOrden } from './EditarDetallesOrden';
import Swal from 'sweetalert2';

export const ModalVerDetallesOrden = () => {
    const {
        detallesOrden,
        setDetallesOrden,
        showDetalles,
        handleCloseDetalles,
        handleShow,
        handleShowEditar,
        editar,
    } = useOrden();

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

    const editarDetalle = (id, detalleEditado) => {
        console.log(detalleEditado);
        if (
            !detalleEditado.cantidad ||
            detalleEditado.color == '' ||
            !detalleEditado.descripcion ||
            !detalleEditado.talla
        )
            return;
        // Encuentra el índice del detalle con el id proporcionado
        const indiceAEditar = detallesOrden.findIndex(
            (detalle) => detalle.id === id
        );

        // Copia del array original
        const nuevosDetalles = [...detallesOrden];

        // Eliminar el elemento en la posición especificada
        const detalleAEditar = nuevosDetalles[indiceAEditar];

        detalleAEditar.cantidad = detalleEditado.cantidad;
        detalleAEditar.color = detalleEditado.color;
        detalleAEditar.descripcion = detalleEditado.descripcion;
        detalleAEditar.talla = detalleEditado.talla;

        nuevosDetalles[indiceAEditar] = detalleAEditar;

        // Actualizar el estado con el nuevo array
        setDetallesOrden([...nuevosDetalles]);

        Swal.fire({
            title: 'Bien',
            text: 'Este detalle fue editado',
            icon: 'success',
        });
    };

    return (
        <div>
            <Modal
                show={showDetalles}
                onHide={() => {
                    handleCloseDetalles();
                    editar === true ? handleShowEditar() : handleShow();
                }}
                className='modal d-flex align-items-center justify-content-center '
            >
                <div className='modal-content'>
                    <HeaderModals
                        title={'Detalles agregados de las ordenes'}
                        handleClose={() => {
                            handleCloseDetalles();
                            editar ? handleShowEditar() : handleShow();
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
                                        {detallesOrden.map((detalle, index) => (
                                            <Carousel.Item key={detalle.id}>
                                                <div className='row'>
                                                    <p className='text-center mt-4'>
                                                        Detalle #{index + 1}
                                                    </p>
                                                </div>

                                                <EditarDetallesOrden
                                                    detalle={detalle}
                                                    eliminarDetalle={
                                                        eliminarDetalle
                                                    }
                                                    id={detalle.id}
                                                    editarDetalle={
                                                        editarDetalle
                                                    }
                                                />
                                            </Carousel.Item>
                                        ))}
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
