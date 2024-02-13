import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { startOfMonth, endOfMonth, format } from 'date-fns';

const GraficaMensualVentas = ({ ordenes }) => {
  const monthChartContainer = useRef(null);
  const monthChartInstance = useRef(null);
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
        if (monthChartInstance.current) {
          monthChartInstance.current.destroy();
        }

        if (monthStartDate && monthEndDate && ordenes) {
          const daysInMonth = [];
          const currentDate = monthStartDate;

          while (currentDate <= monthEndDate) {
            daysInMonth.push(format(currentDate, 'yyyy-MM-dd'));
            currentDate.setDate(currentDate.getDate() + 1);
          }

          const monthData = obtenerDatosParaGrafico(daysInMonth, ordenes);

          const ctx = monthChartContainer.current.getContext('2d');
          monthChartInstance.current = new Chart(ctx, {
            type: 'line',
            data: {
              labels: daysInMonth,
              datasets: [{
                label: 'Ventas por día (mes actual)',
                data: monthData,
                backgroundColor: '#b6e0bf',
            borderColor: '#47684E',
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
  }, [monthStartDate, monthEndDate, ordenes]);

  // Función para determinar si ha comenzado un nuevo mes
  const isNewMonth = () => {
    const today = new Date();
    return today > endOfMonth(monthStartDate);
  };

  // Actualizar la gráfica si ha comenzado un nuevo mes
  useEffect(() => {
    if (isNewMonth()) {
      setMonthStartDate(startOfMonth(new Date()));
      setMonthEndDate(endOfMonth(new Date()));
    }
  }, []);

  const obtenerDatosParaGrafico = (fechas, ordenes) => {
    const datosAgrupados = fechas.reduce((resultado, fecha) => {
      resultado[fecha] = 0;

      ordenes.forEach(orden => {
        if (format(new Date(orden.fecha_entrega), 'yyyy-MM-dd') === fecha && orden.estado_de_orden === 'Finalizada') {
          resultado[fecha] += orden.precio_total;
        }
      });

      return resultado;
    }, {});

    return fechas.map(fecha => datosAgrupados[fecha]);
  };

  return (
    <>    
      <div>
        <h2>Gráfico de ventas del mes actual:</h2>
        <canvas ref={monthChartContainer} width="400" height="200"></canvas>
      </div>
    </>
  );
}

export default GraficaMensualVentas;
