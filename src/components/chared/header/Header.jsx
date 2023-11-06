import PropTypes from 'prop-types';
import styles from './Header.module.css';

const Header = ({ titulo }) => {
    return (
        <div className={`container-fluid ${styles.contenedor}`}>
            <div className='row d-flex justify-content-center align-items-center'>
                <div className='col text-center'>
                    <h1 className={styles.titulo}> {titulo} </h1>
                </div>
            </div>
        </div>
    );
};

Header.propTypes = {
    titulo: PropTypes.string.isRequired
};

export default Header;
