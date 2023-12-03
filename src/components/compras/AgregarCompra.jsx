import "../../css-general/cssgeneral.css";
import "../../css-general/tailwind.min.css";
import "../../css-general/inicio_style.css";
import "../../css-general/table.min.css";
import "./Css/style.css"
import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import CancelarModal from "../chared/CancelarModal";
import GuardarModal from "../chared/GuardarModal";
import AlertaError from "../chared/AlertaError";
import Swal from "sweetalert2";
import { validarFecha } from "../../Validations/validations";
import HeaderModals from "../chared/HeaderModals";
import { useComprasContex } from "../../context/ComprasProvider";
import BotonNegro from '../chared/BotonNegro'


const AgregarCompras = () => {




  const handleClose = () => setShow(false);

  const {
    register, //Registra o identifica cada elemento o cada input
    handleSubmit, //Para manejar el envió del formulario
    formState: { errors }, //Ver errores que tiene el formulario
    setValue,
    trigger,
    reset, //Resetea el formulario
  } = useForm({
    mode: "onChange",
  });

  const [compra, setCompra] = useState([]);
  const [proveedor, setProveedor] = useState([]);
  const [Prendas, setPrendas] = useState([]);
  const {agregarDetalleCompras, compras } = useComprasContex()
  const [selectDetalles, setSelecDetalles]= useState(0)

  useEffect(() => {
    axios.get("http://localhost:3000/api/compra").then((res) => {
      setCompra(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3000/api/proveedores").then((res) => {
      setProveedor(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3000/api/prendas").then((res) => {
      setPrendas(res.data);
    });
  }, []);

  const  newDetalle= async(data)=>{
    agregarDetalleCompras(data)

    let selectDetalles =[];

    for (let i=0; i<compras.length; i++ ){
      const matchingDetalles = detallesCompras.find
      ((detalle)=> detalle.id_detalle_compra==compras[i].id_detalle_compra);
      if(matchingDetalles){
        selectDetalles.push(matchingDetalles.id_detalle_compra)

      }
    }
      setSelecDetalles(data.id_detalle_compra)

  }

  const [detallesCompras, setDetallesCompras] = useState([])
useEffect(()=>{
  axios.get('http://localhost:3000/api/compraDetalles').then((res)=>{
    setDetallesCompras(res.data)
  })
},[])




  const onSubmit = async (data) => {

    const {
      fecha,
      fk_proveedor,
      cantidad,
      precio,
      total= cantidad*precio
    } = data;

    
    try {
      const newCompra = await axios.post("http://localhost:3000/api/compra", {
        total_de_compra: total,
        fecha: fecha.trim(),
        fk_proveedor: fk_proveedor.trim(),
        DetallesCompras: JSON.stringify(compras)
      });
      console.log(newCompra)

      Swal.fire({
        title: "Prenda agregado",
        text: newCompra.data.message,
        icon: "success",
      }).then(location.reload());
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error",
        text: "Hubo un error",
        icon: "Vuelva a intentarlo",
      });
    }
  };

  return (
    <>
      <div>
        <div className="modal" id="myModalAgregarComprar">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <HeaderModals title={"Agregar Compra"} />
              <div>
                <div className="modal-body ">
                  <form
                    action=""
                    id="formularioagregarCompra"
                    
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="col-md-4">
                      <label htmlFor="rol" className="col-form-label">
                        Proveedor: *
                      </label>

                      <select
                        name="fk_proveedor"
                        className="form-control"
                        {...register("fk_proveedor", {
                          required: {
                            value: true,
                            message: "Debe seleccionar una proveedor",
                          },
                        })}
                      >
                        <option value="">Seleccionar Proveedor</option>
                        {/* SE REALIZA un mapeo con la informacio traida de prendas y seleccionamos que queremos de ella */}
                        esto se guarda en name = fk_proveedor
                        {proveedor.map((Proveedores) => {
                          return (
                            <option
                              key={Proveedores.id_proveedor}
                              value={Proveedores.id_proveedor}
                            >
                              {Proveedores.nombre}
                            </option>
                          );
                        })}
                      </select>

                      {errors.fk_proveedor && (
                        <AlertaError message={errors.fk_proveedor.message} />
                      )}
                    </div>

                 

                    <div className="col-md-4">
                      <label
                        htmlFor="totalCompraAgregar"
                        className="col-form-label"
                      >
                        Fecha
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="totalCompraAgregar"
                        {...register("fecha", {
                          required: {
                            value: true,
                            message: "la fecha es obligatorio",
                          },
                          pattern: {
                            value:
                              "^d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$",
                            message: "Error",
                          },
                          validate: (value) => {
                            return validarFecha(value);
                          },
                        })}
                        onChange={(e) => {
                          setValue("fecha", e.target.value), trigger("fecha");
                        }}
                      />

                      {errors.fecha && (
                        <AlertaError message={errors.fecha.message} />
                      )}
                    </div>

                   

                   

                    <div className="col-md-4">
                      <label
                        htmlFor="totalCompraAgregar"
                        className="col-form-label"
                      >
                        Precio Total
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="totalCompraAgregar"
                        readOnly
                        
                      />

                      {errors.total_de_compra && (
                        <AlertaError message={errors.total_de_compra.message} />
                      )}
                    </div>

                  

                 
                    <div className="modal-footer">
                      <CancelarModal handleClose={handleClose} />
                      <GuardarModal />
                    </div>
                  </form>

                    <div action="" className="formDetallesCompras">
                   <form action="" className="row g-3 needs-validation" onSubmit={handleSubmit(newDetalle)}>

                   <label htmlFor=" ">Agregale los detalles de compras</label>


                 <div className="col-md-5 ">

                      <label htmlFor="rol" className="col-form-label">
                        Productos: *
                      </label>

                      <select
                        name="fk_prenda"
                        className="form-control"
                        {...register("fk_prenda", {
                          
                        })}
                      >
                        <option value="">Diseños</option>
                        {/* SE REALIZA un mapeo con la informacio traida de prendas y seleccionamos que queremos de ella */}
                        esto se guarda en name = fk_prenda
                        {Prendas.map((prenda) => {
                          return (
                            <option
                              key={prenda.id_prenda}
                              value={prenda.id_prenda}
                            >
                              {prenda.nombre}
                            </option>
                          );
                        })}
                      </select>

                      {errors.fk_prenda && (
                        <AlertaError message={errors.fk_prenda.message} />
                      )}
                    </div>

                    <div className="col-md-4">
                      <label
                        htmlFor="nombreCompraAgregar"
                        className="col-form-label"
                      >
                        Cantidad
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="nombreCompraAgregar"
                        name="nombreCompraAgregar"
                        placeholder=". . ."
                        {...register("cantidad", {
                          required: {
                            value: true,
                            message: "La cantidad es obligatoria",
                          },
                          pattern: {
                            value: /^\d+$/,
                            message: "No se peremiten letras ni caracteres especiales",
                          },
                        })}
                        onChange={(e) => {
                          setValue("cantidad", e.target.value),
                            trigger("cantidad");
                        }}
                      />

                      {errors.cantidad && (
                        <AlertaError message={errors.cantidad.message} />
                      )}
                    </div>

                    <div className="col-md-4">
                      <label
                        htmlFor="totalCompraAgregar"
                        className="col-form-label"
                      >
                        Precio unitario
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="totalCompraAgregar"
                        placeholder=". . ."
                        {...register("precio", {
                          required: {
                            value: true,
                            message: "El precio es obligatorio",
                          },
                          pattern: {
                            value: /^\d+$/,
                            message: "No se permiten letras ni caracteres espaciales",
                          },
                        })}
                        onChange={(e) => {
                          setValue("precio", e.target.value), trigger("precio");
                        }}
                      />
                      {errors.precio && (
                        <AlertaError message={errors.precio.message} />
                      )}
                    </div>

                    <div className="botonGuardarDetalles">
                      <BotonNegro text={'Agregar Detalles'} />
                      <GuardarModal />

                      
                    </div>
                 </form>
                 </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AgregarCompras;