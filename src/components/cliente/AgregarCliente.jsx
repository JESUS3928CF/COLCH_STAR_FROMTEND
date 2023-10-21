import React from 'react'
import '../../css-general/cssgeneral.css'
import '../../css-general/tailwind.min.css'
import '../../css-general/inicio_style.css'
import '../../css-general/table.min.css'


const AgregarCliente = () => {
    //hola
  return (
    <div>
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
      
    </div>
  )
}

export default AgregarCliente
