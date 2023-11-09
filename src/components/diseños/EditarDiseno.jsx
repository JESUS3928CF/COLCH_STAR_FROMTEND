// ------------------JESÚS ANTONIO COCHERO FLORIÁN
//-------------------26 de septiembre 2023
//Nos permitira Editar un diseño, luego de tener diseños en la tabla listar, se le podra hacer sus repectivas modificaciones
// a dichos diseños

import PropTypes from "prop-types";

import CancelarModal from "../chared/CancelarModal";
import GuardarModal from "../chared/GuardarModal";
import HeaderModals from "../chared/HeaderModals";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  validarBooleanos,
  validarEspaciosVacios,
  validarImagen,
} from "../../Validations/validations";
import AlertaError from "../chared/AlertaError";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";

const EditarDiseno = ({ detalleDiseno }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  // Cuando recibe el detalleDiseno, actualiza los valores del formulario
  useEffect(() => {
    if (detalleDiseno) {
      setValue("nombre", detalleDiseno.nombre);
      setValue("publicado", detalleDiseno.publicado);
      // Añade las demás propiedades aquí
    }
  }, [detalleDiseno]);

    const editarDiseno = handleSubmit(async (data) => {

      console.log(data)

    /// Crear un form-data por que así el back puede recibir imágenes
    const formData = new FormData();
    formData.append("nombre", data.nombre.trim());
    formData.append("publicado", data.publicado);
    formData.append("imagen", data.imagen[0]);

    /// editar el diseño
    try {
      const res = await clienteAxios.put(
        `/disenos/${detalleDiseno.id_diseno}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );


      // Lanzar alerta del producto agregado
      Swal.fire({
        title: "Diseño Editado",
        text: res.data.message,
        icon: "success",
      }).then(() => {
        location.reload();
      });
    } catch (error) {
      console.log(error);
      // Lanzar alerta de error
      Swal.fire({
        title: "Error",
        text: "Hubo un error",
        icon: "Vuelva a intentarlo",
      }).then(location.reload());
    }
  });


    

    return (
        <div className='modal' id='modalDiseño'>
            <div className='modal-dialog modal-dialog-centered'>
                <div className='modal-content'>
                    <HeaderModals title='Editar Diseño' />
                    <div className='modal-body'>
                        {/* formulario para editar un Diseño */}
                        <form
                            action=''
                            id='formularioAgregarDiseño'
                            onSubmit={editarDiseno}
                        >
                            <div className='mb-3'>
                                <label
                                    htmlFor='nombre'
                                    className='col-form-label'
                                >
                                    Nombre:
                                </label>
                                <input
                                    name='nombre'
                                    type='text'
                                    className='form-control'
                                    placeholder='. . .'
                                    {...register('nombre', {
                                        required: {
                                            value: true,
                                            message: 'El nombre es obligatorio',
                                        },
                                        validate: (value) => validarEspaciosVacios(value)
                                    })}
                                />
                                {/* en esta etiqueta va salir el error de validación  */}
                                {errors.nombre && (
                                    <AlertaError
                                        message={errors.nombre.message}
                                    />
                                )}
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='imagen' className='form-label'>
                                    Subir imagen
                                </label>
                                <input
                                    className='form-control'
                                    name='imagen'
                                    type='file'
                                    {...register('imagen',{
                                        validate: (value) =>  validarImagen(value[0])
                                    })}
                                />
                                {/* en esta etiqueta va salir el error de validación  */}
                                {errors.imagen && (
                                    <AlertaError
                                        message={errors.imagen.message}
                                    />
                                )}
                            </div>

              <div className="mb-3">
                <label htmlFor="rolGuardar" className="col-form-label">
                  ¿Deseas publicarlo?
                </label>
                <select
                  className="form-control"
                  name="publicado"
                  {...register("publicado", {
                    validate: (value) =>  validarBooleanos(value)
                  })}
                  value={detalleDiseno.publicado}
                >
                  <option value="" disabled selected>
                    Selecciona una opción
                  </option>
                  <option value="true">Si</option>
                  <option value="false">No</option>
                </select>
                {/* en esta etiqueta va salir el error de validación  */}
                {errors.publicado && (
                  <AlertaError message={errors.publicado.message} />
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
  );
};

EditarDiseno.propTypes = {
  detalleDiseno: PropTypes.object.isRequired,
};

export default EditarDiseno;
