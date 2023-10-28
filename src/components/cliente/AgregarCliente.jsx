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
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, 
  } = useForm();


  const onSubmit = async (data) => {
    try {
      // Send the form data to your API
      await axios.post('http://localhost:3000/api/clientes', data);

      // Reset the form after a successful submission
      reset();

      // Close the modal (Assuming you are using Bootstrap modal)
      const modal = document.getElementById('myModal');
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
