import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import HeaderModals from '../chared/HeaderModals';
import {
    validarBooleanos,
    validarEspaciosVacios,
    validarImagen,
} from '../../Validations/validations';
import AlertaError from '../chared/AlertaError';
import CancelarModal from '../chared/CancelarModal';
import GuardarModal from '../chared/GuardarModal';
import PropTypes from 'prop-types';
import axios from 'axios';
import BotonNegro from '../chared/BotonNegro';
import SeleccionarColorsEditar from './SelectColorEditar';
import usePrendas from '../../hooks/usePrendas.jsx';
import { Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';

const EditarPrendas = ({
    detallesPrendas,
    handleClose,
    show,
    handleClosee,
    handleShoww,
    showw,
    handleClosex,
}) => {
    const {
        updatePrendas,
        Prendas,
        setSelectColorsNombre,
        selectColorsNombre,
    } = usePrendas();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        trigger,
        reset,
    } = useForm({
        mode: 'onChange',
    });

    const [errorMensajeTallas, setErrorMensajeTallas] = useState(null);

    useEffect(() => {
        if (detallesPrendas) {
            setValue('id_prenda', detallesPrendas.id_prenda);
            setValue('nombre', detallesPrendas.nombre);
            setValue('precio', detallesPrendas.precio);
            setValue('tipo_de_tela', detallesPrendas.tipo_de_tela);
            setValue('genero', detallesPrendas.genero);
            setValue('publicado', detallesPrendas.publicado);
            setValue('tallas', detallesPrendas.Talla);
            setValue('colores', detallesPrendas.color);
            setValue('imagen', []);
        }
    }, [detallesPrendas, show]);

    const onSubmitt = async (data) => {
        // Validación que manda un alerta que al menos se debe seleccionar un permiso
        if (data.tallas.length === 0 || data.tallas === false) {
            setErrorMensajeTallas(
                'Debes seleccionar al menos una talla disponible para esta prenda'
            );
            return;
        }

        if (selectColorsNombre == '') {
            Swal.fire({
                title: 'Espera!!',
                text: 'Seleccione los colores disponibles para esta prenda',
                icon: 'warning',
            });
        } else {
            updatePrendas(data, detallesPrendas, handleClose);
        }

        setErrorMensajeTallas(null);
    };

    return (
        <>
            <Modal
                show={show}
                onHide={() => {
                    reset();
                    handleClose();
                    setSelectColorsNombre([]);
                    setErrorMensajeTallas(null);
                }}
                className='modal d-flex align-items-center justify-content-center'
                id='modalEditarPrenda'
            >
                <div className='modal-content'>
                    <HeaderModals
                        title={'Editar prendas'}
                        handleClose={() => {
                            reset();
                            handleClose();
                            setSelectColorsNombre([]);
                            setErrorMensajeTallas(null);
                        }}
                    />
                    <div className='modal-body'>
                        <form
                            className='row g-3 needs-validation'
                        >
                            <div className='col-md-6'>
                                <label
                                    htmlFor='nombre'
                                    className='col-from-label'
                                >
                                    Nombre: *
                                </label>
                                <input
                                    type='text'
                                    id='nombre'
                                    name='nombre'
                                    className='form-control'
                                    placeholder='. . .'
                                    title='¿Deseas editar el nombre?'
                                    {...register('nombre', {
                                        required: {
                                            value: true,
                                            message:
                                                'El nombre es obligatorio',
                                        },
                                        validate: (value) => {
                                            if (
                                                value.trim().length < 3 ||
                                                value.length > 30
                                            ) {
                                                return 'El nombre debe tener entre 3 y 30 caracteres';
                                            }
                                            if (
                                                !/^[a-zA-ZáéíóúñÑÁÉÍÓÚ\s]+$/.test(
                                                    value
                                                )
                                            ) {
                                                return 'El nombre solo puede tener letras';
                                            }
                                            if (value.includes(' ')) {
                                                return validarEspaciosVacios(
                                                    value
                                                );
                                            }

                                            return true;
                                        },
                                    })}
                                    onChange={(e) => {
                                        const inputValue = e.target.value.slice(
                                            0,
                                            31
                                        );
                                        setValue('nombre', inputValue);
                                        trigger('nombre');
                                    }}
                                />

                                {errors.nombre && (
                                    <AlertaError
                                        message={errors.nombre.message}
                                    />
                                )}
                            </div>

                            {/*<div className='col-md-6'>
                                <label
                                    htmlFor='cantidad'
                                    className='col-from-label'
                                >
                                    Cantidad: *
                                </label>
                                <input
                                    type='text'
                                    id='cantidad'
                                    name='cantidad'
                                    className='form-control'
                                    placeholder='. . .'
                                    title='¿Deseas editar la cantidad?'
                                    {...register('cantidad', {
                                        required: {
                                            value: true,
                                            message:
                                                'La cantidad es obligatorio',
                                        },
                                        validate: (value) => {
                                            return validarEspaciosVacios(value);
                                        },
                                        pattern: {
                                            value: /^\d+$/,
                                            message: 'No se permiten letras, solo numeros',
                                        },
                                    })}
                                    onChange={(e) => {
                                        setValue('cantidad', e.target.value),
                                            trigger('cantidad');
                                    }}
                                />

                                {errors.cantidad && (
                                    <AlertaError
                                        message={errors.cantidad.message}
                                    />
                                )}
                                </div>*/}

                            <div className='col-md-6'>
                                <label
                                    htmlFor='precio'
                                    className='col-from-label'
                                >
                                    Precio: *
                                </label>
                                <input
                                    type='text'
                                    id='precio'
                                    name='precio'
                                    className='form-control'
                                    placeholder='. . .'
                                    title='¿Deseas editar el precio?'
                                    {...register('precio', {
                                        required: {
                                            value: true,
                                            message: 'El precio es obligatorio',
                                        },
                                        validate: (value) => {
                                            return validarEspaciosVacios(value);
                                        },
                                        pattern: {
                                            value: /^(?!0)\d+(\.\d{1,2})?$/,
                                            message: 'Solo se permiten números y que el primer numero no sea 0',
                                        },
                                    })}
                                    onChange={(e) => {
                                        setValue('precio', e.target.value);
                                        trigger('precio');
                                    }}
                                />
                                {errors.precio && (
                                    <AlertaError
                                        message={errors.precio.message}
                                    />
                                )}
                            </div>

                            <div className='col-md-6'>
                                <label
                                    htmlFor='genero'
                                    className='col-from-label'
                                >
                                    Género: *
                                </label>

                                <select
                                    id='genero'
                                    name='genero'
                                    className='form-control'
                                    title='Seleccionar el genero'
                                    {...register('genero', {
                                        required: {
                                            value: true,
                                            message: 'El género es obligatorio',
                                        },
                                    })}
                                >
                                    <option value='Mujer'>Mujer</option>
                                    <option value='Hombre'>Hombre</option>
                                    <option value='Unisex'>Unisex</option>
                                </select>
                                {errors.genero && (
                                    <AlertaError
                                        message={errors.genero.message}
                                    />
                                )}
                            </div>

                            <div className='col-md-6'>
                                <label
                                    htmlFor='publicado'
                                    className='col-from-label'
                                >
                                    ¿Deseas publicarlo?: *
                                </label>
                                <select
                                    id='publicado'
                                    name='publicado'
                                    className='form-control'
                                    title='Estado de la publicación'
                                    {...register('publicado', {
                                        validate: (value) =>
                                            validarBooleanos(value),
                                    })}
                                >
                                    <option value='true'>Si</option>
                                    <option value='false'>No</option>
                                </select>
                                {errors.publicado && (
                                    <AlertaError
                                        message={errors.publicado.message}
                                    />
                                )}
                            </div>
                            <div className='col-md-6'>
                                <label htmlFor='searchInput'>
                                    Tipo de tela: *
                                </label>
                                <input
                                    type='text '
                                    name='Telasss'
                                    id='searchInput'
                                    list='Telasss'
                                    placeholder='. . .'
                                    className='form-control'
                                    {...register('tipo_de_tela', {
                                        required: {
                                            value: true,
                                            message:
                                                'El tipo de tela es obligatorio',
                                        },
                                        validate: (value) => {
                                            if (
                                                value.trim().length < 3 ||
                                                value.length > 20
                                            ) {
                                                return 'El tipo de tela debe tener entre 3 y 20 caracteres';
                                            }
                                            if (
                                                !/^[a-zA-ZáéíóúñÑÁÉÍÓÚ\s]+$/.test(
                                                    value
                                                )
                                            ) {
                                                return 'El tipo de tela solo puede tener letras';
                                            }
                                            if (value.includes(' ')) {
                                                return validarEspaciosVacios(
                                                    value
                                                );
                                            }

                                            return true;
                                        },
                                    })}
                                    onChange={(e) => {
                                        const inputValue = e.target.value.slice(
                                            0,
                                            21
                                        );
                                        setValue('tipo_de_tela', inputValue);
                                        trigger('tipo_de_tela');
                                    }}
                                />

                                {errors.tipo_de_tela && (
                                    <AlertaError
                                        message={errors.tipo_de_tela.message}
                                    />
                                )}

                                <datalist id='Telasss'>
                                    {Array.from(
                                        new Set(
                                            Prendas.map(
                                                (prenda) => prenda.tipo_de_tela
                                            )
                                        )
                                    ).map((tipo, index) => (
                                        <option key={index} value={tipo}>
                                            {tipo}
                                        </option>
                                    ))}
                                </datalist>
                            </div>

                            <div className='col-md-6'>
                                <label
                                    htmlFor='imagen'
                                    className='col-from-label'
                                >
                                    Subir imagen: *
                                </label>
                                <input
                                    type='file'
                                    id='imagen'
                                    name='imagen'
                                    className='form-control'
                                    title='Inserte un archivo PNG '
                                    {...register('imagen', {
                                        validate: (value) =>
                                            validarImagen(value[0])
                                    })}
                                />
                                {errors.imagen && (
                                    <AlertaError
                                        message={errors.imagen.message}
                                    />
                                )}
                            </div>
                            <div className='col-12'>
                                <p>Tallas: *</p>
                                <div className='row'>
                                    {/*
                                    <div className='col-3'>
                                        <input
                                            type='checkbox'
                                            id='selectAll'
                                            name='selectAll'
                                            checked={selectAll}
                                            onChange={handleSelectAll}
                                        />
                                        <label htmlFor='selectAll'>
                                            Todas 
                                        </label>
                                    </div>
                                    */}
                                    <div className='col-3'>
                                        <input
                                            type='checkbox'
                                            id='6'
                                            name='tallas'
                                            value='6'
                                            {...register('tallas')}
                                        />
                                        <label htmlFor='6'>6</label>
                                    </div>
                                    <div className='col-3'>
                                        <input
                                            type='checkbox'
                                            id='8'
                                            name='tallas'
                                            value='8'
                                            {...register('tallas')}
                                        />
                                        <label htmlFor='8'>8</label>
                                    </div>
                                    <div className='col-3'>
                                        <input
                                            type='checkbox'
                                            id='10'
                                            name='tallas'
                                            value='10'
                                            {...register('tallas')}
                                        />
                                        <label htmlFor='10'>10</label>
                                    </div>
                                    <div className='col-3'>
                                        <input
                                            type='checkbox'
                                            id='12'
                                            name='tallas'
                                            value='12'
                                            {...register('tallas')}
                                        />
                                        <label htmlFor='12'>12</label>
                                    </div>
                                    <div className='col-3'>
                                        <input
                                            type='checkbox'
                                            id='14'
                                            name='tallas'
                                            value='14'
                                            {...register('tallas')}
                                        />
                                        <label htmlFor='14'>14</label>
                                    </div>
                                    <div className='col-3'>
                                        <input
                                            type='checkbox'
                                            id='16'
                                            name='tallas'
                                            value='16'
                                            {...register('tallas')}
                                        />
                                        <label htmlFor='16'>16</label>
                                    </div>
                                    <div className='col-3'>
                                        <input
                                            type='checkbox'
                                            id='S'
                                            name='tallas'
                                            value='S'
                                            {...register('tallas')}
                                        />
                                        <label htmlFor='S'>S</label>
                                    </div>
                                    <div className='col-3'>
                                        <input
                                            type='checkbox'
                                            id='M'
                                            name='tallas'
                                            value='M'
                                            {...register('tallas')}
                                        />
                                        <label htmlFor='M'>M</label>
                                    </div>
                                    <div className='col-3'>
                                        <input
                                            type='checkbox'
                                            id='L'
                                            name='tallas'
                                            value='L'
                                            {...register('tallas')}
                                        />
                                        <label htmlFor='L'>L</label>
                                    </div>{' '}
                                    <div className='col-3'>
                                        <input
                                            type='checkbox'
                                            id='XL'
                                            name='tallas'
                                            value='XL'
                                            {...register('tallas')}
                                        />
                                        <label htmlFor='XL'>XL</label>
                                    </div>{' '}
                                    <div className='col-3'>
                                        <input
                                            type='checkbox'
                                            id='XXL'
                                            name='tallas'
                                            value='XXL'
                                            {...register('tallas')}
                                        />
                                        <label htmlFor='XXL'>XXL</label>
                                    </div>{' '}
                                    <div className='col-3'>
                                        <input
                                            type='checkbox'
                                            id='Única'
                                            name='tallas'
                                            value='Única'
                                            {...register('tallas')}
                                        />
                                        <label htmlFor='Única'>Única</label>
                                    </div>{' '}
                                </div>
                                {errorMensajeTallas && (
                                    <AlertaError message={errorMensajeTallas} />
                                )}
                            </div>

                            <div className='modal-footer'>
                                <BotonNegro
                                    text='Editar color'
                                    modalClouse={'modal'}
                                    onClick={() => {
                                        handleShoww();
                                    }}
                                />

                                <CancelarModal
                                    reset={reset}
                                    handleClose={() => {
                                        handleClose();
                                        setSelectColorsNombre([]);
                                    }}
                                    setSelectColorsNombre={
                                        setSelectColorsNombre
                                    }
                                />
                                <GuardarModal onSubmit={handleSubmit(onSubmitt)}/>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
            <SeleccionarColorsEditar
                detallesPrendas={detallesPrendas}
                handleClosee={handleClosee}
                handleShoww={handleShoww}
                showw={showw}
                handleClosex={handleClosex}
            />
        </>
    );
};

EditarPrendas.prototype = {
    detallesPrendas: PropTypes.object.isRequired,
};

export default EditarPrendas;
