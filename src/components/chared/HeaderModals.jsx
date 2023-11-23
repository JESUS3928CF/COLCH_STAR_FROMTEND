import PropTypes from 'prop-types';

const HeaderModals = ({ title}) => {

    
    
    return (
        <div
            className='modal-header modal-head-agregar '
            style={{ backgroundColor: '#252432' }}
        >
            <h5 className='modal-title'>{title}</h5>
        </div>
    );
    
};

HeaderModals.propTypes = {
    title: PropTypes.string.isRequired, 
}

export default HeaderModals;
