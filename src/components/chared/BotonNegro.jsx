import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const BotonNegro = ({ text, modalToOpen , modalClouse, onClick }) => {
    // Crear un objeto de propiedades dinámicas
    let buttonProps = {};

    if (modalToOpen || modalClouse && modalToOpen != undefined) {
        buttonProps = {
            type: 'button',
            className: 'btn btn-secondary',
            'data-bs-toggle': 'modal',
            'data-bs-target': modalToOpen,
            style: { backgroundColor: '#252432' },
            onClick: onClick,
        };
    } else {
        buttonProps = {
            type: 'button',
            className: 'btn btn-success',
            style: { backgroundColor: '#252432' },
            onClick: onClick,
        };
    }
    return <Button {...buttonProps}>{text}</Button>;
};

BotonNegro.propTypes = {
    text: PropTypes.string.isRequired,
    quieresAbrirRuta: PropTypes.bool,
    modalToOpen: PropTypes.string,
    onClick: PropTypes.func,
    modalClouse: PropTypes.string,
};

export default BotonNegro;
