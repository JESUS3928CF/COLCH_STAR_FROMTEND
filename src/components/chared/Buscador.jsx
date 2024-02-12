import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

//* Esta función requiere el set de los datos a filtrar, los datos de respaldo, y los campos por los cuales se permite filtrar
const Buscador = ({
    setDatosFiltrar,
    datos,
    camposFiltrar,
    busqueda,
    setBusqueda,
}) => {
    const realizarBusqueda = () => {
        // Filtrar los datos si hay un término de búsqueda, de lo contrario, mostrar todos los datos

        if (busqueda) {
            const resultados = datos.filter((dato) => {
                for (const campo of camposFiltrar) {
                    if (
                        dato[campo] &&
                        JSON.stringify(dato[campo])
                            .toString()
                            .toLowerCase()
                            .includes(busqueda.toLowerCase())
                    ) {
                        return true;
                    }
                }
                return false;
            });

            // Actualizar los datos con los resultados de la búsqueda
            setDatosFiltrar(resultados);
        } else {
            setDatosFiltrar(datos); // Mostrar todos los datos en el estado de filtrado
        }
    };

    // Realizar la búsqueda automáticamente cuando cambia el valor del campo de entrada
    useEffect(() => {
        realizarBusqueda();
    }, [busqueda, datos, setDatosFiltrar]);

    return (
        <form className=''>
            <input
                className='form-control me-2'
                type='search'
                placeholder='Buscar...'
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
            />
        </form>
    );
};

// PropTypes para validar los props
Buscador.propTypes = {
    setDatosFiltrar: PropTypes.func.isRequired,
    datos: PropTypes.array.isRequired,
    camposFiltrar: PropTypes.arrayOf(PropTypes.string).isRequired,
    busqueda: PropTypes.string.isRequired,
    setBusqueda: PropTypes.func.isRequired,
};

export default Buscador;
