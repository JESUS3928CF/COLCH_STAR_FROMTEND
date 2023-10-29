import '../../css-general/cssgeneral.css'
import '../../css-general/tailwind.min.css'
import '../../css-general/inicio_style.css'
import '../../css-general/table.min.css'
import axios from 'axios';
import { useForm } from 'react-hook-form';
import CancelarModal from '../chared/CancelarModal';
import GuardarModal from '../chared/GuardarModal';
import AlertaError from '../chared/AlertaError';
import Swal from 'sweetalert2';
import { validarEspaciosVacios } from '../../Validations/validations';


//Componente
const AgregarCliente = () => {
  const {
    register,  //Regitra o identifica cada elemento o cada input
    handleSubmit,   //Para manejar el envio del formulario
    formState: { errors },  //Ver errores que tiene el formulario
    reset, //Resetea el formulario
  } = useForm();

  //Función que se ejecuta cuando alguien intenta enviar el formulario
  const onSubmit = async (data) => {

    try {
      // la ruta por donde voya mandar el objeto o el registro nuevo data
      const res = await axios.post('http://localhost:3000/api/clientes', data);
      //Luego de mandarlo se cierra el modal

      reset();   //Luego de ser agregado y mandado resetea el formulario

      // Lanzar alerta del producto agregado
      Swal.fire({
        title: 'Cliente agregado',
        text: res.data.message,
        icon: 'success',
    }).then(() => {  //El then se ejecuta luego de interactuar con el modal de validacion, then se ejecuta cuando lo de arriba se cumpla
        location.reload(); //  recarga la pagina
    });

    } catch (err) {
          console.log(err)
          Swal.fire({
            title: 'Error',
            text: "Hubo un error",
            icon: 'Vuelva a intentarlo',
        }).then( //el then se ejecuta luego de interactuar con el modal de validacion, then se ejecuta cuando lo de arriba se cumpla
            location.reload() //  recarga la pagina
        );
    }
  };

  return (
      <div>
          {/* modal agregar proveedor */}

          <div className='modal' id='myModal'>
              <div className='modal-dialog modal-dialog-centered'>
                  <div className='modal-content'>
                      <div className='agregar agr'>
                          <h5 className='modal-title' id='exampleModalLabel'>
                              Agregar cliente
                          </h5>
                          <button
                              type='button'
                              id='xAgregar'
                              className='btn-close'
                              data-bs-dismiss='modal'
                              aria-label='Close'
                          ></button>
                      </div>
                      <div className='formulario'>
                          <div className='modal-body'>
                              <form onSubmit={handleSubmit(onSubmit)}>
                                  <div className='mb-3'>
                                      <label
                                          htmlFor='nombre'
                                          className='col-form-label'
                                      >
                                          Nombre:*
                                      </label>
                                      <input
                                          name='nombre'
                                          type='text'
                                          className='form-control'
                                          placeholder='. . .'
                                          //Register es una funcion, nos devuelve propiedades para asignar esas propiedades al input se pone . . .
                                          {...register('nombre', {
                                              required: {
                                                  value: true,
                                                  message:
                                                      'El nombre es obligatorio',
                                              },
                                              validate: (value) => {
                                                  return validarEspaciosVacios(value);
                                              },
                                              pattern: {
                                                value:  /^[A-Za-z]+(\s[A-Za-z]+)*$/,
                                                message: "El nombre no puede contener números ni caracteres especiales"
                                              }
                                          })}
                                      />
                                      {errors.nombre && (
                                          <AlertaError
                                              message={errors.nombre.message}
                                          />
                                      )}
                                  </div>
                                  <div className='mb-3'>
                                      <label
                                          htmlFor='apellido'
                                          className='col-form-label'
                                      >
                                          Apellido:*
                                      </label>
                                      <input
                                          name='apellido'
                                          type='text'
                                          className='form-control'
                                          placeholder='. . .'
                                          {...register('apellido', {
                                              required:
                                                  'El apellido es obligatorio',
                                          })}
                                      />
                                      {errors.apellido && (
                                          <AlertaError
                                              message={errors.apellido.message}
                                          />
                                      )}
                                  </div>
                                  <div className='mb-3'>
                                      <label
                                          htmlFor='cedula'
                                          className='col-form-label'
                                      >
                                          Cedula:*
                                      </label>
                                      <input
                                          name='cedula'
                                          type='text'
                                          className='form-control'
                                          placeholder='. . .'
                                          {...register('cedula', {
                                              required:
                                                  'La cedula es obligatoria',
                                          })}
                                      />
                                      {errors.cedula && (
                                          <AlertaError
                                              message={errors.cedula.message}
                                          />
                                      )}
                                  </div>
                                  <div className='mb-3'>
                                      <label
                                          htmlFor='telefono'
                                          className='col-form-label'
                                      >
                                          Teléfono:*
                                      </label>
                                      <input
                                          name='telefono'
                                          type='text'
                                          className='form-control'
                                          placeholder='. . .'
                                          {...register('telefono', {
                                              required:
                                                  'El teléfono es obligatorio',
                                          })}
                                      />
                                      {errors.telefono && (
                                          <AlertaError
                                              message={errors.telefono.message}
                                          />
                                      )}
                                  </div>
                                  <div className='mb-3'>
                                      <label
                                          htmlFor='email'
                                          className='col-form-label'
                                      >
                                          Email:*
                                      </label>
                                      <input
                                          name='email'
                                          type='email'
                                          className='form-control'
                                          placeholder='. . .'
                                          {...register('email', {
                                              required:
                                                  'El email es obligatorio',
                                          })}
                                      />
                                      {errors.email && (
                                          <AlertaError
                                              message={errors.email.message}
                                          />
                                      )}
                                  </div>
                                  <div className='mb-3'>
                                      <label
                                          htmlFor='direccion'
                                          className='col-form-label'
                                      >
                                          Dirección:*
                                      </label>
                                      <input
                                          name='direccion'
                                          type='text'
                                          className='form-control'
                                          placeholder='. . .'
                                          {...register('direccion', {
                                              required:
                                                  'La dirección es obligatoria',
                                          })}
                                      />
                                      {errors.direccion && (
                                          <AlertaError
                                              message={errors.direccion.message}
                                          />
                                      )}
                                  </div>

                                  <div className='modal-footer'>
                                      <CancelarModal />
                                      <GuardarModal />
                                  </div>
                              </form>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );
}

export default AgregarCliente