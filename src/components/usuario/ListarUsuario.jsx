import '../../css-general/cssgeneral.css'
import '../../css-general/tailwind.min.css'
import '../../css-general/inicio_style.css'
import '../../css-general/table.min.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from '../../pages/Clientes.module.css';
import BotonCambioEstado from '../chared/BotonCambioEstado';
import EditarUsuario from './EditarUsuario';
import Buscador from '../chared/Buscador';
import Paginador from '../chared/Paginador'
import BotonNegro from '../chared/BotonNegro';
import Swal from 'sweetalert2';
import Header from "../chared/header/Header";


const ListarUsuario = () => {

    //Estado de la barra de busqueda
    const [usuariosFiltrar, setUsuariosFiltrar] = useState([]);


    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
      // Realiza una solicitud al backend para obtener la lista de usuarios
      axios.get('http://localhost:3000/api/usuarios')
        .then(response => {
          // Actualiza el estado con la lista de usuarios
          setUsuarios(response.data);

          setUsuariosFiltrar(response.data.slice(0, 10));
        })
        .catch(error => {
          console.error('Error al obtener la lista de usuarios:', error);
        });
    }, []);

        //Esatdo para editar
        const [editarUsuario, setEditarUsuario] = useState("");

        //Al hacer click  en editar trae el cliente y lo guarda en setCliente
        const handleEditClick = (usuario) => {
    
            if (!usuario.estado) {
                return Swal.fire(
                    'Acción inválida!',
                    'Este usuario no se puede editar porque está inhabilitado',
                    'error'
                );
            }
            setEditarUsuario(usuario);
        };


    return (
        <div>
            <div className='contenedor'>

            <Header titulo='Gestión de Usuarios' />

                {/* botón agregar */}
                <div className="container-fluid seccion2" style={{ width: 0 }} >

                    <div className={styles.ap}>
                        <button type="button" className="btn-a" data-bs-toggle="modal" data-bs-target="#myModal">Agregar Usuario</button>
                    </div>

                      {/* Boton para Buscar/filtrar */}
                      <div className={styles.buscador}>
                        {/* Esta función requiere el set de los datos a filtrar, los datos de respaldo, y los campos por los cuales se permite filtrar*/}
                        <Buscador
                            setDatosFiltrar={setUsuariosFiltrar}
                            datos={usuarios}
                            camposFiltrar={[
                                'nombre',
                                'apellido',
                                'telefono',
                                'email',
                            ]}
                        />
                    </div>
                </div>

                {/* tabla  para listar usuarios */}
                    <div className="tabla">
                        <table className="table caption-top ">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Apellido</th>
                                    <th scope="col">Teléfono</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Rol</th>
                                    <th scope="col">Estado</th>
                                    <th scope="col">Editar</th>

                                </tr>
                            </thead>
                            <tbody>
                            {usuariosFiltrar.map((usuario) => (
                                <tr key={usuario.id_usuario}>
                                <td>{usuario.id_usuario}</td>
                                <td>{usuario.nombre}</td>
                                <td>{usuario.apellido}</td>
                                <td>{usuario.telefono}</td>
                                <td>{usuario.email}</td>
                                {/* <td>{usuario.fk_rol}</td> */}
                                {/* <td>{usuario.rol.nombre}</td> */}
                                <td>{usuario.rol ? usuario.rol.nombre : 'N/A'}</td>
                                <td>
                                    <BotonCambioEstado 
                                    id={usuario.id_usuario}
                                    isChecked={usuario.estado}
                                    nombreRegistro={'usuario'}
                                    ruta={`/usuarios/estado/${usuario.id_usuario}`} />
                                </td>
                                <td>
                                        <BotonNegro
                                            text='Editar'
                                            modalToOpen={
                                                usuario.estado
                                                    ? '#modalEditar'
                                                    : ''
                                            }
                                            onClick={() =>
                                                handleEditClick(usuario)
                                            }
                                        />
                                    </td>
                            </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                <EditarUsuario editarUsuario={editarUsuario} />
                </div>

                <div className='seccion4'>
                {/* Esta función requiere el set de los datos a filtrar, los datos de respaldo, y los campos por los cuales se permite filtrar*/}
                <Paginador
                    setDatosFiltrar={setUsuariosFiltrar}
                    datos={usuarios}
                />
            </div>

            </div>

    )
}

export default ListarUsuario
