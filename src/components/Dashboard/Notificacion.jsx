import React, { useState, useEffect } from 'react';
import useMovimientos from "../../hooks/useMovimientos";
import CancelarModal from "../chared/CancelarModal";
import HeaderModals from "../chared/HeaderModals";
import { IoIosNotifications } from 'react-icons/io';
import './Css/styleDashboard.css'

export const Notificacion = () => {
  const { movimiento,notificaciones,notificacion } = useMovimientos();
  const [semanaFiltradas, setSemanaFiltradas] = useState([]);

  const obtenerSemanaActual = () => {
    const hoy = new Date();
    hoy.setHours(23, 59, 59, 999)
    const inicioSemana = new Date(hoy);
    inicioSemana.setDate(hoy.getDate()- 2); 
    const finSemana = new Date(inicioSemana);
    finSemana.setDate(inicioSemana.getDate() + 1);
    finSemana.setHours(23, 59, 59, 999) 
    return { inicioSemana, finSemana };
  };

  // Función para filtrar los movimientos de la semana actual
  const filtrarMovimientosSemana = () => {
    const { inicioSemana, finSemana } = obtenerSemanaActual();
    const semanaFiltradas = movimiento.filter(notificacion => {
      const fechaNotificacion = new Date(notificacion.fecha);
      return fechaNotificacion >= inicioSemana && fechaNotificacion <= finSemana; 
    });
    setSemanaFiltradas(semanaFiltradas);
  };

  useEffect(() => {
    filtrarMovimientosSemana();
  }, [movimiento]); 

  return (
    <>
      <button
        className="Notificacion"
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
        onClick={()=>{notificaciones(0)}}
      >
        <IoIosNotifications className="iconsNotificacion" />
        <p>
  {notificacion==0 ? <span className='condicion-falsa'></span> : <span className='cantidadNotificacion'>{notificacion}</span>} 
</p>

      </button>
      
      <div
        className='modal fade'
        id='staticBackdrop'
        tabIndex='-1'
        aria-labelledby='staticBackdropLabel'
        aria-hidden='true'
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div className='modal-dialog modal-dialog-scrollable '>
          <div className='modal-content'>
            <HeaderModals title='Notificaciones ' />
            <div className='modal-body'>
              {semanaFiltradas
                .slice()
                .reverse()
                .map((Notificar) => (
                  <div key={Notificar.ID}>
                    <br />
                    <div className='card text-center'>
                      <div className='card-header'>
                        {Notificar.fecha}
                      </div>
                      <div className='card-body'>
                        <p className='card-text'>
                          {Notificar.descripcion}
                        </p>
                      </div>
                      <div className='card-footer text-muted'>
                        {Notificar.ID}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className='modal-footer'>
              <CancelarModal
                name={'Cerrar'}
                modalToCancel='myModal'
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notificacion;
