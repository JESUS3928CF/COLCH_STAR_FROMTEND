import PropTypes from 'prop-types';

const CancelarModal = ({ modalToCancel, NoReset, name}) => {

    //funcion que cuando le de click en cancelar se refresque la pagina y se restablesca la informacion que estaba en el formulario
    const onClick = () =>  {
        if (NoReset != true){
        location.reload()
        
        }
        
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
          {name}
        </button>
        
    );
};

CancelarModal.propTypes = {
    modalToCancel: PropTypes.string,
  };

export default CancelarModal;
