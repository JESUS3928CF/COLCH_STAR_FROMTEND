import PropTypes from 'prop-types';

const AlertaError = ({ message }) => {
    return (
        <p className='text-red-500' style={{ fontSize: 14 }}>
            {message}
        </p>
    );
};

AlertaError.propTypes = {
    message: PropTypes.string.isRequired,
};


export default AlertaError;



