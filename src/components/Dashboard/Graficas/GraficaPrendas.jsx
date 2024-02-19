import React from 'react';
import { Bar } from 'react-chartjs-2';
import '../Css/styleDashboard.css'

const GraficaPrendas = ({ Prendas }) => {
  // Extraer los nombres y cantidades de las prendas
  const nombresPrendas = Prendas.map((prenda) => prenda.nombre);
  const cantidadesPrendas = Prendas.map((prenda) => prenda.cantidad);

  // Definir el objeto data para la gráfica
  const data = {
    labels: nombresPrendas,
    datasets: [
      {
        label: 'Cantidad',
        data: cantidadesPrendas,
        backgroundColor: '#47684E',
        borderColor: '#000000',
        borderWidth: 2,
      },
    ],
  };

  return (
    <div>
      <h2>Gráfico de Barras de Prendas</h2>
      <div className='graficaPrendas'>
        <Bar
          data={data}
          options={{
            indexAxis: 'y', // Cambia el eje de la gráfica a horizontal
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
                text: 'Cantidad de Prendas', // Agrega un título a la gráfica
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default GraficaPrendas;
