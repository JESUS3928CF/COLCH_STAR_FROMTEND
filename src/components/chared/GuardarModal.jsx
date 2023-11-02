import PropTypes from 'prop-types';

const GuardarModal = ({ onClick }) => {
    return (
        <input
            type='submit'
            className='btn-AgregarP'
            value='Guardar'
            onClick={onClick}
        />
    );
};

GuardarModal.prototype = {
    onClick: PropTypes.func,
};

export default GuardarModal;
