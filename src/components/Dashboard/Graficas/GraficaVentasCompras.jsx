import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { startOfMonth, endOfMonth, format } from 'date-fns';

const GraficaVentasCompras = ({ ordenes, compras }) => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);
  const [monthStartDate, setMonthStartDate] = useState(null);
  const [monthEndDate, setMonthEndDate] = useState(null);

  useEffect(() => {
    const today = new Date();
    setMonthStartDate(startOfMonth(today));
    setMonthEndDate(endOfMonth(today));
  }, []);

  useEffect(() => {
    const createChart = async () => {
      try {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        if (monthStartDate && monthEndDate && ordenes && compras) {
          const daysInMonth = [];
          const currentDate = new Date(monthStartDate);

          while (currentDate <= monthEndDate) {
            daysInMonth.push(format(currentDate, 'yyyy-MM-dd'));
            currentDate.setDate(currentDate.getDate() + 1);
          }

          const ordenesData = obtenerDatosParaGrafico(daysInMonth, ordenes, 'ordenes');
          const comprasData = obtenerDatosParaGrafico(daysInMonth, compras, 'compras');

          const ctx = chartContainer.current.getContext('2d');
          chartInstance.current = new Chart(ctx, {
            type: 'line',
            data: {
              labels: daysInMonth,
              datasets: [{
                label: 'Total de ordenes por día (mes actual)',
                data: ordenesData,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
              }, {
                label: 'Total de compras por día (mes actual)',
                data: comprasData,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
              }]
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true
                }
              },
              elements: {
                line: {
                  tension: 0 // Para que las líneas sean rectas
                }
              }
            }
          });
        }
      } catch (error) {
        console.error('Error al crear la gráfica:', error);
      }
    };

    createChart();
  }, [monthStartDate, monthEndDate, ordenes, compras]);

  const obtenerDatosParaGrafico = (fechas, datos, tipo) => {
    const datosAgrupados = datos.reduce((resultado, dato) => {
      const fecha = dato.fecha;

      if (!resultado[fecha]) {
        resultado[fecha] = {
          total: 0,
          name: fecha,
        };
      }

      resultado[fecha].total += tipo === '' ? dato.precio_total : dato.total_de_compras;

      return resultado;
    }, {});

    return fechas.map(fecha => {
      const total = datosAgrupados[fecha] ? datosAgrupados[fecha].total : 0;
      return total;
    });
  };

  return (
    <>    
      <div>
        <h2>Gráfico de ventas y compras del mes actual:</h2>
        <canvas ref={chartContainer} width="400" height="200"></canvas>
      </div>
    </>
  );
}

export default GraficaVentasCompras;
