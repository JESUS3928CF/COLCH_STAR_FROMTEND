import React from 'react'
import '../../css-general/cssgeneral.css'
import '../../css-general/tailwind.min.css'
import '../../css-general/inicio_style.css'
import '../../css-general/table.min.css'
import styles from '../../pages/proveedores.module.css';
import { useState, useEffect } from 'react';
import CancelarModal from '../chared/CancelarModal';
import GuardarModal from '../chared/GuardarModal';

// { handleEditClick, editingProveedor }
const EditarProveedor = ({ editarProveedor }) => {

    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');

    //toma  el nombre telefono y direccion de editarproveedor que es traido del listar y por medio de setNombre lo mandamos a nombre
    //igual con los demas
    useEffect(() => {
        if (editarProveedor) {
            setNombre(editarProveedor.nombre);
            setTelefono(editarProveedor.telefono);
            setDireccion(editarProveedor.direccion);
        }
    }, [editarProveedor]);

    

    

    const handleFormClick = (e) => {
        e.preventDefault();
        console.log(nombre )

        // Aquí debes realizar una solicitud HTTP para enviar los datos editados al servidor.
        // Utiliza axios u otra librería para hacer la solicitud PUT o POST según corresponda.
        // Después de la actualización, puedes cerrar el modal de edición.

        axios.patch(`http://localhost:3000/api/proveedores/${id_proveedor}`, {
            nombre,
            telefono,
            direccion
        })
        .then(response => {
            // Manejar la respuesta, por ejemplo, cerrar el modal
            console.log('Proveedor actualizado:', response.data);
            location.reload();
        })
        .catch(error => {
            console.error('Error al actualizar el proveedor', error);
        });

    };



    return (
        <div>

            {/* modal de editar proveedor */}
            <div class="modal" id="modalEditar">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="editar edi">
                            <h5 class="modal-title">Editar datos del proveedor</h5>
                            <button type="button" id="xEditar" class="btn-close" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            {/* onSubmit={handleFormSubmit} */}
                            <form action="" id="formularioEditarProveedor"  >

                                <div class="mb-3" name="divIdentificacion">
                                    <label for="identificacionEditar" class="col-form-label">Identificacion:</label>
                                    <br />
                                    <div className={styles.identi}>
                                        <select style={{ width: 80, height: 40 }} id="tipoIdentificacion" >
                                            <option value="cedula">CC</option>
                                            <option value="nit">NIT</option>
                                        </select>
                                        <input type="text" class="form-control"
                                            id={styles.identificacionEditar}
                                            name="identificacionEditar"
                                            placeholder="Ingresar su identificacion"
                                        />
                                    </div>
                                </div>
                                <div class="mb-3" name="divNombre">
                                    <label for="nombreEditar" class="col-form-label">Nombre:</label>
                                    <input type="text" class="form-control" id="nombreEditar"
                                        name="nombre"
                                        placeholder="Ingresar nombre"
                                        value={nombre}
                                        
                                    onChange={(e) => setNombre(e.target.value)}
                                    />
                                </div>
                                <div class="mb-3" name="divTelefono">
                                    <label for="telefonoEditar" class="col-form-label">Teléfono:</label>
                                    <input type="text" class="form-control" id="telefonoEditar"
                                        name="telefono"
                                        placeholder="Ingresar teléfono"
                                        value={telefono}
                                        
                                      onChange={(e) => setTelefono(e.target.value)}
                                    />
                                </div>
                                <div class="mb-3" name="divDireccion">
                                    <label for="direccionEditar" class="col-form-label">Dirección:</label>
                                    <input type="text" class="form-control" id="direccionEditar"
                                        name="direccion"
                                        placeholder="Ingresar dirección"
                                        value={direccion}
                                       
                                     onChange={(e) => setDireccion(e.target.value)}
                                    />
                                </div>

                                <div class="modal-footer">

                                    {/* <button type="button" id="editarCancelado" class="btn-c"data-bs-dismiss="modal" >Cancelar</button> */}

                                    <CancelarModal />

                                    {/* Botón para guardar*/}

                                    {/* <input type="submit" id="GuardarEditarProveedor" class="btn btn-success" value="Guardar" /> */}
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

export default EditarProveedor
