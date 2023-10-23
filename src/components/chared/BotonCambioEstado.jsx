import './BotonCambioEstado.css'
import PropTypes from 'prop-types'

const BotonCambioEstado = ({id}) => {
    return (
        <label className='switch-button' htmlFor={id}>
            <div className='switch-outer'>
                <input id={id} type='checkbox' />
                <div className='button'>
                    <span className='button-toggle'></span>
                    <span className='button-indicator'></span>
                </div>
            </div>
        </label>
    );
};

//* Definimos los propTypes de este componente
BotonCambioEstado.PropTypes = {
    id: PropTypes.number.isRequired,
}

export default BotonCambioEstado;
