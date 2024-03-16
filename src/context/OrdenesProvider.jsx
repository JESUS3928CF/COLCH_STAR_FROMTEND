import { createContext, useEffect, useState } from 'react';
import ordenAxios from '../config/axios';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';
import clienteAxios from '../config/axios';
import useMovimientos from '../hooks/useMovimientos';
import usePrendas from '../hooks/usePrendas';
import useProducto from '../hooks/useProducto';

const ordenesContext = createContext();

const OrdenesProvider = ({ children }) => {
    const { config, auth } = useAuth();

    // Estado para el parámetro de búsqueda
    const [busqueda, setBusqueda] = useState('');

    const [detallesOrden, setDetallesOrden] = useState([]);

    const [detailsOrden, setDetailsOrden] = useState([]);

    const [editar, setEditar] = useState(false);

    const { consultPrendas, Prendas } = usePrendas();
    const { productos } = useProducto();

    const [precio, setPrecio] = useState(0);

    const [totalOrden, setTotalOrden] = useState(0);
    const { consultarMovimientos, notificaciones, notificacion } =
        useMovimientos();

    /// Calcular el total de la orden
    useEffect(() => {
        setTotalOrden(
            detallesOrden.reduce(
                (total, producto) =>
                    total +
                    producto.cantidad * producto.producto.precio +
                    parseInt(precio),
                0
            )
        );
    }, [detallesOrden, setDetailsOrden]);

    // primer state
    const [ordenes, setOrdenes] = useState([]);

    // función para obtener los clientes solo cuando se carge el componente

    const consultarOrdenes = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;
            const { data } = await ordenAxios.get('/ordenes', config);

            setOrdenes(data.reverse());
        } catch (error) {
            Swal.fire({
                title: `Error al consultar las ordenes`,
                icon: 'error',
            });
        }
    };

    const consultarDetailsOrden = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;
            const { data } = await clienteAxios.get('/DetalleOrden', config);
            setDetailsOrden(data);
        } catch (error) {
            Swal.fire({
                title: `Error al consultar los detalles de ordenes`,
                icon: 'error',
            });
        
        }
    };

    useEffect(() => {
        consultarOrdenes();
        consultarDetailsOrden();
    }, [auth]);

    const agregarOrden = async (data, reset, handleClose) => {
        const { fecha_entrega, fk_cliente, estado_de_orden } = data;

        try {
            const newOrden = await ordenAxios.post(
                '/ordenes',
                {
                    precio_total: totalOrden,
                    fecha_entrega: fecha_entrega,
                    fk_cliente: fk_cliente,
                    detallesOrdenes: detallesOrden,
                    estado_de_orden: estado_de_orden || 'Creada',
                },
                config
            );

            Swal.fire({
                title: 'Orden Agregada',
                text: newOrden.data.message,
                icon: 'success',
            }).then(() => {
                consultarOrdenes();
                notificaciones(notificacion + 1);
                consultarMovimientos();
                handleClose(reset);
            });
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Hubo un error. Vuelva a intentarlo.',
                icon: 'error',
            });
        }
    };

    const actualizarOrden = async (id_orden, data, reset, handleClose) => {
        const { fecha_entrega, fk_cliente } = data;
        try {
            const actulizarOrden = await ordenAxios.patch(
                `/ordenes/${id_orden}`,
                {
                    precio_total: totalOrden,
                    fecha_entrega: fecha_entrega,
                    fk_cliente: fk_cliente,
                    detalles: detallesOrden,
                },
                config
            );

            Swal.fire({
                title: 'Orden Agregada',
                text: actulizarOrden.data.message,
                icon: 'success',
            }).then(() => {
                consultarOrdenes();
                notificaciones(notificacion + 1);
                consultarMovimientos();
                handleClose(reset);
            });
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Hubo un error. Vuelva a intentarlo.',
                icon: 'error',
            });
        }
    };

    const validarPrendasExistentes = (orden, mensajePrincipal) => {
        // Buscar los detalles iguales
        const detallesOrden = orden.detalles;

        // Suponiendo que tienes un arreglo de detalles llamado 'detallesOrden'

        // Creamos un objeto para almacenar los detalles agrupados por producto, color y talla
        const detallesAgrupados = {};

        // Recorremos cada detalle
        detallesOrden.forEach((detalle) => {
            // Creamos una clave única para identificar el detalle basado en el producto, color y talla
            const clave = `${detalle.fk_producto}_${detalle.color}_${detalle.talla}`;

            // Verificamos si ya existe una entrada para esta clave en el objeto detallesAgrupados
            if (detallesAgrupados[clave]) {
                // Si ya existe, agregamos este detalle a la lista de detalles asociados a esa clave
                detallesAgrupados[clave].push(detalle);
            } else {
                // Si no existe, creamos una nueva entrada en el objeto y asignamos este detalle como el primer elemento de la lista
                detallesAgrupados[clave] = [detalle];
            }
        });

        // Filtramos los detalles que tienen más de un elemento en su lista para obtener los duplicados
        const detallesDuplicados = Object.values(detallesAgrupados).filter(
            (lista) => lista.length > 1
        );

        // Filtramos los detalles que solo tienen un elemento en su lista para obtener los no duplicados
        let detallesNoDuplicados = Object.values(detallesAgrupados).filter(
            (lista) => lista.length === 1
        );

        const detallesDuplicadosSumados = [];

        for (let duplicados of detallesDuplicados) {
            const duplicadoUnificado = [duplicados[0]];
            duplicadoUnificado[0].cantidad_total = duplicados.reduce(
                (total, producto) => total + producto.cantidad,
                0
            );

            detallesDuplicadosSumados.push(duplicadoUnificado);
        }

        for (let detalle of detallesNoDuplicados) {
            detalle[0].cantidad_total = detalle[0].cantidad;
        }

        const detallesOrdenParaValidar = [
            ...detallesNoDuplicados,
            ...detallesDuplicadosSumados,
        ];

        const prendasFaltantes = [];

        /// Encontrar las cantidades que los detalles de esta orden
        for (let detalle of detallesOrdenParaValidar) {
            const producto = productos.find(
                (producto) => producto.id_producto == detalle[0].fk_producto
            );

            const prenda = Prendas.find(
                (prenda) => prenda.id_prenda == producto.fk_prenda
            );

            const validarCantidad = prenda.cantidades.find(
                (cantidad) =>
                    cantidad.talla == detalle[0].talla &&
                    cantidad.color == detalle[0].color
            );

            detalle[0].cantidades_faltante = 0;
            if (!validarCantidad) {
                prendasFaltantes.push({
                    prenda: prenda.nombre,
                    cantidades_faltantes: detalle[0].cantidad_total,
                    color: detalle[0].color,
                    talla: detalle[0].talla,
                });
            } else {
                let cantidadFaltante = 0;

                cantidadFaltante =
                    detalle[0].cantidad_total - validarCantidad.cantidad;


                if (cantidadFaltante > 0) {
                    prendasFaltantes.push({
                        prenda: prenda.nombre,
                        cantidades_faltantes: cantidadFaltante,
                        color: detalle[0].color,
                        talla: detalle[0].talla,
                    });
                }
            }

            detalle[0].producto.fk_prenda = producto.fk_prenda;
            detalle[0].producto.cantidades_prenda = prenda.cantidades;

            // necesarios
            detalle[0].producto.prenda = prenda.nombre;
        }

        if (prendasFaltantes.length !== 0) {
            let mensaje = `${mensajePrincipal} ${
                prendasFaltantes.length != 1
                    ? 'las siguientes prendas'
                    : 'la siguiente prenda'
            }:<br><ul style="padding-left: 0; list-style-type: none;">`;

            // Recorremos cada objeto en el array de prendasFaltantes
            for (const prenda of prendasFaltantes) {
                // Formamos un mensaje con las propiedades de cada objeto
                mensaje += `<li style="margin-bottom: 10px;"><strong>Nombre: </strong>${prenda.prenda}, <strong>Talla necesaria:</strong> ${prenda.talla}, <strong>Color necesario:</strong> ${prenda.color}<strong>, Cantidad necesaria:</strong> ${prenda.cantidades_faltantes}</li>`;
            }

            mensaje += '</ul>';

            // Mostramos el mensaje con todas las prendas faltantes
            Swal.fire({
                title: 'Acción inválida!',
                html: mensaje,
                icon: 'error',
            });

            return false;
        }

        return true;
    };

    const cambiarEstadoDeOrden = (estado, orden) => {
        if (estado === 'En Proceso') {
            // el producto la prenda y la cantidad en cada for, entonces llamo todas las prendas, los productos y ya busco en sus detalles
            if (!validarPrendasExistentes(orden, "Para poder empezar con la producción de esta orden necesitas comprar")) return;
        } else if (estado === "Finalizada") {
            // el producto la prenda y la cantidad en cada for, entonces llamo todas las prendas, los productos y ya busco en sus detalles
            if (!validarPrendasExistentes(orden, "La compra fue cancelada intente comprar de nuevo")) return;
        }

        Swal.fire({
            title: `¿Deseas cambiar el estado de la orden a ${estado}?`,
            // text: "Este ",
            icon: 'question',
            iconColor: '#fa0000',
            showCancelButton: true,
            confirmButtonColor: '#3E5743',
            cancelButtonColor: '#252432',
            confirmButtonText: `Si, Cámbialo`,
            cancelButtonText: 'Cancelar',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    //  Realiza la petición PATCH
                    const response = await clienteAxios.patch(
                        `/ordenes/estado/${orden.id_orden}`,
                        { estado: estado },
                        config
                    );

                    if (response.status === 200) {
                        Swal.fire(
                            {
                                title: `Cambio de estado exitoso`,
                                // text: "Este ",
                                icon: 'success',
                            },
                            notificaciones(notificacion + 1),
                            consultarMovimientos()
                        );
                        consultPrendas();
                    } else {
                        Swal.fire(
                            'Error',
                            'Hubo un problema al cambiar el estado',
                            'error'
                        );
                    }
                } catch (error) {
                    Swal.fire(
                        'Error',
                        'Hubo un problema al cambiar el estado',
                        'error'
                    );
                }
            }

            consultarOrdenes();
        });
    };

    //* Funcionalidad para cerra el modal de agregar
    const [show, setShow] = useState(false);

    const handleClose = (reset = null) => {
        setShow(false);

        if (reset) {
        setDetallesOrden([]);
        reset();
        }
    };
    const handleShow = () => setShow(true);

    //* Funcionalidad para cerra el modal de detalles
    const [showDetalles, setShowDetalles] = useState(false);

    const handleCloseDetalles = () => {
        setShowDetalles(false);
    };

    const handleShowDetalles = () => setShowDetalles(true);

    /// Funcionalidad para cerra el modal Editar
    const [showEditar, setShowEditar] = useState(false);

    const handleCloseEditar = () => setShowEditar(false);
    const handleShowEditar = () => setShowEditar(true);

    return (
        <ordenesContext.Provider
            value={{
                ordenes,
                agregarOrden,
                setDetallesOrden,
                detallesOrden,
                cambiarEstadoDeOrden,
                handleShowDetalles,
                handleCloseDetalles,
                showDetalles,
                handleClose,
                handleShow,
                show,
                handleShowEditar,
                detailsOrden,
                consultarDetailsOrden,
                handleCloseEditar,
                showEditar,
                totalOrden,
                setEditar,
                editar,
                actualizarOrden,
                consultarOrdenes,
                setTotalOrden,
                setPrecio,
                // BUSQUEDA
                busqueda,
                setBusqueda,
            }}
        >
            {children}
        </ordenesContext.Provider>
    );
};

export { OrdenesProvider };
export default ordenesContext;
