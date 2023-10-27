import './BotonCambioEstado.css'
import PropTypes from 'prop-types'

const BotonCambioEstado = ({ id, isChecked, cambiarEstado }) => {
    return (
        <label className='switch-button' htmlFor={id}>
            <div className='switch-outer'>
                <input id={id} type='checkbox' checked={isChecked} onClick={cambiarEstado}/>
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
    cambiarEstado: PropTypes.func.isRequired
}

export default BotonCambioEstado;
