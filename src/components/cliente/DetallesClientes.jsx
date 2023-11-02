import React from 'react'
import PropTypes from 'prop-types';
import HeaderModals from '../chared/HeaderModals';
import '../../css-general/cssgeneral.css'

export const DetallesClientes = ({ detallesClientes }) => {
    return (
        <div className='modal' id='modalDetalleCliente'>
            <div className='modal-dialog modal-dialog-centered'>
                <div className='modal-content'>
                    <HeaderModals title='Detalle del cliente' />
                    <div className='formulario'>
                        <div className='modal-body'>
                            <div className='container'>
                                <div className='col'>
                                    <div className='row'>
                                        <div>
                                        <div className='mb-3'>
                                            <label htmlFor="tipoIdentificacion" className="r"> - Tipo de Identificación:  </label><label htmlFor="">  {detallesClientes.tipoIdentificacion}</label>
                                        </div>
                                        <div className='mb-3'>
                                            <label htmlFor="identificacion" className="r">- Identificación: </label>   <label >  {detallesClientes.identificacion}</label>
                                        </div>
                                        <div className='mb-3'>
                                            <label htmlFor="nombre" className="r"> - Nombres: </label> <label >  {detallesClientes.nombre}</label>
                                        </div>
                                        <div className='mb-3'>
                                            <label htmlFor="apellido" className="r"> - Apellidos: </label> <label > {detallesClientes.apellido}</label>
                                        </div>
                                        <div className='mb-3'>
                                            <label htmlFor="telefono" className="r">- Teléfono: </label> <label > {detallesClientes.telefono}</label>
                                        </div>
                                        <div className='mb-3'>
                                            <label htmlFor="email" className="r">- Email: </label> <label > {detallesClientes.email} </label>
                                        </div>

                                        <div className='mb-3'>
                                        <label htmlFor="direccion" className="r"  >- Dirección:</label>  <label > {detallesClientes.direccion} </label>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

DetallesClientes.propTypes = {
    detallesClientes: PropTypes.object.isRequired,
};