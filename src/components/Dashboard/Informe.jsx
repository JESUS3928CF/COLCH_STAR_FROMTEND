import { IoIosInformationCircleOutline } from "react-icons/io";
import { format, parseISO, subDays, addDays } from "date-fns";
import Chart from 'chart.js/auto';
import { useEffect, useRef, useState } from 'react';
import HeaderModals from "../chared/HeaderModals";
import CancelarModal from "../chared/CancelarModal";
import '../Dashboard/Css/styleDashboard.css'
import { Button } from "@tremor/react";

export const Informe = ({ compras, ordenes }) => {
  // Estado para las fechas
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [rangoFechas, setRangoFechas] = useState("");
  
  const monthChartContainer = useRef(null);
  const monthChartInstance = useRef(null);

  useEffect(() => {
    setFechaInicio(obtenerFechaInicioSemana());
  }, []);

  const obtenerFechaInicioSemana = () => {
    const hoy = new Date();
    const fechaInicioSemana = subDays(hoy, 6);
    return fechaInicioSemana.toISOString().split('T')[0];
  };

  const handleSearch = () => {
    const fechaInicioObj = parseISO(fechaInicio);
    const fechaFinObj = parseISO(fechaFin);

    const isValidRange = fechaInicioObj <= fechaFinObj;

    if (isValidRange) {
      console.log("Búsqueda realizada entre", fechaInicio, "y", fechaFin);
      setRangoFechas(`${format(fechaInicioObj, 'dd/MM/yyyy')} - ${format(fechaFinObj, 'dd/MM/yyyy')}`);

      const rangoFechasArray = generarRangoFechas(fechaInicioObj, fechaFinObj);
      createChart(compras, ordenes, rangoFechasArray);
    } else {
      console.log("Por favor, selecciona un rango válido de fechas");
    }
  };

  useEffect(() => {
    createChart(compras, ordenes, []);
  }, []);

  const generarRangoFechas = (inicio, fin) => {
    const rango = [];
    let fechaActual = inicio;
    while (fechaActual <= fin) {
      rango.push(format(fechaActual, 'yyyy-MM-dd'));
      fechaActual = addDays(fechaActual, 1);
    }
    return rango;
  };

  const createChart = (compras, ordenes, rangoFechasArray) => {
    try {
      if (monthChartInstance.current) {
        monthChartInstance.current.destroy();
      }

      if (monthChartContainer.current && (compras.length > 0 || ordenes.length > 0)) {
        const ctx = monthChartContainer.current.getContext('2d');
        const valoresCompras = obtenerDatosComprasParaGrafico(rangoFechasArray, compras);
        const valoresOrdenes = obtenerDatosOrdenesParaGrafico(rangoFechasArray, ordenes);

        monthChartInstance.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: rangoFechasArray,
            datasets: [
              {
                label: `Compras`,
                data: valoresCompras,
                backgroundColor: '#1D1B31',
                borderColor: '#1D1B31',
                borderWidth: 1
              },
              {
                label: `Órdenes`,
                data: valoresOrdenes,
                backgroundColor: '#47684E',
                borderColor: '#47684E', 
                borderWidth: 1
              }
            ]
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
    } catch (error) {
      console.error('Error al crear la gráfica:', error);
    }
  };

  const obtenerDatosComprasParaGrafico = (fechas, compras) => {
    const datosAgrupados = fechas.reduce((resultado, fecha) => {
      const comprasMismaFecha = compras.filter(item => item.fecha === fecha);
      const totalCompraMismaFecha = comprasMismaFecha.reduce((total, compra) => {
        return total + (compra.estado ? compra.total_de_compra : 0);
      }, 0);
      resultado[fecha] = totalCompraMismaFecha;
      return resultado;
    }, {});

    return fechas.map(fecha => datosAgrupados[fecha] || 0);
  };

  const obtenerDatosOrdenesParaGrafico = (fechas, ordenes) => {
    const datosAgrupados = fechas.reduce((resultado, fecha) => {
      const ordenesMismaFecha = ordenes.filter(item => item.fecha_creacion === fecha);
      const totalOrdenMismaFecha = ordenesMismaFecha.reduce((total, orden) => {
        return total + (orden.estado_de_orden === 'Finalizada' ? orden.precio_total : 0);
      }, 0);
      resultado[fecha] = totalOrdenMismaFecha;
      return resultado;
    }, {});

    return fechas.map(fecha => datosAgrupados[fecha] || 0);
  };

  return (
    <>
      <button
        className="informe"
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#Informe"
      >
        <IoIosInformationCircleOutline className="iconsNotificacion" />
        
      </button>

      <div
        className="modal fade"
        id="Informe"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div className="modal-dialog modal-dialog-scrollable modal-lg">
          <div className="modal-content">
            <HeaderModals title="Informes " />
            <div className="modal-body">
              <form className='row g-3 needs-validation'>
                <div className="col-md-6">
                  <input
                    className="form-control"
                    type="date"
                    value={fechaInicio}
                    onChange={(e) => setFechaInicio(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    className="form-control"
                    type="date"
                    value={fechaFin}
                    onChange={(e) => setFechaFin(e.target.value)}
                  />
                  <Button type="button" onClick={handleSearch} className="buscarInforme"  >Buscar</Button>
                </div>
              </form>

              <div className="graficaInforme"> 
                <canvas
                  ref={monthChartContainer}
                  width='400'
                  height='200'
                ></canvas>
              
              </div>
            </div>
            <div className="modal-footer">
              <CancelarModal name={"Cerrar"} modalToCancel="myModal" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Informe;
