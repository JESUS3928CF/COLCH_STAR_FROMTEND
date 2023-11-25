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

const SeleccionarColorsEditar = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { agregarColors, colors } = useColorsContex();
  const [selectColorsName, setSelectColorsName] = useState("");


  const agregarNewColors = (data) => {
    agregarColors(data);

    let selectColors = [];

    for (let i = 0; i < colors.length; i++) {
      const matchingColors = colorss.find(
        (Colors) => Colors.id_color == colors[i].id_color
      );
      if (matchingColors) {
        selectColors.push(matchingColors.color);
      }
    }
    setSelectColorsName(selectColors);
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
        id="crearColorEditar"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel2"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <HeaderModals title={"Editar color"} />
            <div className="modal-body">
              <form
                onSubmit={handleSubmit(agregarNewColors)}
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
                        message: "Debe seleccionar al menos un diseño",
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
                    {selectColorsName && (
                      <div>
                        <br />
                        <div>{selectColorsName}</div>
                        <br />
                      </div>
                    )}
                  </div>
                </div>

                <div className="modal-footer">
                  <div style={{ marginRight: 129 }}>
                  </div>
                  <BotonNegro
                    text={"Cancelar"}
                    modalToOpen={"#modalEditarPrenda"}
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



export default SeleccionarColorsEditar;
