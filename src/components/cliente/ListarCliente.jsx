import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from '../../pages/Clientes.module.css';
import '../../css-general/cssgeneral.css'
import '../../css-general/tailwind.min.css'
import '../../css-general/inicio_style.css'
import '../../css-general/table.min.css'
import BotonCambioEstado from '../chared/BotonCambioEstado';
import Buscador from '../chared/Buscador'
import EditarCliente from './EditarCliente';


const ListarCliente = () => {

    //estado de la baara buscador
    const [Buscar, setBuscar] = useState("");


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


    const [editarCliente, setEditarCliente] = useState("");

    //al hacer click  en editar trae el proveedor y lo guarda en setProveedor
    const handleEditClick = (cliente) => {
        setEditarCliente(cliente);


    };

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
                        <form className='d-flex'>
                            <input
                                id='barra-buscar'
                                className='form-control me-2'
                                type='search'
                                placeholder='Buscar...'
                                aria-label='Search'
                                onChange={(e) => setBuscar(e.target.value)}
                            />
                            {/* <button id="btn-buscar" className="btn btn-outline-success" type="submit">Buscar</button> */}


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

                                    {/* //filtra los datos que hay en clientes, y hace la busqueda por cualquier campo */}
                            {clientes.filter((campo => {
                                //aca dice que el termino de buesqueda es lo que se le increce al input es decir Buscar
                                const terminoBusqueda = Buscar.toLowerCase();
                                return (
                                    // aca se le dice a nombre que si encuntra lo que tiene terminoBusqueda que es 
                                    // que se le incresa al input
                                    campo.nombre.toLowerCase().includes(terminoBusqueda) ||
                                    campo.apellido.toLowerCase().includes(terminoBusqueda) ||
                                    campo.cedula.toLowerCase().includes(terminoBusqueda) ||
                                    campo.telefono.toLowerCase().includes(terminoBusqueda) ||
                                    campo.email.toLowerCase().includes(terminoBusqueda) ||
                                    campo.direccion.toLowerCase().includes(terminoBusqueda)
                                );
                                {/* con los datos traidos por set proveedor se hace un mapeo */ }
                            })).map(cliente => (
                                    <tr key={cliente.id}>
                                        <td>{cliente.id_cliente}</td>
                                        <td>{cliente.nombre}</td>
                                        <td>{cliente.apellido}</td>
                                        <td>{cliente.cedula}</td>
                                        <td>{cliente.telefono}</td>
                                        <td>{cliente.email}</td>
                                        <td>{cliente.direccion}</td>
                                        <td>
                                            <BotonCambioEstado isChecked={cliente.estado} />
                                        </td>
                                        <td>
                                            <button type="button" className="btn-n" data-bs-toggle="modal" data-bs-target="#modalEditar"
                                                 onClick={() => handleEditClick(cliente)} >Editar</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                <EditarCliente editarCliente={editarCliente} />

                </div>





            </div>

    )
}

export default ListarCliente
