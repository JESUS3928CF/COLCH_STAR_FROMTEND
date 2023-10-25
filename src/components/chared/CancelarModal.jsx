import PropTypes from 'prop-types';

const CancelarModal = ({ modalToCancel }) => {
    return (
        <button
            type='button'
            className='btn btn-danger'
            id={modalToCancel}
            data-bs-dismiss='modal'
            style={{
                backgroundColor: '#252432',
                borderColor: '#252432', // Utiliza borderColor en lugar de border
            }}
        >
            Cancelar
        </button>
    );
};

CancelarModal.propTypes = {
    modalToCancel: PropTypes.string.isRequired,
};

export default CancelarModal;
