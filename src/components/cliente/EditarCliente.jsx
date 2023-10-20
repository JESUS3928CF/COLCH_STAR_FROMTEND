import React from 'react'
import '../../css-general/cssgeneral.css'
import '../../css-general/tailwind.min.css'
import '../../css-general/inicio_style.css'
import '../../css-general/table.min.css'


const EditarCliente = () => {
  return (
    <div>
        <div class="modal" id="modalEditar">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="editar edi">
                                <h5 class="modal-title">Editar datos del cliente</h5>
                                <button type="button" id="xEditar" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">

                                {/* <!-- formulario para editar los datos de la tabla clientes --> */}
                                <form action="" id="formularioEditarCliente">
                                    <div class="mb-3" name="divNombre">
                                        <label for="nombreEditar" class="col-form-label">Nombre:</label>
                                        <input type="text" class="form-control" name="nombreEditar" placeholder="" />
                                    </div>
                                    <div class="mb-3" name="divApellido">
                                        <label for="apellidoEditar" class="col-form-label">Apellido:</label>
                                        <input type="text" class="form-control" name="apellidoEditar" placeholder="" />
                                    </div>
                                    <div class="mb-3" name="divCedula">
                                        <label for="cedulaEditar" class="col-form-label">Cedula:*</label>
                                        <input type="text" class="form-control" id="cedulaEditar" name="cedulaEditar" placeholder=""/>
                                    </div>
                                    <div class="mb-3" name="divTelefono">
                                        <label for="telefonoEditar" class="col-form-label">Teléfono:</label>
                                        <input type="text" class="form-control" name="telefonoEditar" placeholder="" />
                                    </div>
                                    <div class="mb-3" name="divEmail">
                                        <label for="emailEditar" class="col-form-label">Email:</label>
                                        <input type="text" class="form-control" name="emailEditar" placeholder="" />
                                    </div>
                                    <div class="mb-3" name="divDireccion">
                                        <label for="direccionEditar" class="col-form-label">Dirección:</label>
                                        <input type="text" class="form-control" name="direccionEditar" placeholder="" />
                                    </div>


                                    <div class="modal-footer">
                                        <button type="button" id="editarCancelado" class="btn-n" data-bs-dismiss="modal">Cancelar</button>
                                        <input type="submit" id="GuardarEditarCliente" class="btn btn-success" value="Guardar" />
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>     
    </div>
  )
}

export default EditarCliente

