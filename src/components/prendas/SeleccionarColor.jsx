import axios from "axios";
import { useForm } from "react-hook-form";
import CancelarModal from "../chared/CancelarModal";
import GuardarModal from "../chared/GuardarModal";
import HeaderModals from "../chared/HeaderModals";
import { validarEspaciosVacios } from "../../Validations/validations";
import AlertaError from "../chared/AlertaError";
import Swal from "sweetalert2";
import BotonNegro from "../chared/BotonNegro";
import { useEffect, useState } from "react";
import logo from "../../imgNavbar/cruz.png";
import style from "../../pages/Productos.module.css";
import useColors from "../../hooks/useColors";

const SeleccionarColors = ({ handleClose, handleShow }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { agregarColors, eliminarColors, setColores } = useColors();
  const [selectColorsName, setSelectColorsName] = useState([]);

  const eliminarColors01 = (index) => {
    const newColors = [...selectColorsName];
    newColors.splice(index, 1);
    setSelectColorsName(newColors);
    eliminarColors(index);
  };

  const agregarNuevoColor = (data) => {


      // Validar si el color ya está seleccionado
      if (selectColorsName.some((color) => color.id_color === data.id_color)) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Este color ya ha sido seleccionado.",
        });
        return; // Detener la función si el color ya está seleccionado
      }
    console.log(data);
    agregarColors(data);




    const newColor = colorss.find(
      (colores) => colores.id_color == data.id_color
    );
    setSelectColorsName([...selectColorsName, newColor]);

    console.log(selectColorsName)
  };

  const [colorss, setColors] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/colors").then((res) => {
      setColors(res.data);
    });
  }, []);

  return (
    <>
      <div
        className="modal fade"
        id="crearColor"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel2"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <HeaderModals
              title="Agregar colores"
              handleClose={() => {
                reset();
                handleClose();
                setSelectColorsName([]);
                setColores([]);
                reset();
              }}
            />
            <div className="modal-body">
              <form
                onSubmit={handleSubmit(agregarNuevoColor)}
                className="row g-3 needs-validation"
              >
                <div className="col-md-6">
                  <label htmlFor="rol" className="col-form-label">
                    {" "}
                    Colores
                  </label>
                  <select
                    className="form-control" // Allow multiple selections
                    {...register("id_color", {
                      required: {
                        value: true,
                        message: "Debe seleccionar al menos un color",
                      },
                    })}
                  >
                    <option value="">Seleccionar colores</option>
                    {colorss.map((F) => (
                      <option key={F.id_color} value={F.id_color}>
                        {F.color}
                      </option>
                    ))}
                  </select>

                  {errors.id_color && (
                    <AlertaError message={errors.id_color.message} />
                  )}

                  <div className="col-md-5 ml-6 mt-3">
                    <p>Colores seleccionados</p>

                    {selectColorsName.map((colores, index) => (
                      <div key={index}>
                        <p>
                          <span>-{colores.color}</span>

                          <span onClick={() => eliminarColors01(index)}>
                            <img src={logo} alt="" className={style.logoimg} />
                          </span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="modal-footer">
                  <div style={{ marginRight: 129 }}>
                    <BotonNegro
                      text="Crear color"
                      modalToOpen={"#myModalColors"}
                      modalClouse={"modal"}
                      onClick={handleClose}
                    />
                  </div>
                  <BotonNegro
                    text={"Regresar"}
                    onClick={handleShow}
                    modalClouse={"modal"}
                  />
                  <GuardarModal />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SeleccionarColors;
