import PropTypes from 'prop-types';

const HeaderModals = ({ title }) => {

    const click = () => {

        location.reload()

    }
    
    
    return (
        
        <div
            className='modal-header modal-head-agregar'
            style={{ backgroundColor: '#252432' }}
        >
            <h5 className='modal-title'>{title}</h5>
            <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
                onClick={click}
                
                
            ></button>

            
            
        </div>
        
        
    );
    
};

HeaderModals.propTypes = {
    title: PropTypes.string.isRequired, 
}

export default HeaderModals;
