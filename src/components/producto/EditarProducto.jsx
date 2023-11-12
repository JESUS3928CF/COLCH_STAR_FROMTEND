import '../../css-general/cssgeneral.css'
import '../../css-general/tailwind.min.css'
import '../../css-general/inicio_style.css'
import '../../css-general/table.min.css'
import style from '../../pages/Productos.module.css'
import axios from 'axios'
import Swal from 'sweetalert2';
import CancelarModal from '../chared/CancelarModal';
import GuardarModal from '../chared/GuardarModal';
import AlertaError from '../chared/AlertaError'
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react';
import { validarEspaciosVacios, validarImagen, validarBooleanos } from '../../Validations/validations'
import HeaderModals from '../chared/HeaderModals'




const EditarProducto = ({ editarProducto }) => {

  const {
    register, //regitra o identifica cada elemento o cada input
    handleSubmit, //para manejar el envio del formulario
    formState: { errors }, //ver errores que tiene el formulario
    setValue,
    reset, //resetea el formulario
  } = useForm();


  //estado pa las prendas 
  const [Prendas, setPrendas] = useState([]);
  // traemos la informacion de las prendas y las guardamos en setPrendas y eso las manda a PrendAS
  useEffect(() => {
    // Realizar una solicitud para obtener la lista de roles desde el servidor
    axios.get("http://localhost:3000/api/prendas").then((response) => {
      setPrendas(response.data); // Almacenar la lista de roles en el estado
    });
  }, []);



  //por medio de editarproveedor se traen lo que hay en el listar, y por medio del estado setvalue
  //  le pasan todo a nombre telefono etc, y con eso se les pasa por medio del value=¨nombre telefono etc al input  
  useEffect(() => {
    if (editarProducto) {
      setValue('nombre', editarProducto.nombre);
      setValue('cantidad', editarProducto.cantidad);
      setValue('precio', editarProducto.precio);
      setValue('publicado', editarProducto.publicado);
      setValue("fk_prenda", editarProducto.fk_prenda);

    }
  }, [editarProducto]);

  //funcion que se ejecuta cuando alguien intenta enviar el formulario
  const onSubmit = (data) => {

    //se guardan los datos  a cambiar al data
    const { nombre, cantidad, precio, fk_prenda, publicado, imagen } = data


    if (editarProducto.id_producto) {
      // ruta 
      axios.patch(`http://localhost:3000/api/productos/${editarProducto.id_producto}`, {
        // Campos en los que realiza el cambio
        nombre: nombre.trim(),
        cantidad: cantidad,
        precio: precio,
        fk_prenda: fk_prenda,
        publicado: publicado,
        imagen: imagen[0]
      }, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(response => {
          console.log('Producto actualizado:', response.data);
          //alerta de proveedor actualizado
          Swal.fire({
            title: 'Producto actualizado',
            text: response.data.message,
            icon: 'success',
          }).then(() => {
            location.reload();
          });
        })
        .catch(error => {
          console.error('Error al actualizar el Producto', error);

          Swal.fire({
            title: 'Error',
            text: 'Hubo un error',
            icon: 'error',
          }).then(() => {
            location.reload();
          });

        });
    } else {
      console.error('No se pudo obtener el ID del Producto');
    }
  };




  return (
    <div>
      {/* modal agregar producto */}
      <div className='modal' id='modalEditar' >
        <div className="modal-dialog modal-dialog-centered modal-lg ">
          <div className="modal-content">

            <HeaderModals title={'Editar Producto'} />

            <div className="modal-body">

              <form className="row g-3 needs-validation" onSubmit={handleSubmit(onSubmit)}>

                <div className="col-md-6">

                  <label htmlFor="productoGuardar"
                    className="col-form-label">Producto:</label>
                  <input type="text" className="form-control"
                    id="productoGuardar"
                    name="nombre"
                    placeholder=". . . "
                    {...register('nombre', {
                      required: {
                        value: true,
                        message: 'El nombre es obligatorio',
                      },
                      validate: (value) => {
                        return validarEspaciosVacios(value);
                      }
                    })}
                  />
                  {/* en esta etiqueta va salir el error de validación  */}
                  {errors.nombre && (
                    <AlertaError
                      message={errors.nombre.message}
                    />
                  )}

                </div>

                <div className="col-md-6 ms-auto">

                  <label htmlFor="cantidadGuardar"
                    className="col-form-label">Cantidad:</label>
                  <input type="text" className="form-control"
                    name="cantidad" id="cantidadGuardar"
                    placeholder=". . ."
                    {...register('cantidad', {
                      required: {
                        value: true,
                        message: 'El cantidad es obligatorio',
                      },
                      pattern: {
                        value: /^\d+$/,
                        message: "No puede contener Letras ni espacios en blanco"
                    },
                      validate: (value) => {
                        return validarEspaciosVacios(value);
                      }
                    })}
                  />
                  {/* en esta etiqueta va salir el error de validación  */}
                  {errors.cantidad && (
                    <AlertaError
                      message={errors.cantidad.message}
                    />
                  )}

                </div>

                <div className="col-md-6 mt-2" name="precio">

                  <label htmlFor="precioGuardar"
                    className="col-form-label">Precio: </label>
                  <input type="text" className="form-control"
                    name="precio"
                    id="precioGuardar"
                    placeholder=". . ."
                    {...register('precio', {
                      required: {
                        value: true,
                        message: 'El precio es obligatorio',
                      },
                      pattern: {
                        value: /^\d+(\.\d+)?$/,
                        message: "No puede contener Letras ni espacios en blanco"
                    },
                      validate: (value) => {
                        return validarEspaciosVacios(value);
                      }
                    })}

                  />
                  {errors.precio && (
                    <AlertaError
                      message={errors.precio.message}
                    />
                  )}

                </div>
                <div className="col-md-6 mt-2" >
                  <label htmlFor="rol" className="col-form-label">
                    Prenda: *
                  </label>
                  <select
                    name="fk_prenda"
                    className="form-control"
                    {...register("fk_prenda", {
                      required: {
                        value: true,
                        message: "Debe seleccionar una prenda",
                      },
                    })}
                  >
                    <option value="">Seleccionar prenda</option>
                    {/* SE REALIZA un mapeo con la informacio traida de prendas y seleccionamos que queremos de ella */}
                    {/* esto se guarda en name = fk_prenda */}
                    {Prendas.map((prenda) => {
                      return (
                        <option key={prenda.id_prenda} value={prenda.id_prenda}>
                          {prenda.nombre}
                        </option>
                      );


                    })}
                  </select>

                  {errors.fk_prenda && (
                    <AlertaError message={errors.fk_prenda.message} />
                  )}
                </div>



                <div className="col-md-6" name="Publicado">
                  <label htmlFor="Publicar" className="col-form-control">
                    ¿Deseas publicarlo?
                  </label>

                  <select
                    name="publicado"
                    className={`form-control ${style.customerr}`}
                    title="Seleccione una opcion"
                    {...register('publicado', {
                      required: {
                        value: true,
                        message:
                          'El estado de publicación es obligatorio',

                      },
                    }, {
                      validate: (value) => validarBooleanos(value)
                    }

                    )}
                  >

                    <option value="" >
                      Selecciona una opción
                    </option>
                    <option value="true">Si</option>
                    <option value="false">No</option>
                  </select>
                  {/* en esta etiqueta va salir el error de validación  */}
                  {errors.publicado && (
                    <AlertaError
                      message={errors.publicado.message}
                    />
                  )}
                </div>

                <div className="mb-2" name="Archivo">

                  <div className='mb-3'>
                    <p style={{ textAlign: 'center', fontWeight: 500 }}>Imagen del producto: </p>
                  </div>

                  <label htmlFor="Archivo" className="col-from-label">
                    Imagen de la prenda:
                  </label>
                  <input
                    type="file"
                    className={`form-control ${style.customer}`}
                    name="imagen"
                    title="Ingrese la imagen de la prenda"
                    {...register('imagen', {
                      validate: (value) => {
                        return validarImagen(value[0]);
                      }
                    })}

                  />
                  {/* en esta etiqueta va salir el error de validación  */}
                  {errors.imagen && (
                    <AlertaError
                      message={errors.imagen.message}
                    />
                  )}

                </div>



                <div className="modal-footer">

                  <CancelarModal modalToCancel="modalEditar" />
                  <GuardarModal />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default EditarProducto
