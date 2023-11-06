import PropTypes from 'prop-types';
import Styles from './ButtonCloseMenu.module.css';

const ButtonCloseMenu = ({ onClick }) => {
    return (
        <label className={Styles.bar} htmlFor='check'>
            <input type='checkbox' id='check' onClick={onClick} />

            <span className={Styles.top}></span>
            <span className={Styles.middle}></span>
            <span className={Styles.bottom}></span>
        </label>
    );
};

ButtonCloseMenu.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default ButtonCloseMenu;
