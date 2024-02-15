import PropTypes from 'prop-types';
import HeaderModals from '../components/chared/HeaderModals';
import { FcApproval, FcCancel } from 'react-icons/fc';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import React, { useState } from 'react';
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

                    <div className='modal-body'>
                        
                    
                    </div>
                </div>
            </Modal>
        </div>


    );
}

export default DetalleCatalogoPrendas;
