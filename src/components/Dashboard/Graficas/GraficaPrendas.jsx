import React, { useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";
import "../Css/styleDashboard.css";
import Chart from "chart.js/auto"; // Importa la clase Chart

const GraficaPrendas = ({ Prendas }) => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const createChart = () => {
      if (chartContainer.current) {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        const ctx = chartContainer.current.getContext("2d");

        chartInstance.current = new Chart(ctx, {
          type: "bar",
          data: {
            labels: etiquetas,
            datasets: [
              {
                label: "Cantidad",
                data: cantidades,
                backgroundColor: "#47684E",
                borderColor: "#000000",
                borderWidth: 2,
              },
            ],
          },
          options: {
            indexAxis: "y", // Cambia el eje de la gráfica a horizontal
            elements: {
              bar: {
                borderWidth: 2, // Ajusta el grosor de las barras
              },
            },
            plugins: {
              legend: {
                display: false, // Oculta la leyenda
              },
              title: {
                display: true,
                text: "Cantidad de prendas por tallas", // Agrega un título a la gráfica
              },
            },
            responsive:true,
            maintainAspectRatio: false,
          },
        });
      }
    };

    createChart();

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [Prendas]);

  // Crear un objeto para almacenar las cantidades por combinación de nombre de prenda y talla
  const cantidadesPorPrendaYTalla = {};

  // Recorrer las prendas para identificar las tallas y sus cantidades
  Prendas.forEach((prenda) => {
    const nombrePrenda = prenda.nombre;

    prenda.cantidades.forEach((cantidad) => {
      const { talla, cantidad: cantidadTalla } = cantidad;
      const etiqueta = `${nombrePrenda} - ${talla}`;

      if (cantidadesPorPrendaYTalla[etiqueta]) {
        cantidadesPorPrendaYTalla[etiqueta] += cantidadTalla;
      } else {
        cantidadesPorPrendaYTalla[etiqueta] = cantidadTalla;
      }
    });
  });

  // Extraer las etiquetas y las cantidades de las tallas
  const etiquetas = Object.keys(cantidadesPorPrendaYTalla);
  const cantidades = Object.values(cantidadesPorPrendaYTalla);

  return (
    <div>
      <div className="graficaPrendas">
        <canvas ref={chartContainer}></canvas>
      </div>
    </div>
  );
};

export default GraficaPrendas;
