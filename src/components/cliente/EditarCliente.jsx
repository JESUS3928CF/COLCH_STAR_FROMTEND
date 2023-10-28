import React from 'react'
import '../../css-general/cssgeneral.css'
import '../../css-general/tailwind.min.css'
import '../../css-general/inicio_style.css'
import '../../css-general/table.min.css'
import { useState, useEffect } from 'react';
import axios from 'axios'
import CancelarModal from '../chared/CancelarModal';
import GuardarModal from '../chared/GuardarModal';


const EditarCliente = ({editarCliente}) => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [cedula, setCedula] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const [direccion, setDireccion] = useState('');
    const [id_cliente, setIdCliente] = useState(null);

    
    useEffect(() => {
        if (editarCliente) {
            setNombre(editarCliente.nombre);
            setApellido(editarCliente.apellido);
            setCedula(editarCliente.cedula);
            setTelefono(editarCliente.telefono);
            setEmail(editarCliente.email);
            setDireccion(editarCliente.direccion);
            setIdCliente(editarCliente.id_cliente);
        }
    }, [editarCliente]);

    const handleFormClick = (e) => {
        e.preventDefault();

        if (id_cliente) {
            axios.patch(`http://localhost:3000/api/clientes/${id_cliente}`, {
                nombre,
                apellido,
                cedula,
                telefono,
                email,
                direccion
            })
            .then(response => {
                console.log('Cliente actualizado:', response.data);
                location.reload();
            })
            .catch(error => {
                console.error('Error al actualizar el cliente', error);
            });
        } else {
            console.error('No se pudo obtener el ID del cliente');
        }
    };


  return (
    <div>
            {/* modal de editar proveedor */}
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
                                        <input type="text" class="form-control" id="nombreEditar" name="nombre" placeholder="" value={nombre}

                                    onChange={(e) => setNombre(e.target.value)}
                                    />
                                    </div>
                                    <div class="mb-3" name="divApellido">
                                        <label for="apellidoEditar" class="col-form-label">Apellido:</label>
                                        <input type="text" class="form-control" id="apellidoEditar" name="apellido" placeholder="" value={apellido}
                                        
                                        onChange={(e) => setApellido(e.target.value)}

                                        />
                                    </div>
                                    <div class="mb-3" name="divCedula">
                                        <label for="cedulaEditar" class="col-form-label">Cedula:*</label>
                                        <input type="text" class="form-control" id="cedulaEditar" name="cedula" placeholder="" value={cedula}
                                        
                                        onChange={(e) => setCedula(e.target.value)}
                                        
                                        />
                                    </div>
                                    <div class="mb-3" name="divTelefono">
                                        <label for="telefonoEditar" class="col-form-label">Teléfono:</label>
                                        <input type="text" class="form-control" id='telefonoEditar' name="telefono" placeholder="" value={telefono}
                                        
                                        onChange={(e) => setTelefono(e.target.value)}
                                        
                                        />
                                    </div>
                                    <div class="mb-3" name="divEmail">
                                        <label for="emailEditar" class="col-form-label">Email:</label>
                                        <input type="text" class="form-control" id='emailEditar' name="email" placeholder="" value={email}
                                        
                                        onChange={(e) => setEmail(e.target.value)}
                                        
                                        />
                                    </div>
                                    <div class="mb-3" name="divDireccion">
                                        <label for="direccionEditar" class="col-form-label">Dirección:</label>
                                        <input type="text" class="form-control" id='direccionEditar' name="direccion" placeholder="" value={direccion}
                                        
                                        onChange={(e) => setDireccion(e.target.value)}
                                        
                                        />
                                    </div>


                                    <div class="modal-footer">
                                    <CancelarModal />

                                    <GuardarModal onClick={handleFormClick}   />


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

