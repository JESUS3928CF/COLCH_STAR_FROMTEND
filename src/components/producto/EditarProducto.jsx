import React from 'react'
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
import { useEffect } from 'react';
import { validarEspaciosVacios, validarImagen } from '../../Validations/validations'
import HeaderModals from '../chared/HeaderModals'

const EditarProducto = ({ editarProducto }) => {

  const {
    register, //regitra o identifica cada elemento o cada input
    handleSubmit, //para manejar el envio del formulario
    formState: { errors }, //ver errores que tiene el formulario
    setValue,
    reset, //resetea el formulario
  } = useForm();



  //por medio de editarproveedor se traen lo que hay en el listar, y por medio del estado setvalue
  //  le pasan todo a nombre telefono etc, y con eso se les pasa por medio del value=¨nombre telefono etc al input  
  useEffect(() => {
    if (editarProducto) {
      setValue('nombre', editarProducto.nombre);
      setValue('cantidad', editarProducto.cantidad);
      setValue('precio', editarProducto.precio);
      setValue('publicado', editarProducto.publicado);
    }
  }, [editarProducto]);

  //funcion que se ejecuta cuando alguien intenta enviar el formulario
  const onSubmit = (data) => {

    //se guardan los datos  a cambiar al data
    const { nombre, cantidad, precio, fk_prenda, publicado, imagen } = data


    if (editarProducto.id_producto) {
      // ruta 
      axios.patch(`http://localhost:3000/api/proveedores/${editarProducto.id_producto}`, {
        // Campos en los que realiza el cambio
        nombre: nombre.trim(),
        cantidad: cantidad.trim(),
        precio: precio.trim(),
        fk_prenda: fk_prenda.trim(),
        publicado: publicado,
        imagen: imagen[0]
      })
        .then(response => {
          console.log('Proveedor actualizado:', response.data);
          //alerta de proveedor actualizado
          Swal.fire({
            title: 'Proveedor actualizado',
            text: response.data.message,
            icon: 'success',
          }).then(() => {
            location.reload();
          });
        })
        .catch(error => {
          console.error('Error al actualizar el proveedor', error);

          Swal.fire({
            title: 'Error',
            text: 'Hubo un error',
            icon: 'error',
          }).then(() => {
            location.reload();
          });

        });
    } else {
      console.error('No se pudo obtener el ID del proveedor');
    }
  };




  return (
    <div>
      {/* modal agregar producto */}
      <div className='modal' id='modalEditar' >
        <div className="modal-dialog modal-dialog-centered modal-lg ">
          <div className="modal-content">

            <HeaderModals title={'Agregar Producto'} />

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
                        return (validarEspaciosVacios(value));
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
                      validate: (value) => {
                        return (validarEspaciosVacios(value));
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
                      validate: (value) => {
                        return (validarEspaciosVacios(value));
                      }
                    })}

                  />
                  {errors.precio && (
                    <AlertaError
                      message={errors.precio.message}
                    />
                  )}


                </div>



                <div className="col-md-6" name="Publicado">
                  <label htmlFor="Publicar" className="col-form-control">
                    ¿Deseas publicarlo?
                  </label>

                  <select
                    name="publicado"
                    id=""
                    className={`form-control ${style.customerr}`}
                    title="Seleccione una opcion"
                    {...register('publicado', {
                      required: {
                        value: true,
                        message:
                          'El estado de publicación es obligatorio',
                      }
                    })}
                  >

                    <option value="Seleccione una opcion" >
                      Selecciona una opcion
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
                      required: {
                        value: true,
                        message: 'La imagen es obligatoria',
                      },
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
