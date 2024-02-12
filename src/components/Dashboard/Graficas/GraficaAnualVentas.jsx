import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { startOfYear, endOfYear, format } from 'date-fns';
import { es } from 'date-fns/locale'; // Importar objeto de localización en español

const GraficaAnualVentas = ({ ordenes }) => {
  const yearChartContainer = useRef(null);
  const yearChartInstance = useRef(null);
  const [yearStartDate, setYearStartDate] = useState(null);
  const [yearEndDate, setYearEndDate] = useState(null);

  useEffect(() => {
    const today = new Date();
    setYearStartDate(startOfYear(today));
    setYearEndDate(endOfYear(today));
  }, []);

  useEffect(() => {
    const createChart = async () => {
      try {
        if (yearChartInstance.current) {
          yearChartInstance.current.destroy();
        }

        if (yearStartDate && yearEndDate && ordenes) {
          const monthsInYear = [];
          const currentDate = yearStartDate;

          while (currentDate <= yearEndDate) {
            monthsInYear.push(format(currentDate, 'MMMM', { locale: es })); // Formatear el nombre del mes en español
            currentDate.setMonth(currentDate.getMonth() + 1);
          }

          const yearData = obtenerDatosParaGrafico(monthsInYear, ordenes);

          const ctx = yearChartContainer.current.getContext('2d');
          yearChartInstance.current = new Chart(ctx, {
            type: 'bar', // Cambiado a tipo de gráfico de barras
            data: {
              labels: monthsInYear,
              datasets: [{
                label: 'Ventas por mes (año actual)',
                data: yearData,
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
            }
          });
        }
      } catch (error) {
        console.error('Error al crear la gráfica:', error);
      }
    };

    createChart();
  }, [yearStartDate, yearEndDate, ordenes]);

  // Función para determinar si ha comenzado un nuevo año
  const isNewYear = () => {
    const today = new Date();
    return today > endOfYear(yearStartDate);
  };

  // Actualizar la gráfica si ha comenzado un nuevo año
  useEffect(() => {
    if (isNewYear()) {
      setYearStartDate(startOfYear(new Date()));
      setYearEndDate(endOfYear(new Date()));
    }
  }, []);

  const obtenerDatosParaGrafico = (meses, ordenes) => {
    const datosAgrupados = meses.reduce((resultado, mes) => {
      resultado[mes] = 0;

      ordenes.forEach(orden => {
        const mesOrden = format(new Date(orden.fecha_entrega), 'MMMM', { locale: es });

        if (mesOrden === mes && orden.estado_de_orden === 'Finalizada') {
          resultado[mes] += orden.precio_total;
        }
      });

      return resultado;
    }, {});

    return meses.map(mes => datosAgrupados[mes]);
  };

  return (
    <>    
      <div>
        <h2>Gráfico de ventas del año actual:</h2>
        <canvas ref={yearChartContainer} width="400" height="200"></canvas>
      </div>
    </>
  );
}

export default GraficaAnualVentas;
