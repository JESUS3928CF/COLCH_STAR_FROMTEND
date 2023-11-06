import '../../css-general/cssgeneral.css'
import '../../css-general/tailwind.min.css'
import '../../css-general/inicio_style.css'
import '../../css-general/table.min.css'
import CancelarModal from '../chared/CancelarModal';
import GuardarModal from '../chared/GuardarModal';
import HeaderModals from '../chared/HeaderModals';
import style from '../../pages/Productos.module.css'
import axios from 'axios'
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { validarEspaciosVacios } from '../../Validations/validations'

const AgregarProducto = () => {

    const {
        register, //regitra o identifica cada elemento o cada input
        handleSubmit, //para manejar el envio del formulario
        formState: { errors }, //ver errores que tiene el formulario
        reset, //resetea el formulario
    } = useForm();

    const onSubmit = async (data) => {

        const { nombre, cantidad, precio, fk_prenda, imagen } = data


        try {
            // la ruta por donde voya mandar el objeto o el registro nuevo data
            const res = await axios.post("http://localhost:3000/api/productos", {
                // Campos en los que realiza el cambio
                nombre: nombre.trim(),
                cantidad: cantidad.trim(),
                precio: precio.trim(),
                fk_prenda: fk_prenda.trim(),
                publicado: publicado,
                imagen: imagen[0]
            })
            //luego de mandarlo ce cierra el modal

            reset() //luego de ser agregado y mandado resetea el formulario

            // Lanzar alerta del producto agregado
            Swal.fire({
                title: 'Producto agregado',
                text: res.data.message,
                icon: 'success',
            }).then(() => { //el hen se ejecuta luego de interactuar con el modal de validacion, then se ejecuta cuando lo de arriba se cumpla
                location.reload(); //  recarga la pagina
            });

        } catch (err) {
            console.log(err)



            // En caso de otros errores, muestra una alerta genérica de error
            Swal.fire({
                title: 'Error',
                text: "Hubo un error",
                icon: 'error',

            }).then(() => {
                location.reload();
            });

        }
    }



    return (
        <div>
            {/* modal agregar producto */}
            <div className='modal' id='myModal' >
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
                                        className="form-control"
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
                                        className={style.customer}
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

                                    <CancelarModal modalToCancel="myModal" />
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

export default AgregarProducto
