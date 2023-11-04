import "../../css-general/cssgeneral.css";
import "../../css-general/tailwind.min.css";
import "../../css-general/inicio_style.css";
import "../../css-general/table.min.css";
import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import CancelarModal from "../chared/CancelarModal";
import GuardarModal from "../chared/GuardarModal";
import AlertaError from '../chared/AlertaError';
import Swal from 'sweetalert2';
import { validarEspaciosVacios } from '../../Validations/validations';
import HeaderModals from '../chared/HeaderModals';

function AgregarRol() {
  const [seleccionarPermisos, setSeleccionarPermisos] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const { nombre } = data;

    try {
      const res = await axios.post("http://localhost:3000/api/rol", {
        nombre: nombre.trim(),
        permisos: seleccionarPermisos,
      });

      reset();

      Swal.fire({
        title: "Rol agregado",
        text: res.data.message,
        icon: "success",
      }).then(() => {
        location.reload();
      });
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: "Error",
        text: "Hubo un error",
        icon: "error",
      }).then(() => {
        location.reload();
      });
    }
  }

  const handlePermisoChange = (permiso, isChecked) => {
    if (isChecked) {
      setSeleccionarPermisos([...seleccionarPermisos, permiso]);
    } else {
      setSeleccionarPermisos(seleccionarPermisos.filter((p) => p !== permiso));
    }
  }

  return (
    <div>
      <div className="modal" id="myModal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <HeaderModals title={"Agregar Rol"} />
            <div className="formulario">
              <div className="modal-body">
                <form
                  className="row g-3 needs-validation"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="mb-3" name="divNombre">
                    <label htmlFor="nombreGuardar" className="col-form-label">
                      Nombre del Rol:  *
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
                        pattern: {
                          value: /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ\s]+$/,
                          message:
                            "El nombre no puede contener números ni caracteres especiales",
                        },
                      })}
                    />
                    {errors.nombre && (
                      <AlertaError message={errors.nombre.message} />
                    )}
                  </div>
                  <label>Seleccionar permisos:  *</label>
                  <div className="form-check form-switch">
                    <input
                      type="checkbox"
                      value="usuario"
                      onChange={(e) => handlePermisoChange(e.target.value, e.target.checked)}
                    />
                    <label>Usuario</label>
                  </div>
                  <div className="form-check form-switch">
                    <input
                      type="checkbox"
                      value="rol"
                      onChange={(e) => handlePermisoChange(e.target.value, e.target.checked)}
                    />
                    <label>Rol</label>
                  </div>
                  <div className="form-check form-switch">
                    <input
                      type="checkbox"
                      value="proveedor"
                      onChange={(e) => handlePermisoChange(e.target.value, e.target.checked)}
                    />
                    <label>Proveedor</label>
                  </div>
                  <div className="form-check form-switch">
                    <input
                      type="checkbox"
                      value="producto"
                      onChange={(e) => handlePermisoChange(e.target.value, e.target.checked)}
                    />
                    <label>Producto</label>
                  </div>
                  <div className="form-check form-switch">
                    <input
                      type="checkbox"
                      value="cliente"
                      onChange={(e) => handlePermisoChange(e.target.value, e.target.checked)}
                    />
                    <label>Cliente</label>
                  </div>
                  <div className="form-check form-switch">
                    <input
                      type="checkbox"
                      value="compra"
                      onChange={(e) => handlePermisoChange(e.target.value, e.target.checked)}
                    />
                    <label>Compra</label>
                  </div>
                  <div className="form-check form-switch">
                    <input
                      type="checkbox"
                      value="orden"
                      onChange={(e) => handlePermisoChange(e.target.value, e.target.checked)}
                    />
                    <label>Orden</label>
                  </div>
                  <div className="modal-footer">
                    <CancelarModal modalToCancel={'myModal'} />
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

export default AgregarRol;