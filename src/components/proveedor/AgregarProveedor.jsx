import React from 'react'
import '../../css-general/cssgeneral.css'
import '../../css-general/tailwind.min.css'
import '../../css-general/inicio_style.css'
import '../../css-general/table.min.css'
import  {  useState } from 'react';



const AgregarProveedor = () => {


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

  return (
    <div>


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
                    <form onSubmit={handleSubmit} action="" id="formularioAgregarProveedor">
                        <div className="mb-3" name="divNombre">
                            <label for="nombreGuardar" className="col-form-label">Nombre:</label>
                            <input type="text"
                                className="form-control"
                                name="nombreGuardar"
                                placeholder="Ingresar nombre"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                            <p className="error" style={{ color: 'red' }}>{nombreError}</p>
                        </div>
                        <div className="mb-3" name="divTelefono">
                            <label for="telefonoGuardar" className="col-form-label">Teléfono:</label>
                            <input type="text" className="form-control" name="telefonoGuardar"
                                placeholder="Ingresar teléfono" />
                        </div>
                        <div className="mb-3" name="divDireccion">
                            <label for="direccionGuardar" className="col-form-label">Dirección:</label>
                            <input type="text" className="form-control" id="direccionGuardar"
                                name="direccionGuardar" placeholder="Ingresar dirección" />
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





</div>
      
  )
}

export default AgregarProveedor
