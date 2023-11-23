import PropTypes from 'prop-types';
import useGeneral from '../../hooks/useGeneral';

const GuardarModal = ({ shouldDismiss = false }) => {

    const { buttonRef } = useGeneral();

    // Crear un objeto de propiedades dinámicas
    const buttonProps = {
        type: 'submit',
        className: 'btn-AgregarP',
        value: 'Guardar',
        ref: buttonRef,
    };

    // Agregar o quitar la propiedad data-bs-dismiss en función de shouldDismiss
    if (shouldDismiss) {
        buttonProps['data-bs-dismiss'] = 'modal';
    }

    return <input {...buttonProps} />;
};

GuardarModal.protoTypes = {
    shouldDismiss: PropTypes.bool
};

export default GuardarModal;
