import PropTypes from 'prop-types';

const GuardarModal = ({ onClick }) => {
    return (
        <input
            type='submit'
            className='btn btn-success'
            value='Guardar'
            onClick={onClick}
        />
    );
};

GuardarModal.prototype = {
    onClick: PropTypes.func,
};

export default GuardarModal;
