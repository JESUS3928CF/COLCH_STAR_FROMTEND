import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import HeaderModals from '../chared/HeaderModals';
import '../prendas/IconCss/style.Icon.css';
import { useEffect } from 'react';

export const DetalleCompras = ({ detallesCompras }) => {
    const { setValue } = useForm();

    useEffect(() => {
        console.log(detallesCompras);
    }, [detallesCompras]);

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
                                    {detallesCompras.map((detalle, index) => (
                                        <div key={detalle.id_detalle_compra} className='row'>
                                            <p className='text-center'>
                                                {' '}
                                                Detalle #{index + 1}
                                            </p>

                                            <div className='col-md-12 '>
                                                <label
                                                    htmlFor='producto'
                                                    className='col-form-label'
                                                >
                                                    Producto Comprado:
                                                </label>
                                                <input
                                                    type='text'
                                                    className='form-control'
                                                    value={detalle.prenda.nombre}
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
                                                    value={detalle.cantidad}
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
                                                    value={detalle.precio}
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                    ))}
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
