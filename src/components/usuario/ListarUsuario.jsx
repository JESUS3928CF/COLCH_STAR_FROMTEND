import '../../css-general/cssgeneral.css'
import '../../css-general/tailwind.min.css'
import '../../css-general/inicio_style.css'
import '../../css-general/table.min.css'
import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from '../../pages/Clientes.module.css';
import BotonCambioEstado from '../chared/BotonCambioEstado';

const ListarUsuario = () => {

    //Estado de la barra de busqueda
    const [Buscar, setBuscar] = useState("");


    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
      // Realiza una solicitud al backend para obtener la lista de usuarios
      axios.get('http://localhost:3000/api/usuarios')
        .then(response => {
          // Actualiza el estado con la lista de usuarios
          setUsuarios(response.data);
        })
        .catch(error => {
          console.error('Error al obtener la lista de usuarios:', error);
        });
    }, []);
    const contentStyle = {
        marginLeft: '260px', // Ancho del Navbar
    };

    return (
        <div>
            <div style={contentStyle} className='contenedor'>

                <h1 className="titulo">Usuarios</h1>

                {/* botón agregar */}
                <div className="container-fluid seccion2" style={{ width: 0 }} >

                    <div className={styles.ap}>
                        <button type="button" className="btn-a" data-bs-toggle="modal" data-bs-target="#myModal">Agregar Usuario</button>
                    </div>

                    <div className={styles.buscador}>
                        <form className='d-flex'>
                            <input
                                id='barra-buscar'
                                className='form-control me-2'
                                type='search'
                                placeholder='Buscar...'
                                aria-label='Search'
                                onChange={(e) => setBuscar(e.target.value)}
                            />
                        </form>

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
                              {/* //filtra los datos que hay en clientes, y hace la busqueda por cualquier campo */}
                              {usuarios.filter((campo => {
                                //aca dice que el termino de buesqueda es lo que se le ingrece al input es decir a Buscar
                                const terminoBusqueda = Buscar.toLowerCase();
                                return (
                                    // aca se le dice a nombre que si encuntra lo que tiene terminoBusqueda que es 
                                    // que se le ingresa al input
                                    campo.nombre.toLowerCase().includes(terminoBusqueda) ||
                                    campo.apellido.toLowerCase().includes(terminoBusqueda) ||
                                    campo.telefono.toLowerCase().includes(terminoBusqueda) ||
                                    campo.email.toLowerCase().includes(terminoBusqueda)
                                );
                                {/* con los datos traidos por set cliente se hace un mapeo */ }
                            })).map(usuario => (
                                <tr key={usuario.id}>
                                <td>{usuario.id_usuario}</td>
                                <td>{usuario.nombre}</td>
                                <td>{usuario.apellido}</td>
                                <td>{usuario.telefono}</td>
                                <td>{usuario.email}</td>
                                <td>{usuario.fk_rol}</td>
                                <td>
                                            <BotonCambioEstado 
                                            isChecked={usuario.estado}
                                            nombreRegistro={'usuario'}
                                            ruta={`/usuarios/estado/${usuario.id_usuario}`} />
                                        </td>
                                <td>
                                <button type="button" className="btn-n" data-bs-toggle="modal" data-bs-target="#modalEditar"
                                >
                                    Editar
                                </button>
                                </td>
                            </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                </div>





            </div>

    )
}

export default ListarUsuario
