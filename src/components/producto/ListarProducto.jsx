import '../../css-general/cssgeneral.css'
import '../../css-general/tailwind.min.css'
import '../../css-general/inicio_style.css'
import '../../css-general/table.min.css'
import styles from '../../pages/Productos.module.css';
import BotonCambioEstado from '../chared/BotonCambioEstado';
import Buscador from '../chared/Buscador';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Paginador from '../chared/Paginador'
import BotonNegro from '../chared/BotonNegro';
import Swal from 'sweetalert2';
import EditarProducto from './EditarProducto';
import Header from '../chared/header/Header'

const ListarProducto = () => {

  //estado de la barra buscador
  const [ProductosFiltrar, setProductosFiltrar] = useState([]);

  // conexión para traer todos los datos de la base de datos, con proveedor es que s eva acer el mapeo en la tabla listar
  const [productos, setProducto] = useState([]);


  // solicitud  a la url
  useEffect(() => {
    axios.get('http://localhost:3000/api/productos')
      .then(response => {
        // traeos los datos y se los mnadamos a proveedor, es decir set proveedor actualiza el estado de proveedor
        setProducto(response.data);
      })
      .catch(error => {
        console.error('Error al obtener la lista de productos', error);
      })
  }, []);

  //estado para editar
  const [editarProducto, setEditarProducto] = useState("");


  //si al darle click en editar el proveedor etsa inhabilitado no lo va dejar entrar a editar
  const handleEditClick = (producto) => {

    if (!producto.estado) {
      return Swal.fire(
        'Acción inválida!',
        'Este Producto no se puede editar porque está inhabilitado',
        'error'
      );
    }
    setEditarProducto(producto);
  };

  const informacionModal = (producto) => {
    setEditarProducto(producto);
  };



  return (
    <div>
      <div className='contenedor'>

        {/* titulo */}
        <Header titulo='Gestiónar Productos' />

        {/* boton de agregar */}
        <div className="container-fluid seccion2" style={{ width: 0 }}>

          <div className={styles.ap}>
            <button type="button" className="btn-a" data-bs-toggle="modal" data-bs-target="#myModal">Agregar
              producto</button>
          </div>
          {/* <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#myModal" style={{ marginLeft: 20 }} >Agregar
            producto</button> */}


          {/* Boton para Buscar/filtrar */}
          <div className={styles.buscador}>
            <Buscador
              setDatosFiltrar={setProductosFiltrar} //se le manda por medio de setProveedoresFiltrar el resultado
              datos={productos} //se le dice que datos son los que se van a filtrar y son por los que trae de la base de datos
              camposFiltrar={['nombre', 'cantidad', 'precio']} //se le manda los campos por donde se puede filtrar
            />

          </div>


        </div>

        {/* tabla  para listar el producto */}

        <div className="tabla">
          <table className="table caption-top ">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Producto</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Precio</th>
                <th scope="col">Id_prenda</th>
                <th scope="col">Publicado</th>
                <th scope="col">Inhabilitar</th>
                <th scope="col">Ver Imagen</th>
                <th scope="col">Editar</th>
              </tr>
            </thead>
            <tbody>
              {/* // ProveedoresFiltrar hace el mapeo las busqueda de los datos y arroja el resultado  */}
              {ProductosFiltrar.map((producto) => (
                <tr key={producto.id_producto}>
                  <td>{producto.id_producto}</td>
                  <td>{producto.nombre}</td>
                  <td>{producto.cantidad}</td>
                  <td>{producto.precio}</td>
                  <td>{producto.fk_prenda}</td>
                  <td>
                    <BotonCambioEstado
                      id={producto.id_producto}
                      isChecked={producto.publicado}
                      nombreRegistro={'producto'}
                      ruta={`/productos/publicado/${producto.id_producto}`}
                      cambiarPublicacion={
                        {
                          estado: producto.estado,
                          paraPublicacion: true,
                        }
                      }
                    />
                  </td>
                  <td>
                    <BotonCambioEstado
                      id={producto.id_producto}
                      isChecked={producto.estado}
                      nombreRegistro={'producto'}
                      ruta={`/productos/estado/${producto.id_producto}`}
                    />
                  </td>
                  <td>
                    <BotonNegro
                      text='Ver'
                      modalToOpen='#modalDetalles'
                      onClick={() => informacionModal(producto)}
                    />
                  </td>

                  <td>
                    <BotonNegro
                      text='Editar'
                      modalToOpen={
                        producto.estado
                          ? '#modalEditar'
                          : ''
                      }
                      onClick={() =>
                        handleEditClick(producto)
                      }
                    />

                  </td>

                </tr>
              ))}

            </tbody>
          </table>
        </div>
        <EditarProducto editarProducto={editarProducto} />

      </div>
      <div className='seccion4'>
        {/* Esta función requiere el set de los datos a filtrar, los datos de respaldo, y los campos por los cuales se permite filtrar*/}
        <Paginador
          setDatosFiltrar={setProductosFiltrar}
          datos={productos}
        />
      </div>

    </div>
  )
}

export default ListarProducto
