// import React from 'react';
// import axios from 'axios';
// import { useForm } from 'react-hook-form';
// import CancelarModal from '../chared/CancelarModal';
// import GuardarModal from '../chared/GuardarModal';
// import AlertaError from '../chared/AlertaError';


// const AgregarCliente = () => {
  
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset, 
//   } = useForm();


//   const onSubmit = async (data) => {
//     try {
//       // Send the form data to your API
//       await axios.post('http://localhost:3000/api/clientes', data);

//       // Reset the form after a successful submission
//       reset();

//       // Close the modal (Assuming you are using Bootstrap modal)
//       const modal = document.getElementById('myModal');
//       const modalInstance = bootstrap.Modal.getInstance(modal);
//       modalInstance.hide();

//       // Reload the page if necessary
//       window.location.reload();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div>
//       <div className="modal" id="myModal">
//         <div className="modal-dialog modal-dialog-centered">
//           <div className="modal-content">
//             <div className="agregar agr">
//               <h5 className="modal-title" id="exampleModalLabel">
//                 Agregar cliente
//               </h5>
//               <button
//                 type="button"
//                 id="xAgregar"
//                 className="btn-close"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//               ></button>
//             </div>
//             <div className="formulario">
//               <div className="modal-body">
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                   <div className="mb-3">
//                     <label htmlFor="nombre" className="col-form-label">
//                       Nombre:*
//                     </label>
//                     <input
//                       name="nombre"
//                       type="text"
//                       className="form-control"
//                       placeholder=". . ."
//                       {...register('nombre', {
//                         required: 'El nombre es obligatorio',
//                         validate: (value) => {
//                           return validarCampoStringLetras(value[0]);
//                       }
//                       })}
//                     />
//                     {errors.nombre && (
//                       <AlertaError message={errors.nombre.message} />
//                     )}
//                   </div>
//                   <div className="mb-3">
//                     <label htmlFor="apellido" className="col-form-label">
//                       Apellido:*
//                     </label>
//                     <input
//                       name="apellido"
//                       type="text"
//                       className="form-control"
//                       placeholder=". . ."
//                       {...register('apellido', {
//                         required: 'El apellido es obligatorio',
//                       })}
//                     />
//                     {errors.apellido && (
//                       <AlertaError message={errors.apellido.message} />
//                     )}
//                   </div>
//                   <div className="mb-3">
//                   <label htmlFor="cedula" className="col-form-label">
//                     Cedula:*
//                   </label>
//                   <input
//                     name="cedula"
//                     type="text"
//                     className="form-control"
//                     placeholder=". . ."
//                     {...register('cedula', {
//                       required: 'La cedula es obligatoria',
//                     })}
//                   />
//                   {errors.cedula && (
//                     <AlertaError message={errors.cedula.message} />
//                   )}
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="telefono" className="col-form-label">
//                     Teléfono:*
//                   </label>
//                   <input
//                     name="telefono"
//                     type="text"
//                     className="form-control"
//                     placeholder=". . ."
//                     {...register('telefono', {
//                       required: 'El teléfono es obligatorio',
//                     })}
//                   />
//                   {errors.telefono && (
//                     <AlertaError message={errors.telefono.message} />
//                   )}
//                 </div>
//                 <div className="mb-3">
//                 <label htmlFor="email" className="col-form-label">
//                   Email:*
//                 </label>
//                 <input
//                   name="email"
//                   type="email"
//                   className="form-control"
//                   placeholder=". . ."
//                   {...register('email', {
//                     required: 'El email es obligatorio',
//                   })}
//                 />
//                 {errors.email && (
//                   <AlertaError message={errors.email.message} />
//                 )}
//               </div>
//               <div className="mb-3">
//             <label htmlFor="direccion" className="col-form-label">
//               Dirección:*
//             </label>
//             <input
//               name="direccion"
//               type="text"
//               className="form-control"
//               placeholder=". . ."
//               {...register('direccion', {
//                 required: 'La dirección es obligatoria',
//               })}
//             />
//             {errors.direccion && (
//               <AlertaError message={errors.direccion.message} />
//             )}
//           </div>

//                   <div className="modal-footer">
//                     <CancelarModal />
//                     <GuardarModal />
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AgregarCliente;

