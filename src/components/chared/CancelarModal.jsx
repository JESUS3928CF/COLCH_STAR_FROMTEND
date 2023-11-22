import PropTypes from 'prop-types';

const CancelarModal = ({ modalToCancel, NoReset, name="Cancelar"}, reset) => {

    //función que cuando le de click en cancelar se refresque la pagina y se restablezca la informacion que estaba en el formulario
    const onClick = () =>  {
        if (!NoReset){
            if(reset){
                reset()
            }
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
    name: PropTypes.string,
    NoReset: PropTypes.bool
  };

export default CancelarModal;
