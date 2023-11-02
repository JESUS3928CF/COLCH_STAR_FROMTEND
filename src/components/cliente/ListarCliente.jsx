// ------------------HERLYN NORBEY DAVID POSO
//-------------------26 de septiembre 2023
// Nos permitira Listar uno o todos los clientes de la base de datos y que agreguemos por medio del agregar cliente,
// existira una barra buscar que nos permite buscar cualquier informacion mediante un filtro, la busqueda se realiza por cualquier campo que este en esta tabla
import '../../css-general/cssgeneral.css'
import '../../css-general/tailwind.min.css'
import '../../css-general/inicio_style.css'
import '../../css-general/table.min.css'
import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from '../../pages/Clientes.module.css';
import BotonCambioEstado from '../chared/BotonCambioEstado';
import EditarCliente from './EditarCliente';
import Buscador from '../chared/Buscador';
import Paginador from '../chared/Paginador'
import BotonNegro from '../chared/BotonNegro';
import Swal from 'sweetalert2';
import { DetallesClientes } from './DetallesClientes'


//Componente
const ListarCliente = () => {

    //Estado de la barra de busqueda
    const [clientesFiltrar, setClientesFiltrar] = useState([]);

    const [detallesClientes, setDetallesClientes] = useState({});


    
    // Conexión para traer todos los datos de la base de datos, con cliente que es que se va hacer el mapeo en la tabla listar
    const [clientes, setClientes] = useState([]);

    const informacionDetalleClientes = (cliente) => {
        if (!cliente.estado) {
          return Swal.fire("Accion invalida!", "", "error");
        }
        setDetallesClientes(cliente);
      };

    // Solicitud a la url
    useEffect(() => {
        // Realiza una solicitud al backend para obtener la lista de usuarios
        axios.get('http://localhost:3000/api/clientes')
            .then(response => {
                // Actualiza el estado con la lista de usuarios
                setClientes(response.data);

                setClientesFiltrar(response.data.slice(0, 10));
            })
            .catch(error => {
                console.error('Error al obtener la lista de clientes:', error);
            });
    }, []);

    //Esatdo para editar
    const [editarCliente, setEditarCliente] = useState("");

    //Al hacer click  en editar trae el cliente y lo guarda en setCliente
    const handleEditClick = (cliente) => {

        if (!cliente.estado) {
            return Swal.fire(
                'Acción inválida!',
                'Este cliente no se puede editar porque está inhabilitado',
                'error'
            );
        }
        setEditarCliente(cliente);
    };

    const contentStyle = {
        marginLeft: '260px', // Ancho del Navbar
    };
    
    return (
        <div>
            <div style={contentStyle} className='contenedor'>
                <h1 className='titulo'>Gestionar Clientes</h1>

                {/* botón agregar */}
                <div className='container-fluid seccion2' style={{ width: 0 }}>
                    <div className={styles.ap}>
                        <button
                            type='button'
                            className='btn-a'
                            data-bs-toggle='modal'
                            data-bs-target='#myModal'
                        >
                            Agregar Cliente
                        </button>
                    </div>

                    {/* Boton para Buscar/filtrar */}
                    <div className={styles.buscador}>
                        {/* Esta función requiere el set de los datos a filtrar, los datos de respaldo, y los campos por los cuales se permite filtrar*/}
                        <Buscador
                            setDatosFiltrar={setClientesFiltrar}
                            datos={clientes}
                            camposFiltrar={[
                                'nombre',
                                'apellido',
                                'identificacion',
                                'telefono',
                                'email',
                                'direccion',
                            ]}
                        />
                    </div>
                </div>

                {/* tabla  para listar clientes */}
                <div className='tabla'>
                    <table className='table caption-top '>
                        <thead>
                            <tr>
                                <th scope='col'>ID</th>
                                <th scope='col'>Nombre</th>
                                <th scope='col'>Identificación</th>
                                <th scope='col'>Teléfono</th>
                                <th scope='col' className='text-center'>Email</th>
                                <th scope='col'>Estado</th>
                                <th scope='col'>Detalles</th>
                                <th scope='col'>Editar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientesFiltrar.map((cliente) => (
                                <tr key={cliente.id_cliente}>
                                    <td>{cliente.id_cliente}</td>
                                    <td>{cliente.nombre}</td>
                                    <td>{cliente.tipoIdentificacion} {cliente.identificacion}</td>
                                    <td>{cliente.telefono}</td>
                                    <td>{cliente.email}</td>
                                    <td>
                                        <BotonCambioEstado
                                            id={cliente.id_cliente}
                                            isChecked={cliente.estado}
                                            nombreRegistro={'cliente'}
                                            ruta={`/clientes/estado/${cliente.id_cliente}`}
                                        />
                                    </td>
                                    <td>
                      <BotonNegro
                        text="Ver"
                        modalToOpen="#modalDetalleCliente"
                        onClick={() => setDetallesClientes(cliente)}
                      />
                    </td>
                                    <td>
                                        <BotonNegro
                                            text='Editar'
                                            modalToOpen={
                                                cliente.estado
                                                    ? '#modalEditar'
                                                    : ''
                                            }
                                            onClick={() =>
                                                handleEditClick(cliente)
                                            }
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <DetallesClientes detallesClientes={detallesClientes} />
                <EditarCliente editarCliente={editarCliente} />
            </div>

            <div className='seccion4'>
                {/* Esta función requiere el set de los datos a filtrar, los datos de respaldo, y los campos por los cuales se permite filtrar*/}
                <Paginador
                    setDatosFiltrar={setClientesFiltrar}
                    datos={clientes}
                />
            </div>
        </div>
    );
}

export default ListarCliente
