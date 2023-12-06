import axios from "axios";
import { useForm } from "react-hook-form";
import GuardarModal from "../chared/GuardarModal";
import HeaderModals from "../chared/HeaderModals";
import BotonNegro from "../chared/BotonNegro";
import { useEffect, useState } from "react";
import logo from '../../imgNavbar/cruz.png'
import style from '../../pages/Productos.module.css'
import useColors from "../../hooks/useColors";



const SeleccionarColorsEditar = ({handleClose, handleShow,detallesPrendas}) => {

  const {
    register,
    handleSubmit,
    formState: {error},
    reset
  } = useForm();

  const { agregarColors, eliminarColors, setColores } = useColors();
  const [selectColorsName, setSelectColorsName] = useState([]);

  const eliminarColors01= (index) =>{
    const NewColors = [...selectColorsName]
    NewColors.splice(index, 1)
    setSelectColorsName(NewColors)

    eliminarColors(index)


  }


  const agregarNewColors = (data) => {
    agregarColors(data);

const newColors = colorss.find ((colors)=> colors.id_color == data.id_color)

setSelectColorsName([...selectColorsName,newColors])
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
            <HeaderModals title={"Editar color"} handleClose={()=>{
              reset()
              handleClose()
              setSelectColorsName([])
              setColores([])
            }} />
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
                    <option value="" >
                      Seleccionar colores
                    </option>
                    {colorss.map((F) => (
                      <option key={F.id_color} value={F.id_color}>
                        {F.color}
                      </option>
                    ))}
                  </select>

                  <div className="col-md-5 ml-6 mt-3">
                    <p>
                      Colores seleccionados
                    </p>

                    {selectColorsName.map((colores, index)=>(
                      <div key={index}>
                      <p>

                        <span>
                          -{colores.color}
                        </span>

                        <span onClick={()=> eliminarColors01(index)}>

                          <img src={logo} alt=""  className={style.logoimg} />

                        </span>
                        
                        </p> 


                      </div>
                    ))}
                    
                  </div>
                </div>

                <div className="modal-footer">
                  <div style={{ marginRight: 129 }}>
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



export default SeleccionarColorsEditar;
