import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';
import useCompras from '../../../hooks/useCompras';
import usePrendas from '../../../hooks/usePrendas';


export const ComprasPrendas = () => {
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  const {compras, detallesCompra} = useCompras()
  const {Prendas}= usePrendas()

  const idDetalle= detallesCompra.map((detalle)=>detalle.id_detalle_compra)

  console.log(detallesCompra)



  useEffect(() => {
    let newChartInstance = null;

    if (chartInstance) {
      chartInstance.destroy();
    }

    const ctx = chartContainer.current.getContext('2d');

    // Calcular las fechas de la semana pasada
    const fechaHoy = new Date();
    const fechaSemanaPasada = new Date();
    fechaSemanaPasada.setDate(fechaHoy.getDate() - 7);

    // Filtrar las compras de la semana pasada
    const comprasSemanaPasada = compras.filter(compra => {
      const fechaCompra = new Date(compra.fecha);
      return fechaCompra >= fechaSemanaPasada && fechaCompra <= fechaHoy;
    });

    // Crear el gráfico
    newChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: comprasSemanaPasada.map(compra => compra.fecha),
        datasets: [{
          label: 'Cantidad de prendas compradas semanal ',
          data: comprasSemanaPasada.map(compra => {
            const prenda = Prendas.find(prenda => prenda.id === compra.prendaId);
            return prenda ? prenda.cantidad : 0;
          }),
          backgroundColor: '#49b74d80',
          borderColor: '#47684E',
          borderWidth: 2
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.dataset.label || '';
                if (label) {
                  return `${label}: ${context.parsed.y}  `;
                }
                return null;
              }
            }
          }
        }
      }
    });

    setChartInstance(newChartInstance);

    return () => {
      if (newChartInstance) {
        newChartInstance.destroy();
      }
    };
  }, [compras, Prendas]);

  return <canvas ref={chartContainer} width="400" height="200"></canvas>;
};

export default ComprasPrendas;
