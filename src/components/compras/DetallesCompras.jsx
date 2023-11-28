import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { get, useForm } from "react-hook-form";
import HeaderModals from "../chared/HeaderModals";
import axios from "axios";
import { FcApproval, FcCancel } from "react-icons/fc";
import '../prendas/IconCss/style.Icon.css'




export const DetalleCompras = ({ detallesCompras }) => {
  const { setValue } = useForm();

  const [detalle, setDetalle] = useState([]);
  const [proveedor, setProveedor] = useState([]);
  const [prendas, setPrendas] = useState([]);




  const informacion = (detallesCompras) => {
    if (!detallesCompras.estado) {
      return <FcCancel />;
    } else {
      return <FcApproval />;
    }
  };

  useEffect(() => {
    axios.get("http://localhost:3000/api/compraDetalles").then((res) => {
      setDetalle(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3000/api/proveedores").then((res) => {
      setProveedor(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3000/api/prendas").then((res) => {
      setPrendas(res.data);
    });
  }, []);

  const fkPrenda = detalle.find(
    (detalles) => detalles.fk_compra === detallesCompras.id_compra
  )?.fk_prenda;

  const nombre = prendas.find(
    (prenda) => prenda.id_prenda === fkPrenda
  )?.nombre;

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
                      <b>Nombre del proveedor</b>
                    </label>
                    <br />

                    <input
                      type="text"
                      className="form-control"
                      defaultValue={
                        proveedor.find(
                          (proveedores) =>
                            proveedores.id_proveedor ===
                            detallesCompras.fk_proveedor
                        )?.nombre
                      }
                      readOnly
                    />
                  </div>

                  <div className="col-md-6">
                    <label
                      htmlFor="totalCompraAgregar"
                      className="col-form-label"
                    >
                      <b>Fecha de compra</b>
                    </label>
                    <br />

                    <input
                      type="text"
                      className="form-control"
                      defaultValue={detallesCompras.fecha}
                      readOnly
                    />
                  </div>

                  <div className="col-md-6">
                    <label
                      htmlFor="nombreCompraAgregar"
                      className="col-form-label"
                    >
                      <b>Cantidad</b>
                    </label>
                    <br />

                    <input
                      type="text"
                      className="form-control"
                      defaultValue={
                        detalle.find(
                          (detalles) =>
                            detalles.id_detalle_compra ===
                            detallesCompras.id_compra
                        )?.cantidad
                      }
                      readOnly
                    />
                  </div>

                  <div className="col-md-6">
                    <label
                      htmlFor="totalCompraAgregar"
                      className="col-form-label"
                    >
                      <b>Precio</b>
                    </label>
                    <br />

                    <input
                      type="text"
                      className="form-control"
                      defaultValue={
                        detalle.find(
                          (detalles) =>
                            detalles.id_detalle_compra ===
                            detallesCompras.id_compra
                        )?.precio
                      }
                      readOnly
                    />
                  </div>

                  <div className="col-md-6">
                    <label
                      htmlFor="totalCompraAgregar"
                      className="col-form-label"
                    >
                      <b>Precio Total</b>
                    </label>
                    <br />

                    <input
                      type="text"
                      className="form-control"
                      defaultValue={detallesCompras.total_de_compra}
                      readOnly
                    />

                    <label htmlFor=""></label>
                  </div>

                  <div className="col-md-6">
                    <label
                      htmlFor="totalCompraAgregar"
                      className="col-form-label"
                    >
                      <b>Producto comprado:</b>
                    </label>
                    <br />

                    <input
                      type="text"
                      className="form-control"
                      defaultValue={fkPrenda === null ? "Diseños" : nombre}
                      readOnly
                    />


                  </div>
                  <div className="col-md-6">
                            <label htmlFor="publicado" className="text">

                              <b>Publicado </b>
                            </label>
                            <div className='position'>
                              {informacion(detallesCompras)}
                            </div>
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
