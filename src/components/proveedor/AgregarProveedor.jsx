import axios from 'axios'
import '../../css-general/cssgeneral.css'
import '../../css-general/tailwind.min.css'
import '../../css-general/inicio_style.css'
import '../../css-general/table.min.css'
import { useForm } from 'react-hook-form';
import CancelarModal from '../chared/CancelarModal';
import GuardarModal from '../chared/GuardarModal';
import styles from '../../pages/proveedores.module.css';
import AlertaError from '../chared/AlertaError';


//COMPONENTE
const AgregarProveedor = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();




    const onSubmit = async (data) => {


        try {
            // la ruta por donde voya mandar el objeto que tiene las propiedades es decir proveedor
            await axios.post("http://localhost:3000/api/proveedores", data)
            //luego de mandarlo ce cierra el modal

            reset()
            // const modal = document.getElementById("myModal");
            // const modalInstance = bootstrap.Modal.getInstance(modal);
            // modalInstance.hide();

            location.reload();
        } catch (err) {
            console.log(err)
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
                            <form action="" id="formularioAgregarProveedor" onSubmit={handleSubmit(onSubmit)}>

                                <div className="mb-3" name="divIdentificacion">

                                    <label htmlFor="identificacionGuardar"
                                        className="col-form-label">Identificación:</label>
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
                                            {...register('identificador', {
                                                required: 'La identificacion es obligatorio',
                                            })}
                                        />
                                        {errors.identificador && (
                                            <AlertaError message={errors.identificador.message} />
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
                                        {...register('nombre', {
                                            required: 'El nombre es obligatorio',
                                        })}
                                    />
                                    {errors.nombre && (
                                        <AlertaError message={errors.nombre.message} />
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
                                            required: 'El telefono es obligatorio',
                                        })}
                                    />
                                    {errors.telefono && (
                                        <AlertaError message={errors.telefono.message} />
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
                                            required: 'El telefono es obligatorio',
                                        })}
                                    />
                                    {errors.direccion && (
                                        <AlertaError message={errors.direccion.message} />
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