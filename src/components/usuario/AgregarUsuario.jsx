import '../../css-general/cssgeneral.css'
import '../../css-general/tailwind.min.css'
import '../../css-general/inicio_style.css'
import '../../css-general/table.min.css'
import React from 'react';
import CancelarModal from '../chared/CancelarModal';
import GuardarModal from '../chared/GuardarModal';

const AgregarUsuario = () => {
    return (
        <div>
                    {/* modal agregar usuario */}

                    <div className="modal" id="myModal">
                        <div className="modal-dialog modal-dialog-centered" style={{ width: 800, marginLeft: 450 }}>
                            <div className="modal-content">
                                <div className="agregar agr">
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
                                            <div className="mb-3" name="divNombre">
                                                <label for="nombreGuardar" className="col-form-label">Nombre:*</label>
                                                <input type="text" className="form-control" id="nombreGuardarr" name="nombreGuardar"
                                                    placeholder=". . ." />
                                            </div>
                                            <div className="mb-3" name="divApellido">
                                                <label for="apellidoGuardar" className="col-form-label">Apellido:*</label>
                                                <input type="text" className="form-control" id="apellidoGuardar" name="apellidoGuardar"
                                                    placeholder=". . ." />
                                            </div>
                                            <div className="mb-3" name="divTelefono">
                                                <label for="telefonoGuardar" className="col-form-label">Teléfono:*</label>
                                                <input type="text" className="form-control" id="telefonoGuardar" name="telefonoGuardar" placeholder=". . . " />
                                            </div>
                                            <div className="mb-3" name="divEmail">
                                                <label for="emailGuardar" className="col-form-label">Email:*</label>
                                                <input type="email" className="form-control" id="emailGuardar" name="emailGuardar"
                                                    placeholder=". . . " />
                                            </div>


                                            <div className="mb-3" name="divContraseña">
                                                <label for="contraseñaGuardar" className="col-form-label" >Contraseña:*</label>
                                                <input type="password" className="form-control" id="contraseñaGuardar" name="contraseñaGuardar"
                                                    placeholder=". . . " />
                                            </div>
                                            <div className="mb-3" name="divConfirmarContraseña">
                                                <label for="contraseñaconfirmarGuardar" className="col-form-label">Confirmar contraseña:*</label>
                                                <input type="password" className="form-control" id="contraseñaconfirmarGuardar" name="contraseñaconfirmarGuardar"
                                                    placeholder=". . . " />
                                            </div>
                                            <div className="mb-3" name="divselectRol">
                                                <label for="rolGuardar" className="col-form-label">Rol:*</label>
                                                <select className="form-control" name="selectRol">
                                                    <option value="">Seleccionar rol</option>
                                                    <option value="2">Empleado</option>
                                                    <option value="3">Vendedor</option>
                                                    <option value="4">Comprador</option>
                                                </select>
                                            </div>

                                            <div className="modal-footer">
                                            <CancelarModal />
                                             <GuardarModal />
                                                {/* <button type="button" id="guardarCancelado" className="btn btn-danger"
                                                    data-bs-dismiss="modal">Cancelar</button>
                                                <input type="submit" className="btn btn-success" value="Guardar" /> */}
                                            </div>
                                        </form>
                                    </div>


                                </div>
                            </div>

                        </div>
                    </div>

                </div>
    );
}

export default AgregarUsuario
