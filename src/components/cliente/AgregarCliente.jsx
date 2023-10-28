import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import CancelarModal from '../chared/CancelarModal';
import GuardarModal from '../chared/GuardarModal';
import AlertaError from '../chared/AlertaError';

const AgregarCliente = () => {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, 
  } = useForm();


  const onSubmit = async (data) => {
    try {
      // Send the form data to your API
      await axios.post('http://localhost:3000/api/clientes', data);

      // Reset the form after a successful submission
      reset();

      // Close the modal (Assuming you are using Bootstrap modal)
      const modal = document.getElementById('myModal');
      const modalInstance = bootstrap.Modal.getInstance(modal);
      modalInstance.hide();

      // Reload the page if necessary
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="modal" id="myModal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="agregar agr">
              <h5 className="modal-title" id="exampleModalLabel">
                Agregar cliente
              </h5>
              <button
                type="button"
                id="xAgregar"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="formulario">
              <div className="modal-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-3">
                    <label htmlFor="nombre" className="col-form-label">
                      Nombre:*
                    </label>
                    <input
                      name="nombre"
                      type="text"
                      className="form-control"
                      placeholder=". . ."
                      {...register('nombre', {
                        required: 'El nombre es obligatorio',
                      })}
                    />
                    {errors.nombre && (
                      <AlertaError message={errors.nombre.message} />
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="apellido" className="col-form-label">
                      Apellido:*
                    </label>
                    <input
                      name="apellido"
                      type="text"
                      className="form-control"
                      placeholder=". . ."
                      {...register('apellido', {
                        required: 'El apellido es obligatorio',
                      })}
                    />
                    {errors.apellido && (
                      <AlertaError message={errors.apellido.message} />
                    )}
                  </div>
                  <div className="mb-3">
                  <label htmlFor="cedula" className="col-form-label">
                    Cedula:*
                  </label>
                  <input
                    name="cedula"
                    type="text"
                    className="form-control"
                    placeholder=". . ."
                    {...register('cedula', {
                      required: 'La cedula es obligatoria',
                    })}
                  />
                  {errors.cedula && (
                    <AlertaError message={errors.cedula.message} />
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="telefono" className="col-form-label">
                    Teléfono:*
                  </label>
                  <input
                    name="telefono"
                    type="text"
                    className="form-control"
                    placeholder=". . ."
                    {...register('telefono', {
                      required: 'El teléfono es obligatorio',
                    })}
                  />
                  {errors.telefono && (
                    <AlertaError message={errors.telefono.message} />
                  )}
                </div>
                <div className="mb-3">
                <label htmlFor="email" className="col-form-label">
                  Email:*
                </label>
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder=". . ."
                  {...register('email', {
                    required: 'El email es obligatorio',
                  })}
                />
                {errors.email && (
                  <AlertaError message={errors.email.message} />
                )}
              </div>
              <div className="mb-3">
            <label htmlFor="direccion" className="col-form-label">
              Dirección:*
            </label>
            <input
              name="direccion"
              type="text"
              className="form-control"
              placeholder=". . ."
              {...register('direccion', {
                required: 'La dirección es obligatoria',
              })}
            />
            {errors.direccion && (
              <AlertaError message={errors.direccion.message} />
            )}
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
      </div>
    </div>
  );
};

export default AgregarCliente;
