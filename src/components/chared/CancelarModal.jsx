import PropTypes from 'prop-types';

const CancelarModal = ({ modalToCancel }) => {

    //funcion que cuando le de click en cancelar se refresque la pagina y se restablesca la informacion que estaba en el formulario
    const onClick = (e) =>  {
        location.reload()
        
    }

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
            Cancelar
        </button>
        
    );
};

CancelarModal.propTypes = {
    modalToCancel: PropTypes.string.isRequired,
};

export default CancelarModal;
