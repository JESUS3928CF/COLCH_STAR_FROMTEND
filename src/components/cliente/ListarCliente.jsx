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
import Buscador from '../chared/Buscador';


//Componente
const ListarCliente = () => {

    //Estado de la barra de busqueda
    const [clientesFiltrar, setClientesFiltrar] = useState([]);


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
                {/* Esta función requiere el set de los datos a filtrar, los datos de respaldo, y los campos por los cuales se permite filtrar*/}
                <Buscador
                    setDatosFiltrar={setClientesFiltrar}
                    datos={clientes}
                    camposFiltrar={['nombre', 'apellido', 'cedula', 'telefono', 'email', 'direccion']}
                />
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

                           {clientesFiltrar.map((cliente) => (
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
                                        <td><button type="button" className="btn-n"
                                        data-bs-toggle="modal"
                                        data-bs-target="#modalEditar" 
                                        //le manda a handleEditClick el proveedor a editar
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
