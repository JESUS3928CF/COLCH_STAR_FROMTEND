import PropTypes from 'prop-types';

const ModalesButton = ({text, openModal, closeModale, ruta, onclick,back})=>{
    if(ruta){
        return(
            <button type="button" className="btn btn-secondary"
            style={{ backgroundColor: '#252432', color: '#fff' }}

            >
                {text}
            </button>
        );
    }

    return(
        <button type="button" 
        className="btn btn-secondary"
        data-bs-toggle={back}
        data-bs-target={openModal}
        data-bs-dismiss={closeModale}
        style={{ backgroundColor: '#252432' }}
        onClick={onclick}
    
        >
            {text}
    
        </button>
    )
}


ModalesButton.prototype={
    text: PropTypes.string.isRequired,
    ruta: PropTypes.bool,
    openModal: PropTypes.string,
    closeModale: PropTypes.string,
    back: PropTypes.string,
    onClick: PropTypes.func,
    
}

export default  ModalesButton


