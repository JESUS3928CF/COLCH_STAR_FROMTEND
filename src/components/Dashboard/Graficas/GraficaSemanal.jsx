import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { subDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, format, parseISO } from 'date-fns';

export const GraficaSemanal = ({ compras }) => {
  const weekChartContainer = useRef(null);
  const weekChartInstance = useRef(null);
  const [weekStartDate, setWeekStartDate] = useState(null);

  useEffect(() => {
    const today = new Date();
    setWeekStartDate(startOfWeek(today));
  }, []);

  useEffect(() => {
    if (weekChartInstance.current) {
      weekChartInstance.current.destroy();
    }

    if (weekStartDate && compras) {
      const lastWeekDays = Array.from({ length: 7 }, (_, index) =>
        format(subDays(weekStartDate, index), 'yyyy-MM-dd')
      );

      const weekData = obtenerDatosParaGrafico(lastWeekDays, compras);

      const ctx = weekChartContainer.current.getContext('2d');
      weekChartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: lastWeekDays,
          datasets: [{
            label: 'Total de compras por día (últimos 7 días)',
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
          }
        }
      });
    }
  }, [weekStartDate, compras]);

  

  const obtenerDatosParaGrafico = (fechas, compras) => {
    const datosAgrupados = compras.reduce((resultado, compra) => {
      const fecha = compra.fecha;

      if (!resultado[fecha]) {
        resultado[fecha] = {
          Total_de_compras: 0,
          name: fecha,
        };
      }

      resultado[fecha].Total_de_compras += compra.total_de_compra;

      return resultado;
    }, {});

    return fechas.map(fecha => {
      const totalCompras = datosAgrupados[fecha] ? datosAgrupados[fecha].Total_de_compras : 0;
      return totalCompras;
    });
  };

  return (
    <>

    
      <div>
        <h2>Gráfico de los últimos 7 días de la semana:</h2>
        <canvas ref={weekChartContainer} width="400" height="200"></canvas>
      </div>
  
    </>
  );
}

export default GraficaSemanal;
