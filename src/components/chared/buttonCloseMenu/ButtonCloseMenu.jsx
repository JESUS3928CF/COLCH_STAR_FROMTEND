import PropTypes from 'prop-types';
import Styles from './ButtonCloseMenu.module.css';
import { Fragment } from 'react';

const ButtonCloseMenu = ({ onClick }) => {
    return (
        <Fragment>
            <label className={Styles.bar} htmlFor='check'>
                <input type='checkbox' id='check' onClick={onClick} />

                <span className={Styles.top}></span>
                <span className={Styles.middle}></span>
                <span className={Styles.bottom}></span>
            </label>
        </Fragment>
    );
};

ButtonCloseMenu.propTypes = {
    onClick: PropTypes.func.isRequired
};

export default ButtonCloseMenu;
