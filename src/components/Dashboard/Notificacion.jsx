import React, { useState, useEffect } from 'react';
import useMovimientos from "../../hooks/useMovimientos";
import CancelarModal from "../chared/CancelarModal";
import HeaderModals from "../chared/HeaderModals";
import { IoIosNotifications } from 'react-icons/io';

export const Notificacion = () => {
  const { movimiento } = useMovimientos();
  const [semanaFiltradas, setSemanaFiltradas] = useState([]);

  useEffect(() => {
    const hoy = new Date();
    const inicioSemana = new Date(hoy);
    inicioSemana.setDate(inicioSemana.getDate() - hoy.getDay());
    inicioSemana.setHours(0, 0, 0, 0);
    const finSemana = new Date(hoy);
    finSemana.setDate(finSemana.getDate() + (6 - hoy.getDay()));
    finSemana.setHours(23, 59, 59, 999);
    
    const semanaFiltradas = movimiento.filter(notificacion => {
      const fechaNotificacion = new Date(notificacion.fecha);
      return fechaNotificacion >= inicioSemana && fechaNotificacion <= finSemana;
    });

    setSemanaFiltradas(semanaFiltradas);


  }, [movimiento]); 

  
  return (
    <>
      <button
        className="Notificacion"
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        <IoIosNotifications className="iconsNotificacion" />
        {cantidadDeNotificacion}
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
        <div className='modal-dialog modal-dialog-scrollable modal-lg'>
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
                        {Notificar.fecha}{' '}
                      </div>
                      <div className='card-body'>
                        <p className='card-text'>
                          {Notificar.descripcion}{' '}
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
