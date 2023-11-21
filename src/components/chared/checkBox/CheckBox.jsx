import Styles from './CheckBox.module.css';
import PropTypes from 'prop-types';


const CheckBox = ({ text, onChange, checked }) => {
    function capitalizarPrimeraLetra(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return (
        <div className={Styles.checkbox_wrapper_44}>
            <label
                className={Styles.toggleButton}
                style={{ display: 'flex', alignItems: 'center' }}
            >
                <input type='checkbox' value={text} onChange={onChange} checked={checked} />
                <div>
                    <svg viewBox='0 0 44 44'>
                        <path
                            transform='translate(-2.000000, -2.000000)'
                            d='M14,24 L21,31 L39.7428882,11.5937758 C35.2809627,6.53125861 30.0333333,4 24,4 C12.95,4 4,12.95 4,24 C4,35.05 12.95,44 24,44 C35.05,44 44,35.05 44,24 C44,19.3 42.5809627,15.1645919 39.7428882,11.5937758'
                        ></path>
                    </svg>
                </div>
                <p style={{ marginLeft: '8px' }}>{`${capitalizarPrimeraLetra(
                    text
                )}`}</p>
            </label>
        </div>
    );
};

CheckBox.propTypes = {
    text: PropTypes.string.isRequired, // Validación para asegurar que `text` es una cadena y es requerido
    onChange: PropTypes.func.isRequired, // Validación para asegurar que `onChange` es una función y es requerido
    checked: PropTypes.bool.isRequired
};

export default CheckBox;
