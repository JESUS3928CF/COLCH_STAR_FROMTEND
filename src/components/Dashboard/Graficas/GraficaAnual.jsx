import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { startOfMonth, endOfMonth, format, subMonths } from 'date-fns';
import { es } from 'date-fns/locale';

const GraficaAnual = ({ compras }) => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    const today = new Date();
    const monthsData = [];
    for (let i = 0; i < 12; i++) {
      const startDate = startOfMonth(subMonths(today, i));
      const endDate = endOfMonth(subMonths(today, i));
      const monthLabel = format(startDate, 'MMMM', { locale: es });
      const monthCompras = compras.filter(compra => {
        const fecha = new Date(compra.fecha);
        return fecha >= startDate && fecha <= endDate;
      });
      const totalCompras = monthCompras.reduce((total, compra) => total + compra.total_de_compra, 0);
      monthsData.unshift({ month: monthLabel, total: totalCompras });
    }
    // Ordenar los datos mensuales por mes, asegurándonos de que en la gráfica comiencen en enero
    monthsData.sort((a, b) => {
      const monthOrder = {
        enero: 1, febrero: 2, marzo: 3, abril: 4, mayo: 5, junio: 6,
        julio: 7, agosto: 8, septiembre: 9, octubre: 10, noviembre: 11, diciembre: 12
      };
      return monthOrder[a.month.toLowerCase()] - monthOrder[b.month.toLowerCase()];
    });
    setMonthlyData(monthsData);
  }, [compras]);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartContainer.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: monthlyData.map(data => data.month),
        datasets: [{
          label: 'Total de compras por mes',
          data: monthlyData.map(data => data.total),
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
  }, [monthlyData]);

  return (
    <div>
      <h2>Gráfico mensual del año actual:</h2>
      <canvas ref={chartContainer} width="400" height="200"></canvas>
    </div>
  );
}

export default GraficaAnual;
