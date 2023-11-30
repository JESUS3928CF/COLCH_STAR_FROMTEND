import { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";
import HeaderModals from "../chared/HeaderModals";
import {
  validarBooleanos,
  validarEspaciosVacios,
  validarImagen,
} from "../../Validations/validations";
import AlertaError from "../chared/AlertaError";
import CancelarModal from "../chared/CancelarModal";
import GuardarModal from "../chared/GuardarModal";
import PropTypes from "prop-types";
import axios from "axios";
import BotonNegro from "../chared/BotonNegro";
import styles from "../../pages/Productos.module.css";
import SeleccionarColorsEditar from "./SelectColorEditar";
import { useColorsContex } from "../../context/ColorsProvider";

const EditarPrendas = ({ detallesPrendas }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
    reset,
  } = useForm();

  const [Colors, setColors] = useState([]);
  const [Prendas , setPrendas]= useState([])
  const {colors}= useColorsContex()
  const [Tallas, setTalla] = useState([]);


  useEffect(()=>{
    axios.get("http://localhost:3000/api/prendas").then((res)=>{
      setPrendas(res.data);
    })
  },[])

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

  useEffect(() => {
    if (detallesPrendas) {
      setValue('id_prenda', detallesPrendas.id_prenda)
      setValue("nombre", detallesPrendas.nombre);
      setValue("cantidad", detallesPrendas.cantidad);
      setValue("precio", detallesPrendas.precio);
      setValue("tipo_de_tela", detallesPrendas.tipo_de_tela);
      setValue("genero", detallesPrendas.genero);
      setValue("publicado", detallesPrendas.publicado);
      setValue("tallas", detallesPrendas.Talla);
      setValue("colores", detallesPrendas.color);
      console.log(detallesPrendas.color)

    }
  }, [detallesPrendas]);

  const onSubmitt = async (data)=>{
    const {
      nombre,
      cantidad,
      precio,
      genero,
      imagen,
      tipo_de_tela,
      publicado,
      tallas,
    } = data;


if(colors==''){
  alert("Seleccjione un color")
}else {
  try {
    const res = await clienteAxios.put(
      `http://localhost:3000/api/prendas/${detallesPrendas.id_prenda}`,
      {
        nombre: nombre.trim(),
        cantidad: cantidad,
        precio: precio.trim(),
        tipo_de_tela: tipo_de_tela.trim(),
        genero: genero,
        imagen: imagen[0],
        publicado: publicado,
        tallas: tallas,
        colores: JSON.stringify(colors),
      },

      { headers: { "Content-Type": "multipart/form-data" } }
    );

    Swal.fire({
      title: "Prenda Actualizada",
      text: res.data.message,
      icon: "success",
    }).then(() => {
      location.reload();
    });
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: "Error al actualizar",
      icon: "error",
    }).then(() => {
      console.log(error)
      location.reload();

    });
  }
}

  
  };

  
  return (
    <>
    <div className="modal" id="modalEditarPrenda">
      <div className="modal-dialog modal-dialog-centered modal-lg ">
        <div className="modal-content">
          <HeaderModals title="Editar prendas" />
          <div className="modal-body">
            <form onSubmit={handleSubmit(onSubmitt)} className="row g-3 needs-validation">
              <div className="col-md-6">
                <label htmlFor="nombre" className="col-from-label">
                  Nombre
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  className="form-control"
                  placeholder="Nombre"
                  title="¿Deseas editar el nombre?"
                  {...register("nombre", {
                    required: {
                      value: true,
                      message: "El nombres es obligatorio",
                    },
                    validate: (value) => {
                      return validarEspaciosVacios(value);
                    },
                    pattern: {
                      value: /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ\s]+$/,
                      message: "No puede ingresar numeros",
                    },
                  })}

                  onChange={(e)=>{setValue('nombre', e.target.value), trigger('nombre')}
                }
                />

                {errors.nombre && (
                  <AlertaError message={errors.nombre.message} />
                )}
              </div>

              <div className="col-md-6">
                <label htmlFor="cantidad" className="col-from-label">
                  Cantidad
                </label>
                <input
                  type="text"
                  id="cantidad"
                  name="cantidad"
                  className="form-control"
                  placeholder="Cantidad"
                  title="¿Deseas editar la cantidad?"
                  {...register("cantidad", {
                    required: {
                      value: true,
                      message: "La cantidad es obligatorio",
                    },
                    validate: (value) => {
                      return validarEspaciosVacios(value);
                    },
                    pattern: {
                      value: /^\d+$/,
                      message: 'No se permiten letras'
                    }
                  })}
                  onChange={(e)=>{setValue('cantidad', e.target.value), trigger('cantidad')}}
                />

                {errors.cantidad && (
                  <AlertaError message={errors.cantidad.message} />
                )}
              </div>

              <div className="col-md-6">
                <label htmlFor="precio" className="col-from-label">
                  Precio
                </label>
                <input
                  type="text"
                  id="precio"
                  name="precio"
                  className="form-control"
                  placeholder="Precio"
                  title="¿Deseas editar el precio?"
                  {...register("precio", {
                    required: {
                      value: true,
                      message: "El precio es obligatorio",
                    },
                    validate: (value) => {
                      return validarEspaciosVacios(value)
                    },
                    pattern: {
                      value: /^\d+(\.\d{1,2})?$/,
                      message: 'No se permiten letras'
                    }

                  })}
                  onChange={(e)=>{setValue('precio', e.target.value), trigger('precio')}}
                />
                {errors.precio && (
                  <AlertaError message={errors.precio.message} />
                )}
              </div>

              <div className="col-md-6 mt-4">
                  <label htmlFor="searchInput">Tipo de tela:</label>
                  <input
                    type="text "
                    name="Telasss"
                    id="searchInput"
                    list="Telasss"
                    placeholder="Ingrese el tipo de tela"
                    className="form-control"
                    {...register("tipo_de_tela", {
                      required: {
                        value: true,
                        message: "El tipo de tela  es obligatorio",
                      },
                      validate: (value) => {
                        return validarEspaciosVacios(value);
                      },
                      pattern: {
                        value: /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ\s]+$/,
                        message:
                          "Error no se puede numeros ni caracteres especiales en el tipo de tela",
                      },
                    })}
                    onChange={(e)=>{
                      setValue('tipo_de_tela', e.target.value),
                      trigger('tipo_de_tela')

                    }}
                  />

                  {errors.tipo_de_tela && (
                    <AlertaError message={errors.tipo_de_tela.message} />
                  )}

                  <datalist id="Telasss">
                    {Array.from(
                      new Set(Prendas.map((prenda) => prenda.tipo_de_tela))
                    ).map((tipo, index) => (
                      <option key={index} value={tipo}>
                        {tipo}
                      </option>
                    ))}
                  </datalist>
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
                    value="Seleccione una opción"
                    disabled={true}
                  ></option>
                  <option value="Mujer">Mujer</option>
                  <option value="Hombre">Hombre</option>
                </select>
                {errors.genero && (
                  <AlertaError message={errors.genero.message} />
                )}
              </div>

              <div className="col-md-6">
                <label htmlFor="publicado" className="col-from-label">
                  ¿Deseas publicarlo?
                </label>
                <select
                  id="publicado"
                  name="publicado"
                  className="form-control"
                  title="Estado de la publicacion"
                  {...register('publicado',{
                    validate:(value)=> validarBooleanos(value)
                  })}
                  
                >
                  <option
                    value="Seleccione una opción"
                    disabled={true}
                  ></option>
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

                <div className="col-md-6">
                <label htmlFor="imagen" className="col-from-label">
                  Subir imagen
                </label>
                <input
                  type="file"
                  id="imagen"
                  name="imagen"
                  className="form-control"
                  title="Inserte un archivo PNG "
                  {...register("imagen", {
                    validate: (value) => validarImagen(value[0]),
                  })}
                />
              </div>

              <div className="modal-footer">
                  <div className={styles.bottonDiseno}>
                    <BotonNegro
                      text="Editar color"
                      modalToOpen={"#crearColorEditar"}
                      modalClouse={"modal"}
                    />
                  </div>

                  <CancelarModal  />
                  <GuardarModal />
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <SeleccionarColorsEditar />
    </>
  );
};

EditarPrendas.prototype = {
  detallesPrendas: PropTypes.object.isRequired,
};

export default EditarPrendas;
