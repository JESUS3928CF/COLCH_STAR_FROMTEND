import './BotonCambioEstado.css'
import PropTypes from 'prop-types'

const BotonCambioEstado = ({ id, isChecked }) => {
    return (
        <label className='switch-button' htmlFor={id}>
            <div className='switch-outer'>
                <input id={id} type='checkbox' checked={isChecked} />
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
    isChecked: PropTypes.bool.isRequired
}

export default BotonCambioEstado;
