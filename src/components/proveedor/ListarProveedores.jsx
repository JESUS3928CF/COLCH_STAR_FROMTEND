import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from '../../pages/proveedores.module.css';
import '../../css-general/cssgeneral.css'
import '../../css-general/tailwind.min.css'
import '../../css-general/inicio_style.css'
import '../../css-general/table.min.css'
import BotonCambioEstado from '../chared/BotonCambioEstado';


const ListarProveedores = () => {

    // conexión para traer todos los datos de la base de datos, con proveedor es que s eva acer el mapeo en la tabla listar
    const [proveedor, setProveedor] = useState([]);

    // solicitud  a la url
    useEffect(() => {
        axios.get('http://localhost:3000/api/proveedores')
            .then(response => {
                // traeos los datos y se los mnadamos a proveedor, es decir set proveedor actualiza el estado de proveedor
                setProveedor(response.data);
            })
            .catch(error => {
                console.error('Error al obtener la lista de proveedores', error);
            })
    }, [proveedor]);



    const contentStyle = {
        marginLeft: '260px', // Ancho del Navbar
    };


    return (
        <div>
            <div style={contentStyle} className='contenedor'>

                {/* titulo */}
                <h1 className="titulo">Proveedores</h1>


                {/* botón agregar */}
                <div className="container-fluid seccion2" style={{ width: 0 }}>

                    <div className={styles.ap}>
                        <button type="button" className="btn-a" data-bs-toggle="modal" data-bs-target="#myModal">Agregar
                            proveedor</button>
                    </div>

                    {/* botón de buscar */}
                    <div className={styles.buscador}>
                        <form className="d-flex" >
                            <input id="barra-buscar" className="form-control me-2" type="search" placeholder="Buscar..." aria-label="Search" />
                            {/* <button id="btn-buscar" className="btn btn-outline-success" type="submit">Buscar</button> */}

                            <div id="resultados-container"></div>
                        </form>
                    </div>
                </div>

                {/* tabla  para listar el proveedor */}
                <div className="tabla">
                    <table className="table caption-top ">

                        {/* <caption>Lista de proveedores</caption> */}
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Teléfono</th>
                                <th scope="col">Dirección</th>
                                <th scope="col">Identificación</th>
                                <th scope="col">Inhabilitar</th>
                                <th scope="col">Editar</th>
                            </tr>
                        </thead>
                        <tbody>

                            {/* con los datos traidos por set proveedor se hace un mapeo */}
                            {proveedor.map(proveedor => (
                                <tr key={proveedor.id}>
                                    <td>{proveedor.id_proveedor}</td>
                                    <td>{proveedor.nombre}</td>
                                    <td>{proveedor.telefono}</td>
                                    <td>{proveedor.direccion}</td>
                                    <td>{proveedor.identificador}</td>
                                    <td> <BotonCambioEstado />
                                    </td>
                                    <td><button type="button" className="btn-n" data-bs-toggle="modal"
                                        data-bs-target="#modalEditar">Editar</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}

export default ListarProveedores
