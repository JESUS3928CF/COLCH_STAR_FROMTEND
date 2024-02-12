import PropTypes from 'prop-types';

const GuardarModalSubmit = ({ text = 'Guardar', onSubmit }) => {
    let buttonProps = {};

    const handleClick = () => {
        // Llama a la función onSubmit cuando se hace clic en el botón.
        onSubmit();
    };
    
    buttonProps = {
        type: 'button',
        onClick: handleClick,
        className: 'btn-AgregarP',
        value: text,
    };

    return <input {...buttonProps} />;
};

GuardarModalSubmit.protoTypes = {
    text: PropTypes.string,
    onSubmit: PropTypes.func,
};

export default GuardarModalSubmit;
