// import PropTypes from 'prop-types';
import HeaderModals from '../chared/HeaderModals';
import { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { formatMoney } from '../../helpers/Formato_de_datos';

const DetallesOrden = ({ detallesOrdenes }) => {
    //traemos toda la informa ion desde el listar por medio de detallesordenes y la pasamos a setDetalles y con detalles hacemos el mapeo
    const [detalles, setDetalles] = useState([]);

    const [carouselIndex, setCarouselIndex] = useState(0);

    useEffect(() => {
        setDetalles(detallesOrdenes.detalles || []);
    }, [detallesOrdenes]);

    return (
        <div>
            <div className='modal' id='modalDetalles'>
                <div className='modal-dialog modal-dialog-centered '>
                    <div className='modal-content'>
                        <HeaderModals title={'Detalles Orden'} />
                        <div>
                            <div className='modal-body '>
                                <form
                                    action=''
                                    id='formularioagregarCompra'
                                    className='row g-3 needs-validation'
                                >
                                    <Carousel
                                        activeIndex={carouselIndex}
                                        onSelect={(selectedIndex) =>
                                            setCarouselIndex(selectedIndex)
                                        }
                                    >
                                        {detalles.map((detalle, index) => (
                                            <Carousel.Item
                                                key={
                                                    detalle.id_detalle_orden +
                                                    index
                                                }
                                            >
                                                <div
                                                    className='col-md-12 mb-3'
                                                    style={{
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    <label
                                                        htmlFor='producto'
                                                        className='col-form-label'
                                                        style={{
                                                            fontStyle: 'italic',
                                                            fontSize: 17, // Añado estilo al texto (puedes cambiarlo según tus preferencias)
                                                            color: 'blue', // Cambio el color del texto (puedes cambiarlo según tus preferencias)
                                                        }}
                                                    >
                                                        Detalle {index + 1} - {detalles.length}
                                                    </label>
                                                    <input
                                                        type='text'
                                                        style={{
                                                            textAlign: 'center',
                                                        }}
                                                        className='form-control'
                                                        value={
                                                            detalle.producto
                                                                ? detalle
                                                                      .producto
                                                                      .nombre ||
                                                                  ''
                                                                : ''
                                                        }
                                                        readOnly
                                                    />
                                                </div>

                                                <div className='row'>
                                                    <div
                                                        className='col-md-6 mb-3'
                                                        style={{
                                                            textAlign: 'center',
                                                        }}
                                                    >
                                                        <label
                                                            htmlFor='cantidad'
                                                            className='col-form-label'
                                                        >
                                                            Cantidad
                                                        </label>
                                                        <input
                                                            type='text'
                                                            className='form-control'
                                                            style={{
                                                                textAlign:
                                                                    'center',
                                                            }}
                                                            value={
                                                                detalle.cantidad
                                                                    ? detalle.cantidad ||
                                                                      ''
                                                                    : ''
                                                            }
                                                            readOnly
                                                        />
                                                    </div>

                                                    <div className='col-md-6 mb-3'>
                                                        <label
                                                            htmlFor='producto'
                                                            className='col-form-label'
                                                        >
                                                            Subtotal:
                                                        </label>
                                                        <input
                                                            type='text'
                                                            className='form-control'
                                                            style={{
                                                                textAlign:
                                                                    'center',
                                                            }}
                                                            value={
                                                                formatMoney(detalle.subtotal)
                                                            }
                                                            readOnly
                                                        />
                                                    </div>
                                                    <div
                                                        className='col-md-10 mb-3 ml-10'
                                                        style={{
                                                            textAlign: 'center',
                                                        }}
                                                    >
                                                        <label
                                                            htmlFor='nombre'
                                                            className='col-form-label'
                                                        >
                                                            Total compra :
                                                        </label>
                                                        <input
                                                            type='text'
                                                            className='form-control'
                                                            style={{
                                                                textAlign:
                                                                    'center',
                                                            }}
                                                            value={
                                                                formatMoney(detallesOrdenes.precio_total)
                                                            }
                                                            readOnly
                                                        />
                                                    </div>

                                                    <div
                                                        className='col-md-6 mb-3'
                                                        style={{
                                                            textAlign: 'center',
                                                        }}
                                                    >
                                                        <label
                                                            htmlFor='nombre'
                                                            className='col-form-label'
                                                        >
                                                            Talla
                                                        </label>
                                                        <input
                                                            type='text'
                                                            className='form-control'
                                                            style={{
                                                                textAlign:
                                                                    'center',
                                                            }}
                                                            value={
                                                                detalle.talla
                                                                    ? detalle.talla ||
                                                                      ''
                                                                    : ''
                                                            }
                                                            readOnly
                                                        />
                                                    </div>

                                                    <div
                                                        className='col-md-6 mb-3'
                                                        style={{
                                                            textAlign: 'center',
                                                        }}
                                                    >
                                                        <label
                                                            htmlFor='nombre'
                                                            className='col-form-label'
                                                        >
                                                            Color
                                                        </label>
                                                        <input
                                                            type='text'
                                                            className='form-control'
                                                            style={{
                                                                textAlign:
                                                                    'center',
                                                            }}
                                                            value={
                                                                detalle.color
                                                                    ? detalle.color ||
                                                                      ''
                                                                    : ''
                                                            }
                                                            readOnly
                                                        />
                                                    </div>

                                                    <div
                                                        className='col-md-12 mb-3'
                                                        style={{
                                                            textAlign: 'center',
                                                            fontStyle: 'italic',
                                                            fontSize: 17, // Añado estilo al texto (puedes cambiarlo según tus preferencias)
                                                            color: 'blue',
                                                        }}
                                                    >
                                                        <label
                                                            htmlFor='producto'
                                                            className='col-form-label'
                                                        >
                                                            Descripción del
                                                            Producto
                                                        </label>
                                                        <textarea
                                                            className='form-control custom-input-style' // Puedes cambiar 'custom-input-style' por el nombre de la clase que prefieras
                                                            style={{
                                                                textAlign:
                                                                    'center',
                                                                height: 106,
                                                            }}
                                                            value={
                                                                detalle.descripcion
                                                                    ? detalle.descripcion ||
                                                                      ''
                                                                    : ''
                                                            }
                                                            readOnly
                                                        />
                                                    </div>
                                                </div>
                                            </Carousel.Item>
                                        ))}
                                    </Carousel>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetallesOrden;
