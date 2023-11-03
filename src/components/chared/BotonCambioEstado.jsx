import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import './BotonCambioEstado.css'
import PropTypes from 'prop-types'
import { useState } from 'react';

const BotonCambioEstado = ({ id, isChecked, nombreRegistro, ruta, cambiarPublicacion = { estado : true, paraPublicacion : false} }) => {


    const alertaError = () => {
    
            return Swal.fire(
                'Acción inválida!',
                `Este  ${nombreRegistro} no se le puede cambiar el estado de publicación porque está Inhabilitado`,
                'error'
            );
    }

    /// Aca definimos si le podemos cambiar el estado de publicación de un registro
    const validarElCambioDeEstado = new Promise((resolve, reject) => {

        let sePuedeCambiar = true;

        if(cambiarPublicacion.paraPublicacion && !cambiarPublicacion.estado) sePuedeCambiar = false;
        else if(cambiarPublicacion.paraPublicacion) nombreRegistro = nombreRegistro + " en el catalogo";

        if(sePuedeCambiar) {
            resolve(cambiarEstadoDB);
        } else {
            console.log("Que pasa")
            reject(alertaError)
        }
    })

    

    const [estado, setEstado] = useState(isChecked);
    /// Cambiar Estado del registro en la base de datos
    function cambiarEstadoDB () {
        Swal.fire({
            title: `¿Deseas ${
                estado ? 'Inhabilitar' : 'Habilitar'
            } este ${nombreRegistro}?`,
            // text: "Este ",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `Si, ${estado ? 'Inhabilítalo' : 'Habilítalo'}`,
            cancelButtonText: 'Cancelar',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // Realiza la petición PATCH
                    const response = await clienteAxios.patch(ruta, { estado });

                    if (response.status === 200) {
                        Swal.fire(
                            `${estado ? 'Inhabilitado' : 'Habilitado'}`,
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
    }

    const cambiarEstado = () => {
        validarElCambioDeEstado
    .then(resultado => resultado())
    .catch(error => {
        if(typeof error =='function'){
            error();
        }else{
            console.error(error);
        }
    });
    }

    return (
        <label className='switch-button' >
            <div className='switch-outer'>
                <input
                    id={id}
                    type='checkbox'
                    checked={estado}
                    onChange={() => cambiarEstado()}
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
    cambiarPublicacion: PropTypes.shape({
        estado: PropTypes.bool.isRequired,
        paraPublicacion: PropTypes.bool.isRequired,
    }),
};

export default BotonCambioEstado;
