import { useForm } from "react-hook-form";
import AlertaError from "../chared/AlertaError";
import usePrenda from "../../hooks/usePrendas";
import { useEffect, useState } from "react";
import GuardarModal from "../chared/GuardarModal";
import BotonNegro from "../chared/BotonNegro";
import PropTypes from "prop-types";

export const EditarDetallesCompra = ({
  detalle,
  eliminarDetalle,
  id,
  editarDetalle,
  handleCloseDetalles,
  handleShow
}) => {
  const { Prendas } = usePrenda();

  const [productoSeleccionado, setProductoSeleccionado] = useState(null); // Estado para el producto seleccionado
  const [infoProductoSeleccionado, setInfoProductoSeleccionado] = useState({});

  // Función para manejar el cambio de producto seleccionado

  const handleProductoChange = (id_prenda) => {
    setProductoSeleccionado(id_prenda); // Actualizar el estado del producto seleccionado
    const productoEncontrado = Prendas.find(
      (prenda) => prenda.id_prenda == id_prenda
    );

    if (!productoEncontrado) return;

    setInfoProductoSeleccionado(productoEncontrado);
    setValue("color", ""); // Restablecer el valor del color a vacío
    setValue("talla", ""); // Restablecer el valor de la talla a vacío
    setValue("cantidad", ""); // Restablecer el valor de la talla a vacío
    trigger(["color", "talla"]); // Activar la validación del color y de la talla
  };

  useEffect(() => {
    handleProductoChange(detalle.fk_prenda);
    if (detalle) {
      setValue("fk_prenda", detalle.fk_prenda || "d");
      setValue("talla", detalle.talla);
      setValue("color", detalle.color);
      setValue("cantidad", detalle.cantidad);
      setValue("precio", detalle.precio);
    }
  }, [detalle]);

  const handeChangeValidar = (id) => {
    trigger(["color", "talla", "cantidad", "precio"]); // Activar la validación del color y de la talla

    if (!errors.cantidad) {
      editarDetalle(id, watch());

    }
  }

  const {
    register, //Registra o identifica cada elemento o cada input
    formState: { errors }, //Ver errores que tiene el formulario
    setValue,
    trigger,
    watch,
  } = useForm({
    mode: "onChange",
  });

  return (
    <form action="" className="">
      {/* <p
                className='text-center'
                style={{
                    textAlign: 'center',
                    fontStyle: 'italic',
                    fontWeight: 700,
                    marginTop: 10,
                }}
            >
                {' '}
                Agregar producto a la orden
            </p> */}

      <div className="col-md-12 ">
        <label htmlFor="rol" className="col-form-label">
          Producto: *
        </label>

        <select
          name="fk_prenda"
          className="form-control"
          {...register("fk_prenda", {
            required: {
              value: true,
              message: "El producto es obligatorio",
            },
          })}
          onChange={() => handleProductoChange(event.target.value)} // Manejar el cambio de prenda seleccionada
        >
          <option value="d">Impresión de estampados</option>
          {Prendas.filter((prenda) => prenda.estado).map((prenda) => {
            return (
              <option key={prenda.id_prenda} value={prenda.id_prenda}>
                {prenda.nombre}
              </option>
            );
          })}
        </select>

        {errors.fk_prenda && <AlertaError message={errors.fk_prenda.message} />}
      </div>

      {productoSeleccionado && productoSeleccionado != "d" && (
        <div className="row">
          <div className="col-md-6">
            <label htmlFor="rol" className="col-form-label">
              Talla: *
            </label>

            <select
              name="talla"
              className="form-control"
              {...register("talla", {
                required: {
                  value: true,
                  message: "La talla es obligatoria",
                },
              })}
            >
              <option value="">Seleccione la talla</option>

              {infoProductoSeleccionado.Talla.map((talla) => {
                return (
                  <option key={talla} value={talla}>
                    {talla}
                  </option>
                );
              })}
            </select>

            {errors.talla && <AlertaError message={errors.talla.message} />}
          </div>

          <div className="col-md-6">
            <label htmlFor="rol" className="col-form-label">
              Color: *
            </label>

            <select
              name="color"
              className="form-control"
              {...register("color", {
                required: {
                  value: true,
                  message: "El color es obligatorio",
                },
              })}
            >
              <option value="">Seleccione el color</option>

              {infoProductoSeleccionado.color.map((color) => {
                return (
                  <option key={color.id_color} value={color.id_color}>
                    {color.color}
                  </option>
                );
              })}
            </select>

            {errors.color && <AlertaError message={errors.color.message} />}
          </div>
        </div>
      )}

      <div className="row">
        <div className="col-md-6">
          <label htmlFor="nombreCompraAgregar" className="col-form-label">
            Cantidad: *
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
              validate: (value) => {
                if (value.includes(' ')) {
                  return 'No se permiten espacios en blanco';
                }

                // Verificar si la prenda es 'd' (impresión de estampados)
                if (watch('fk_prenda') === 'd') {
                  // Validar solo números enteros y un punto opcional
                  if (!/^(?!0(\.0)?$)\d+(\.\d+)?$/.test(value)) {
                    return 'La cantidad debe ser mayor que 0 y no debe terminar en punto';
                  }
                } else {
                  // Verificar si hay caracteres no permitidos (letras, puntos, caracteres especiales)
                  if (!/^\d+$/.test(value)) {
                    return 'La cantidad solo puede contener números enteros';
                  }
                  if (value.startsWith('0')) {
                    return 'La cantidad no puede iniciar con 0';
                  }
                }
                return true;
              },
            })}
            onChange={(e) => {
              setValue("cantidad", e.target.value);
              trigger("cantidad");
            }}
          />

          {errors.cantidad && <AlertaError message={errors.cantidad.message} />}
        </div>
        <div className="col-md-6">
          <label htmlFor="totalCompraAgregar" className="col-form-label">
            Precio unitario: *
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
              validate: (value) => {
                if (value.includes(" ")) {
                  return "No se permiten espacios en blanco";
                }
                // Verificar si hay caracteres no permitidos (letras, puntos, caracteres especiales)
                if (!/^\d+$/.test(value)) {
                  return "El precio unitario solo puede tener números";
                }
                if (value.startsWith("0")) {
                  return "El precio unitario no puede iniciar con 0";
                }
                return true;
              },
            })}
            onChange={(e) => {
              setValue("precio", e.target.value);
              trigger("precio");
            }}
          />
          {errors.precio && <AlertaError message={errors.precio.message} />}
        </div>
        <div className="col-md-12 ">
          <label htmlFor="nombre" className="col-form-label">
            Total del detalle:
          </label>
          <input
            type="text"
            className="form-control"
            value={detalle.precio * detalle.cantidad}
            readOnly
          />
        </div>

        <div className="col-md-4 pl-1 pt-3 text-center" style={{ paddingLeft: "40px" }}>
          <BotonNegro
            text={"Regresar"}
            onClick={() => {
              handleCloseDetalles()
              handleShow()
            }}
          />
        </div>

        <div className="col-md-4 pt-3 text-center" style={{ paddingRight: "70px" }}>
          <BotonNegro
            text={"Eliminar"}
            onClick={() => eliminarDetalle(id)}
          />
        </div>
        <div className="col-md-4 pl-1 pt-3 text-center">
          <GuardarModal
            text="Editar detalle"
            onSubmit={() => {
              handeChangeValidar(id);
            }}
          />
        </div>





      </div>
    </form>
  );
};

EditarDetallesCompra.propTypes = {
  detalle: PropTypes.object.isRequired,
  eliminarDetalle: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  editarDetalle: PropTypes.func.isRequired,
};
