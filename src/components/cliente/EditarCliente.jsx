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

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const EditarCliente = () => {
//   const [formData, setFormData] = useState({
//     nombreEditar: '',
//     apellidoEditar: '',
//     cedulaEditar: '',
//     telefonoEditar: '',
//     emailEditar: '',
//     direccionEditar: '',
//   });

//   const [id, setClienteId] = useState(); // You need to set the client ID you want to edit

//   useEffect(() => {
//     // Fetch the client data for editing based on the client ID
//     if (id) {
//       axios.get(`http://localhost:3000/api/clientes/${id}`)
//         .then((response) => {
//           const { nombre, apellido, cedula, telefono, email, direccion } = response.data;
//           setFormData({ nombreEditar: nombre, apellidoEditar: apellido, cedulaEditar: cedula, telefonoEditar: telefono, emailEditar: email, direccionEditar: direccion });
//         })
//         .catch((error) => {
//           console.error('Error fetching client data: ', error);
//         });
//     }
//   }, [id]);

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Send a PUT request to update the client data
//       await axios.put(`http://localhost:3000/api/clientes/${id}`, formData);

//       // You can add logic here to handle a successful update, such as showing a success message or redirecting the user.
//     } catch (error) {
//       console.error('Error updating client: ', error);
//       // Handle errors here, such as displaying an error message to the user.
//     }
//   };

//   return (
//     <div>
//       <div className="modal" id="modalEditar">
//         <div className="modal-dialog modal-dialog-centered">
//           <div className="modal-content">
//             <div className="editar edi">
//               <h5 className="modal-title">Editar datos del cliente</h5>
//               <button type="button" id="xEditar" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//             </div>
//             <div className="modal-body">
//               <form onSubmit={handleFormSubmit}>
//                 <div className="mb-3" name="divNombre">
//                   <label htmlFor="nombreEditar" className="col-form-label">Nombre:</label>
//                   <input type="text" className="form-control" name="nombreEditar" placeholder="" value={formData.nombreEditar} onChange={(e) => setFormData({ ...formData, nombreEditar: e.target.value })} />
//                 </div>
//                 <div className="mb-3" name="divApellido">
//                   <label htmlFor="apellidoEditar" className="col-form-label">Apellido:</label>
//                   <input type="text" className="form-control" name="apellidoEditar" placeholder="" value={formData.apellidoEditar} onChange={(e) => setFormData({ ...formData, apellidoEditar: e.target.value })} />
//                 </div>
//                 <div className="mb-3" name="divCedula">
//                   <label htmlFor="cedulaEditar" className="col-form-label">Cedula:*</label>
//                   <input type="text" className="form-control" id="cedulaEditar" name="cedulaEditar" placeholder="" value={formData.cedulaEditar} onChange={(e) => setFormData({ ...formData, cedulaEditar: e.target.value })} />
//                 </div>
//                 <div className="mb-3" name="divTelefono">
//                   <label htmlFor="telefonoEditar" className="col-form-label">Teléfono:</label>
//                   <input type="text" className="form-control" name="telefonoEditar" placeholder="" value={formData.telefonoEditar} onChange={(e) => setFormData({ ...formData, telefonoEditar: e.target.value })} />
//                 </div>
//                 <div className="mb-3" name="divEmail">
//                   <label htmlFor="emailEditar" className="col-form-label">Email:</label>
//                   <input type="text" className="form-control" name="emailEditar" placeholder="" value={formData.emailEditar} onChange={(e) => setFormData({ ...formData, emailEditar: e.target.value })} />
//                 </div>
//                 <div className="mb-3" name="divDireccion">
//                   <label htmlFor="direccionEditar" className="col-form-label">Dirección:</label>
//                   <input type="text" className="form-control" name="direccionEditar" placeholder="" value={formData.direccionEditar} onChange={(e) => setFormData({ ...formData, direccionEditar: e.target.value })} />
//                 </div>
//                 <div className="modal-footer">
//                   <button type="button" id="editarCancelado" className="btn-n" data-bs-dismiss="modal">Cancelar</button>
//                   <input type="submit" id="GuardarEditarCliente" className="btn btn-success" value="Guardar" />
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditarCliente;