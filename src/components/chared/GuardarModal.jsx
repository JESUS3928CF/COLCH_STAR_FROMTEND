import PropTypes from 'prop-types';

const GuardarModal = ({text = "Guardar"}) => {

    // Crear un objeto de propiedades dinámicas
    const buttonProps = {
        type: 'submit',
        className: 'btn-AgregarP',
        value: text,
    };

    return <input {...buttonProps} />;
};

GuardarModal.protoTypes = {
    text: PropTypes.string,
};

export default GuardarModal;
