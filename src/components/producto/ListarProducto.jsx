import '../../css-general/cssgeneral.css'
import '../../css-general/tailwind.min.css'
import '../../css-general/inicio_style.css'
import '../../css-general/table.min.css'
import style from '../../pages/Productos.module.css';
import BotonCambioEstado from '../chared/BotonCambioEstado';
import Buscador from '../chared/Buscador';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Paginador from '../chared/Paginador'
import BotonNegro from '../chared/BotonNegro';
import Swal from 'sweetalert2';
import EditarProducto from './EditarProducto';
import Header from '../chared/header/Header'
import DetallesProducto from './DetallesProducto';
import { calcularAnchoDePantalla } from "../../helpers/calcularAnchoDePantalla";
import { resolucionCards } from "../../constantes/constantes.js";
import styles from "../../css-general/CardStyleGenerar.module.css";


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

  const [anchoPantalla, setAnchoPantalla] = useState(window.innerWidth);

  useEffect(() => {
    /// Calcular el ancho de pantalla actual
    calcularAnchoDePantalla(setAnchoPantalla);
  }, []);

  return (
    <div>
      <div className='contenedor'>

        {/* titulo */}
        <Header titulo='Gestiónar Productos' />


        {/* boton de agregar */}
        <div className="container-fluid " >

          <div className="row">

            <div className={`${style.ap} col-md-6 col-ms-6 pb-md-0 pb-4 d-flex justify-content-center align-items-center`}>
              <button type="button" className="btn-a" data-bs-toggle="modal" data-bs-target="#myModal">Agregar
                producto</button>
            </div>


            {/* Boton para Buscar/filtrar */}
            <div className={`${style.buscador} col-md-6 col-ms-6 pb-md-0 pb-4 d-flex justify-content-center align-items-center`}>
              <Buscador
                setDatosFiltrar={setProductosFiltrar} //se le manda por medio de setProveedoresFiltrar el resultado
                datos={productos} //se le dice que datos son los que se van a filtrar y son por los que trae de la base de datos
                camposFiltrar={['nombre', 'cantidad', 'precio']} //se le manda los campos por donde se puede filtrar
              />

            </div>
          </div>


        </div>

        {/* tabla  para listar el producto */}
        {anchoPantalla >= resolucionCards ? (
          <div className="tabla">
            <table className="table caption-top ">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Producto</th>
                  <th scope="col">Cantidad</th>
                  <th scope="col">Precio</th>
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
                        nombreRegistro={'productos'}
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
        ) : (
          <div className={`row pt-4 justify-content-center`}>
            {ProductosFiltrar.map((producto) => (
              <div
                className={`col-md-4 col-sm-6 col-xs-12`}
                key={producto.id_producto}
              >
                <div
                  className={`card mb-4 ${styles.contenedor_card}`}
                >
                  <div className='card-body'>
                    <p className={styles.text}>
                      Id:{' '}
                      <span>
                        {producto.id_producto}
                      </span>
                    </p>
                    <p className={styles.text}>
                      Nombre:{' '}
                      <span>{producto.nombre}</span>
                    </p>
                    <p className={styles.text}>
                      cantidad:{' '}
                      <span>{producto.cantidad}</span>
                    </p>
                    <p className={styles.text}>
                      Precio:{' '}
                      <span>
                        {producto.precio}
                      </span>
                    </p>

                    <div className='row pt-3'>
                      <div className='col justify-content-center align-items-center '>
                        <div className='text-center'>
                          <strong
                            className={`${styles.textoEstado}`}
                          >
                            {' '}
                            Estado{' '}
                          </strong>
                        </div>
                        <div className='text-center'>
                          <BotonCambioEstado
                            id={producto.id_producto}
                            isChecked={producto.estado}
                            nombreRegistro={'producto'}
                            ruta={`/productos/estado/${producto.id_producto}`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='card-footer'>
                    <div className='row'>
                      <div
                        className={`col-6 d-flex justify-content-center align-items-center ${styles.button}`}
                      >
                        <BotonNegro
                          text='Detalles'
                          modalToOpen='#modalDetalles'
                          onClick={() =>
                            informacionModal(
                              producto
                            )
                          }
                        />
                      </div>
                      <div
                        className={`col-6 d-flex justify-content-center align-items-center ${styles.button}`}
                      >
                        <BotonNegro
                          text='Editar'
                          modalToOpen={
                            producto.estado
                              ? '#modalEditar'
                              : ''
                          }
                          onClick={() =>
                            handleEditClick(
                              producto
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <EditarProducto editarProducto={editarProducto} />
        <DetallesProducto editarProducto={editarProducto} />

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