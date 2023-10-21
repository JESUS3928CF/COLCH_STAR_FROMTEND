import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import '../../css-general/cssgeneral.css'
import '../../css-general/tailwind.min.css'
import '../../css-general/inicio_style.css'
import '../../css-general/table.min.css'


const AgregarCliente = () => {
    const [cliente, setCliente] = useState({
        nombre: "",
        apellido: "",
        cedula: "",
        telefono: "",
        email : "",
        direccion: "",
    });

    const navigate = useNavigate()

    const handleChange = (e) => {
        setCliente(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleClick = async e => {

        e.preventDefault()
        try {
            await axios.post("http://localhost:3000/api/clientes", cliente)
            navigate()
            const modal = document.getElementById("myModal");
            const modalInstance = bootstrap.Modal.getInstance(modal);
            modalInstance.hide();

            location.reload();

        } catch (err) {
            console.log(err)

        }
    }
  return (
    <div>
        <div class="modal" id="myModal">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="agregar agr">
                            <h5 class="modal-title" id="exampleModalLabel">Agregar cliente</h5>
                            <button type="button" id="xAgregar" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                                <div className="formulario">
                                    <div className="modal-body">

                                    {/* <!-- formulario para agregar un cliente --> */}
                                        <form action="" id="formularioAgregarCliente">
                                            <div class="mb-3" name="divNombre">
                                                <label for="nombreGuardar" class="col-form-label">Nombre:*</label>
                                                <input type="text" class="form-control" name="nombre" placeholder=". . ." onChange={handleChange}/>
                                            </div>
                                            <div class="mb-3" name="divApellido">
                                                <label for="apellidoGuardar" class="col-form-label">Apellido:*</label>
                                                <input type="text" class="form-control" name="apellido" placeholder=". . ." onChange={handleChange}/>
                                            </div>
                                            <div class="mb-3" name="divCedula">
                                                <label for="cedulaGuardar" class="col-form-label">Cedula:*</label>
                                                <input type="text" class="form-control" name="cedula" placeholder=". . ." onChange={handleChange}/>
                                            </div>
                                            <div class="mb-3" name="divTelefono">
                                                <label for="telefonoGuardar" class="col-form-label">Teléfono:*</label>
                                                <input type="text" class="form-control" name="telefono" placeholder=". . ." onChange={handleChange}/>
                                            </div>
                                            <div class="mb-3" name="divEmail">
                                                <label for="emailGuardar" class="col-form-label">Email:*</label>
                                                <input type="email" class="form-control" name="email" placeholder=". . ." onChange={handleChange}/>
                                            </div>
                                            <div class="mb-3" name="divDireccion">
                                                <label for="direccionGuardar" class="col-form-label">Dirección:*</label>
                                                <input type="text" class="form-control" name="direccion" placeholder=". . ." onChange={handleChange}/>
                                            </div>
                                        
                                            <div class="modal-footer">
                                                <button type="button" id="guardarCancelado" class="btn-c" data-bs-dismiss="modal">Cancelar</button>
                                                <input onClick={handleClick} type="submit" class="btn btn-success"  value="Guardar"/>
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