import HeaderModals from '../components/chared/HeaderModals';

import { Modal } from 'react-bootstrap';
import { formatMoney } from '../helpers/Formato_de_datos.jsx';



const DetalleCatalogoPrendas = ({ DetallesPrendasCatalogo, show, handleClose }) => {



    return (
        <div>
            <Modal
                show={show}
                onHide={() => {
                    handleClose();
                }}
                className='modal d-flex align-items-center justify-content-center '
                id='myModal'
            >
                <div className={`modal-content `}>
                    <HeaderModals
                        title={'Detalle de la prenda '}
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
                                                style={{ fontWeight: 600 }}

                                            >
                                                PRECIO:
                                            </label>
                                            <br />

                                            <div>
                                                {/* Aquí agregamos clases para hacer el input más pequeño y centrado */}
                                                <input
                                                    type="text"
                                                    className="form-control text-center" // Agregamos la clase text-center
                                                    style={{ width: '100%' }} // Definimos un ancho específico para hacerlo más pequeño
                                                    value={formatMoney(DetallesPrendasCatalogo.precio)}
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="nombre" className="col-form-label"
                                                style={{ fontWeight: 600 }}>
                                                TIPO DE TELA:
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={DetallesPrendasCatalogo.tipo_de_tela}
                                                readOnly
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="apellido" className="col-form-label" style={{ fontWeight: 600 }}>
                                                GÉNERO:
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={DetallesPrendasCatalogo.genero}
                                                readOnly
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="telefono" className="col-form-label" style={{ fontWeight: 600 }}>
                                                TALLAS:
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={DetallesPrendasCatalogo.Talla ? DetallesPrendasCatalogo.Talla.join(', ') : ''}
                                                readOnly
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="direccion" className="col-form-label" style={{ fontWeight: 600 }}>
                                                COLORES:
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={DetallesPrendasCatalogo.color ? DetallesPrendasCatalogo.color.map(color => color.color).join(', ') : ''}
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
