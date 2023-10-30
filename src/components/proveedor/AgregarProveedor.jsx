import styles from '../../pages/proveedores.module.css';
import '../../css-general/cssgeneral.css'
import '../../css-general/tailwind.min.css'
import '../../css-general/inicio_style.css'
import '../../css-general/table.min.css'
import axios from 'axios'
import Swal from 'sweetalert2';
import CancelarModal from '../chared/CancelarModal';
import GuardarModal from '../chared/GuardarModal';
import AlertaError from '../chared/AlertaError';
import { validarEspaciosVacios } from '../../Validations/validations'
import { useForm } from 'react-hook-form';


//COMPONENTE
const AgregarProveedor = () => {

    const {
        register, //regitra o identifica cada elemento o cada input
        handleSubmit, //para manejar el envio del formulario
        formState: { errors }, //ver errores que tiene el formulario
        reset, //resetea el formulario
    } = useForm();

    //funcion que se ejecuta cuando alguien intenta enviar el formulario
    const onSubmit = async (data) => {

        const {nombre,apellido,cedula,telefono,email,direccion} = data


        try {
            // la ruta por donde voya mandar el objeto o el registro nuevo data
            const res = await axios.post("http://localhost:3000/api/proveedores", {
                 // Campos en los que realiza el cambio
                 nombre: nombre.trim(),
                 apellido: apellido.trim(),
                 cedula: cedula.trim(),
                 telefono: telefono.trim(),
                 email: email.trim(),
                 direccion: direccion.trim()
            })
            //luego de mandarlo ce cierra el modal

            reset() //luego de ser agregado y mandado resetea el formulario

            // Lanzar alerta del producto agregado
            Swal.fire({
                title: 'Proveedor agregado',
                text: res.data.message,
                icon: 'success',
            }).then(() => { //el hen se ejecuta luego de interactuar con el modal de validacion, then se ejecuta cuando lo de arriba se cumpla
                location.reload(); //  recarga la pagina
            });

        } catch (err) {
            console.log(err)

            Swal.fire({
                title: 'Error',
                text: "Hubo un error",
                icon: 'Vuelva a intentarlo',
            }).then( //el hen se ejecuta luego de interactuar con el modal de validacion, then se ejecuta cuando lo de arriba se cumpla
                location.reload() //  recarga la pagina
            );
        }

    }

    return (
        <div>
            {/* modal agregar proveedor */}
            <div className="modal" id="myModal" >
                <div className="modal-dialog modal-dialog-centered ">
                    <div className="modal-content">
                        <div className="agregar agr">
                            <h5 className="modal-title" id="exampleModalLabel">Agregar proveedor</h5>
                            <button type="button" id="xAgregar" className="btn-close" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            {/* formulario para agregar proveedor */}
                            <form  id="formularioAgregarProveedor" onSubmit={handleSubmit(onSubmit)}>

                                <div className="mb-3" name="divIdentificacion">

                                    <label htmlFor="identificacionGuardar"
                                        className="col-form-label">Identificación:*
                                    </label>

                                    <br />

                                    <div className={styles.identi}>

                                        <select style={{ width: 80, height: 40 }} id="tipoIdentificacion" >
                                            <option value="cedula">CC</option>
                                            <option value="nit">NIT</option>
                                        </select>

                                        <input type="text" className="form-control "
                                            id={styles.identificacionGuardar}
                                            name="identificador"
                                            placeholder=". . ."
                                            //register es una funcion, nos devuelve propiedades, para asigar esas propiedades al input  se pone . . .
                                            //  identificador Es una cadena que se utiliza como identificador o nombre del campo de entrada del formulario.
                                            {...register('identificador', {  
                                                required: {          // Es una propiedad que indica que el campo es obligatorio. 
                                                    value: true, // indica que el campo debe tener un valor (no puede estar vacío) para pasar la validación.
                                                    message: 'La Identificación es obligatorio', // es un mensaje que se mostrará si la validación falla.
                                                },
                                                pattern: {
                                                    value:  /^\d+$/,   //expreción regular para prohibir letras y espacios en blamco 
                                                    message: "No puede contener Letras ni  espacios en blanco"
                                                  },
                                                validate: (value) => {
                                                    return validarEspaciosVacios(value); //validacion para no dejar tener espacios vacios
                                                },
                                                
                                                
                                            })}
                                        />
                                        {errors.identificador && (
                                            <AlertaError message={errors.identificador.message} /> //muestra el mensaje de validacion
                                        )}

                                    </div>
                                </div>

                                <div className="mb-3" name="divNombre">

                                    <label htmlFor="nombre"
                                        className="col-form-label">
                                        Nombre:*
                                    </label>

                                    <input type="text"
                                        className="form-control"
                                        name="nombre"
                                        placeholder=". . ."
                                        //register es una funcion, nos devuelv propiedades para asigar esas propiedades al input  se pone . . .
                                        //  Nombre Es una cadena que se utiliza como identificador o nombre del campo de entrada del formulario.
                                        {...register('nombre', {
                                            required: {     // Es una propiedad que indica que el campo es obligatorio.
                                                value: true,  // indica que el campo debe tener un valor (no puede estar vacío) para pasar la validación.
                                                message: 'El Nombre es obligatorio',  // es un mensaje que se mostrará si la validación falla.
                                            },
                                            validate: (value) => {
                                                return validarEspaciosVacios(value);
                                            },
                                            pattern: {
                                                value:  /^[A-Za-z\s]+$/,  //expreción regular para prohibir letras y caracteres 
                                                message: "No puede contener números ni caracteres especiales"
                                            }              
                                        })}
                                    />
                                    {errors.nombre && (
                                        <AlertaError message={errors.nombre.message} /> //muestra el mensaje de validacion
                                    )}

                                </div>

                                <div className="mb-3" name="divTelefono">

                                    <label htmlFor="telefono"
                                        className="col-form-label" >
                                        Teléfono:*
                                    </label>

                                    <input type="text"
                                        className="form-control"
                                        name="telefono"
                                        placeholder=". . ."
                                        {...register('telefono', {  
                                            required: {          
                                                value: true, 
                                                message: 'El teléfono es obligatorio',
                                            },
                                            validate: (value) => {
                                                return validarEspaciosVacios(value);
                                            },
                                            pattern: {
                                                value:  /^\d+$/,   
                                                message: "No puede contener Letras ni espacios en blanco"
                                              }
                                            
                                        })}
                                    />
                                    {errors.telefono && (
                                        <AlertaError message={errors.telefono.message} /> //muestra el mensaje de validacion
                                    )}

                                </div>

                                <div className="mb-3" name="divDireccion">

                                    <label htmlFor="direccionGuardar"
                                        className="col-form-label">
                                        Dirección:*
                                    </label>

                                    <input type="text"
                                        className="form-control"
                                        id="direccionGuardar"
                                        name="direccion"
                                        placeholder=". . ."
                                        {...register('direccion', {
                                            required: 'La Dirección es obligatorio',
                                        })}
                                    />
                                    {errors.direccion && (
                                        <AlertaError message={errors.direccion.message} /> //muestra el mensaje de validacion
                                    )}

                                </div>

                                <div className="modal-footer">

                                    {/* Botón para cancelar*/}
                                    <CancelarModal />

                                    {/* Botón para guardar*/}
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

export default AgregarProveedor