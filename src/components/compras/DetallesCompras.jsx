import PropTypes from 'prop-types';
import HeaderModals from '../chared/HeaderModals';
import { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import '../prendas/IconCss/style.Icon.css';
import '../compras/Css/carousel-styles.css';
import { formatDate, formatMoney } from '../../helpers/Formato_de_datos.jsx';
import useColors from '../../hooks/useColors.jsx';

export const DetalleCompras = ({ detallesCompras }) => {
    const [detalles, setDetalles] = useState([]);

    const { colors } = useColors();

    useEffect(() => {
        setDetalles(detallesCompras.detalles || []);
    }, [detallesCompras]);

    // Función para obtener el nombre del color
    const getNombreColor = (colorId) => {
        const color = colors.find((color) => color.id_color === colorId);
        return color ? color.color : 'Color no encontrado';
    };

    return (
        <div>
            <div className='modal' id='modalDetalleCompra'>
                <div className='modal-dialog modal-dialog-centered '>
                    <div className='modal-content'>
                        <HeaderModals title={'Detalles compra'} />
                        <div>
                            <div className='modal-body '>
                                <form
                                    action=''
                                    id='formularioagregarCompra'
                                    className='row g-3 needs-validation'
                                >
                                    <Carousel>
                                        {detalles.map((detalle, index) => (
                                            <Carousel.Item
                                                key={detalle.id_detalle_compra}
                                            >
                                                <div className='col-md-12 mb-3'>
                                                    <label
                                                        htmlFor='producto'
                                                        className='col-form-label'
                                                    >
                                                        Proveedor
                                                    </label>
                                                    <input
                                                        type='text'
                                                        className='form-control'
                                                        value={
                                                            detallesCompras.proveedor
                                                                ? detallesCompras
                                                                      .proveedor
                                                                      .nombre ||
                                                                  ''
                                                                : ''
                                                        }
                                                        readOnly
                                                    />
                                                </div>
                                                <div className='row'>
                                                    <div className='col-md-6 mb-3'>
                                                        <label
                                                            htmlFor='cantidad'
                                                            className='col-form-label'
                                                        >
                                                            Total de la compra:
                                                        </label>
                                                        <input
                                                            type='text'
                                                            className='form-control'
                                                            value={formatMoney(
                                                                detallesCompras.total_de_compra
                                                                    ? detallesCompras.total_de_compra ||
                                                                          ''
                                                                    : ''
                                                            )}
                                                            readOnly
                                                        />
                                                    </div>
                                                    <div className='col-md-6 mb-3'>
                                                        <label
                                                            htmlFor='nombre'
                                                            className='col-form-label'
                                                        >
                                                            Fecha de la compra:
                                                        </label>
                                                        <input
                                                            type='text'
                                                            className='form-control'
                                                            value={formatDate(
                                                                detallesCompras.fecha
                                                                    ? detallesCompras.fecha ||
                                                                          ''
                                                                    : ''
                                                            )}
                                                            readOnly
                                                        />
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    <p
                                                        className='text-center mt-4'
                                                        style={{
                                                            fontStyle: 'italic',
                                                            fontSize: 17, // Añado estilo al texto (puedes cambiarlo según tus preferencias)
                                                            color: 'blue',
                                                        }}
                                                    >
                                                        Detalle #{index + 1} -{' '}
                                                        {detalles.length}
                                                    </p>
                                                    <div className='col-md-12 '>
                                                        <label
                                                            htmlFor='producto'
                                                            className='col-form-label'
                                                        >
                                                            Producto comprado:
                                                        </label>
                                                        <input
                                                            type='text'
                                                            className='form-control'
                                                            value={
                                                                detalle.prenda
                                                                    ?.nombre ||
                                                                'Impresión de estampados'
                                                            }
                                                            readOnly
                                                        />
                                                    </div>
                                                    <div className='col-md-6 '>
                                                        <label
                                                            htmlFor='cantidad'
                                                            className='col-form-label'
                                                        >
                                                            Cantidad:
                                                        </label>
                                                        <input
                                                            type='text'
                                                            className='form-control'
                                                            value={
                                                                detalle.cantidad
                                                            }
                                                            readOnly
                                                        />
                                                    </div>
                                                    <div className='col-md-6 '>
                                                        <label
                                                            htmlFor='nombre'
                                                            className='col-form-label'
                                                        >
                                                            Precio:
                                                        </label>
                                                        <input
                                                            type='text'
                                                            className='form-control'
                                                            value={formatMoney(
                                                                detalle.precio
                                                            )}
                                                            readOnly
                                                        />
                                                    </div>
                                                    {detalle.fk_prenda !==
                                                        null && (
                                                        <>
                                                            <div className='col-md-6 '>
                                                                <label
                                                                    htmlFor='cantidad'
                                                                    className='col-form-label'
                                                                >
                                                                    Talla:
                                                                </label>
                                                                <input
                                                                    type='text'
                                                                    className='form-control'
                                                                    value={
                                                                        detalle.talla
                                                                    }
                                                                    readOnly
                                                                />
                                                            </div>
                                                            <div className='col-md-6 '>
                                                                <label
                                                                    htmlFor='cantidad'
                                                                    className='col-form-label'
                                                                >
                                                                    Color:
                                                                </label>
                                                                <input
                                                                    type='text'
                                                                    className='form-control'
                                                                    value={getNombreColor(
                                                                        detalle.color_id
                                                                    )}
                                                                    readOnly
                                                                />
                                                            </div>
                                                        </>
                                                    )}
                                                    <div className='col-md-12 '>
                                                        <label
                                                            htmlFor='nombre'
                                                            className='col-form-label'
                                                        >
                                                            Total del detalle:
                                                        </label>
                                                        <input
                                                            type='text'
                                                            className='form-control'
                                                            value={formatMoney(
                                                                detalle.precio *
                                                                    detalle.cantidad
                                                            )}
                                                            readOnly
                                                        />
                                                    </div>
                                                </div>
                                            </Carousel.Item>
                                        ))}
                                    </Carousel>

                                    {/* Resto del formulario... */}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

DetalleCompras.propTypes = {
    detallesCompras: PropTypes.object.isRequired,
};
