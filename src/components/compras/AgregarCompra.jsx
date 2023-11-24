import "../../css-general/cssgeneral.css";
import "../../css-general/tailwind.min.css";
import "../../css-general/inicio_style.css";
import "../../css-general/table.min.css";
import React from "react";
import CancelarModal from "../chared/CancelarModal";
import GuardarModal from "../chared/GuardarModal";
import HeaderModals from "../chared/HeaderModals";



const AgregarCompra = () => {
    return ( 
        <div>
            <div className="modal" id="myModal">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                         <HeaderModals title={"Agregar Compra"} />
                        <div>
                            <div className="modal-body ">
                                <form action="" id="formularioagregarCompra">
                                    <div className="form-label">
                                        <p className="detalleCompra">Agregar datos de los productos de la compra</p>
                                    </div>
                                    <div className="subFormulario">
                            
                                        <div className="mb-3">
                                            <label htmlFor="nombreCompraAgregar" className="col-form-label">Nombre:</label>
                                            <input type="text" className="form-control" id="nombreCompraAgregar" name="nombreCompraAgregar" placeholder="Ingresar nombre"/>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="cantidadCompraAgregar" className="col-form-label">Cantidad:</label>
                                            <input type="text" className="form-control" id="cantidadCompraAgregar" name="cantidadCompraAgregar" placeholder="Ingresar cantidad"/>

                                        </div>
                                    </div>
                                    <div className="subFormulario">
                                        <div className="mb-3">
                                            <label htmlFor="precioCompraAgregar" className="col-form-label">Precio:</label>
                                            <input type="text" className="form-control" id="precioCompraAgregar" name="precioCompraAgregar"
                                                placeholder="Ingresar precio unitario del producto" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="totalCompraAgregar" className="col-form-label">Precio total:</label>
                                            <input type="text" className="form-control" id="totalCompraAgregar" placeholder="" value="100.000"/>
                                        </div>
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
        </div>
     );
}
 
export default AgregarCompra;