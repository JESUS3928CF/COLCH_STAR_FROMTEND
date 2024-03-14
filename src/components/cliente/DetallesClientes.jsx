import React from "react";
import PropTypes from "prop-types";
import HeaderModals from "../chared/HeaderModals";
import "../../css-general/cssgeneral.css";
import styles from "../../pages/Clientes.module.css";

export const DetallesClientes = ({ detallesClientes }) => {
  return (
    <div className="modal" id="modalDetalleCliente">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <HeaderModals title="Detalle del cliente" />
          <div className="formulario">
            <div className="modal-body">
              <div className="container">
                <div className="col">
                  <form className="row g-3 needs-validation">
                    <div className="mb-3" name="divIdentificacion">
                      <label
                        htmlFor="identificacionEditar"
                        className="col-form-label"
                      >
                        Identificación:
                      </label>
                      <br />

                      <div className={styles.identi}>
                      {/* Se utiliza un operador lógico (&&) para verificar si tanto detallesClientes.tipoIdentificacion
                      como detallesClientes.identificacion tienen valores. Si ambos tienen valores, se crea una cadena
                      que concatena ambos valores, de lo contrario, se proporciona una cadena vacía como valor predeterminado. */}
                        <input
                          type="text"
                          className="form-control"
                          defaultValue={
                            detallesClientes.tipoIdentificacion &&
                            detallesClientes.identificacion
                              ? `${detallesClientes.tipoIdentificacion} ${detallesClientes.identificacion}`
                              : ""
                          }
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="nombre" className="col-form-label">
                        Nombres:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={detallesClientes.nombre}
                        readOnly
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="apellido" className="col-form-label">
                        Apellidos:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={detallesClientes.apellido}
                        readOnly
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="telefono" className="col-form-label">
                        Teléfono:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={detallesClientes.telefono}
                        readOnly
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="direccion" className="col-form-label">
                        Dirección:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={detallesClientes.direccion}
                        readOnly
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="col-form-label">
                      Correo electrónico:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={detallesClientes.email}
                        readOnly
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

DetallesClientes.propTypes = {
  detallesClientes: PropTypes.object.isRequired,
};
