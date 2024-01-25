//----------------TOMAS SANTIAGO VANEGAS SANCHEZ
//--------------------14 de noviembre 203

// Permitirar agregar una prenda, color mediante un formulario
//y se mostarra en la tabla de prendas

import CancelarModal from "../chared/CancelarModal";
import GuardarModal from "../chared/GuardarModal";
import { useForm } from "react-hook-form";

import {
  validarEspaciosVacios,
  validarImagen,
} from "../../Validations/validations";
import Swal from "sweetalert2";
import AlertaError from "../chared/AlertaError";
import { useEffect, useState } from "react";
import axios, { formToJSON } from "axios";
import AgregarColors from "./AgregarColors";
import HeaderModals from "../chared/HeaderModals";
import BotonNegro from "../chared/BotonNegro";
import SeleccionarColors from "./SeleccionarColor";
import {Modal} from "react-bootstrap";
import usePrendas from "../../hooks/usePrendas";
import BotonVerde from "../chared/BotonVerde";
import useColors from "../../hooks/useColors";

const AgregarPrendas = () => {
  const [Tallas, setTalla] = useState([]);



  const { colors } = useColors();
  const {agregarPrendas, Prendas,setSelectColorsNombre,selectColorsNombre} = usePrendas()


  const [show, setShow] = useState(false);

  const handleClose = () => { setShow(false) };
  const handleShow = () => setShow(true);

  // funcion para cerrar modal de AgregarDiseñosModal
  const [showw, setShoww] = useState(false);

  const handleClosee = () => {
      setShoww(false), handleShow();
  };
  const handleShoww = () => {
      setShoww(true), handleClose();
  };
  const handleClosex = () => {
      setShoww(false);
  };
  

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
    reset,
  } = useForm({
    mode: 'onChange',
  });





  useEffect(() => {
    axios.get("http://localhost:3000/api/tallas").then((response) => {
      setTalla(response.data);
    });
  }, []);



  const onSubmit = async (data) => {
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

    // console.log(setSelectColorsNombre)



    if (selectColorsNombre==''){
      Swal.fire({
        title: "Error",
        text: "Seleccione los colores",
        icon: "error",
      })

    }else{

      console.log(data)

      agregarPrendas({
        nombre: nombre.trim(),
        cantidad: cantidad.trim(),
        precio: precio.trim(),
        tipo_de_tela: tipo_de_tela.trim(),
        genero: genero,
        imagen: imagen[0],
        publicado: publicado,
        tallas: tallas,
        colores: JSON.stringify(colors),
      },

      reset,
      handleClose
    
      )}
    }

  return (
    <>
      <BotonVerde text={'Agregar Prendas'} onClick={handleShow}/>
      <Modal show={show}
      onHide={()=>{
        reset();
        handleClose()      
      }}

      
      id="myModal"
      >
              
          <div className='modal-lg '>
            <HeaderModals title={"Agregar Prenda"} handleClose={()=>{
              reset()
              handleClose()
              setSelectColorsNombre([])
            }} />

            <div className="modal-body ">
              <form
                className="row g-3 needs-validation"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="col-md-6" name="nombre">
                  <label htmlFor="nombre" className="col-form-label">
                    Nombre:  *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="nombre"
                    placeholder=". . ."
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
                        message:
                          "Error no se puede numeros ni caracteres especiales en el nombre",
                      },
                    })}
                    onChange={(e)=>{
                      setValue('nombre', e.target.value),
                      trigger('nombre')

                    }}
                  />
                  {errors.nombre && (
                    <AlertaError message={errors.nombre.message} />
                  )}
                </div>

                <div className="col-md-6 ms-auto">
                  <label htmlFor="cantidad" className="col-form-label">
                    Cantidad:  *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="cantidad"
                    placeholder=". . ."
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
                        message: "No se peremiten letras",
                      },
                    })}
                    onChange={(e)=>{
                      setValue('cantidad', e.target.value),
                      trigger('cantidad')

                    }}
                  />
                  {errors.cantidad && (
                    <AlertaError message={errors.cantidad.message} />
                  )}
                </div>

                <div className="col-md-6 mt-2" name="precio">
                  <label htmlFor="precio" className="col-form-label">
                    Precio:  *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="precio"
                    placeholder=". . ."
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
                        message: "No se permiten letras",
                      },
                    })}
                    onChange={(e)=>{
                      setValue('precio', e.target.value),
                      trigger('precio')

                    }}
                  />

                  {errors.precio && (
                    <AlertaError message={errors.precio.message} />
                  )}
                </div>

                <div className="col-md-6 mt-4">
                  <label htmlFor="searchInput">Tipo de tela:  *</label>
                  <input
                    type="text "
                    name="Telasss"
                    id="searchInput"
                    list="Telasss"
                    placeholder=". . ."
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
                    Género:  *
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
                    onChange={(e)=>{
                      setValue('genero', e.target.value),
                      trigger('genero')

                    }}
                  >
                    <option value="" disabled={false}>
                      {" "}
                      Selecciona una opción 
                    </option>
                    <option value="Mujer">Mujer</option>
                    <option value="Hombre">Hombre</option>
                    <option value='UniSexo'>Unisexo</option>
                  </select>

                  {errors.genero && (
                    <AlertaError message={errors.genero.message} />
                  )}
                </div>

                <div className="col-md-6" name="Publicado">
                  <label htmlFor="Publicar" className="col-form-control">
                    ¿Deseas publicarlo?  *
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
                    <option value="">Selecciona una opción</option>
                    <option value="true">Si</option>
                    <option value="false">No</option>
                  </select>

                  {errors.publicado && (
                    <AlertaError message={errors.publicado.message} />
                  )}
                </div>

                <div className="col-md-6" name="Publicado">
                  <label htmlFor="Publicar" className="col-form-control">
                    Talla:  *
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
                    <option value="">Selecciona una opción</option>

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
                    Imagen de la prenda:  *
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    name="imagen"
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
                  <div>
                    <BotonNegro
                      text="Agregrar color"
                      onClick={handleShoww}
                      />
                  </div>

                                  

                  <CancelarModal
                   reset={reset} handleClose={handleClose}
                   setSelectColorsNombre={setSelectColorsNombre} />
                  <GuardarModal />
                </div>
              </form>
            </div>
          </div>
          </Modal>


      <SeleccionarColors  handleClosee={handleClosee}
                handleShoww={handleShoww}
                showw={showw}
                handleClosex={handleClosex} />
    
      
    </>
  );
};

export default AgregarPrendas;
