import { useState } from 'react';
import CancelarModal from '../chared/CancelarModal';
import GuardarModal from '../chared/GuardarModal';
import HeaderModals from '../chared/HeaderModals';
import clienteAxios from '../../config/axios';
import AlertaError from '../chared/AlertaError';

//* Importa las funciones de validación
import {
    validarImagen,
    validarCampoStringVacio,
    validarSeleccion,
} from '../../Validations/validations.js';

const AgregarDiseno = () => {
    //Estados del diseño a agregar
    const [diseno, setDiseno] = useState({
        nombre: '',
        publicado: null,
    });

    /// Leer los datos del formulario
    const leerInformacionDiseno = (e) => {
        console.log(e.target.value);
        setDiseno({
            /// Obtiene una copia del state y agrega el nuevo diseño
            ...diseno,
            [e.target.name]: e.target.value,
        });
    };

    // Estado para el archivo
    const [archivo, setArchivo] = useState('');

    /// Coloca la imagen en el state
    const leerArchivo = (e) => {
        console.log(e.target.files);
        setArchivo(e.target.files[0]);
    };

    // Estados de error
    const [nombreError, setNombreError] = useState('');
    const [publicadoError, setPublicadoError] = useState(null);
    const [archivoError, setArchivoError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        //* Validaciones del diseño a enviar
        setNombreError(validarCampoStringVacio(diseno.nombre, 'nombre'));
        setArchivoError(validarImagen(archivo));
        setPublicadoError(
            validarSeleccion(
                diseno.publicado,
                'Seleccione el estado de publicación'
            )
        );

        //* Verificar si hay errores con un retraso para que cargen los estados de error

        setTimeout(() => {
            if (nombreError || archivoError || publicadoError) {
                alert('Errores');
            }
        }, 500);

        /// Crear un form-data por que así el back puede recibir imágenes
        const formData = new FormData();
        formData.append('nombre', diseno.nombre);
        formData.append('publicado', diseno.publicado);
        formData.append('imagen', archivo);

        /// Almacenar el diseño en la DB
        try {
            const res = await clienteAxios.post('/disenos', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            //todo: Lanzar alerta del producto agregado

            location.reload();
        } catch (error) {
            console.log(error);
            //todo: Lanzar alerta de error
        }
    };

    return (
        <div className='modal' id='myModalAgregarDiseno'>
            <div className='modal-dialog modal-dialog-centered'>
                <div className='modal-content'>
                    {/* Cabecero del modal */}
                    <HeaderModals title={'Agregar diseño'} />

                    <div className='modal-body'>
                        {/* formulario para agregar un Diseño */}
                        <form action='' id='formularioAgregarDiseño'>
                            <div className='mb-3'>
                                <label
                                    htmlFor='nombre'
                                    className='col-form-label'
                                >
                                    Nombre:
                                </label>
                                <input
                                    name='nombre'
                                    type='text'
                                    className='form-control'
                                    placeholder='. . .'
                                    onChange={leerInformacionDiseno}
                                />
                                {/* en esta etiqueta va salir el error de validación  */}
                                <AlertaError message={nombreError} />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='imagen' className='form-label'>
                                    Subir imagen
                                </label>
                                <input
                                    className='form-control'
                                    name='imagen'
                                    type='file'
                                    onChange={leerArchivo}
                                />
                                {/* en esta etiqueta va salir el error de validación  */}
                                <AlertaError message={archivoError} />
                            </div>

                            <div className='mb-3'>
                                <label
                                    htmlFor='rolGuardar'
                                    className='col-form-label'
                                >
                                    ¿Deseas publicarlo?
                                </label>
                                <select
                                    className='form-control'
                                    name='publicado'
                                    onChange={leerInformacionDiseno}
                                >
                                    <option value='' disabled selected>
                                        Selecciona una opción
                                    </option>
                                    <option value='true'>Si</option>
                                    <option value='false'>No</option>
                                </select>
                                {/* en esta etiqueta va salir el error de validación  */}
                                <AlertaError message={publicadoError} />
                            </div>

                            <div className='modal-footer'>
                                {/* Botón para cancelar*/}
                                <CancelarModal />

                                {/* Botón para guardar*/}
                                <GuardarModal onClick={handleSubmit} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgregarDiseno;
