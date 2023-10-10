import { Navbar } from '../components/Navbar';
import React, { useState } from 'react';
import logof from '../../public/imgNavbar/light_switch off.svg';
import logon from '../../public/imgNavbar/light_switch on.svg';
import styles from './proveedores.module.css';
import '../css-general/cssgeneral.css'
import '../css-general/tailwind.min.css'
import '../css-general/inicio_style.css'
import '../css-general/table.min.css'



const Proveedores = () => {

    const [nombre, setNombre] = useState('');
    const [nombreError, setNombreError] = useState('');

    // funcion que se ejecutara cuando le unda enviar al formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        let valid = true;
      
        // Validation for the 'nombre' field (required)
        if (nombre.trim() === '') {
          setNombreError('Nombre es requerido');
          valid = false;
        } else {
          setNombreError('');
        }
    }
      


    const contentStyle = {
        marginLeft: '260px', // Ancho del Navbar
    };

    return (
        <div>
            <Navbar />
            <div style={contentStyle} className='contenedor'>

                {/* titulo */}

                <h1 className="titulo">Proveedores</h1>



                {/* boton agregar */}

                <div className="container-fluid seccion2" style={{ width: 0 }}>

                    <div className={styles.ap}>
                        <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#myModal">Agregar
                            proveedor</button>
                    </div>

                    {/* modal agregar proveedor */}

                    <div className="modal" id="myModal">
                        <div className="modal-dialog modal-dialog-centered ">
                            <div className="modal-content">
                                <div className="modal-header modal-head-agregar">
                                    <h5 className="modal-title" id="exampleModalLabel">Agregar proveedor</h5>
                                    <button type="button" id="xAgregar" className="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div className="modal-body">

                                    {/* formulario para agregar proveedor */}

                                    {/* El atributo onSubmit se coloca en un formulario de React para especificar la función que se ejecutará
                                     cuando el usuario envíe el formulario */}
                                    <form onSubmit={handleSubmit}  action="" id="formularioAgregarProveedor">
                                        <div className="mb-3" name="divNombre">
                                            <label for="nombreGuardar" className="col-form-label">Nombre:</label>
                                            <input type="text" 
                                            className="form-control"
                                             name="nombreGuardar"
                                                placeholder="Ingresar nombre" 
                                                value={nombre}
                                                onChange={(e) => setNombre(e.target.value)}
                                                 />
                                                  <p className="error" style={{color:'red'}}>{nombreError}</p>
                                        </div>
                                        <div className="mb-3" name="divTelefono">
                                            <label for="telefonoGuardar" className="col-form-label">Teléfono:</label>
                                            <input type="text" className="form-control" name="telefonoGuardar"
                                                placeholder="Ingresar teléfono" />
                                        </div>
                                        <div className="mb-3" name="divDireccion">
                                            <label for="direccionGuardar" className="col-form-label">Dirección:</label>
                                            <input type="text" className="form-control" id="direccionGuardar"
                                                name="direccionGuardar" placeholder="Ingresar dirección"  />
                                        </div>
                                        <div className="mb-3" name="divCedula">
                                            <label for="cedulaGuardar" className="col-form-label">Cedula:</label>
                                            <input type="text" className="form-control" id="cedulaGuardar" name="cedulaGuardar"
                                                placeholder="Ingresar cedula" />
                                        </div>
                                        <div className="mb-3" name="divNit">
                                            <label for="nitGuardar" className="col-form-label">Contacto:</label>
                                            <input type="text" className="form-control" id="nitGuardar" name="nitGuardar"
                                                placeholder="Ingresar Nit" />
                                        </div>


                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal"
                                                id="guardarCancelado">Cancelar</button>
                                            <input type="submit" className="btn btn-success" value="Guardar" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
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
                                <th scope="col">Cedula</th>
                                <th scope="col">Nit</th>
                                <th scope="col">Inhabilitar</th>
                                <th scope="col">Editar</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">002</th>
                                <td>Proveedor SAS</td>
                                <td>2789090</td>
                                <td>CALL 14</td>
                                <td>0</td>
                                <td>20202020</td>
                                <td><img className="centrarIcono estado" src={logon} /></td>
                                <td><button type="button" className="btn btn-info" data-bs-toggle="modal"
                                    data-bs-target="#modalEditar">Editar</button></td>
                            </tr>
                            <tr>
                                <th scope="row">003</th>
                                <td>julian</td>
                                <td>3167899090</td>
                                <td>CALL 3040 </td>
                                <td>4356789990 </td>
                                <td>0</td>
                                <td><img className="centrarIcono estado" src={logof} /></td>
                                <td><button type="button" className="btn btn-info" data-bs-toggle="modal"
                                    data-bs-target="#modalEditar">Editar</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* modal de editar proveedor */}
                <div class="modal" id="modalEditar">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header modal-head-editar">
                                <h5 class="modal-title">Editar datos del proveedor</h5>
                                <button type="button" id="xEditar" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                {/* formulario para editar los datos de la tabla proveedor */}
                                <form action="" id="formularioEditarProveedor">
                                    <div class="mb-3" name="divNombre">
                                        <label for="nombreEditar" class="col-form-label">Nombre:</label>
                                        <input type="text" class="form-control" id="nombreEditar" name="nombreEditar"
                                            placeholder="Ingresar nombre" />
                                    </div>
                                    <div class="mb-3" name="divTelefono">
                                        <label for="telefonoEditar" class="col-form-label">Teléfono:</label>
                                        <input type="text" class="form-control" id="telefonoEditar" name="telefonoEditar"
                                            placeholder="Ingresar teléfono" />
                                    </div>
                                    <div class="mb-3" name="divDireccion">
                                        <label for="direccionEditar" class="col-form-label">Dirección:</label>
                                        <input type="text" class="form-control" id="direccionEditar" name="direccionEditar"
                                            placeholder="Ingresar dirección" />
                                    </div>

                                    <div class="mb-3" name="divCedula">
                                        <label for="cedulaEditar" class="col-form-label">Cedula:</label>
                                        <input type="text" class="form-control" id="cedulaEditar" name="cedulaEditar"
                                            placeholder="Ingresar cedula" />
                                    </div>
                                    <div class="mb-3" name="divNit">
                                        <label for="nitEditar" class="col-form-label">NIT:</label>
                                        <input type="text" class="form-control" id="nitEditar" name="nitEditar"
                                            placeholder="Ingresar Nit" />
                                    </div>

                                    <div class="modal-footer">
                                        <button type="button" id="editarCancelado" class="btn btn-danger"
                                            data-bs-dismiss="modal">Cancelar</button>
                                        <input type="submit" id="GuardarEditarProveedor" class="btn btn-success" value="Guardar" />
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

export default Proveedores;
