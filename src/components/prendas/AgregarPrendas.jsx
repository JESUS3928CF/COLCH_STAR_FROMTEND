//----------------TOMAS SANTIAGO VANEGAS SANCHEZ
//--------------------14 de noviembre 203

// Permitirar agregar una prenda, color mediante un formulario
//y se mostarra en la tabla de prendas

import CancelarModal from "../chared/CancelarModal";
import GuardarModal from "../chared/GuardarModal";
import clienteAxios from "../../config/axios";
import { useForm } from "react-hook-form";
import {
  validarEspaciosVacios,
  validarImagen,
} from "../../Validations/validations";
import Swal from "sweetalert2";
import AlertaError from "../chared/AlertaError";
import { useEffect, useState } from "react";
import axios from "axios";
import AgregarColors from "./AgregarColors";
import HeaderModals from '../chared/HeaderModals';
import styles from '../../pages/Productos.module.css'
import BotonNegro from "../chared/BotonNegro";




const AgregarPrendas = () => {
  const [Tallas, setTalla] = useState([]);
  const [Colors, setColors] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    axios.get("http://localhost:3000/api/colors").then((res) => {
      setColors(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3000/api/tallas").then((response) => {
      setTalla(response.data);
    });
  }, []);

  const guardarPrenda = handleSubmit(async (data) => {
    const formData = new FormData();
    formData.append("nombre", data.nombre.trim());
    formData.append("cantidad", data.cantidad.trim());
    formData.append("precio", data.precio.trim());
    formData.append("tipo_de_tela", data.tipo_de_tela.trim());
    formData.append("genero", data.genero.trim());
    formData.append("publicado", data.publicado);
    formData.append("imagen", data.imagen[0]);
    formData.append("tallas", data.tallas);
    formData.append("colores", data.colores);

    console.log(guardarPrenda);

    try {
      const res = await clienteAxios.post("/prendas", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(data);

      Swal.fire({
        title: "Prenda agregado",
        text: res.data.message,
        icon: "success",
      }).then(() => {
        location.reload();
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Hubo un error",
        icon: "Vuelva a intentarlo",
      }).then(location.reload());
    }
  });
  





  return (
    <>
      <div className="modal" id="myModal">
        <div className={`modal-dialog modal-dialog-centered  modal-lg ${styles.modal}`}>
          <div className="modal-content">
            <HeaderModals title={'Agregar Prendas'} />


            <div className="modal-body">
              <form
                className="row g-3 needs-validation"
                onSubmit={guardarPrenda}
              >
                <div className="col-md-6" name="nombre">
                  <label htmlFor="nombre" className="col-form-label">
                    Nombre:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="nombre"
                    placeholder="Nombre de la prenda"
                    title="Ingresa el nombre de la prenda"
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
                        message: 'Error no se puede numeros ni caracteres especiales en el nombre'
                      }
                    })}
                  />
                  {errors.nombre && (
                    <AlertaError message={errors.nombre.message} />
                  )}
                </div>

                <div className="col-md-6 ms-auto">
                  <label htmlFor="cantidad" className="col-form-label">
                    Cantidad:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="cantidad"
                    placeholder="Cantidad"
                    title="Ingresa la cantidad"
                    {...register("cantidad", {
                      required: {
                        value: true,
                        message: "La cantidad es obligatoria",
                      },
                      validate: (value) => {
                        return validarEspaciosVacios(value);
                      },
                      pattern: {
                        value: /^\d+$/,
                        message: 'No se peremiten letras'

                      }
                    })}
                  />
                  {errors.cantidad && (
                    <AlertaError message={errors.cantidad.message} />
                  )}
                </div>

                <div className="col-md-6 mt-2" name="precio">
                  <label htmlFor="precio" className="col-form-label">
                    Precio:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="precio"
                    placeholder="Precio"
                    title="Ingresa el precio"
                    {...register("precio", {
                      required: {
                        value: true,
                        message: "El precio es obligatoria",
                      },
                      validate: (value) => {
                        return validarEspaciosVacios(value);
                      },
                      pattern: {
                        value: /^\d+(\.\d{1,2})?$/,
                        message: 'No se permiten letras'
                      }
                    })}
                  />

                  {errors.precio && (
                    <AlertaError message={errors.precio.message} />
                  )}
                </div>

                <div className="col-md-6 ms-6 mt-4" name="Tela">
                  <label htmlFor="tipo_de_tela" className="col-from-label">
                    Tipo de tela:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="tipo_de_tela"
                    placeholder="Tipo de tela "
                    title="Ingresa el tipo de tela"
                    {...register("tipo_de_tela", {
                      required: {
                        value: true,
                        message: "El tipo de tela  es obligatoria",
                      },
                      validate: (value) => {
                        return validarEspaciosVacios(value);
                      },
                      pattern: {
                        value: /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ\s]+$/,
                        message: 'No puede ingresar numeros'
                      }
                    })}
                  />
                  {errors.tipo_de_tela && (
                    <AlertaError message={errors.tipo_de_tela.message} />
                  )}
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

                    <option
                      value=""
                      disabled={false}
                    > Selecciona una opción</option>
                    <option value="Mujer">Mujer</option>
                    <option value="Hombre">Hombre</option>
                  </select>

                  {errors.genero && (
                    <AlertaError
                      message={errors.genero.message}
                    />
                  )}

                </div>

                <div className="col-md-6" name="Publicado">
                  <label htmlFor="Publicar" className="col-form-control">
                    ¿Deseas publicarlo?
                  </label>

                  <select
                    name="publicado"
                    id=""
                    className="form-control"
                    title="Seleccione una opcion"
                    {...register("publicado", {
                      required: {
                        value: true,
                        message: "El estado de publicación es obligatorio",
                      },
                    })}
                  >


                    <option value="" >
                      Selecciona una opcion
                    </option>
                    <option value="true">Si</option>
                    <option value="false">No</option>
                  </select>

                  {errors.publicado && (
                    <AlertaError message={errors.publicado.message} />
                  )}
                </div>

                <div className="col-md-6" name="Publicado">
                  <label htmlFor="Publicar" className="col-form-control">
                    Talla
                  </label>

                  <select
                    name="tallas"
                    id=""
                    className="form-control"
                    title="Seleccione una opcion"
                    {...register("tallas", {
                      required: {
                        value: true,
                        message: "La talla es obligatoria",
                      },
                    })}
                  >

                    <option value="">Selecciona una opcion</option>

                    <option value={(Tallas.tallas = "S")}> S </option>
                    <option value={(Tallas.tallas = "M")}> M </option>
                    <option value={(Tallas.tallas = "L")}> L </option>
                    <option value={(Tallas.tallas = "XL")}> XL </option>
                    <option value={(Tallas.tallas = "Unica")}> Unica </option>
                  </select>

                  {errors.tallas && (
                    <AlertaError message={errors.tallas.message} />
                  )}

                </div>
                <div className="col-md-6" name="Archivo">
                  <label htmlFor="Archivo" className="col-from-label">
                    Imagen de la prenda:
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    name="imagen"
                    placeholder="PNG o JPG"
                    title="Ingrese la imagen de la prenda"
                    {...register("imagen", {
                      required: {
                        value: true,
                        message: "La Imagen es obligatoria",
                      },
                      validate: (value) => {
                        return validarImagen(value[0]);
                      },
                    })}
                  />

                  {errors.imagen && (
                    <AlertaError message={errors.imagen.message} />
                  )}
                </div>

                <div className="modal-footer">
                  <div className={styles.bottonDiseno}>
                    <BotonNegro text="Agregrar color" 
                    modalToOpen={'#crearColor'} 
                    modalClouse={'modal'} />               

                  </div>
                
                  <CancelarModal />
                  <GuardarModal />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <AgregarColors />
    </>
  );
};

export default AgregarPrendas;
