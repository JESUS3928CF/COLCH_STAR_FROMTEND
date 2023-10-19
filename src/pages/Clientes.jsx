import { Navbar } from '../components/Navbar';
import logof from '../imgNavbar/light_switch off.svg';
import logon from '../imgNavbar/light_switch on.svg';
import styles from './Usuarios.module.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Clientes = () => {
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
            <Navbar />
            <div style={contentStyle} className='contenedor'>

                {/* titulo */}

                <h1 className="titulo">Clientes</h1>

                {/* boton de agregar */}

                <div className="container-fluid seccion2" style={{ width: 0 }} >
                    <div className={styles.ap}>
                        <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#myModal">Agregar Cliente</button>
                    </div>

                    {/* modal agregar usuario */}

                    <div class="modal" id="myModal">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header modal-head-agregar">
                            <h5 class="modal-title" id="exampleModalLabel">Agregar cliente</h5>
                            <button type="button" id="xAgregar" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                                <div className="formulario">
                                    <div className="modal-body">

                                    {/* <!-- formulario para agregar un cliente --> */}
                                        <form action="" id="formularioAgregarCliente">
                                            <div class="mb-3" name="divNombre">
                                                <label for="nombreGuardar" class="col-form-label">Nombre:</label>
                                                <input type="text" class="form-control" id="nombreGuardarr" name="nombreGuardar" placeholder="Ingresar nombre"/>
                                            </div>
                                            <div class="mb-3" name="divApellido">
                                                <label for="apellidoGuardar" class="col-form-label">Apellido:</label>
                                                <input type="text" class="form-control" id="apellidoGuardar" name="apellidoGuardar" placeholder="Ingresar apellido"/>
                                            </div>
                                            <div class="mb-3" name="divTelefono">
                                                <label for="telefonoGuardar" class="col-form-label">Teléfono:</label>
                                                <input type="text" class="form-control" id="telefonoGuardar" name="telefonoGuardar" placeholder="Ingresar teléfono"/>
                                            </div>
                                            <div class="mb-3" name="divEmail">
                                                <label for="emailGuardar" class="col-form-label">Email:</label>
                                                <input type="email" class="form-control" id="emailGuardar" name="emailGuardar" placeholder="Ingresar email"/>
                                            </div>
                                            <div class="mb-3" name="divDireccion">
                                                <label for="direccionGuardar" class="col-form-label">Dirección:</label>
                                                <input type="text" class="form-control" id="direccionGuardar" name="direccionGuardar" placeholder="Ingresar Dirección"/>
                                            </div>
                                        
                                            <div class="modal-footer">
                                                <button type="button" id="guardarCancelado" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                                                <input type="submit" class="btn btn-success"  value="Guardar"/>
                                            </div>
                                        </form>
                                    </div>


                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Boton para Buscar/filtrar */}
                    <div className={styles.buscador}>
                        <form class="d-flex">
                            <input class="form-control me-2" type="search" placeholder="Buscar" aria-label="Search" />
                        </form>
                    </div>


                </div>

                {/* tabla  para listar el producto */}

                <div class="tabla">
        <table class="table caption-top ">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Apellido</th>
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
                    <td>{cliente.telefono}</td>
                    <td>{cliente.email}</td>
                    <td>{cliente.direccion}</td>
                    <td>
                    <img className="centrarIcono estado" src={cliente.estado === true ? logon : logof} />
                    </td>
                    <td>
                    <button type="button" className="btn btn-info" data-bs-toggle="modal" data-bs-target="#modalEditar"
                    >
                        Editar
                    </button>
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
    </div> 

                {/* <!-- modal de editar cliente --> */}
                <div class="modal" id="modalEditar">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header modal-head-editar">
                                <h5 class="modal-title">Editar datos del cliente</h5>
                                <button type="button" id="xEditar" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">

                                {/* <!-- formulario para editar los datos de la tabla clientes --> */}
                    <form action="" id="formularioEditarCliente">
                        <div class="mb-3" name="divNombre">
                            <label for="nombreEditar" class="col-form-label">Nombre:</label>
                            <input type="text" class="form-control" name="nombreEditar" placeholder="Ingresar nombre"/>
                        </div>
                        <div class="mb-3"  name="divApellido">
                            <label for="apellidoEditar" class="col-form-label">Apellido:</label>
                            <input type="text" class="form-control" name="apellidoEditar" placeholder="Ingresar apellido"/>
                        </div>
                        <div class="mb-3"  name="divTelefono">
                            <label for="telefonoEditar" class="col-form-label">Teléfono:</label>
                            <input type="text" class="form-control" name="telefonoEditar" placeholder="Ingresar teléfono"/>
                        </div>
                        <div class="mb-3"  name="divEmail">
                            <label for="emailEditar" class="col-form-label">Email:</label>
                            <input type="text" class="form-control" name="emailEditar" placeholder="Ingresar email"/>
                        </div>
                        <div class="mb-3"  name="divDireccion">
                            <label for="direccionEditar" class="col-form-label">Dirección:</label>
                            <input type="text" class="form-control" name="direccionEditar" placeholder="Ingresar email"/>
                        </div>


                        <div class="modal-footer">
                            <button type="button" id="editarCancelado"  class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                            <input type="submit" id="GuardarEditarCliente" class="btn btn-success"  value="Guardar"/>
                        </div>
                    </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Clientes;
