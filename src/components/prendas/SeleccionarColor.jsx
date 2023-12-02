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
import { useColorsContex } from "../../context/ColorsProvider";

const SeleccionarColors = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { agregarColors, eliminarColors, setColores } = useColorsContex();

  const eliminarColors01 = (index) => {
    const newColors = [...selectColorsName];
    newColors.splice(index, 1);
    selectColorsName(newColors);
    eliminarColors(index);
  };

  const [selectColorsName, setSelectColorsName] = useState([]);


  const agregarNuevoColor = (data) => {
    console.log(data)
    agregarColors(data);

    const newColor = colorss.find(
      (colores) => colores.id_color == data.id_color
    );
    setSelectColorsName([...selectColorsName, newColor]);
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
                reset(), handleClose();
                setSelectColorsName([]);
                setColores([]);
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
                    <option value="" disabled>
                      Seleccionar colors
                    </option>
                    {colorss.map((F) => (
                      <option key={F.id_color} value={F.id_color}>
                        {F.color}
                      </option>
                    ))}
                  </select>

                  <div className="col-md-5 ml-6 mt-3">
                    {selectColorsName.map((color, index) => (
                      <p key={index}>
                        {color.color}{' '}

                        <span onClick={()=> eliminarColors01(index)} >

                          {''}X{''}
                          
                        </span>
                      </p>
                     
                    ))}
                  </div>
                </div>

                <div className="modal-footer">
                  <div style={{ marginRight: 129 }}>
                    <BotonNegro
                      text="Crear color"
                      modalToOpen={"#myModalColors"}
                      modalClouse={"modal"}
                    />
                  </div>
                  <BotonNegro
                    text={"Regresar"}
                    modalToOpen={"#myModal"}
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
