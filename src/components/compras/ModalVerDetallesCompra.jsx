// import PropTypes from 'prop-types';
import HeaderModals from '../chared/HeaderModals';
import { Carousel, Modal } from 'react-bootstrap';
import '../prendas/IconCss/style.Icon.css';
import '../compras/Css/carousel-styles.css';
import useCompras from '../../hooks/useCompras';
import usePrendas from '../../hooks/usePrendas';
import { useState } from 'react';
import { EditarDetallesCompra } from './EditarDetallesCompra';
import Swal from 'sweetalert2';

export const ModalVerDetallesCompra = () => {
    const {
        detallesCompra,
        setDetallesCompra,
        showDetalles,
        handleCloseDetalles,
        handleShow,
        handleShowEditar,
        editar,
    } = useCompras();

    const { Prendas } = usePrendas();

    const [carouselIndex, setCarouselIndex] = useState(0);

    const eliminarDetalle = (id) => {
        // Encuentra el índice del detalle con el id proporcionado
        const indiceAEliminar = id;

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

    const editarDetalle = (id, detalleEditado) => {
        let isValid = true;

        if (detalleEditado.fk_prenda == 'd') {
            if (!detalleEditado.cantidad || !detalleEditado.precio)
                isValid = false;
        } else if (
            !detalleEditado.cantidad ||
            !detalleEditado.color ||
            !detalleEditado.talla ||
            !detalleEditado.precio ||
            !detalleEditado.fk_prenda
        ) {
            isValid = false;
        }

        if (!isValid) return;

        // Copia del array original
        const editadosDetalles = [...detallesCompra];

        // Eliminar el elemento en la posición especificada
        const detalleAEditar = editadosDetalles[id];

        detalleAEditar.fk_prenda = detalleEditado.fk_prenda;
        detalleAEditar.cantidad = detalleEditado.cantidad;
        detalleAEditar.color = detalleEditado.color;
        detalleAEditar.talla = detalleEditado.talla;
        detalleAEditar.precio = detalleEditado.precio;

        editadosDetalles[id] = detalleAEditar;

        // Actualizar el estado con el nuevo array
        setDetallesCompra([...editadosDetalles]);

        Swal.fire({
            title: 'Bien',
            text: 'Este detalle fue editado',
            icon: 'success',
        }).then((result) => {
            if (result.isConfirmed) {
                handleCloseDetalles();
                if (editar === true) {
                    handleShowEditar();
                } else {
                    handleShow();
                }
            }
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
                        title={'Detalles agregados de compras'}
                        handleClose={() => {
                            handleCloseDetalles();
                            editar ? handleShowEditar() : handleShow();
                        }}
                    />
                    <div>
                        <div className='modal-body '>
                            {detallesCompra.length !== 0 ? (
                                <Carousel
                                    activeIndex={carouselIndex}
                                    onSelect={(selectedIndex) =>
                                        setCarouselIndex(selectedIndex)
                                    }
                                >
                                    {detallesCompra.map((detalle, index) => (
                                        <Carousel.Item
                                            key={detalle.id + ' ' + index}
                                        >
                                            <div className='row'>
                                                <p className='text-center mt-4'>
                                                    Detalle #{index + 1} -{' '}
                                                    {detallesCompra.length}
                                                </p>
                                            </div>
                                            <EditarDetallesCompra
                                                detalle={detalle}
                                                eliminarDetalle={
                                                    eliminarDetalle
                                                }
                                                id={index}
                                                editarDetalle={editarDetalle}
                                                handleCloseDetalles={
                                                    handleCloseDetalles
                                                }
                                                handleShow={handleShow}
                                            />
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
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
