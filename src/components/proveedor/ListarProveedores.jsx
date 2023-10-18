import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import logof from '../../imgNavbar/light_switch off.svg';
import logon from '../../imgNavbar/light_switch on.svg';
import styles from '../../pages/proveedores.module.css';
import '../../css-general/cssgeneral.css'
import '../../css-general/tailwind.min.css'
import '../../css-general/inicio_style.css'
import '../../css-general/table.min.css'



const ListarProveedores = () => {

    // conexion para taer todo los atos de la base de datos
    const [proveedor, setProveedor] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/proveedores')
            .then(response => {
                setProveedor(response.data);
            })
            .catch(error => {
                console.error('Error al obtener la lista de proveedores', error);
            })
    }, []);


    const contentStyle = {
        marginLeft: '260px', // Ancho del Navbar
    };

    return (
        <div>
            <div style={contentStyle} className='contenedor'>

                {/* titulo */}

                <h1 className="titulo">Proveedores</h1>

                {/* boton agregar */}

                <div className="container-fluid seccion2" style={{ width: 0 }}>

                    <div className={styles.ap}>
                        <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#myModal">Agregar
                            proveedor</button>
                    </div>

                    {/* boton de buscar */}
                    <div className={styles.buscador}>
                        <form className="d-flex" >
                            <input id="barra-buscar" className="form-control me-2" type="search" placeholder="" aria-label="Search" />
                            <button id="btn-buscar" className="btn btn-outline-success" type="submit">Buscar</button>

                            <div id="resultados-container"></div>
                        </form>
                    </div>

                </div>

                {/* tabla  para listar el proveedor */}

                <div className="tabla">
                    <table className="table caption-top ">
                        <caption>Lista de proveedores</caption>
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Telefono</th>
                                <th scope="col">Direccion</th>
                                <th scope="col">Identificacion</th>
                                <th scope="col">Inhabilitar</th>
                                <th scope="col">Editar</th>
                            </tr>
                        </thead>
                        <tbody>

                            {proveedor.map(proveedor => (
                                <tr key={proveedor.id}>
                                    <td>{proveedor.id_proveedor}</td>
                                    <td>{proveedor.nombre}</td>
                                    <td>{proveedor.telefono}</td>
                                    <td>{proveedor.direccion}</td>
                                    <td>{proveedor.identificacion}</td>
                                    <td><img className="centrarIcono estado" src={proveedor.estado === true ? logon : logof} />
                                    </td>
                                    <td><button type="button" className="btn btn-info" data-bs-toggle="modal"
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
