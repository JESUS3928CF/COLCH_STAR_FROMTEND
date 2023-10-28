import '../../css-general/cssgeneral.css'
import '../../css-general/tailwind.min.css'
import '../../css-general/inicio_style.css'
import '../../css-general/table.min.css'
import styles from '../../pages/proveedores.module.css';
import BotonCambioEstado from '../chared/BotonCambioEstado';
import EditarProveedor from './EditarProveedor';
import axios from 'axios';
import { useEffect, useState } from 'react';


//componente
const ListarProveedores = () => {

    //estado de la baara buscador
    const [Buscar, setBuscar] = useState("");

    // conexión para traer todos los datos de la base de datos, con proveedor es que s eva acer el mapeo en la tabla listar
    const [proveedores, setProveedor] = useState([]);

    // solicitud  a la url
    useEffect(() => {
        axios.get('http://localhost:3000/api/proveedores')
            .then(response => {
                // traeos los datos y se los mnadamos a proveedor, es decir set proveedor actualiza el estado de proveedor
                setProveedor(response.data);
            })
            .catch(error => {
                console.error('Error al obtener la lista de proveedores', error);
            })
    }, []);

    //esatdo para edit
    const [editarProveedor, setEditarProveedor] = useState("");

    //al hacer click  en editar trae el proveedor y lo guarda en setProveedor
    const handleEditClick = (proveedor) => {
            setEditarProveedor(proveedor);

    };



    const contentStyle = {
        marginLeft: '260px', // Ancho del Navbar
    };

    return (
        <div>
            <div style={contentStyle} className='contenedor'>

                {/* titulo */}
                <h1 className="titulo">Proveedores</h1>


                {/* botón agregar */}
                <div className="container-fluid seccion2" style={{ width: 0 }}>

                    <div className={styles.ap}>
                        <button type="button" className="btn-a" data-bs-toggle="modal" data-bs-target="#myModal">Agregar
                            proveedor</button>
                    </div>

                    {/* botón de buscar */}
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
                            {/* <button id="btn-buscar" className="btn btn-outline-success" type="submit">Buscar</button> */}


                        </form>

                    </div>
                </div>

                {/* tabla  para listar el proveedor */}
                <div className="tabla">
                    <table className="table caption-top ">

                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Teléfono</th>
                                <th scope="col">Dirección</th>
                                <th scope="col">Identificación</th>
                                <th scope="col">Inhabilitar</th>
                                <th scope="col">Editar</th>
                            </tr>
                        </thead>
                        <tbody>

                            {/* //filtra los datos que hay en proveedores, y hace la busqueda por cualquier campo */}
                            {proveedores.filter((campo => {
                                //aca dice que el termino de buesqueda es lo que se le increce al input es decir Buscar
                                const terminoBusqueda = Buscar.toLowerCase();
                                return (
                                    // aca se le dice a nombre que si encuntra lo que tiene terminoBusqueda que es 
                                    // que se le incresa al input
                                    campo.nombre.toLowerCase().includes(terminoBusqueda) ||
                                    campo.telefono.toLowerCase().includes(terminoBusqueda) ||
                                    campo.direccion.toLowerCase().includes(terminoBusqueda) ||
                                    campo.identificador.toLowerCase().includes(terminoBusqueda)
                                );
                                {/* con los datos traidos por set proveedor se hace un mapeo */ }
                            })).map(proveedor => (
                                <tr key={proveedor.id_proveedor}>
                                    <td>{proveedor.id_proveedor}</td>
                                    <td>{proveedor.nombre}</td>
                                    <td>{proveedor.telefono}</td>
                                    <td>{proveedor.direccion}</td>
                                    <td>{proveedor.identificador}</td>
                                    <td> <BotonCambioEstado  isChecked={proveedor.estado}
                                        nombreRegistro={'proveedor'}
                                        ruta={`/proveedores/estado/${proveedor.id_proveedor}`} />
                                    </td>
                                    <td><button type="button" className="btn-n"
                                        data-bs-toggle="modal"
                                        data-bs-target="#modalEditar"
                                        onClick={() => handleEditClick(proveedor)} >Editar</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <EditarProveedor editarProveedor={editarProveedor} />
            </div>
        </div>

    )
}

export default ListarProveedores
