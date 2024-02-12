import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { startOfWeek, endOfWeek, format } from 'date-fns';

const GraficaSemanalVentas = ({ ordenes }) => {
  const weekChartContainer = useRef(null);
  const weekChartInstance = useRef(null);
  const [weekStartDate, setWeekStartDate] = useState(null);
  const [weekEndDate, setWeekEndDate] = useState(null);

  useEffect(() => {
    const today = new Date();
    setWeekStartDate(startOfWeek(today));
    setWeekEndDate(endOfWeek(today));
  }, []);

  useEffect(() => {
    const createChart = async () => {
      try {
        if (weekChartInstance.current) {
          weekChartInstance.current.destroy();
        }

        if (weekStartDate && weekEndDate && ordenes) {
          const daysInWeek = [];
          const currentDate = weekStartDate;

          while (currentDate <= weekEndDate) {
            daysInWeek.push(format(currentDate, 'yyyy-MM-dd'));
            currentDate.setDate(currentDate.getDate() + 1);
          }

          const weekData = obtenerDatosParaGrafico(daysInWeek, ordenes);

          const ctx = weekChartContainer.current.getContext('2d');
          weekChartInstance.current = new Chart(ctx, {
            type: 'line',
            data: {
              labels: daysInWeek,
              datasets: [{
                label: 'Ventas por día (semana actual)',
                data: weekData,
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
  }, [weekStartDate, weekEndDate, ordenes]);

  // Función para determinar si ha comenzado una nueva semana
  const isNewWeek = () => {
    const today = new Date();
    return today > endOfWeek(weekStartDate);
  };

  // Actualizar la gráfica si ha comenzado una nueva semana
  useEffect(() => {
    if (isNewWeek()) {
      setWeekStartDate(startOfWeek(new Date()));
      setWeekEndDate(endOfWeek(new Date()));
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
        <h2>Gráfico de ventas de la semana actual:</h2>
        <canvas ref={weekChartContainer} width="400" height="200"></canvas>
      </div>
    </>
  );
}

export default GraficaSemanalVentas;
