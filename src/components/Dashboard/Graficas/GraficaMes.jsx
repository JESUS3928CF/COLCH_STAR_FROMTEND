import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { startOfMonth, endOfMonth, format } from 'date-fns';
import BotonLogoPDF from '../BotonLogoPDF.jsx';
import PDFComprasMes from '../PDF/PDFComprasMes.jsx';

const Grafica = ({ ordenes, compras }) => {
  const monthChartContainer = useRef(null);
  const monthChartInstance = useRef(null);

  useEffect(() => {
    const today = new Date();
    const monthStartDate = startOfMonth(today);
    const monthEndDate = endOfMonth(today);

    const createChart = () => {
      if (monthChartInstance.current) {
        monthChartInstance.current.destroy();
      }

      if (ordenes && compras) {
        const daysInMonth = [];
        const currentDate = monthStartDate;

        while (currentDate <= monthEndDate) {
          daysInMonth.push(format(currentDate, 'yyyy-MM-dd'));
          currentDate.setDate(currentDate.getDate() + 1);
        }

        const ventasData = ordenes ? obtenerDatosVentasParaGrafico(daysInMonth, ordenes) : [];
        const comprasData = compras ? obtenerDatosComprasParaGrafico(daysInMonth, compras) : [];

        const ctx = monthChartContainer.current.getContext("2d");

        monthChartInstance.current = new Chart(ctx, {
          type: "bar",
          data: {
            labels: daysInMonth,
            datasets: [
              {
                label: "Ordenes Mensuales",
                data: ventasData,
                backgroundColor: "#47684E",
                borderColor: "#47684E",
                borderWidth: 1,
              },
              {
                label: "Compras Mensuales",
                data: comprasData,
                backgroundColor: "#1D1B31",
                borderColor: "#1D1B31",
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }
    };

    createChart();

    const handleResize = () => {
      if (monthChartInstance.current) {
        monthChartInstance.current.resize();
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
      if (monthChartInstance.current) {
        monthChartInstance.current.destroy();
      }
    };
  }, [ordenes, compras]);

  const obtenerDatosVentasParaGrafico = (fechas, ordenes) => {
    const datosAgrupados = ordenes.reduce((resultado, orden) => {
      const fecha = orden.fecha_creacion;

      if (!resultado[fecha]) {
        resultado[fecha] = 0;
      }

      if (orden.estado_de_orden === 'Entregada') {
        resultado[fecha] += orden.precio_total;
      }

      return resultado;
    }, {});

    return fechas.map(fecha => {
      const totalVentas = datosAgrupados[fecha] || 0;
      return totalVentas;
    });
  };

  const obtenerDatosComprasParaGrafico = (fechas, compras) => {
    const datosAgrupados = compras.reduce((resultado, compra) => {
      const fecha = compra.fecha;

      if (!resultado[fecha]) {
        resultado[fecha] = 0;
      }

      if (compra.estado === true) {
        resultado[fecha] += compra.total_de_compra;
      }

      return resultado;
    }, {});

    return fechas.map(fecha => {
      const totalCompras = datosAgrupados[fecha] || 0;
      return totalCompras;
    });
  };

  return (
    <>
      <div>
        <BotonLogoPDF
          namePDf={'mes.pdf'}
          componente={1}
        />
      </div>
      <div>
        <canvas
          ref={monthChartContainer}
          width="400"
          height="200"
        ></canvas>
      </div>
    </>
  );
};

export default Grafica;
