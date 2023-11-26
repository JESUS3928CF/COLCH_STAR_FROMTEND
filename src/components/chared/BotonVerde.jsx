import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const BotonVerde = ({ text, modalToOpen, onClick }) => {
    return (
        <Button
            type='button'
            className='btn btn-success'
            data-bs-toggle='modal'
            data-bs-target={modalToOpen}
            style={{ backgroundColor: '#47684e' }}
            onClick={onClick}
        >
            {text}
        </Button>
    );
};

BotonVerde.propTypes = {
    text: PropTypes.string.isRequired,
    modalToOpen: PropTypes.string.isRequired,
    onClick: PropTypes.func,
};
export default BotonVerde;
