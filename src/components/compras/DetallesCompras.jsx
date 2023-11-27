import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { get, useForm } from "react-hook-form";
import HeaderModals from "../chared/HeaderModals";
import CancelarModal from "../chared/CancelarModal";
import GuardarModal from "../chared/GuardarModal";
import axios from "axios";

export const DetalleCompras = ({ detallesCompras }) => {
  const { setValue } = useForm();

  const [detalle, setDetalle] = useState([]);
  const [proveedor, setProveedor] = useState([]);
  const [prendas, setPrendas]= useState([])



  useEffect(() => {
    axios.get("http://localhost:3000/api/compraDetalles").then((res) => {
      setDetalle(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3000/api/proveedores").then((res) => {
      setProveedor(res.data);
    });
  },[]);

  useEffect(()=>{
    axios.get('http://localhost:3000/api/prendas').then((res)=>{
      setPrendas(res.data)
    })
  },[])

const R = detalle.find(detalles => detalles.fk_compra === detallesCompras.id_compra)?.fk_prenda

// const P = prendas.find(prenda=> prenda.id_prenda === R.fi)?.nombre

// console.log(detallesCompras)
// console.log(R)

  return (
    <div>
      <div className="modal" id="modalDetalleCompra">
        <div className="modal-dialog modal-dialog-centered ">
          <div className="modal-content">
            <HeaderModals title={"Detalles compra"} />
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
                    <br />
                    <label htmlFor="">
                      { proveedor.find(proveedores => proveedores.id_proveedor === detallesCompras.fk_proveedor)?.nombre

                      }
                    </label>
                  </div>

                  <div className="col-md-6">
                    <label
                      htmlFor="totalCompraAgregar"
                      className="col-form-label"
                    >
                      Fecha
                    </label>
                    <br />
                    <label htmlFor="">

                      {detallesCompras.fecha}</label>
                  </div>

                  <div className="col-md-6">
                    <label
                      htmlFor="nombreCompraAgregar"
                      className="col-form-label"
                    >
                      Cantidad
                    </label>
                    <br />
                    <label htmlFor="">{detalle.find(detalles=> detalles.id_detalle_compra === detallesCompras.id_compra )?.cantidad}</label>
                  </div>

                  <div className="col-md-6">
                    <label
                      htmlFor="totalCompraAgregar"
                      className="col-form-label"
                    >
                      Precio
                    </label>
                    <br />
                    <label htmlFor="">{detalle.find(detalles=> detalles.id_detalle_compra === detallesCompras.id_compra)?.precio}</label>
                  </div>

                  <div className="col-md-6">
                    <label
                      htmlFor="totalCompraAgregar"
                      className="col-form-label"
                    >
                      Precio Total
                    </label>
                    <br />
                    <label htmlFor="">{detallesCompras.total_de_compra}</label>
                  </div>

                  <div className="col-md-6">
                    <label
                      htmlFor="totalCompraAgregar"
                      className="col-form-label"
                    >
                      Diseño
                    </label>
                    <br />
                    <label htmlFor="">{detalle.find(detalles=> detalles.id_detalle_compra === detallesCompras.id_compra)?.diseno}</label>
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="totalCompraAgregar"
                      className="col-form-label"
                    >
                      Prendas
                    </label>
                    <br />

                    <label htmlFor="">{prendas.find(prenda => prenda.id_prenda === R )?.nombre} </label>
                    

                    <br />
                    <label htmlFor=""></label>
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

DetalleCompras.propTypes = {
  detallesCompras: PropTypes.object.isRequired,
};
