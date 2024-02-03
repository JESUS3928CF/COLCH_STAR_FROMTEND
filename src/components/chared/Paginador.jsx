import PropTypes from 'prop-types';

const Paginador = ({ setDatosFiltrar, datos, registroPorPaginas=10 }) => {
    const registrosPorPagina = registroPorPaginas;
    const totalPaginas = Math.ceil(datos.length / registrosPorPagina);
    let paginaActual;

    /// Este es el Paginador
    function* crearPaginador(total) {
        for (let i = 1; i <= total; i++) {
            /// Para registrar el valor actual
            yield i;
        }
    }

    const filtrarDatos = (e, pagina) => {
        const datosFinales = registrosPorPagina * pagina;
        const datosIniciales = datosFinales - registrosPorPagina;

        setDatosFiltrar(datos.slice(datosIniciales, datosFinales));
    };

    const imprimirPaginador = () => {
        paginaActual = crearPaginador(totalPaginas);
        const itemsPaginador = [];

        for (const pagina of paginaActual) {
            itemsPaginador.push(
                <li className='page-item' key={pagina}>
                    <a
                        className='page-link'
                        href='#'
                        style={{ color: 'black' }}
                        onClick={(e) => filtrarDatos(e, pagina)}
                    >
                        {pagina}
                    </a>
                </li>
            );
        }

        return itemsPaginador;
    };
    // style={{marginLeft: 150}
    return (
        <nav aria-label='Page navigation example'>
            <ul className='pagination'>
                <li className='page-item'>
                    <a className='page-link' href='#' aria-label='Previous'>
                        <span aria-hidden='true' style={{ color: 'black' }}>
                            &laquo;
                        </span>
                    </a>
                </li>
                {imprimirPaginador()}
                <li className='page-item'>
                    <a className='page-link' href='#' aria-label='Next'>
                        <span aria-hidden='true' style={{ color: 'black' }}>
                            &raquo;
                        </span>
                    </a>
                </li>
            </ul>
        </nav>
    );
};

Paginador.propTypes = {
    setDatosFiltrar: PropTypes.func.isRequired,
    datos: PropTypes.array.isRequired,
};

export default Paginador;
