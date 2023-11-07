import { useEffect } from "react";
import { set, useForm } from "react-hook-form";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";
import HeaderModals from "../chared/HeaderModals";
import {
  validarEspaciosVacios,
  validarImagen,
} from "../../Validations/validations";
import AlertaError from "../chared/AlertaError";
import CancelarModal from "../chared/CancelarModal";
import GuardarModal from "../chared/GuardarModal";
import PropTypes from "prop-types";
import axios from "axios";

const EditarPrendas = ({ detallesPrendas }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    if (detallesPrendas) {
      setValue("nombre", detallesPrendas.nombre);
      setValue("cantidad", detallesPrendas.cantidad);
      setValue("precio", detallesPrendas.precio);
      setValue("tipo_de_tela", detallesPrendas.tipo_de_tela);
      setValue("genero", detallesPrendas.genero);
      setValue("publicado", detallesPrendas.publicado);

    }
  }, [detallesPrendas]);

  

  const editarPrenda = handleSubmit(async (data) => {

    console.log(data)
    const formData = new FormData();
    formData.append("nombre", data.nombre.trim());
    formData.append("cantidad", data.cantidad);
    formData.append("precio", data.precio.trim());
    formData.append("tipo_de_tela", data.tipo_de_tela.trim());
    formData.append("genero", data.genero.trim());
    formData.append("publicado", data.publicado);
    formData.append("imagen", data.imagen[0]);

    try {
      const res = await clienteAxios.put(
        `http://localhost:3000/api/prendas/${detallesPrendas.id_prenda}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      Swal.fire({
        title: "Prenda Actualizada",
        text: res.data.message,
        icon: "success",
      }).then(() => {
        location.reload();
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Error al actualizar",
        icon: "error",
      }).then(() => {
        location.reload();
      });
    }
  });

  return (
      <div className="modal" id="modalEditarPrenda">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <HeaderModals title="Editar prendas" />
            <div className="modal-body">
              <form
                onSubmit={editarPrenda}
                className="row g-3 needs-validation"
              >
                <div className="col-md-6">
                  <label htmlFor="nombre" className="col-from-label">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    className="form-control"
                    placeholder="Nombre"
                    title="¿Deseas editar el nombre?"
                    {...register("nombre", {
                      required: {
                        value: true,
                        message: "El nombres es obligatorio",
                      },
                      validate: (value) => validarEspaciosVacios(value)
                    })}
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="cantidad" className="col-from-label">
                    Cantidad
                  </label>
                  <input
                    type="text"
                    id="cantidad"
                    name="cantidad"
                    className="form-control"
                    placeholder="Cantidad"
                    title="¿Deseas editar la cantidad?"
                    {...register("cantidad", {
                      required: {
                        value: true,
                        message: "La cantidad es obligatorio",
                      },
                      // validate: (value) => {
                      //   return validarEspaciosVacios(value);
                      // },
                    })}
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="precio" className="col-from-label">
                    Precio
                  </label>
                  <input
                    type="text"
                    id="precio"
                    name="precio"
                    className="form-control"
                    placeholder="Precio"
                    title="¿Deseas editar el precio?"
                    {...register("precio", {
                      required: {
                        value: true,
                        message: "El precio es obligatorio",
                      },
                      validate: (value) =>  validarEspaciosVacios(value)
                    })}
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="tipo_de_tela" className="col-from-label">
                    Tipo de tela
                  </label>
                  <input
                    type="text"
                    id="tipo_de_tela"
                    name="tipo_de_tela"
                    className="form-control"
                    placeholder="Tipo de tela"
                    title="¿Deseas editar el tipo de tela?"
                    {...register("tipo_de_tela", {
                      required: {
                        value: true,
                        message: "El tipo de tela es obligatorio",
                      },
                      validate: (value) => validarEspaciosVacios(value)
                    })}
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="genero" className="col-from-label">
                    Genero
                  </label>

                  <select
                    id="genero"
                    name="genero"
                    className="form-control"
                    title="Seleccionar el genero"
                    {...register("genero", {
                      required: {
                        value: true,
                        message: "El genero es obligatoria",
                      },
                    })}
                  >
                    <option value="Seleccione una opción" disabled={true} ></option>
                    <option value="Mujer">Mujer</option>
                    <option value="Hombre">Hombre</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label htmlFor="publicado" className="col-from-label">
                    ¿Deseas publicarlo?
                  </label>
                  <select
                    id="publicado"
                    name="publicado"
                    className="form-control"
                    title="Estado de la publicacion"
                    {...register("publicado", {
                      required: {
                        value: true,
                        message: "El estado de la publicacion es obligatoria",
                      },
                    })}
                  >
                    <option  value="Seleccione una opción" disabled={true}></option>
                    <option value="true">Si</option>
                    <option value="false">No</option>
                  </select>
                  {errors.publicado && (
                    <AlertaError message={errors.publicado.message} />
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="imagen" className="col-from-label">
                    Subir imagen
                  </label>
                  <input
                    type="file"
                    id="imagen"
                    name="imagen"
                    className="form-control"
                    title="Inserte un archivo PNG "
                    {...register("imagen", {
                      validate: (value) => validarImagen(value[0])
                    })}
                  />
                </div>

                <div className="modal-footer">
                  <CancelarModal />
                  <GuardarModal />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
};

EditarPrendas.prototype = {
  detallesPrendas: PropTypes.object.isRequired,
};

export default EditarPrendas;
