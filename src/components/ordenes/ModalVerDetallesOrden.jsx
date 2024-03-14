// import PropTypes from 'prop-types';
import HeaderModals from '../chared/HeaderModals';
import { Carousel, Modal } from 'react-bootstrap';
import '../prendas/IconCss/style.Icon.css';
import '../compras/Css/carousel-styles.css';
import useOrden from '../../hooks/useOrden';
import { useState } from 'react';
import { EditarDetallesOrden } from './EditarDetallesOrden';
import Swal from 'sweetalert2';
import useProducto from '../../hooks/useProducto';

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


    const {productos} =  useProducto()

    const [carouselIndex, setCarouselIndex] = useState(0);

    const eliminarDetalle = (id) => {
        // Encuentra el índice del detalle con el id proporcionado
        const indiceAEliminar = id

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
        if (
            !detalleEditado.cantidad ||
            !detalleEditado.color ||
            !detalleEditado.talla ||
            !detalleEditado.fk_producto
        )
            return;

        const productoARemplazar = productos.find(
            (producto) => producto.id_producto == detalleEditado.fk_producto
        );



        // Copia del array original
        const editadosDetalles = [...detallesOrden];

        // Eliminar el elemento en la posición especificada
        const detalleAEditar = editadosDetalles[id];


        detalleAEditar.fk_producto = detalleEditado.fk_producto;
        detalleAEditar.cantidad = detalleEditado.cantidad;
        detalleAEditar.color = detalleEditado.color;
        detalleAEditar.descripcion = detalleEditado.descripcion;
        detalleAEditar.talla = detalleEditado.talla;
        detalleAEditar.subtotal =
            productoARemplazar.precio * detalleEditado.cantidad;
        detalleAEditar.producto.precio = productoARemplazar.precio;


        editadosDetalles[id] = detalleAEditar;

        // Actualizar el estado con el nuevo array
        setDetallesOrden([...editadosDetalles]);

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
                        title={'Detalles agregados de las ordenes'}
                        handleClose={() => {
                            handleCloseDetalles();
                            editar ? handleShowEditar() : handleShow();
                        }}
                    />
                    <div>
                        <div className='modal-body '>
                            {detallesOrden.length !== 0 ? (
                                    <Carousel
                                        activeIndex={carouselIndex}
                                        onSelect={(selectedIndex) =>
                                            setCarouselIndex(selectedIndex)
                                        }
                                    >
                                        {detallesOrden.map((detalle, index) => (
                                            <Carousel.Item key={detalle.id + " " +index}>
                                                <div className='row'>
                                                    <p className='text-center mt-4'>
                                                        Detalle #{index + 1} - {detallesOrden.length}
                                                    </p>
                                                </div>

                                                <EditarDetallesOrden
                                                    detalle={detalle}
                                                    eliminarDetalle={
                                                        eliminarDetalle
                                                    }
                                                    id={index}
                                                    editarDetalle={
                                                        editarDetalle
                                                        
                                                    }
                                                    handleCloseDetalles={handleCloseDetalles}
                                                    handleShow={editar? handleShowEditar : handleShow}
                                                />
                                            </Carousel.Item>
                                        ))}
                                    </Carousel>
                            ) : (
                                <p>No hay detalles de ordenes disponibles.</p>
                            )}
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};