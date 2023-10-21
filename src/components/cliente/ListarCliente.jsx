import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import logof from '../../imgNavbar/light_switch off.svg';
import logon from '../../imgNavbar/light_switch on.svg';
import styles from '../../pages/Clientes.module.css';
import '../../css-general/cssgeneral.css'
import '../../css-general/tailwind.min.css'
import '../../css-general/inicio_style.css'
import '../../css-general/table.min.css'

const ListarCliente = () => {

    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        // Realiza una solicitud al backend para obtener la lista de usuarios
        axios.get('http://localhost:3000/api/clientes')
            .then(response => {
                // Actualiza el estado con la lista de usuarios
                setClientes(response.data);
            })
            .catch(error => {
                console.error('Error al obtener la lista de clientes:', error);
            });
    }, []);
    const contentStyle = {
        marginLeft: '260px', // Ancho del Navbar
    };
    
    return (
        <div>
            <div style={contentStyle} className='contenedor'>

                <h1 className="titulo">Clientes</h1>


                <div className="container-fluid seccion2" style={{ width: 0 }} >

                    <div className={styles.ap}>
                        <button type="button" className="btn-a" data-bs-toggle="modal" data-bs-target="#myModal">Agregar Cliente</button>
                    </div>

                    {/* modal agregar usuario */}


                    {/* Boton para Buscar/filtrar */}
                    <div className={styles.buscador}>
                        <form class="d-flex">
                            <input class="form-control me-2" type="search" placeholder="Buscar..." aria-label="Search" />
                            <div id="resultados-container"></div>
                        </form>
                    </div>
                </div>



                    <div class="tabla">
                        <table class="table caption-top ">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Apellido</th>
                                    <th scope="col">Cedula</th>
                                    <th scope="col">Teléfono</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Dirección</th>
                                    <th scope="col">Inhabilitar</th>
                                    <th scope="col">Editar</th>

                                </tr>
                            </thead>
                            <tbody>
                                {clientes.map(cliente => (
                                    <tr key={cliente.id}>
                                        <td>{cliente.id_cliente}</td>
                                        <td>{cliente.nombre}</td>
                                        <td>{cliente.apellido}</td>
                                        <td>{cliente.cedula}</td>
                                        <td>{cliente.telefono}</td>
                                        <td>{cliente.email}</td>
                                        <td>{cliente.direccion}</td>
                                        <td>
                                            <img className="centrarIcono estado" src={cliente.estado === true ? logon : logof} />
                                        </td>
                                        <td>
                                            <button type="button" className="btn-n" data-bs-toggle="modal" data-bs-target="#modalEditar"
                                            >
                                                Editar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>





            </div>

    )
}

export default ListarCliente
