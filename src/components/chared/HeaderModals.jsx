import PropTypes from 'prop-types';

const HeaderModals = ({ title, handleClose}) => {

    
    
    return (
        <div
            className='modal-header modal-head-agregar '
            style={{ backgroundColor: '#252432' }}
        >
            <h5 className='modal-title'>{title}</h5>
            <button
                type='button'
                onClick={handleClose? () => handleClose() : () => {}}
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
                style={{ backgroundColor: "white"}}
            ></button>
        </div>
    );
    
};

HeaderModals.propTypes = {
    title: PropTypes.string.isRequired,
    handleClose: PropTypes.func,
};

export default HeaderModals;
