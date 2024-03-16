// ------------------BRIAN PAREJA HERNANDEZ
//-------------------26 de septiembre 2023
//* Nos permitirá Listar un producto, traer la información de los productos de la base de datos y representarla en una tabla
//* existirá una barra buscar que nos permite buscar cualquier información mediante un filtro, la búsqueda se realiza por cualquier campo
//permita el manejo del publicado donde decidimos si publicar la prenda en el catalogo o no

import '../../css-general/cssgeneral.css';
import '../../css-general/tailwind.min.css';
import '../../css-general/inicio_style.css';
import '../../css-general/table.min.css';
import style from '../../pages/Productos.module.css';
import BotonCambioEstado from '../chared/BotonCambioEstado';
import Buscador from '../chared/Buscador';
import { useEffect, useState } from 'react';
import Paginador from '../chared/Paginador';
import BotonNegro from '../chared/BotonNegro';
import Swal from 'sweetalert2';
import EditarProducto from './EditarProducto';
import Header from '../chared/header/Header';
import DetallesProducto from './DetallesProducto';
import { calcularAnchoDePantalla } from '../../helpers/calcularAnchoDePantalla';
import {
    registrosPorPagina,
    resolucionCards,
} from '../../constantes/constantes.js';
import styles from '../../css-general/CardStyleGenerar.module.css';
import useProducto from '../../hooks/useProducto.jsx';
import AgregarProducto from './AgregarProducto.jsx';
import { useDisenosContext } from '../../context/DisenosProvider';
import { formatMoney } from '../../helpers/Formato_de_datos.jsx';


