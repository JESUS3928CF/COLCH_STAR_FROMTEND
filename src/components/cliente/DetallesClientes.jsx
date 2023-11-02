import React from 'react'
import PropTypes from 'prop-types';
import HeaderModals from '../chared/HeaderModals';

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
                                            <label htmlFor="tipoIdentificacion" className="col-form-label"> Tipo de Identificación: {detallesClientes.tipoIdentificacion} </label>
                                        </div>
                                        <div className='mb-3'>
                                            <label htmlFor="identificacion" className="col-form-label"> Identificación: {detallesClientes.identificacion} </label>
                                        </div>
                                        <div className='mb-3'>
                                            <label htmlFor="nombre" className="col-form-label"> Nombres: {detallesClientes.nombre} </label>
                                        </div>
                                        <div className='mb-3'>
                                            <label htmlFor="apellido" className="col-form-label"> Apellidos: {detallesClientes.apellido} </label>
                                        </div>
                                        <div className='mb-3'>
                                            <label htmlFor="telefono" className="col-form-label"> Teléfono: {detallesClientes.telefono} </label>
                                        </div>
                                        <div className='mb-3'>
                                            <label htmlFor="email" className="col-form-label"> Email: {detallesClientes.email} </label>
                                        </div>

                                        <div className='mb-3'>
                                        <label htmlFor="direccion" className="col-form-label"  > Dirección: {detallesClientes.direccion}</label> 
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