import '../../css-general/cssgeneral.css'
import '../../css-general/tailwind.min.css'
import '../../css-general/inicio_style.css'
import '../../css-general/table.min.css'
import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from '../../pages/Clientes.module.css';
import BotonCambioEstado from '../chared/BotonCambioEstado';
import EditarCliente from './EditarCliente';

//Componente
const ListarCliente = () => {

    //Estado de la barra de busqueda
    const [Buscar, setBuscar] = useState("");

    // Conexión para traer todos los datos de la base de datos, con cliente que es que se va hacer el mapeo en la tabla listar
    const [clientes, setClientes] = useState([]);

    // Solicitud a la url
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

    //Esatdo para editar
    const [editarCliente, setEditarCliente] = useState("");

    //Al hacer click  en editar trae el cliente y lo guarda en setCliente
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

                {/* botón agregar */}
                <div className="container-fluid seccion2" style={{ width: 0 }} >

                    <div className={styles.ap}>
                        <button type="button" className="btn-a" data-bs-toggle="modal" data-bs-target="#myModal">Agregar Cliente</button>
                    </div>

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
                        </form>

                    </div>
                </div>

                {/* tabla  para listar clientes */}
                    <div className="tabla">
                        <table className="table caption-top ">
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
                                //aca dice que el termino de buesqueda es lo que se le ingrece al input es decir a Buscar
                                const terminoBusqueda = Buscar.toLowerCase();
                                return (
                                    // aca se le dice a nombre que si encuntra lo que tiene terminoBusqueda que es 
                                    // que se le ingresa al input
                                    campo.nombre.toLowerCase().includes(terminoBusqueda) ||
                                    campo.apellido.toLowerCase().includes(terminoBusqueda) ||
                                    campo.cedula.toLowerCase().includes(terminoBusqueda) ||
                                    campo.telefono.toLowerCase().includes(terminoBusqueda) ||
                                    campo.email.toLowerCase().includes(terminoBusqueda) ||
                                    campo.direccion.toLowerCase().includes(terminoBusqueda)
                                );
                                {/* con los datos traidos por set cliente se hace un mapeo */ }
                            })).map(cliente => (
                                    <tr key={cliente.id_cliente}>
                                        <td>{cliente.id_cliente}</td>
                                        <td>{cliente.nombre}</td>
                                        <td>{cliente.apellido}</td>
                                        <td>{cliente.cedula}</td>
                                        <td>{cliente.telefono}</td>
                                        <td>{cliente.email}</td>
                                        <td>{cliente.direccion}</td>
                                        <td>
                                            <BotonCambioEstado 
                                            isChecked={cliente.estado}
                                            nombreRegistro={'cliente'}
                                            ruta={`/clientes/estado/${cliente.id_cliente}`} />
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