import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import '../../css-general/cssgeneral.css'
import '../../css-general/tailwind.min.css'
import '../../css-general/inicio_style.css'
import '../../css-general/table.min.css'
import CancelarModal from '../chared/CancelarModal';
import GuardarModal from '../chared/GuardarModal';
import AlertaError from '../chared/AlertaError';


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

         // Validación de nombre para que contenga al menos una letra 
         const nameRegex = /^[A-Za-z]+(\s[A-Za-z]+)*$/;

         if (!cliente.nombre) {
           setNombreError("El Nombre es obligatorio");
         } else {
           // Utiliza trim() para eliminar espacios en blanco al principio y al final del nombre.
           const nombreSinEspacios = cliente.nombre.trim();
         
           if (!nameRegex.test(nombreSinEspacios)) {
             setNombreError("El Nombre debe contener solo letras");
           } else {
             setNombreError("");
           }
         }         

        // Validación del apellido para que solo contenga letras
        if (!cliente.apellido) {
            setApellidoError("El Apellido es obligatorio");
          } else {
            const apellidoSinEspacios = cliente.apellido.trim();
            if (!nameRegex.test(apellidoSinEspacios)) {
              setApellidoError("El Apellido debe contener solo letras");
            } else {
              setApellidoError("");
            }
          }

          
        // Validación de cédula para que sea un número y tenga una longitud entre 7 y 11 caracteres
        const cedulaRegex = /^\d+$/;

        if (!cliente.cedula) {
        setCedulaError("La Cédula es obligatoria");
        } else {
        const cedulaSinEspacios = cliente.cedula.trim();
        if (!cedulaSinEspacios.match(cedulaRegex) || cedulaSinEspacios.length < 7 || cedulaSinEspacios.length > 11) {
            setCedulaError("La Cédula debe contener solo números y tener entre 7 y 11 dígitos");
        } else {
            setCedulaError("");
        }
        }

        // Validación de teléfono para que contenga solo números y esté entre 7 y 11 dígitos
        const telefonoRegex = /^\d+$/;

        if (!cliente.telefono) {
        setTelefonoError("El Teléfono es obligatorio");
        } else {
        const telefonoSinEspacios = cliente.telefono.trim();
        if (!telefonoSinEspacios.match(telefonoRegex) || telefonoSinEspacios.length < 7 || telefonoSinEspacios.length > 11) {
            setTelefonoError("El Teléfono debe contener solo números y tener entre 7 y 11 dígitos");
        } else {
            setTelefonoError("");
        }
        }

        

         // Validación del formato del correo electrónico
         const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

         if (!cliente.email) {
           setEmailError("El Email es obligatorio");
         } else {
           const emailSinEspacios = cliente.email.trim();
           if (!emailSinEspacios.match(emailRegex)) {
             setEmailError("El Email no tiene un formato válido");
           } else {
             setEmailError("");
           }
         }
         

         // Validación de dirección para que no esté vacía y tenga un mínimo de 5 caracteres
        if (cliente.direccion.trim() === "" || cliente.direccion.length < 5) {
            setDireccionError("La Dirección es obligatoria");
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
                                                
                                                {/* en esta etiqueta va salir el error de validacion  */}
                                                <AlertaError message={nombreError} />

                                            </div>
                                                

                                            <div class="mb-3" name="divApellido">
                                                <label for="apellidoGuardar" class="col-form-label">Apellido:*</label>
                                                <input type="text" class="form-control" name="apellido" placeholder=". . ." onChange={handleChange}/>

                                                {/* en esta etiqueta va salir el error de validacion  */}
                                              <AlertaError message={apellidoError}/>
                                              
                                            </div>

                                            
                                            <div class="mb-3" name="divCedula">
                                                <label for="cedulaGuardar" class="col-form-label">Cedula:*</label>
                                                <input type="text" class="form-control" name="cedula" placeholder=". . ." onChange={handleChange}/>

                                                {/* en esta etiqueta va salir el error de validacion  */}
                                              <AlertaError message={cedulaError}/>

                                            </div>

                                            
                                            <div class="mb-3" name="divTelefono">
                                                <label for="telefonoGuardar" class="col-form-label">Teléfono:*</label>
                                                <input type="text" class="form-control" name="telefono" placeholder=". . ." onChange={handleChange}/>

                                                {/* en esta etiqueta va salir el error de validacion  */}
                                              <AlertaError message={telefonoError}/>

                                            </div>
                                          
                                            
                                            <div class="mb-3" name="divEmail">
                                                <label for="emailGuardar" class="col-form-label">Email:*</label>
                                                <input type="email" class="form-control" name="email" placeholder=". . ." onChange={handleChange}/>

                                                {/* en esta etiqueta va salir el error de validacion  */}
                                              <AlertaError message={emailError}/>

                                            </div>

                                           
                                            <div class="mb-3" name="divDireccion">
                                                <label for="direccionGuardar" class="col-form-label">Dirección:*</label>
                                                <input type="text" class="form-control" name="direccion" placeholder=". . ." onChange={handleChange}/>

                                                {/* en esta etiqueta va salir el error de validacion  */}
                                              <AlertaError message={direccionError}/>

                                            </div>

                                        
                                            <div class="modal-footer">
                                                <CancelarModal />
                                                <GuardarModal onClick={handleClick} />
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
