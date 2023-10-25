import { Navbar } from '../components/Navbar';
import { Link } from 'react-router-dom';

/// Componentes integrados
import BotonVerde from '../components/chared/BotonVerde';
import Buscador from '../components/chared/Buscador';
import BotonNegro from '../components/chared/BotonNegro';
import AgregarDiseno from '../components/diseños/AgregarDiseno';
import PrecioDiseno from '../components/diseños/PrecioDiseno';


import ListarDisenos from '../components/diseños/ListarDisenos';
import EditarDiseno from '../components/diseños/EditarDiseno';
import { DetalleDiseno } from '../components/diseños/DetalleDiseno';

export const Diseno = () => {
    const contentStyle = {
        marginLeft: '260px', // Ancho del Navbar
    };

    return (
        <div>
            <Navbar />

            <div style={contentStyle}>
                <h1 className='titulo'>Diseños</h1>
                <div className='container-fluid seccion2'>
                    {/* botón de agregar diseño  */}
                    <BotonVerde
                        text={'Agregar diseño'}
                        modalToOpen={'#myModalAgregarDiseno'}
                    />

                    {/* modal de agregar diseño  */}
                    <AgregarDiseno />

                    <BotonVerde
                        text='Modificar precio'
                        modalToOpen='#myModalPrecio'
                    />

                    {/* modal de precio de los diseños  */}
                    <PrecioDiseno />
                    
                    {/* botón para mostrar la lista de productos    */}
                    <Link to={'/productos'}>
                        <BotonNegro text={'Atrás'} />
                    </Link>
                    {/* <a href="./productos.html"><button type="button" className="btn btn-secondary">Atrás</button></a> */}
                </div>

                <div className='seccion4'>
                    <Buscador />
                </div>
                {/* Tabla para listar diseños */}
                <ListarDisenos />

                {/* <!-- modal para editar diseño --> */}
                <EditarDiseno />

                {/* <!-- ver detalle de productos --> */}
                <DetalleDiseno />
            </div>
        </div>
    );
};

export default Diseno;
