import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import './BotonCambioEstado.css';
import PropTypes from 'prop-types';
import useAuth from '../../hooks/useAuth';
import usePrendas from '../../hooks/usePrendas';

const BotonCambioEstado = ({
    id,
    isChecked,
    nombreRegistro,
    ruta,
    editarEstado,
    cambiarPublicacion = { estado: true, paraPublicacion: false },
    bloquearCambioDeEstado = { "estado": false, "fecha": date.now()},
    mensajeError = 'Este ' +
        nombreRegistro +
        ' no se le puede cambiar el estado de publicación porque está Inhabilitado',
    detalle = [],
}) => {
    const { config } = useAuth();

    const { consultPrendas } = usePrendas();

    const alertaError = () => {
        return Swal.fire('Acción inválida!', `${mensajeError}`, 'error');
    };

    ///
    function haceMasDeUnaSemana(fecha) {
        // Obtener la fecha actual
        var fechaActual = new Date();
      
        // Calcular la diferencia en milisegundos entre la fecha actual y la fecha proporcionada
        var diferencia = fechaActual - fecha;
      
        // Calcular el número de milisegundos en una semana
        var unaSemanaEnMilisegundos = 7 * 24 * 60 * 60 * 1000;
      
        // Comprobar si la diferencia es mayor a una semana
        if (diferencia > unaSemanaEnMilisegundos) {
          return true;
        } else {
          return false;
        }
      }
      

    /// Aca definimos si le podemos cambiar el estado de publicación de un registro
    const validarElCambioDeEstado = new Promise((resolve) => {
        let sePuedeCambiar = true;

        

          console.log((bloquearCambioDeEstado.fecha))

    //* Por aca bloquemos que made el mensaje de que ya no se puede cancelar
        if (
            (cambiarPublicacion.paraPublicacion &&
                !cambiarPublicacion.estado) || (bloquearCambioDeEstado.estado && isChecked == false) || (!haceMasDeUnaSemana(bloquearCambioDeEstado.fecha && isChecked == true))
        )
            sePuedeCambiar = false;
        else if (cambiarPublicacion.paraPublicacion)
            nombreRegistro = nombreRegistro + ' en el catalogo';

        if (sePuedeCambiar) {
            resolve(cambiarEstadoDB);
        } else {
            resolve(alertaError);
        }
    });

    // const [isChecked, setEstado] = useState(isChecked);
    /// Cambiar Estado del registro en la base de datos
    function cambiarEstadoDB() {
        Swal.fire({
            title: `¿Deseas ${
                isChecked ? 'Inhabilitar' : 'Habilitar'
            } este ${nombreRegistro}?`,
            // text: "Este ",
            icon: 'question',
            iconColor: '#fa0000',
            showCancelButton: true,
            confirmButtonColor: '#3E5743',
            cancelButtonColor: '#252432',
            confirmButtonText: `Si, ${
                isChecked ? 'Inhabilítalo' : 'Habilítalo'
            }`,
            cancelButtonText: 'Cancelar',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // Realiza la petición PATCH
                    const response = await clienteAxios.patch(
                        ruta,
                        { estado: isChecked, detalle: detalle },
                        config
                    );

                    if (response.status === 200) {
                        Swal.fire(
                            `${isChecked ? 'Inhabilitado' : 'Habilitado'}`,
                            'Cambio de estado exitoso',
                            'success'
                        ).then(() => {
                            // todo: actualizar estado
                            if (editarEstado) editarEstado(id);
                            else {
                                location.reload();
                            }

                            if (detalle != []) {
                                consultPrendas();
                            }
                        });

                        // setEstado(!isChecked);
                    } else {
                        Swal.fire(
                            'Error',
                            'Hubo un problema al cambiar el estado',
                            'error'
                        );
                    }
                } catch (error) {
                    if (error.response.status === 403) {
                        Swal.fire({
                            title: 'Error',
                            text: error.response.data.message,
                            icon: 'error',
                        });

                        
                    } else {
                        Swal.fire(
                            'Error',
                            'Hubo un problema al cambiar el estado',
                            'error'
                        );
                    }
                }
            }
        });
    }

    const cambiarEstado = () => {
        validarElCambioDeEstado
            .then((resultado) => resultado())
            .catch((error) => {
                if (typeof error == 'function') {
                    error();
                } else {
                    console.error(error);
                }
            });
    };

    return (
        <label className='switch-button'>
            <div className='switch-outer '>
                <input
                    id={id}
                    type='checkbox'
                    checked={isChecked}
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
    editarEstado: PropTypes.func,
    bloquearCambioDeEstado: PropTypes.object,
    mensajeError: PropTypes.string,
    detalle: PropTypes.array,
};

export default BotonCambioEstado;
