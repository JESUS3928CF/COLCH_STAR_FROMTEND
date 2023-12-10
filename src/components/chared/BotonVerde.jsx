import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const BotonVerde = ({ text, modalToOpen, onClick }) => {
    // Crear un objeto de propiedades dinámicas
    let buttonProps = {};

    if (modalToOpen) {
        buttonProps = {
            type: 'button',
            className: 'btn btn-success',
            'data-bs-toggle': 'modal',
            'data-bs-target': modalToOpen,
            style: { backgroundColor: '#47684e' },
            onClick: onClick,
        };
    } else {
        buttonProps = {
            type: 'button',
            className: 'btn btn-success',
            style: { backgroundColor: '#47684e' },
            onClick: onClick,
        };
    }

    return <Button {...buttonProps}>{text}</Button>;
};

BotonVerde.propTypes = {
    text: PropTypes.string.isRequired,
    modalToOpen: PropTypes.string,
    onClick: PropTypes.func,
};
export default BotonVerde;
