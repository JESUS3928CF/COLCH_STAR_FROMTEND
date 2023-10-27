

const Buscador = () => {
    return (
        <>
            {/* botón de buscar */}
            <div >
                <form className='d-flex'>
                    <input
                        id='barra-buscar'
                        className='form-control me-2'
                        type='search'
                        placeholder='Buscar...'
                        aria-label='Search'
                    />
                    {/* <button id="btn-buscar" className="btn btn-outline-success" type="submit">Buscar</button> */}

                    <div id='resultados-container'></div>
                </form>
            </div>
        </>
    );
};

export default Buscador;
