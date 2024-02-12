import PropTypes from 'prop-types';

const GuardarModal = ({ text = 'Guardar', onSubmit }) => {
    // Crear un objeto de propiedades dinámicas

    let buttonProps = {};

    const handleClick = () => {
    // Llama a la función onSubmit cuando se hace clic en el botón.
    if (onSubmit) {
      onSubmit();
    }
  };

    if (!onSubmit) {
        buttonProps = {
            type: 'submit',
            className: 'btn-AgregarP',
            value: text,
        };
    } else {
        buttonProps = {
            type: 'button',
            onClick: handleClick,
            className: 'btn-AgregarP',
            value: text ,
        };
    }

    return <input {...buttonProps} />;
};

GuardarModal.protoTypes = {
    text: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
};

export default GuardarModal;
