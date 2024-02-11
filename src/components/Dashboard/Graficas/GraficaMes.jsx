import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import {  startOfMonth, endOfMonth, format  } from 'date-fns';

export const Grafica = ({ compras }) => {
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
    if (monthChartInstance.current) {
      monthChartInstance.current.destroy();
    }

    if (monthStartDate && monthEndDate && compras) {
      const daysInMonth = [];
      const currentDate = monthStartDate;

      while (currentDate <= monthEndDate) {
        daysInMonth.push(format(currentDate, 'yyyy-MM-dd'));
        currentDate.setDate(currentDate.getDate() + 1);
      }

      const monthData = obtenerDatosParaGrafico(daysInMonth, compras);

      const ctx = monthChartContainer.current.getContext('2d');
      monthChartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: daysInMonth,
          datasets: [{
            label: 'Total de compras por día (mes actual)',
            data: monthData,
            backgroundColor: 'rgba(192, 75, 192, 0.2)',
            borderColor: 'rgba(192, 75, 192, 1)',
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
  }, [monthStartDate, monthEndDate, compras]);

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
        <h2>Gráfico del mes actual:</h2>
        <canvas ref={monthChartContainer} width="400" height="200"></canvas>
      </div>
    </>
  );
}

export default Grafica;
