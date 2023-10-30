import PropTypes from "prop-types";

import CancelarModal from "../chared/CancelarModal";
import GuardarModal from "../chared/GuardarModal";
import HeaderModals from "../chared/HeaderModals";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  validarEspaciosVacios,
  validarImagen,
} from "../../Validations/validations";
import AlertaError from "../chared/AlertaError";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";

const EditarPrendas = ({ detallesPrendas }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  // Cuando recibe el detallesPrendas, actualiza los valores del formulario
  useEffect(() => {
    if (detallesPrendas) {

      setValue("nombre", detallesPrendas.nombre);
      setValue("cantidad", detallesPrendas.cantidad);
      setValue("precio", detallesPrendas.precio);
      setValue("tipo_de_tela", detallesPrendas.tipo_de_tela);
      setValue("genero", detallesPrendas.genero);
      
      // Añade las demás propiedades aquí
    }
  }, [detallesPrendas]);

  const editarPrendas = handleSubmit(async (data) => {
    console.log(data);

    /// Crear un form-data por que así el back puede recibir imágenes
    const formData = new FormData();
    formData.append("nombre", data.nombre.trim());
    formData.append("cantidad", data.cantidad.trim());
    formData.append("precio", data.precio.trim());
    formData.append("tipo_de_tela", data.tipo_de_tela.trim());
    formData.append("genero", data.genero.trim());
    formData.append("imagen", data.imagen[0]);
    formData.append("publicado", data.publicado);

;

    /// editar el diseño
    try {
      const res = await clienteAxios.put(
        `/prendas/${detallesPrendas.id_prenda}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(res);

      // Lanzar alerta del producto agregado
      Swal.fire({
        title: "Prenda actualizada",
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
    <div className="modal" id="modalEditarPrenda">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <HeaderModals title="Editar Prenda" />
          <div className="modal-body">
            {/* formulario para editar un Diseño */}
            <form  className="row g-3 needs-validation"
              action=""
              id="formularioAgregarDiseño"
              onSubmit={editarPrendas}
            >
              <div className="col-md-6">
                <label htmlFor="nombre" className="col-form-label">
                  Nombre:
                </label>
                <input
                  name="nombre"
                  type="text"
                  className="form-control"
                  placeholder=". . ."
                  {...register("nombre", {
                    required: {
                      value: true,
                      message: "El nombre es obligatorio",
                    },
                    validate: (value) => {
                      return validarEspaciosVacios(value);
                    },
                  })}
                />
                {/* en esta etiqueta va salir el error de validación  */}
                {errors.nombre && (
                  <AlertaError message={errors.nombre.message} />
                )}
              </div>

              <div className="col-md-6 ms-auto">
                  <label htmlFor="cantidad" className="col-form-label">
                    Cantidad:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="cantidad"
                    placeholder="Cantidad"
                    title="Ingresa la cantidad"

                    {...register('cantidad',{
                      required: {
                        value:true,
                        message:'La cantidad es obligatoria'
                      },
                      validate:(value)=>{
                        return validarEspaciosVacios(value)
                      }
                    })}
                  />
                  {errors.cantidad && (
                                    <AlertaError
                                        message={errors.cantidad.message}
                                    />
                                )}
                </div>

                <div className="col-md-6 mt-2" name="precio">
                  <label htmlFor="precio" className="col-form-label">
                    Precio:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="precio"
                    placeholder="Precio"
                    title="Ingresa el precio"

                    {...register('precio',{
                      required: {
                        value:true,
                        message:'El precio es obligatoria'
                      },
                      validate:(value)=>{
                        return validarEspaciosVacios(value)
                      }
                    })}
                  />

{errors.precio && (
                                    <AlertaError
                                        message={errors.precio.message}
                                    />
                                )}
                </div>

                <div className="col-md-6 ms-6 mt-4" name="Tela">
                  <label htmlFor="tipo_de_tela" className="col-from-label">
                    Tipo de tela:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="tipo_de_tela"
                    placeholder="Tipo de tela "
                    title="Ingresa el tipo de tela"

                    {...register('tipo_de_tela',{
                      required: {
                        value:true,
                        message:'El tipo de tela  es obligatoria'
                      },
                      validate:(value)=>{
                        return validarEspaciosVacios(value)
                      }
                    })}



                  />
                  {errors.tipo_de_tela && (
                                    <AlertaError
                                        message={errors.tipo_de_tela.message}
                                    />
                                )}
                </div>

                
              <div className="col-md-6 ms-6">
                <label htmlFor="imagen" className="form-label">
                  Subir imagen
                </label>
                <input
                  className="form-control"
                  name="imagen"
                  type="file"
                  {...register("imagen", {
                    validate: (value) => {
                      return validarImagen(value[0]);
                    },
                  })}
                />
                {/* en esta etiqueta va salir el error de validación  */}
                {errors.imagen && (
                  <AlertaError message={errors.imagen.message} />
                )}
              </div>

              <div className="col-md-6 ms-6 mt-4">
                <label htmlFor="genero" className="col-from-label">
                    Genero:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="genero"
                    placeholder="Genero "
                    title="Ingresa el genero"

                    {...register('genero',{
                      required: {
                        value:true,
                        message:'El genero es obligatoria'
                      },
                      validate:(value)=>{
                        return validarEspaciosVacios(value)
                      }
                    })}

                  />
                  {errors.genero && (
                                    <AlertaError
                                        message={errors.genero.message}
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
                    required: {
                      value: true,
                      message: "El estado de publicación es obligatorio",
                    },
                  })}
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

EditarPrendas.propTypes = {
  detallesPrendas: PropTypes.object.isRequired,
};

export default EditarPrendas;
