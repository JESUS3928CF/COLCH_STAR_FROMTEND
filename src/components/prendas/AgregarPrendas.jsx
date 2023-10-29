import { useState } from "react";
import CancelarModal from "../chared/CancelarModal";
import GuardarModal from "../chared/GuardarModal";
import HeaderModals from "../chared/HeaderModals";
import clienteAxios from "../../config/axios";
import AlertaError from "../chared/AlertaError";

const AgregarPrendas = () => {
  // const [prendas,setPrendas]=useState({

  //     nombre: '',
  //     cantidad: null,
  //     precio: null,
  //     tipo_de_tela: '',
  //     publicado: null ,
  //     estado:null,
  // })

  return (
    <div>
      <div className="modal" id="myModal">
        <div className="modal-dialog modal-dialog-centered" >
          <div className="modal-content" >
            <div className="agregar agr">
              <h5 className="modal-title" id="exampleModalLabel">
                Agregar Prenda
              </h5>
              <button type="button"id="xAgregar" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

              <form className="row g-3 needs-validation" action="" id="">
                <div className="col-md-6" name="nombre">
                  <label htmlFor="nombre" className="col-form-label"> Nombre: </label>
                  <input type="text" className="form-control" name="nombre" placeholder="Nombre de la prenda" title="Ingresa el nombre de la prenda"/>
                </div>

                <div className="col-md-6 ms-auto" >
                  <label htmlFor="cantidad" className="col-form-label">Cantidad:</label>
                  <input type="text" className="form-control" name="Cantidad" placeholder="Cantidad" title="Ingresa la cantidad" />
                  </div>

                
                <div className="col-md-6 mt-2" name="precio">
                  <label htmlFor="precio" className="col-form-label">Precio:</label>
                  <input type="text" className="form-control" name="Precio" placeholder="Precio" title="Ingresa el precio" />
                </div>

                <div className="col-md-6 ms-6 mt-4" name="TipoTela">
                  <label htmlFor="tipoTela" className="col-from-label">Tipo de tela:</label>
                  <input type="text" className="form-control" name="TipodeTela" placeholder="Tipo de tela " title="Ingresa el tipo de tela" />
                </div>

                <div className="mb-3" name="Archivo">
                  <label htmlFor="Archivo" className="col-from-label">Imagen de la prenda:</label>
                  <input type="file" className="form-control" name="Archivo" placeholder="PNG o JPG" title="Ingrese la imagen de la prenda" />

                </div>

                <div className="mb-3" name="Publicado">
                  <label htmlFor="Publicar" className="col-form-control">¿Deseas publicarlo?</label>

                  <select name="" id="" className="form-control" title="Seleccione una opcion"> 
                    <option value="" disabled selected>Selecciona una opcion</option>
                    <option value="true">Si</option>
                    <option value="false">No</option>
                  </select>
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
  );
};

export default AgregarPrendas;
