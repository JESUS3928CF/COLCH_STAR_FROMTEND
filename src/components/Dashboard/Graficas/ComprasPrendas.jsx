import React, { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";
import { startOfToday, subDays, parseISO } from "date-fns";
import useCompras from "../../../hooks/useDetallesCompras";
import BotonLogoPDF from '../BotonLogoPDF';
import PDFComprasPrendas from '../PDF/PDFComprasPrendas.jsx'
import '../Css/styleDashboard.css'


export const ComprasPrendas = ({ compras }) => {
  const { detalleCompra } = useCompras();

  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  const [sieteDias, setSieteDias] = useState(0);

  useEffect(() => {
    // Obtener la fecha actual y filtrar detalles de compras
    const fechaActual = startOfToday();
    const filtaraFkCompras = detalleCompra.filter(
      (detalle) => detalle.fk_compra
    );

    // Obtener IDs de compras
    const fk_compras = filtaraFkCompras.map((detalle) => detalle.fk_compra);
    const id_compra = compras.filter((compra) =>
      fk_compras.includes(compra.id_compra)
    );

    // Calcular la fecha de hace 7 días
    const fechaInicioSemanaActual = subDays(fechaActual, 8);

    // Filtrar compras de los últimos 7 días
    const UltimosSieteDias = id_compra.filter((fechaDetalle) => {
      const fecha = parseISO(fechaDetalle.fecha);
      return fecha >= fechaInicioSemanaActual && fecha <= fechaActual;
    });

    // Objeto de mapa para mantener un seguimiento de las cantidades por fecha
    const cantidadesPorFecha = new Map();

    id_compra.forEach((compra) => {
      const fechaCompra = parseISO(compra.fecha);
      if (
        fechaCompra >= fechaInicioSemanaActual &&
        fechaCompra <= fechaActual
      ) {
        const detallesCompra = detalleCompra.filter(
          (detalle) => detalle.fk_compra === compra.id_compra
        );
        const cantidadTotal = detallesCompra.reduce(
          (total, detalle) => total + detalle.cantidad,
          0
        );
        if (cantidadesPorFecha.has(compra.fecha)) {
          // Si la fecha ya está en el mapa, sumar la cantidad actual
          cantidadesPorFecha.set(
            compra.fecha,
            cantidadesPorFecha.get(compra.fecha) + cantidadTotal
          );
        } else {
          // Si no, agregar la cantidad a la fecha
          cantidadesPorFecha.set(compra.fecha, cantidadTotal);
        }
      }
    });

    // Obtener las etiquetas y datos para el gráfico
    const labels = Array.from(cantidadesPorFecha.keys());
    const data = Array.from(cantidadesPorFecha.values());

    // Suma de todas las cantidades de las compras de los últimos 7 días
    const totalCompras = data.reduce((total, cantidad) => total + cantidad, 0);
    setSieteDias(totalCompras);

    // Destruir el gráfico anterior si existe
    let newChartInstance = null;
    if (chartInstance) {
      chartInstance.destroy();
    }

    // Crear nueva instancia de gráfico
    const ctx = chartContainer.current.getContext("2d");

    newChartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Cantidad de prendas compradas semanal",
            data: data,
            backgroundColor: "#49b74d80",
            borderColor: "#47684E",
            borderWidth: 2,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.dataset.label || "";
                if (label) {
                  return `${label}: ${context.parsed.y}  `;
                }
                return null;
              },
            },
          },
        },
      },
    });

    setChartInstance(newChartInstance);

    // Limpiar la instancia de gráfico anterior al desmontar
    return () => {
      if (newChartInstance) {
        newChartInstance.destroy();
      }
    };
  }, [compras]);

  return (
    <>
          <BotonLogoPDF namePDf={'Cantidades de prendas compradas.pdf'} componente={<PDFComprasPrendas/>} />
          <canvas ref={chartContainer} width="400" height="200"></canvas>
    </>
  
  
)};

export default ComprasPrendas;
