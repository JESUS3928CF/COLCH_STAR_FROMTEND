import PropTypes from 'prop-types';

//TODO: modalToCancel sera eliminado

const CancelarModal = ({
    modalToCancel,
    reset,
    name = 'Cancelar',
    handleClose,
}) => {
    //función que cuando le de click en cancelar se refresque la pagina y se restablezca la informacion que estaba en el formulario
    const onClick = () => {
        if (reset) reset();
        handleClose();
    };

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
            onClick={onClick}
        >
            {name}
        </button>
    );
};

CancelarModal.propTypes = {
    modalToCancel: PropTypes.string,
    name: PropTypes.string,
    reset: PropTypes.func,
    handleClose : PropTypes.func
};

export default CancelarModal;
