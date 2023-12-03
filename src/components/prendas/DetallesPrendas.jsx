import PropTypes from "prop-types";
import HeaderModals from "../chared/HeaderModals";
import { FcApproval, FcCancel } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import "./IconCss/style.Icon.css";
import styles from "../../css-general/estilosReutilizables.module.css";

export const DetallesPrendas = ({ detallesPrendas }) => {
  const { setValue } = useForm();

  useEffect(() => {
    // console.log(detallesPrendas);
    if (detallesPrendas) {
      // console.log('Detalles:',detallesPrendas);
      setValue("publicado", detallesPrendas.publicado);
      setValue("estado", detallesPrendas.estado);
      setValue('colores', detallesPrendas.color)
    }
  },[detallesPrendas]);




  const informacion = (detallesPrendas) => {
    if (!detallesPrendas.publicado || !detallesPrendas.estado) {
      return <FcCancel />;
    } else {
      return <FcApproval />;
    }
  };

  return (
    <div className="modal" id="modalDetallePrendas">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <HeaderModals title="Detalle prendas" />

          <div className="formulario">
            <div className="modal-body">
              <div className="container">
                <div className="col">
                  <div className="row">
                    <div className="row gx-0">
                      <div className="col-md-6">
                        <a
                          href={`${import.meta.env.VITE_BACKEND_URL}/${
                            detallesPrendas.imagen
                          }`}
                          className={styles.contenedor_imagen}
                        >
                          {" "}
                          <img
                            src={
                              detallesPrendas.imagen
                                ? `${import.meta.env.VITE_BACKEND_URL}/${
                                    detallesPrendas.imagen
                                  }`
                                : ""
                            }
                            alt={detallesPrendas.imagen}
                            title="Ver imagen completa"
                          />
                        </a>
                      </div>
                      <div className="col-md-5 ml-6 mt-3">
                        <div className="card-body">
                          <h2 htmlFor="nombre" className="card-title">
                            {" "}
                            <b>Nombre:</b> {detallesPrendas.nombre}
                          </h2>
                          <h3 htmlFor="cantidad" className="card-title">
                            {" "}
                            <b>Cantidad:</b> {detallesPrendas.cantidad}
                          </h3>
                          <h3 htmlFor="precio" className="card-title">
                            {" "}
                            <b>Precio:</b> {detallesPrendas.precio}
                          </h3>
                          <h3 htmlFor="Tela" className="card-title">
                            {" "}
                            <b>Tipo de tela:</b> {detallesPrendas.tipo_de_tela}
                          </h3>
                          <h3 htmlFor="genero" className="card-title">
                            {" "}
                            <b>Genero:</b> {detallesPrendas.genero}
                          </h3>

                          <h3 htmlFor="Colores" className="card-title">
                            <b>Colores:</b>
                           
                            {detallesPrendas.color && detallesPrendas.color.map((color, index) => (
                              <div key={`${color.id_color}_${index}`}>
                                <span style={{ color: color.color }}>
                                  {color.color}
                                </span>
                              </div>
                            ))}

                          </h3>

                          <h3 htmlFor="tallas" className="card-title">
                            {""}
                            <b>Talla:</b>
                            {detallesPrendas.Talla}
                          </h3>

                          <div className="text-center mt-4">
                            <h3 htmlFor="publicado" className="card-title">
                              {" "}
                              <b>Publicado </b>
                            </h3>
                            <div className="tamanoIcon">
                              {informacion(detallesPrendas)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

DetallesPrendas.propTypes = {
  detallesPrendas: PropTypes.object.isRequired,
};
