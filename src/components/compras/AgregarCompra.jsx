import "../../css-general/cssgeneral.css";
import "../../css-general/tailwind.min.css";
import "../../css-general/inicio_style.css";
import "../../css-general/table.min.css";
import React from "react";
import CancelarModal from "../chared/CancelarModal";
import GuardarModal from "../chared/GuardarModal";
import HeaderModals from "../chared/HeaderModals";
import BotonNegro from "../chared/BotonNegro";

const AgregarCompra = () => {
  return (
    <>
      <div>
        <div className="modal" id="myModal">
          <div className="modal-dialog modal-dialog-centered ">
            <div className="modal-content">
              <HeaderModals title={"Agregar Compra"} />
              <div>
                <div className="modal-body ">
                  <form
                    action=""
                    id="formularioagregarCompra"
                    className="row g-3 needs-validation"
                  >
                    <div className="col-md-6">
                      <label
                        htmlFor="nombreCompraAgregar"
                        className="col-form-label"
                      >
                        Nombre del proveedor
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="nombreCompraAgregar"
                        name="nombreCompraAgregar"
                        placeholder=". . ."
                      />
                    </div>

                    <div className="col-md-6">
                      <label
                        htmlFor="totalCompraAgregar"
                        className="col-form-label"
                      >
                        Fecha
                      </label>
                      <input
                        type="Date"
                        className="form-control"
                        id="totalCompraAgregar"
                      />
                    </div>

                    <div className="col-md-6">
                        <label
                          htmlFor="nombreCompraAgregar"
                          className="col-form-label"
                        >
                          Cantidad
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="nombreCompraAgregar"
                          name="nombreCompraAgregar"
                          placeholder=". . ."
                        />
                      </div>


                   

                  
                      

                      <div className="col-md-6">
                        <label
                          htmlFor="totalCompraAgregar"
                          className="col-form-label"
                        >
                          Precio
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="totalCompraAgregar"
                          placeholder=". . ."
                        />
                      </div>

                      <div className="col-md-6">
                        <label
                          htmlFor="totalCompraAgregar"
                          className="col-form-label"
                        >
                          Precio Total
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="totalCompraAgregar"
                          placeholder=". . ."
                        />
                      </div>

                     
                      <div className="col-md-6">
                        <label
                          htmlFor="totalCompraAgregar"
                          className="col-form-label"
                        >
                          Diseño
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="totalCompraAgregar"
                          placeholder=". . ."
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="totalCompraAgregar"
                          className="col-form-label"
                        >
                          Prendas
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="totalCompraAgregar"
                          placeholder=". . ."
                        />
                      </div>
                    </form>

                    <div className="modal-footer">
                      <CancelarModal modalToCancel="myModal" />
                      <GuardarModal />
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AgregarCompra;
