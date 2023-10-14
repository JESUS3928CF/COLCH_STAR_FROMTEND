import { Navbar } from '../components/Navbar';
import logof from '../imgNavbar/light_switch off.svg';
import logon from '../imgNavbar/light_switch on.svg';
import logadm from '../imgNavbar/crossing_out.svg';
import styles from './Usuarios.module.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
      // Realiza una solicitud al backend para obtener la lista de usuarios
      axios.get('http://localhost:3000/api/usuarios')
        .then(response => {
          // Actualiza el estado con la lista de usuarios
          setUsuarios(response.data);
        })
        .catch(error => {
          console.error('Error al obtener la lista de usuarios:', error);
        });
    }, []);
    const handleEstadoChange = (idUsuario, nuevoEstado) => {
        // Realiza una solicitud al backend para cambiar el estado del usuario
        axios.put(`http://localhost:3000/api/usuarios/${idUsuario}`, { estado: nuevoEstado })
            .then(response => {
                // Actualiza el estado con la lista de usuarios después de cambiar el estado
                setUsuarios(response.data);
            })
            .catch(error => {
                console.error('Error al cambiar el estado del usuario:', error);
            });
    };
    const contentStyle = {
        marginLeft: '260px', // Ancho del Navbar
    };

    return (
        <div>
            <Navbar />
            <div style={contentStyle} className='contenedor'>

                {/* titulo */}

                <h1 className="titulo">Usuarios</h1>

                {/* boton de agregar */}

                <div className="container-fluid seccion2" style={{ width: 0 }} >
                    <div className={styles.ap}>
                        <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#myModal">Agregar
                            Usuario</button>
                    </div>

                    {/* modal agregar usuario */}

                    <div className="modal" id="myModal">
                        <div className="modal-dialog modal-dialog-centered" style={{ width: 800, marginLeft: 450 }}>
                            <div className="modal-content">
                                <div className="modal-header modal-head-agregar">
                                    <h5 className="modal-title" id="exampleModalLabel">
                                        Agregar Usuario
                                    </h5>
                                    <button type="button" id="xAgregar" className="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div className="formulario">
                                    <div className="modal-body">

                                        {/* <!-- formulario para agregar un usuario --> */}
                                        <form action="" id="formularioagregarusuario">
                                            <div class="mb-3" name="divNombre">
                                                <label for="nombreGuardar" class="col-form-label">Nombre:</label>
                                                <input type="text" class="form-control" id="nombreGuardarr" name="nombreGuardar"
                                                    placeholder="Ingresar nombre" />
                                            </div>
                                            <div class="mb-3" name="divApellido">
                                                <label for="apellidoGuardar" class="col-form-label">Apellido:</label>
                                                <input type="text" class="form-control" id="apellidoGuardar" name="apellidoGuardar"
                                                    placeholder="Ingresar apellido" />
                                            </div>
                                            <div class="mb-3" name="divTelefono">
                                                <label for="telefonoGuardar" class="col-form-label">Teléfono:</label>
                                                <input type="text" class="form-control" id="telefonoGuardar" name="telefonoGuardar" placeholder="Ingresar teléfono" />
                                            </div>
                                            <div class="mb-3" name="divEmail">
                                                <label for="emailGuardar" class="col-form-label">Email:</label>
                                                <input type="email" class="form-control" id="emailGuardar" name="emailGuardar"
                                                    placeholder="Ingresar email" />
                                            </div>


                                            <div class="mb-3" name="divContraseña">
                                                <label for="contraseñaGuardar" class="col-form-label" >Contraseña:</label>
                                                <input type="password" class="form-control" id="contraseñaGuardar" name="contraseñaGuardar"
                                                    placeholder="Ingresar contraseña" />
                                            </div>
                                            <div class="mb-3" name="divConfirmarContraseña">
                                                <label for="contraseñaconfirmarGuardar" class="col-form-label">Confirmar contraseña:</label>
                                                <input type="password" class="form-control" id="contraseñaconfirmarGuardar" name="contraseñaconfirmarGuardar"
                                                    placeholder="Confirmar contraseña:" />
                                            </div>
                                            <div class="mb-3" name="divselectRol">
                                                <label for="rolGuardar" class="col-form-label">Rol:</label>
                                                <select class="form-control" name="selectRol">
                                                    <option value="">Seleccionar rol</option>
                                                    <option value="2">Empleado</option>
                                                    <option value="3">Vendedor</option>
                                                    <option value="4">Comprador</option>
                                                </select>
                                            </div>

                                            <div class="modal-footer">
                                                <button type="button" id="guardarCancelado" class="btn btn-danger"
                                                    data-bs-dismiss="modal">Cancelar</button>
                                                <input type="submit" class="btn btn-success" value="Guardar" />
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
                            <input class="form-control me-2" type="search" placeholder="" aria-label="Search" />
                            <button class="btn btn-outline-success" type="submit">Buscar</button>
                        </form>
                    </div>


                </div>

                {/* tabla  para listar el producto */}

                <div className="tabla">
                    <table className="table caption-top ">
                        <caption>Lista de Usuarios</caption>
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Apellido</th>
                                <th scope="col">Teléfono</th>
                                <th scope="col">Email</th>
                                <th scope="col">Rol</th>
                                <th scope="col">Estado</th>
                                <th scope="col">Editar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map(usuario => (
                            <tr key={usuario.id}>
                                <td>{usuario.id_usuario}</td>
                                <td>{usuario.nombre}</td>
                                <td>{usuario.apellido}</td>
                                <td>{usuario.telefono}</td>
                                <td>{usuario.email}</td>
                                <td>{usuario.fk_rol}</td>
                                <td>
                                <img className="centrarIcono estado" src={usuario.estado === true ? logon : logof} />
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
                                <h5 class="modal-title">Editar datos del usuario</h5>
                                <button type="button" id="xEditar" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                {/* <!-- formulario para editar los datos de la tabla Usuarios --> */}
                                <form action="" id="formularioEditarUsuario">
                                    <div class="mb-3" name="divNombre">
                                        <label for="nombreEditar" class="col-form-label">Nombre:</label>
                                        <input type="text" class="form-control" id="nombreEditar" name="nombreEditar" placeholder="Ingresar nombre" />
                                    </div>
                                    <div class="mb-3" name="divApellido">
                                        <label for="apellidoEditar" class="col-form-label">Apellido:</label>
                                        <input type="text" class="form-control" id="apellidoEditar" name="apellidoEditar" placeholder="Ingresar apellido" />
                                    </div>
                                    <div class="mb-3" name="divTelefono">
                                        <label for="telefonoEditar" class="col-form-label">Teléfono:</label>
                                        <input type="text" class="form-control" id="telefonoEditar" name="telefonoEditar"
                                            placeholder="Ingresar teléfono" />
                                    </div>
                                    <div class="mb-3" name="divEmail">
                                        <label for="emailEditar" class="col-form-label">Email:</label>
                                        <input type="email" class="form-control" id="emailEditar" name="emailEditar" placeholder="Ingresar email" />
                                    </div>


                                    <div class="mb-3" name="divContraseña">
                                        <label for="contraseñaEditar" class="col-form-label">Contraseña:</label>
                                        <input type="password" class="form-control" id="contraseñaEditar" name="contraseñaEditar"
                                            placeholder="Ingresar contraseña" />
                                    </div>
                                    <div class="mb-3" name="divConfirmarContraseña">
                                        <label for="contraseñaconfirmarEditar" class="col-form-label">Confirmar contraseña:</label>
                                        <input type="password" class="form-control" id="contraseñaconfirmarEditar" name="contraseñaconfirmarEditar"
                                            placeholder="Confirmar contraseña:" />
                                    </div>
                                    <label for="exampleDataList" class="form-label">Estado:</label>
                                    <select class="form-select" aria-label="Default select example">
                                        <option value="1">Habilitar</option>
                                        <option value="2">Inhabilitar</option>
                                    </select>
                                    <div class="mb-3" name="divselectRol">
                                        <label for="rolEditar" class="col-form-label">Rol:</label>
                                        <select class="form-control" name="selectRolEditar">
                                            <option value="">Seleccionar rol</option>
                                            <option value="2">Empleado</option>
                                            <option value="3">Vendedor</option>
                                            <option value="4">Comprador</option>
                                        </select>
                                    </div>

                                    <div className="modal-footer">
                                        <button type="button" id="editarCancelado" className="btn btn-danger"
                                            data-bs-dismiss="modal">Cancelar</button>
                                        <input type="submit" className="btn btn-success" value="Guardar" />
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

export default Usuarios;
