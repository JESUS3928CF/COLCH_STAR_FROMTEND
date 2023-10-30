import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import './BotonCambioEstado.css'
import PropTypes from 'prop-types'
import { useState } from 'react';

const BotonCambioEstado = ({ id, isChecked, nombreRegistro, ruta }) => {

    const [estado, setEstado] = useState(isChecked);
    /// Cambiar Estado del registro
    const cambiarEstado = (estado, nombreRegistro, ruta) => {
        Swal.fire({
            title: `¿Deseas ${
                estado ? 'inhabilitar' : 'habilitar'
            } este ${nombreRegistro}?`,
            // text: "Este ",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `Si, ${estado ? 'inhabilítalo' : 'habilítalo'}`,
            cancelButtonText: 'Cancelar',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // Realiza la petición PATCH
                    const response = await clienteAxios.patch(ruta, { estado });

                    if (response.status === 200) {
                        Swal.fire(
                            `${estado ? 'inhabilitado' : 'habilitado'}`,
                            'Cambio de estado exitoso',
                            'success'
                        ).then(() => {
                            location.reload();
                        });

                        setEstado(!estado);
                    } else {
                        Swal.fire(
                            'Error',
                            'Hubo un problema al cambiar el estado',
                            'error'
                        );
                    }
                } catch (error) {
                    console.error('Error al realizar la petición:', error);
                    Swal.fire(
                        'Error',
                        'Hubo un problema al cambiar el estado',
                        'error'
                    );
                }
            }
        });
    };

    return (
        <label className='switch-button' htmlFor={id}>
            <div className='switch-outer'>
                <input
                    id={id}
                    type='checkbox'
                    checked={estado}
                    onChange={() => cambiarEstado(estado, nombreRegistro, ruta)}
                />
                <div className='button'>
                    <span className='button-toggle'></span>
                    <span className='button-indicator'></span>
                </div>
            </div>
        </label>
    );
};




//* Definimos los propTypes de este componente
BotonCambioEstado.propTypes = {
    id: PropTypes.number.isRequired,
    isChecked: PropTypes.bool.isRequired,
    nombreRegistro: PropTypes.string.isRequired,
    ruta: PropTypes.string.isRequired,
};

export default BotonCambioEstado;
