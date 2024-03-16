import {
  format,
  parseISO,
  subDays,
  addDays,
  startOfMonth,
  endOfMonth,
} from "date-fns";
import Chart from "chart.js/auto";
import { useEffect, useRef, useState } from "react";
import "../Dashboard/Css/styleDashboard.css";
import { Button } from "@tremor/react";
import BotonLogoPDF from "../Dashboard/BotonLogoPDF.jsx";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Swal from "sweetalert2";

export const Informe = ({
  compras,
  ordenes,
  proveedores,
  detalleCompra,
  clientes,
}) => {
  // Estado para las fechas y visibilidad del formulario
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [rangoFechas, setRangoFechas] = useState("");
  const [rangoDeFechas, setRangoDeFechas] = useState([]);
  const [valorOrden, setValorOrden] = useState([]);
  const [valorCompra, setValorCompra] = useState([]);
  const [showForm, setShowForm] = useState(false); // Estado para controlar la visibilidad del formulario
  

  const monthChartContainer = useRef(null);
  const monthChartInstance = useRef(null);
  const fechaHoy = new Date().toISOString().split("T")[0]

  useEffect(() => {
    // Obtener fechas del mes actual
    const fechaActual = new Date();
    
    // Crear gráfico con datos del mes actual
    createChart(
      compras,
      ordenes,
      generarRangoFechas(startOfMonth(fechaActual), endOfMonth(fechaActual))
    );
  }, [compras, ordenes]);

  const handleSearch = () => {


    if (!fechaInicio || !fechaFin) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, selecciona ambas fechas',
        icon: 'error'
      });
      return;}




    const fechaInicioObj = parseISO(fechaInicio);
    const fechaFinObj = parseISO(fechaFin);

    const isValidRange = fechaInicioObj <= fechaFinObj;
    const isValideFecha = fechaInicio >= fechaHoy
    const isValideFechaFin = fechaFin >fechaHoy

 if(isValideFecha){
  Swal.fire({
    title: 'Error',
    text: 'La fecha de inicio no puede ser mayor que la fecha actual',
    icon: 'error'
  })

  return


}else if (isValideFechaFin){

  Swal.fire({
    title: 'Error',
    text: 'La fecha final  no puede ser mayor que la fecha actual',
    icon: 'error'
  })

  return

}else if (isValideFecha && isValideFechaFin){

  Swal.fire({
    title: 'Error',
    text: 'La fecha  de inico y la final no puede ser mayor que la fecha actual',
    icon: 'error'
  })


} else if (isValidRange) {
      setRangoFechas(
        `${format(fechaInicioObj, "dd/MM/yyyy")} - ${format(
          fechaFinObj,
          "dd/MM/yyyy"
        )}`
      );

      const rangoFechasArray = generarRangoFechas(fechaInicioObj, fechaFinObj);
      setRangoDeFechas(rangoFechasArray);
      createChart(compras, ordenes, rangoFechasArray);
      setShowForm(false); // Ocultar el formulario después de realizar la búsqueda
      setFechaInicio('')
      setFechaFin('')
    } else {
      Swal.fire({
        title: "Error",
        text: "Por favor, selecciona un rango válido de fechas",
        icon: "error",
      });
    }
  };

  const generarRangoFechas = (inicio, fin) => {
    const rango = [];
    let fechaActual = inicio;
    while (fechaActual <= fin) {
      rango.push(format(fechaActual, "yyyy-MM-dd"));
      fechaActual = addDays(fechaActual, 1);
    }
    return rango;
  };

  const createChart = (compras, ordenes, rangoFechasArray) => {
    try {
      if (monthChartInstance.current) {
        monthChartInstance.current.destroy();
      }

      if (
        monthChartContainer.current &&
        (compras.length > 0 || ordenes.length > 0)
      ) {
        const ctx = monthChartContainer.current.getContext("2d");
        const valoresCompras = obtenerDatosComprasParaGrafico(
          rangoFechasArray,
          compras
        );
        const valoresOrdenes = obtenerDatosOrdenesParaGrafico(
          rangoFechasArray,
          ordenes
        );
        setValorOrden(valoresOrdenes);
        setValorCompra(valoresCompras);

        monthChartInstance.current = new Chart(ctx, {
          type: "bar",
          data: {
            labels: rangoFechasArray,
            datasets: [
              {
                label: `Compras`,
                data: valoresCompras,
                backgroundColor: "#1D1B31",
                borderColor: "#1D1B31",
                borderWidth: 1,
              },
              {
                label: `Órdenes`,
                data: valoresOrdenes,
                backgroundColor: "#47684E",
                borderColor: "#47684E",
                borderWidth: 1,
              },
            ],
          },
          options: {
            plugins: {
              title: {
                display: true,
                text: "Compras VS Orden",

                font: {
                  weight: "bold",
                },
              },
            },

            responsive:true,
            maintainAspectRatio: false,

            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }
    } catch (error) {
      console.error("Error al crear la gráfica:", error);
    }
  };

  const obtenerDatosComprasParaGrafico = (fechas, compras) => {
    const datosAgrupados = fechas.reduce((resultado, fecha) => {
      const comprasMismaFecha = compras.filter((item) => item.fecha === fecha);
      const totalCompraMismaFecha = comprasMismaFecha.reduce(
        (total, compra) => {
          return total + (compra.estado ? compra.total_de_compra : 0);
        },
        0
      );
      resultado[fecha] = totalCompraMismaFecha;
      return resultado;
    }, {});

    return fechas.map((fecha) => datosAgrupados[fecha] || 0);
  };

  const obtenerDatosOrdenesParaGrafico = (fechas, ordenes) => {
    const datosAgrupados = fechas.reduce((resultado, fecha) => {
      const ordenesMismaFecha = ordenes.filter(
        (item) => item.fecha_entrega === fecha
      );
      const totalOrdenMismaFecha = ordenesMismaFecha.reduce((total, orden) => {
        return (
          total +
          (orden.estado_de_orden === "Entregada" ? orden.precio_total : 0)
        );
      }, 0);
      resultado[fecha] = totalOrdenMismaFecha;
      return resultado;
    }, {});

    return fechas.map((fecha) => datosAgrupados[fecha] || 0);
  };

  return (
    <>
      <div>
        {/* Botón para mostrar/ocultar el formulario */}
        <p onClick={() => setShowForm(!showForm)} className="Lupa">
          <FaMagnifyingGlass />
        </p>
        <div>
          <BotonLogoPDF
            namePDf={"Informe.pdf"}
            componente={rangoFechas == [] ? 1 : 3}
            fechaInicio={fechaInicio}
            fechaFin={fechaFin}
            compras={compras}
            ordenes={ordenes}
            clientes={clientes}
            rangoDeFechas={rangoDeFechas}
            valorCompra={valorCompra}
            valorOrden={valorOrden}
            proveedores={proveedores}
            detalleCompra={detalleCompra}
          />
        </div>
      </div>
      {showForm && (
        <form className="row g-3 needs-validation">
          <div className="col-md-4">
            <p>Fecha inicio</p>
            <input
              className="form-control"
              type="date"
              onChange={(e) => setFechaInicio(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <p>Fecha fin</p>
            <input
              className="form-control"
              type="date"
              onChange={(e) => setFechaFin(e.target.value)}
            />
            <Button
              type="button"
              onClick={handleSearch}
              className="buscarInforme"
            >
              Buscar
            </Button>
          </div>
        </form>
      )}


      {/* Contenedor de la gráfica */}
      <div className="graficaInforme">
        <canvas ref={monthChartContainer} width="400" height="200"></canvas>
      </div>
    </>
  );
};

export default Informe;
