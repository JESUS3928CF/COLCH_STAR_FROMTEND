import React from 'react'
import '../../css-general/cssgeneral.css'
import '../../css-general/tailwind.min.css'
import '../../css-general/inicio_style.css'
import '../../css-general/table.min.css'

const EditarProveedor = () => {




    return (
        <div>

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
                                        placeholder="Ingresar nombre"
                                    />
                                </div>
                                <div class="mb-3" name="divTelefono">
                                    <label for="telefonoEditar" class="col-form-label">Teléfono:</label>
                                    <input type="text" class="form-control" id="telefonoEditar" name="telefonoEditar"
                                        placeholder="Ingresar teléfono"
                                    />
                                </div>
                                <div class="mb-3" name="divDireccion">
                                    <label for="direccionEditar" class="col-form-label">Dirección:</label>
                                    <input type="text" class="form-control" id="direccionEditar" name="direccionEditar"
                                        placeholder="Ingresar dirección"
                                    />
                                </div>

                                <div class="mb-3" name="divCedula">
                                    <label for="cedulaEditar" class="col-form-label">Cedula:</label>
                                    <input type="text" class="form-control" id="cedulaEditar" name="cedulaEditar"
                                        placeholder="Ingresar cedula"
                                    />
                                </div>
                                <div class="mb-3" name="divNit">
                                    <label for="nitEditar" class="col-form-label">NIT:</label>
                                    <input type="text" class="form-control" id="nitEditar" name="nitEditar"
                                        placeholder="Ingresar Nit"
                                    />
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

    )
}

export default EditarProveedor
