import React from "react";
import { Bar } from "react-chartjs-2";
import "../Css/styleDashboard.css";

const GraficaPrendas = ({ Prendas }) => {
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

  // Definir el objeto data para la gráfica
  const data = {
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
  };

  return (
    <div>
      <div className="graficaPrendas">
        <Bar
          data={data}
          options={{
            indexAxis: "y", // Cambia el eje de la gráfica a horizontal
            elements: {
              bar: {
                borderWidth: 2, // Ajusta el grosor de las barras
              },
            },
            responsive: true,
            plugins: {
              legend: {
                display: false, // Oculta la leyenda
              },
              title: {
                display: true,
                text: "Cantidad de prendas por tallas", // Agrega un título a la gráfica
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default GraficaPrendas;
