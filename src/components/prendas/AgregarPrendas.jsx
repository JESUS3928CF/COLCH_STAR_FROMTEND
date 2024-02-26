//----------------TOMAS SANTIAGO VANEGAS SANCHEZ
//--------------------14 de noviembre 203

// Permitirá agregar una prenda, color mediante un formulario
//y se mostrara en la tabla de prendas

import CancelarModal from '../chared/CancelarModal';
import GuardarModal from '../chared/GuardarModal';
import { useForm } from 'react-hook-form';

import {
    validarEspaciosVacios,
    validarImagen,
} from '../../Validations/validations';
import Swal from 'sweetalert2';
import AlertaError from '../chared/AlertaError';
import { useState } from 'react';
import HeaderModals from '../chared/HeaderModals';
import BotonNegro from '../chared/BotonNegro';
import SeleccionarColors from './SeleccionarColor';
import { Modal } from 'react-bootstrap';
import usePrendas from '../../hooks/usePrendas';
import BotonVerde from '../chared/BotonVerde';

const AgregarPrendas = () => {
    const {
        agregarPrendas,
        Prendas,
        setSelectColorsNombre,
        selectColorsNombre,
    } = usePrendas();

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    };
    const handleShow = () => setShow(true);

    const [errorMensajeTallas, setErrorMensajeTallas] = useState(null);

    //* Esto es para seleccionar todos los check list
    //    const [selectAll, setSelectAll] = useState(false);

    //    const handleSelectAll = () => {
    //        // Toggle the selectAll state and update the checked state of all checkboxes
    //        setSelectAll(!selectAll);
    //        const checkboxes = document.querySelectorAll('input[name="tallas"]');
    //        checkboxes.forEach((checkbox) => {
    //            checkbox.checked = !selectAll;
    //        });
    //    };

    // función para cerrar modal de AgregarDiseñosModal
    const [showw, setShoww] = useState(false);

    const handleClosee = () => {
        setShoww(false), handleShow();
    };
    const handleShoww = () => {
        setShoww(true), handleClose();
    };
    const handleClosex = () => {
        setShoww(false);
    };

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

    const onSubmit = async (data) => {
        const {
            nombre,
            precio,
            genero,
            imagen,
            tipo_de_tela,
            publicado,
            tallas,
        } = data;

        // Validación que manda un alerta que al menos se debe seleccionar un permiso
        if (tallas.length === 0 || tallas === false) {
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
            agregarPrendas(
                {
                    nombre: nombre.trim(),
                    precio: precio.trim(),
                    tipo_de_tela: tipo_de_tela.trim(),
                    genero: genero,
                    imagen: imagen[0],
                    publicado: publicado,
                    tallas: tallas,
                    colores: JSON.stringify(selectColorsNombre),
                },

                reset,
                handleClose
            );
        }

        setErrorMensajeTallas(null);
    };

    return (
        <>
            <BotonVerde
                text={'Agregar prenda'}
                onClick={() => {
                    handleShow();
                    setSelectColorsNombre([]);
                    setErrorMensajeTallas(null);
                }}
            />
            <Modal
                show={show}
                onHide={() => {
                    reset();
                    handleClose();
                }}
                id='myModal'
            >
                <div className='modal-content'>
                    <HeaderModals
                        title={'Agregar prenda'}
                        handleClose={() => {
                            reset();
                            handleClose();
                            setSelectColorsNombre([]);
                        }}
                    />

                    <div className='modal-body '>
                        <form
                            className='row g-3 needs-validation'
                        >
                            <div className='col-md-6' name='nombre'>
                                <label
                                    htmlFor='nombre'
                                    className='col-form-label'
                                >
                                    Nombre: *
                                </label>
                                <input
                                    type='text'
                                    className='form-control'
                                    name='nombre'
                                    placeholder='. . .'
                                    title='Ingresa el nombre de la prenda'
                                    {...register('nombre', {
                                        required: {
                                            value: true,
                                            message: 'El nombre es obligatorio',
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

                            <div className='col-md-6' name='precio'>
                                <label
                                    htmlFor='precio'
                                    className='col-form-label'
                                >
                                    Precio: *
                                </label>
                                <input
                                    type='text'
                                    className='form-control'
                                    name='precio'
                                    placeholder='. . .'
                                    title='Ingresa el precio'
                                    {...register('precio', {
                                        required: {
                                            value: true,
                                            message: 'El precio es obligatorio',
                                        },
                                        validate: (value) => {
                                            if (value.includes(' ')) {
                                                return 'No se permiten espacios en blanco';
                                            }
                                            // Verificar si hay caracteres no permitidos (letras, puntos, caracteres especiales)
                                            if (!/^\d+$/.test(value)) {
                                                return 'El precio solo puede tener números';
                                            }
                                            if (value.startsWith('0')) {
                                                return 'El precio no puede iniciar con 0';
                                            }
                                            return true;
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
                                    onChange={(e) => {
                                        setValue('genero', e.target.value);
                                        trigger('genero');
                                    }}
                                >
                                    <option value='' disabled={false}>
                                        {' '}
                                        Selecciona una opción
                                    </option>
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
                            <div className='col-md-6' name='Publicado'>
                                <label
                                    htmlFor='Publicar'
                                    className='col-form-control'
                                >
                                    ¿Deseas publicarlo? *
                                </label>

                                <select
                                    name='publicado'
                                    id=''
                                    className='form-control'
                                    title='Seleccione una opción'
                                    {...register('publicado', {
                                        required: {
                                            value: true,
                                            message:
                                                'El estado de publicación es obligatorio',
                                        },
                                    })}
                                >
                                    <option value=''>
                                        Selecciona una opción
                                    </option>
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
                                                'El tipo de tela  es obligatorio',
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

                            <div className='col-md-6' name='Archivo'>
                                <label
                                    htmlFor='Archivo'
                                    className='col-from-label'
                                >
                                    Imagen de la prenda: *
                                </label>
                                <input
                                    type='file'
                                    className='form-control'
                                    name='imagen'
                                    title='Ingrese la imagen de la prenda'
                                    {...register('imagen', {
                                        required: {
                                            value: true,
                                            message: 'La imagen es obligatoria',
                                        },
                                        validate: (value) => {
                                            return validarImagen(value[0]);
                                        },
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
                                <div>
                                    <BotonNegro
                                        text='Agregar color'
                                        onClick={handleShoww}
                                    />
                                </div>

                                <CancelarModal
                                    reset={reset}
                                    handleClose={handleClose}
                                    setSelectColorsNombre={
                                        setSelectColorsNombre
                                    }
                                />
                                <GuardarModal onSubmit={handleSubmit(onSubmit)}/>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>

            <SeleccionarColors
                handleClosee={handleClosee}
                handleShoww={handleShoww}
                showw={showw}
                handleClosex={handleClosex}
            />
        </>
    );
};

export default AgregarPrendas;
