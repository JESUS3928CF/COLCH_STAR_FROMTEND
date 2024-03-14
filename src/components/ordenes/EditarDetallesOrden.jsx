import { useForm } from "react-hook-form";
import AlertaError from "../chared/AlertaError";
import useProducto from "../../hooks/useProducto";
import { useEffect, useState } from "react";
import GuardarModal from "../chared/GuardarModal";
import BotonNegro from "../chared/BotonNegro";
import PropTypes from "prop-types";

export const EditarDetallesOrden = ({
  detalle,
  eliminarDetalle,
  id,
  editarDetalle,
  handleCloseDetalles,
  handleShow,
  editar
}) => {
  const { productos } = useProducto();

  const [productoSeleccionado, setProductoSeleccionado] = useState(null); // Estado para el producto seleccionado
  const [infoProductoSeleccionado, setInfoProductoSeleccionado] = useState({});

  // Función para manejar el cambio de producto seleccionado

  const handleProductoChange = (id_producto) => {
    setProductoSeleccionado(id_producto); // Actualizar el estado del producto seleccionado
    const productoEncontrado = productos.find(
      (producto) => producto.id_producto == id_producto
    );

    if (!productoEncontrado) return;

    setInfoProductoSeleccionado(productoEncontrado);
    setValue("color", ""); // Restablecer el valor del color a vacío
    setValue("talla", ""); // Restablecer el valor de la talla a vacío
    trigger(["color", "talla"]); // Activar la validación del color y de la talla
  };

  useEffect(() => {
    handleProductoChange(detalle.fk_producto);
    if (detalle) {
      setValue("fk_producto", detalle.fk_producto);
      setValue("talla", detalle.talla);
      setValue("color", detalle.color);
      setValue("cantidad", detalle.cantidad);
      setValue("descripcion", detalle.descripcion);
      setValue("subtotal", detalle.subtotal);
    }
  }, [detalle]);

  const {
    register, //Registra o identifica cada elemento o cada input
    trigger,
    formState: { errors }, //Ver errores que tiene el formulario
    setValue,
    watch,
  } = useForm({
    mode: "onChange",
  });

  return (
    <form action="" className="">
      <p
        className="text-center"
        style={{
          textAlign: "center",
          fontStyle: "italic",
          fontWeight: 700,
          marginTop: 10,
        }}
      >
        {" "}
        Editar orden
      </p>

      <div className="col-md-12">
        <label htmlFor="rol" className="col-form-label">
          Producto: *
        </label>

        <select
          name="fk_producto"
          className="form-control"
          {...register("fk_producto", {
            required: {
              value: true,
              message: "El producto es obligatorio",
            },
          })}
          onChange={() => handleProductoChange(event.target.value)} // Manejar el cambio de producto seleccionado
        >
          {productos
            .filter((producto) => producto.estado)
            .map((producto) => {
              return (
                <option key={producto.id_producto} value={producto.id_producto}>
                  {producto.nombre}
                </option>
              );
            })}
        </select>

        {errors.fk_producto && (
          <AlertaError message={errors.fk_producto.message} />
        )}
      </div>

      {productoSeleccionado && (
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

              {infoProductoSeleccionado.tallas.map((talla) => {
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

              {infoProductoSeleccionado.colores.map((color) => {
                return (
                  <option key={color.id_color} value={color.color}>
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
                // Verificar si hay caracteres no permitidos (letras, puntos, caracteres especiales)
                if (!/^\d+$/.test(value)) {
                  return "La cantidad solo puede tener números";
                }
                // Convertir el número a cadena para realizar la validación de inicio con cero
                const valueAsString = value.toString();

                // Verificar si el número comienza con cero
                if (valueAsString.startsWith("0")) {
                  return "El cantidad no puede iniciar en 0";
                }

                return true;
              },
            })}
          />

          {errors.cantidad && <AlertaError message={errors.cantidad.message} />}
        </div>
        <div className="col-md-6">
          <label htmlFor="nombreCompraAgregar" className="col-form-label">
            Subtotal: *
          </label>
          <input
            type="number"
            className="form-control"
            id="nombreCompraAgregar"
            name="nombreCompraAgregar"
            placeholder=". . ."
            {...register("subtotal")}
            readOnly
          />

          {errors.subtotal && <AlertaError message={errors.subtotal.message} />}
        </div>

        <div
          className="col-md-12 "
          style={{
            textAlign: "center",
          }}
        >
          <label htmlFor="rol" className="col-form-label">
            Descripción:
          </label>

          <textarea
            className="form-control custom-input-style" // Puedes cambiar 'custom-input-style' por el nombre de la clase que prefieras
            style={{
              textAlign: "center",
              height: 70,
            }}
            {...register("descripcion")}
          />

          {errors.descripcion && (
            <AlertaError message={errors.descripcion.message} />
          )}
        </div>

        <div
          className="col-md-4 pl-1 pt-3 text-center"
          style={{ paddingLeft: "40px" }}
        >
          <BotonNegro
            text={"Regresar"}
            onClick={() => {
              handleCloseDetalles();
              handleShow();
            }}
          />
        </div>

        <div className="col-md-4 pt-3 text-center" style={{paddingRight: "70px"}}>
          <BotonNegro
            text={"Eliminar"}
            onClick={() => eliminarDetalle(id)}
          />
        </div>

        <div className="col-md-4 pl-1 pt-3 text-center">
          <GuardarModal
            text="Editar detalle"
            onSubmit={() => {
              editarDetalle(id, watch());
            }}
          />
        </div>
      </div>
    </form>
  );
};

EditarDetallesOrden.propTypes = {
  detalle: PropTypes.object.isRequired,
  eliminarDetalle: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  editarDetalle: PropTypes.func.isRequired,
};
