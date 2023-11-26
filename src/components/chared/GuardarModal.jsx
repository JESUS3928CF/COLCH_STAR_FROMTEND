import PropTypes from 'prop-types';

const GuardarModal = () => {

    // Crear un objeto de propiedades dinámicas
    const buttonProps = {
        type: 'submit',
        className: 'btn-AgregarP',
        value: 'Guardar',
    };

    return <input {...buttonProps} />;
};

GuardarModal.protoTypes = {
    shouldDismiss: PropTypes.bool
};

export default GuardarModal;