const ListarProducto = () => {
    const {
        productos,
        editarEstado,
        editarPublicacion,
        busqueda,
        setBusqueda,
    } = useProducto();

    /// Funcionalidad para cerra el modal de editar
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    // función para cerrar, abrir modal de EditarDiseñosModal
    const [showw, setShoww] = useState(false);

    const handleClosee = () => {
        setShoww(false), handleShow();
    };
    const handleShoww = () => {
        setShoww(true), handleClose();
    };
    const handleClosex = () => setShoww(false);




    //estado de la barra buscador
    const [productosFiltrar, setProductosFiltrar] = useState([]);


    const { setSelectedDisenoNombre } = useProducto();

    const { disenos, setDisenos } = useDisenosContext();



    const [productosFiltrarBuscados, setProductosFiltrarBuscados] = useState(
        []
    );

    const [productosListar, setProductosListar] = useState([]);

    //detallesProductos
    const [detallesProductos, setDetallesProductos] = useState({});

    useEffect(() => {
        if (busqueda === '') {
            setProductosFiltrar(productos.slice(0, 10, registrosPorPagina));
            return;
        }

        setProductosFiltrarBuscados(
            productosFiltrar.slice(0, registrosPorPagina)
        );
    }, [productos, busqueda]);

    useEffect(() => {
        setProductosListar([...productosFiltrar]);
    }, [productos, productosFiltrar]);

    //estado para editar
    const [editarProducto, setEditarProducto] = useState('');


    //si al darle click en editar el proveedor esta inhabilitado no lo va dejar entrar a editar
    const handleEditClick = (producto) => {
        if (!producto.estado) {
            return Swal.fire(
                'Acción inválida!',
                'Este producto no se puede editar porque está inhabilitado',
                'error'
            );
        }

        if (producto && producto.disenos) {
            setSelectedDisenoNombre(producto.disenos);
            setDisenos(producto.disenos)
        }

        setEditarProducto(producto);
        handleShow();
    };

    //ancho de la pantalla para el Resposive
    const [anchoPantalla, setAnchoPantalla] = useState(window.innerWidth);

    useEffect(() => {
        /// Calcular el ancho de pantalla actual
        calcularAnchoDePantalla(setAnchoPantalla);
        setBusqueda('');
    }, []);


    

    return (
        <div>
            <div className='contenedor'>
                {/* titulo */}
                <Header titulo='Gestión de Productos' />

                {/* boton de agregar */}
                <div className='container-fluid '>
                    <div className='row'>
                        <div
                            className={`${style.ap} col-md-6 col-ms-6 pb-md-0 pb-4 d-flex justify-content-center align-items-center`}
                        >
                            <AgregarProducto />
                        </div>

                        {/* Boton para Buscar/filtrar */}
                        <div
                            className={`${style.buscador} col-md-6 col-ms-6 pb-md-0 pb-4 d-flex justify-content-center align-items-center`}
                        >
                            <Buscador
                                setDatosFiltrar={setProductosFiltrar} //se le manda por medio de setProveedoresFiltrar el resultado
                                datos={productos} //se le dice que datos son los que se van a filtrar y son por los que trae de la base de datos
                                camposFiltrar={['nombre', 'cantidad', 'precio']} //se le manda los campos por donde se puede filtrar
                                busqueda={busqueda}
                                setBusqueda={setBusqueda}
                            />
                        </div>
                    </div>
                </div>

                {/* tabla  para listar el producto */}
                {anchoPantalla >= resolucionCards ? (
                    <div className='tabla'>
                        <table className='table caption-top '>
                            <thead>
                                <tr>
                                    <th scope='col'>Producto</th>
                                    {/* <th scope='col'>Cantidad</th> */}
                                    <th scope='col'>Precio</th>
                                    <th scope='col'>Publicado</th>
                                    <th scope='col'>Estado</th>
                                    <th scope='col'>Imagen</th>
                                    <th scope='col'>Editar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* // ProveedoresFiltrar hace el mapeo las busqueda de los datos y arroja el resultado  */}
                                {productosListar.map((producto) => (
                                    <tr key={producto.id_producto}>
                                        <td>{producto.nombre}</td>
                                        {/* <td>{producto.cantidad}</td> */}
                                        <td>{formatMoney(producto.precio)}</td>
                                        <td>
                                            <BotonCambioEstado
                                                id={producto.id_producto}
                                                isChecked={producto.publicado}
                                                nombreRegistro={'producto'}
                                                ruta={`/productos/publicado/${producto.id_producto}`}
                                                cambiarPublicacion={{
                                                    estado: producto.estado,
                                                    paraPublicacion: true,
                                                }}
                                                editarEstado={editarPublicacion}
                                            />
                                        </td>
                                        <td>
                                            <BotonCambioEstado
                                                id={producto.id_producto}
                                                isChecked={producto.estado}
                                                nombreRegistro={'productos'}
                                                ruta={`/productos/estado/${producto.id_producto}`}
                                                editarEstado={editarEstado}
                                            />
                                        </td>
                                        <td>
                                            <BotonNegro
                                                text='Ver'
                                                modalToOpen='#modalDetallesProductos'
                                                onClick={() =>
                                                    setDetallesProductos(
                                                        producto
                                                    )
                                                }
                                            />
                                        </td>

                                        <td>
                                            <BotonNegro
                                                text='Editar'
                                                onClick={() => {
                                                    handleEditClick(producto);
                                                }}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className={`row pt-4 justify-content-center`}>
                        {productosListar.map((producto) => (
                            <div
                                className={`col-md-4 col-sm-6 col-xs-12`}
                                key={producto.id_producto}
                            >
                                <div
                                    className={`card mb-4 ${styles.contenedor_card}`}
                                >
                                    <img
                                        className='card-img-top'
                                        src={`${
                                            import.meta.env.VITE_BACKEND_URL
                                        }/${producto.imagen}`}
                                        alt={producto.nombre}
                                    ></img>
                                    <div className='card-body'>
                                        <p className={styles.text}>
                                            Nombre:{' '}
                                            <span>{producto.nombre}</span>
                                        </p>
                                        <p className={styles.text}>
                                            cantidad:{' '}
                                            <span>{producto.cantidad}</span>
                                        </p>
                                        <p className={styles.text}>
                                            Precio:{' '}
                                            <span>
                                                {formatMoney(producto.precio)}
                                            </span>
                                        </p>

                                        <div className='row pt-3'>
                                            <div className='col-6 justify-content-center align-items-center '>
                                                <div className='text-center'>
                                                    <strong
                                                        className={`${styles.textoEstado}`}
                                                    >
                                                        {' '}
                                                        Publicado{' '}
                                                    </strong>
                                                </div>
                                                <div className='text-center'>
                                                    <BotonCambioEstado
                                                        id={
                                                            producto.id_producto
                                                        }
                                                        isChecked={
                                                            producto.publicado
                                                        }
                                                        nombreRegistro={
                                                            'producto'
                                                        }
                                                        ruta={`/productos/publicado/${producto.id_producto}`}
                                                        cambiarPublicacion={{
                                                            estado: producto.estado,
                                                            paraPublicacion: true,
                                                        }}
                                                        editarEstado={
                                                            editarPublicacion
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className='col justify-content-center align-items-center '>
                                                <div className='text-center'>
                                                    <strong
                                                        className={`${styles.textoEstado}`}
                                                    >
                                                        {' '}
                                                        Estado{' '}
                                                    </strong>
                                                </div>
                                                <div className='text-center'>
                                                    <BotonCambioEstado
                                                        id={
                                                            producto.id_producto
                                                        }
                                                        isChecked={
                                                            producto.estado
                                                        }
                                                        nombreRegistro={
                                                            'producto'
                                                        }
                                                        ruta={`/productos/estado/${producto.id_producto}`}
                                                        editarEstado={
                                                            editarEstado
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='card-footer'>
                                        <div className='row'>
                                            <div
                                                className={`col-6 d-flex justify-content-center align-items-center ${styles.button}`}
                                            >
                                                <BotonNegro
                                                    text='Detalles'
                                                    modalToOpen='#modalDetallesProductos'
                                                    onClick={() =>
                                                        setDetallesProductos(
                                                            producto
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div
                                                className={`col-6 d-flex justify-content-center align-items-center ${styles.button}`}
                                            >
                                                <BotonNegro
                                                    text='Editar'
                                                    onClick={() =>
                                                        handleEditClick(
                                                            producto
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <EditarProducto
                    //funciones para el cieere el modal de editarProducto
                    editarProducto={editarProducto}
                    show={show}
                    handleClose={handleClose}
                    handleShow={handleShow}
                    //función para cerrar, abrir modal de EditarDiseñosModal
                    handleClosee={handleClosee}
                    handleShoww={handleShoww}
                    showw={showw}
                    handleClosex={handleClosex}
                />

                <DetallesProducto detallesProductos={detallesProductos} />
            </div>

            <div className='seccion4'>
                {/* Esta función requiere el set de los datos a filtrar, los datos de respaldo, y los campos por los cuales se permite filtrar*/}
                <Paginador
                    setDatosFiltrar={setProductosListar}
                    datos={busqueda === '' ? productos : productosFiltrar}
                />
            </div>
        </div>
    );
};

export default ListarProducto;
