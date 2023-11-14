import PropTypes from 'prop-types';

const BotonNegro = ({ text, modalToOpen , modalClouse, quieresAbrirRuta, onClick }) => {
    if (quieresAbrirRuta) {
        return (
            <button
                type='button'
                className='btn btn-secondary'
                style={{ backgroundColor: '#252432', color: '#fff' }}
            >
                {text}
            </button>
        );
    }

    return (
        <button
            type='button'
            className='btn btn-secondary'
            data-bs-toggle='modal'
            data-bs-target={modalToOpen}
            data-bs-dismiss={modalClouse}
            style={{ backgroundColor: '#252432' }}
            onClick={onClick}
        >
            {text}
        </button>
    );

    
};

BotonNegro.propTypes = {
    text: PropTypes.string.isRequired,
    quieresAbrirRuta: PropTypes.bool,
    modalToOpen: PropTypes.string,
    onClick: PropTypes.func,
};

export default BotonNegro;
