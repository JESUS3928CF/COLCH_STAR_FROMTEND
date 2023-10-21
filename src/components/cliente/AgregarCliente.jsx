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


        //PARA LAS VALIDACIONES
    //set le pasa el mensaje de validacion a Error
    const [nombreError, setNombreError] = useState("");
    const [apellidoError, setApellidoError] = useState("");
    const [cedulaError, setCedulaError] = useState("");
    const [telefonoError, setTelefonoError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [direccionError, setDireccionError] = useState("");

    const handleClick = async e => {

        e.preventDefault()

         // Validación de nombre para que contenga al menos una letra y espacios en blanco
        const nameRegex = /[A-Za-z]+/;

        if (!cliente.nombre.match(nameRegex)) {
            setNombreError("El Nombre debe contener solo letras");
            return;
        } else {
            setNombreError("");
        }

        // Validación del apellido para que solo contenga letras
        if (!cliente.apellido.match(nameRegex)) {
            setApellidoError("El Apellido debe contener solo letras");
            return;
        }

        // Validación de cédula para que sea un número y tenga una longitud entre 7 y 11 caracteres
        const cedulaRegex = /^\d+$/;

        if (!cliente.cedula.match(cedulaRegex) || cliente.cedula.length < 7 || cliente.cedula.length > 11) {
            setCedulaError("La Cédula debe contener solo números y tener entre 7 y 11 caracteres");
            return;
        } else {
            setCedulaError("");
        }

        // Validación de teléfono para que contenga solo números y esté entre 7 y 11 dígitos
        const telefonoRegex = /^\d+$/;

        if (!cliente.telefono.match(telefonoRegex) || cliente.telefono.length < 7 || cliente.telefono.length > 11) {
            setTelefonoError("El Teléfono debe contener solo números y tener entre 7 y 11 dígitos");
            return;
        } else {
            setTelefonoError("");
        }

         // Validación del formato del correo electrónico
         const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

         if (!cliente.email.match(emailRegex)) {
             setEmailError("El Email no tiene un formato válido");
             return;
         } else {
             setEmailError("");
         }

         // Validación de dirección para que no esté vacía y tenga un mínimo de 5 caracteres
        if (cliente.direccion.trim() === "" || cliente.direccion.length < 5) {
            setDireccionError("La Dirección es obligatoria y debe tener al menos 5 caracteres");
            return;
        } else {
            setDireccionError("");
        }

        try {
            await axios.post("http://localhost:3000/api/clientes", cliente)
            navigate()
            const modal = document.getElementById("myModal");
            const modalInstance = bootstrap.Modal.getInstance(modal);
            modalInstance.hide();

            Window.location.reload();

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
                                                
                                            {/* en esta etiqueta va salir el error de validacion  */}
                                            <p className="text-red-500" style={{fontSize:14}}>{nombreError}</p>

                                            <div class="mb-3" name="divApellido">
                                                <label for="apellidoGuardar" class="col-form-label">Apellido:*</label>
                                                <input type="text" class="form-control" name="apellido" placeholder=". . ." onChange={handleChange}/>
                                            </div>
                                              {/* en esta etiqueta va salir el error de validacion  */}
                                              <p className="text-red-500" style={{fontSize:14}}>{apellidoError}</p>
                                            
                                            <div class="mb-3" name="divCedula">
                                                <label for="cedulaGuardar" class="col-form-label">Cedula:*</label>
                                                <input type="text" class="form-control" name="cedula" placeholder=". . ." onChange={handleChange}/>
                                            </div>
                                              {/* en esta etiqueta va salir el error de validacion  */}
                                              <p className="text-red-500" style={{fontSize:14}}>{cedulaError}</p>
                                            
                                            <div class="mb-3" name="divTelefono">
                                                <label for="telefonoGuardar" class="col-form-label">Teléfono:*</label>
                                                <input type="text" class="form-control" name="telefono" placeholder=". . ." onChange={handleChange}/>
                                            </div>
                                              {/* en esta etiqueta va salir el error de validacion  */}
                                              <p className="text-red-500" style={{fontSize:14}}>{telefonoError}</p>
                                            
                                            <div class="mb-3" name="divEmail">
                                                <label for="emailGuardar" class="col-form-label">Email:*</label>
                                                <input type="email" class="form-control" name="email" placeholder=". . ." onChange={handleChange}/>
                                            </div>
                                              {/* en esta etiqueta va salir el error de validacion  */}
                                              <p className="text-red-500" style={{fontSize:14}}>{emailError}</p>
                                           
                                            <div class="mb-3" name="divDireccion">
                                                <label for="direccionGuardar" class="col-form-label">Dirección:*</label>
                                                <input type="text" class="form-control" name="direccion" placeholder=". . ." onChange={handleChange}/>
                                            </div>
                                              {/* en esta etiqueta va salir el error de validacion  */}
                                              <p className="text-red-500" style={{fontSize:14}}>{direccionError}</p>
                                        
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
