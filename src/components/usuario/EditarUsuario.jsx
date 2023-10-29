import React from 'react'
import '../../css-general/cssgeneral.css'
import '../../css-general/tailwind.min.css'
import '../../css-general/inicio_style.css'
import '../../css-general/table.min.css'

const EditarUsuario = () => {
  return (
    <div>
                 <div className="modal" id="modalEditar">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="editar edi">
                                <h5 className="modal-title">Editar datos del usuario</h5>
                                <button type="button" id="xEditar" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {/* <!-- formulario para editar los datos de la tabla Usuarios --> */}
                                <form action="" id="formularioEditarUsuario">
                                    <div className="mb-3" name="divNombre">
                                        <label for="nombreEditar" className="col-form-label">Nombre:</label>
                                        <input type="text" className="form-control" id="nombreEditar" name="nombreEditar" placeholder="Ingresar nombre" />
                                    </div>
                                    <div className="mb-3" name="divApellido">
                                        <label for="apellidoEditar" className="col-form-label">Apellido:</label>
                                        <input type="text" className="form-control" id="apellidoEditar" name="apellidoEditar" placeholder="Ingresar apellido" />
                                    </div>
                                    <div className="mb-3" name="divTelefono">
                                        <label for="telefonoEditar" className="col-form-label">Teléfono:</label>
                                        <input type="text" className="form-control" id="telefonoEditar" name="telefonoEditar"
                                            placeholder="Ingresar teléfono" />
                                    </div>
                                    <div className="mb-3" name="divEmail">
                                        <label for="emailEditar" className="col-form-label">Email:</label>
                                        <input type="email" className="form-control" id="emailEditar" name="emailEditar" placeholder="Ingresar email" />
                                    </div>


                                    <div className="mb-3" name="divContraseña">
                                        <label for="contraseñaEditar" className="col-form-label">Contraseña:</label>
                                        <input type="password" className="form-control" id="contraseñaEditar" name="contraseñaEditar"
                                            placeholder="Ingresar contraseña" />
                                    </div>
                                    <div className="mb-3" name="divConfirmarContraseña">
                                        <label for="contraseñaconfirmarEditar" className="col-form-label">Confirmar contraseña:</label>
                                        <input type="password" className="form-control" id="contraseñaconfirmarEditar" name="contraseñaconfirmarEditar"
                                            placeholder="Confirmar contraseña:" />
                                    </div>
                                    <label for="exampleDataList" className="form-label">Estado:</label>
                                    <select className="form-select" aria-label="Default select example">
                                        <option value="1">Habilitar</option>
                                        <option value="2">Inhabilitar</option>
                                    </select>
                                    <div className="mb-3" name="divselectRol">
                                        <label for="rolEditar" className="col-form-label">Rol:</label>
                                        <select className="form-control" name="selectRolEditar">
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
  )
}
export default EditarUsuario