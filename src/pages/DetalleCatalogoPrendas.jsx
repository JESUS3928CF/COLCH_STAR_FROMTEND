import PropTypes from 'prop-types';
import HeaderModals from '../components/chared/HeaderModals';

import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';


const DetalleCatalogoPrendas = ({ DetallesPrendasCatalogo, show, handleClose, handleShow }) => {



    return (
        <div>
            <Modal
                show={show}
                onHide={() => {
                    handleClose();
                    // setSelectedDisenoNombre([])
                }}
                className='modal d-flex align-items-center justify-content-center '
                id='myModal'
            >
                <div className={`modal-content `}>
                    <HeaderModals
                        title={'Detalle prendas'}
                        handleClose={() => {
                            handleClose();
                            // setSelectedDisenoNombre([])
                        }}
                    />
                    <div className="formulario">
                        <div className="modal-body">
                            <div className="container">
                                <div className="col">
                                    <form className="row g-3 needs-validation">
                                        <div className="mb-2" name="divIdentificacion">
                                            <label
                                                htmlFor="identificacionEditar"
                                                className="col-form-label"
                                            >
                                                PRECIO:
                                            </label>
                                            <br />

                                            <div>

                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={DetallesPrendasCatalogo.precio}

                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="nombre" className="col-form-label">
                                                Nombres:
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                readOnly
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="apellido" className="col-form-label">
                                                Apellidos:
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                readOnly
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="telefono" className="col-form-label">
                                                Teléfono:
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                readOnly
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="direccion" className="col-form-label">
                                                Dirección:
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                readOnly
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="email" className="col-form-label">
                                                Email:
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"

                                                readOnly
                                            />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>


    );
}

export default DetalleCatalogoPrendas;
