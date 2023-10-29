import '../../css-general/cssgeneral.css'
import '../../css-general/tailwind.min.css'
import '../../css-general/inicio_style.css'
import '../../css-general/table.min.css'
import axios from 'axios'
import CancelarModal from '../chared/CancelarModal';
import GuardarModal from '../chared/GuardarModal';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form'
import { validarEspaciosVacios } from '../../Validations/validations'
import { useEffect } from 'react'
import AlertaError from '../chared/AlertaError'


//Componente
const EditarCliente = ({editarCliente}) => {


    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue, // Añade esta función para actualizar dinámicamente los valores
    } = useForm();

    // Cuando editarCliente cambia, actualiza los valores del formulario
    useEffect(() => {
        if (editarCliente) {
            setValue('nombre', editarCliente.nombre);
            setValue('apellido', editarCliente.apellido);
            // Añade las demás propiedades aquí
        }
    }, [editarCliente]);

    //Estado para llenar los input con la informacion de proveedor a editar
    // const [nombre, setNombre] = useState('');
    // const [apellido, setApellido] = useState('');
    // const [cedula, setCedula] = useState('');
    // const [telefono, setTelefono] = useState('');
    // const [email, setEmail] = useState('');
    // const [direccion, setDireccion] = useState('');
    // const [id_cliente, setIdCliente] = useState(null);

    
    
    //por medio de editarcliente se traen lo que hay en el listar, y por medio del estado setNombre,setTelefono etc,
    //  le pasan todo a nombre telefono etc, y con eso se les pasa por medio del value=¨nombre telefono etc al input  
    // useEffect(() => {
    //     if (editarCliente) {
    //         setNombre(editarCliente.nombre.trim());
    //         setApellido(editarCliente.apellido);
    //         setCedula(editarCliente.cedula);
    //         setTelefono(editarCliente.telefono);
    //         setEmail(editarCliente.email);
    //         setDireccion(editarCliente.direccion);
    //         setIdCliente(editarCliente.id_cliente);
    //     }
    // }, [editarCliente]);

    //Función para al darle click al guardar se mande todo por la ruta de axios y realice el cambio
    const handleFormClick = (e) => {
        e.preventDefault();


        // Ruta
        if (id_cliente) {
            axios.patch(`http://localhost:3000/api/clientes/${id_cliente}`, {
                // Campos en los que realiza el cambio
                nombre,
                apellido,
                cedula,
                telefono,
                email,
                direccion
            })
            .then(response => {
                console.log('Cliente actualizado:', response.data);
                Swal.fire({
                    title: 'Cliente actualizado',
                    text: response.data.message,
                    icon: 'success',
                }).then(()=>{
                    location.reload();
                });
            })
            .catch(error => {
                console.error('Error al actualizar el cliente', error);
                Swal.fire({
                    title: 'Error',
                    text: 'Hubo un error al actualizar el cliente',
                    icon: 'error',
                });
            });
        } else {
            console.error('No se pudo obtener el ID del cliente');
        }
    };


    /// Función para guardar el cliente en la DB
    const onSubmit = (data) => {

        const {nombre} = data

        // Ruta
        if (editarCliente.id_cliente) {
            axios
                .patch(`http://localhost:3000/api/clientes/${editarCliente.id_cliente}`, {
                    // Campos en los que realiza el cambio
                    nombre,
                    // apellido,
                    // cedula,
                    // telefono,
                    // email,
                    // direccion,
                })
                .then((response) => {
                    console.log('Cliente actualizado:', response.data);
                    Swal.fire({
                        title: 'Cliente actualizado',
                        text: response.data.message,
                        icon: 'success',
                    }).then(() => {
                        location.reload();
                    });
                })
                .catch((error) => {
                    console.error('Error al actualizar el cliente', error);
                    Swal.fire({
                        title: 'Error',
                        text: 'Hubo un error al actualizar el cliente',
                        icon: 'error',
                    });
                });
        } else {
            console.error('No se pudo obtener el ID del cliente');
        }
    }


  return (
      <div>
          {/* modal de editar proveedor */}
          <div className='modal' id='modalEditar'>
              <div className='modal-dialog modal-dialog-centered'>
                  <div className='modal-content'>
                      <div className='editar edi'>
                          <h5 className='modal-title'>
                              Editar datos del cliente
                          </h5>
                          <button
                              type='button'
                              id='xEditar'
                              className='btn-close'
                              data-bs-dismiss='modal'
                              aria-label='Close'
                          ></button>
                      </div>
                      <div className='modal-body'>
                          {/* <!-- formulario para editar los datos de la tabla clientes --> */}
                          <form action='' onSubmit={handleSubmit(onSubmit)}>
                              <div className='mb-3' name='divNombre'>
                                  <label
                                      htmlFor='nombreEditar'
                                      className='col-form-label'
                                  >
                                      Nombre:
                                  </label>
                                  <input
                                      type='text'
                                      className='form-control'
                                      id='nombreEditar'
                                      name='nombre'
                                      placeholder=''
                                      {...register('nombre', {
                                          required: {
                                              value: true,
                                              message:
                                                  'El nombre es obligatorio',
                                          },
                                          validate: (value) => {
                                              return validarEspaciosVacios(
                                                  value
                                              );
                                          },
                                          pattern: {
                                              value: /^[A-Za-z]+(\s[A-Za-z]+)*$/,
                                              message:
                                                  'El nombre no puede contener números ni caracteres especiales',
                                          },
                                      })}
                                  />
                                  {errors.nombre && (
                                      <AlertaError
                                          message={errors.nombre.message}
                                      />
                                  )}
                              </div>
                              <div className='mb-3' name='divApellido'>
                                  <label
                                      htmlFor='apellidoEditar'
                                      className='col-form-label'
                                  >
                                      Apellido:
                                  </label>
                                  <input
                                      type='text'
                                      className='form-control'
                                      id='apellidoEditar'
                                      name='apellido'
                                      placeholder=''
                                  />
                              </div>
                              <div className='mb-3'>
                                  <label
                                      htmlFor='cedulaEditar'
                                      className='col-form-label'
                                  >
                                      Cedula:*
                                  </label>
                                  <input
                                      type='text'
                                      className='form-control'
                                      id='cedulaEditar'
                                      name='cedula'
                                      placeholder=''
                                  />
                              </div>
                              <div className='mb-3'>
                                  <label
                                      htmlFor='telefonoEditar'
                                      className='col-form-label'
                                  >
                                      Teléfono:
                                  </label>
                                  <input
                                      type='text'
                                      className='form-control'
                                      id='telefonoEditar'
                                      name='telefono'
                                      placeholder=''
                                  />
                              </div>
                              <div className='mb-3'>
                                  <label
                                      htmlFor='emailEditar'
                                      className='col-form-label'
                                  >
                                      Email:
                                  </label>
                                  <input
                                      type='text'
                                      className='form-control'
                                      id='emailEditar'
                                      name='email'
                                      placeholder=''
                                  />
                              </div>
                              <div className='mb-3'>
                                  <label
                                      htmlFor='direccionEditar'
                                      className='col-form-label'
                                  >
                                      Dirección:
                                  </label>
                                  <input
                                      type='text'
                                      className='form-control'
                                      id='direccionEditar'
                                      name='direccion'
                                      placeholder=''
                                  />
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
  );
}

export default EditarCliente