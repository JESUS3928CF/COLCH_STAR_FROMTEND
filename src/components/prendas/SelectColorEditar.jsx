import axios from "axios";
import { useForm } from "react-hook-form";
import GuardarModal from "../chared/GuardarModal";
import HeaderModals from "../chared/HeaderModals";
import BotonNegro from "../chared/BotonNegro";
import { useEffect, useState } from "react";
import logo from "../../imgNavbar/cruz.png";
import style from "../../pages/Productos.module.css";
import useColors from "../../hooks/useColors";
import usePrendas from "../../hooks/usePrendas";
import { Modal } from "react-bootstrap";

const SeleccionarColorsEditar = ({ showw, handleClosee, detallesPrendas }) => {
  const {
    register,
    handleSubmit,
    formState: { error },
    reset,
  } = useForm();

  const { agregarColors, eliminarColors, setColores, colors, colorsDb } =
    useColors();

  const eliminarColors01 = (index) => {
    const NewColors = [...selectColorsNombre];
    NewColors.splice(index, 1);
    setSelectColorsNombre(NewColors);

    eliminarColors(index);
  };
  const { selectColorsNombre, setSelectColorsNombre } = usePrendas();

  const agregarNewColors = (data) => {
    console.log(data);

    agregarColors(data);

    const newColors = colorsDb.find(
      (colorss) => colorss.id_color == data.id_color
    );

    console.log(newColors);

    setSelectColorsNombre([...selectColorsNombre, newColors]);
    console.log(setSelectColorsNombre([...selectColorsNombre, newColors]));
  };

  // const [colorss, setColors] = useState([]);

  // useEffect(() => {
  //   axios.get("http://localhost:3000/api/colors").then((res) => {
  //     setColors(res.data);
  //   });

  // }, []);

  useEffect(() => {
    if (detallesPrendas && detallesPrendas.color) {
      setSelectColorsNombre(detallesPrendas.color);
      setColores(detallesPrendas.color);
    }
  }, [detallesPrendas.color]);

  console.log(detallesPrendas.color);

  return (
    <>
      <Modal
        show={showw}
        onHide={() => {
          reset();
          handleClosee();
        }}
        className="modal d-flex align-items-center justify-content-center"
        id="crearColorEditar"
      >
        <div className="modal-content">
          <HeaderModals
            title={"Editar color"}
            handleClose={() => {
              reset();
              handleClosee();
            }}
          />
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
                  <option value="">Seleccionar colores</option>
                  {colorsDb.map((F) => (
                    <option key={F.id_color} value={F.id_color}>
                      {F.color}
                    </option>
                  ))}
                </select>

                <div className="col-md-5 ml-6 mt-3">
                  <p>Colores seleccionados</p>

                  {selectColorsNombre.map((colores, index) => (
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
                <div style={{ marginRight: 129 }}></div>
                <BotonNegro
                  text={"Regresar"}
                  onClick={() => {
                    handleClosee(); // Asumiendo que handleClosee es una función que cierra el modal
                  }}
                  modalClouse={"modal"}
                />
                <GuardarModal />
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SeleccionarColorsEditar;
