/// Componentes integrados
import BotonVerde from '../components/chared/BotonVerde';
import AgregarDiseno from '../components/diseños/AgregarDiseno';
import PrecioDiseno from '../components/diseños/PrecioDiseno';


import ListarDisenos from '../components/diseños/ListarDisenos';
import Header from '../components/chared/header/Header';

export const Diseno = () => {

    return (
        <div>

            <div>
                <Header titulo='Gestionar Diseños'/>
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
                    {/* <a href="./productos.html"><button type="button" className="btn btn-secondary">Atrás</button></a> */}
                </div>

                {/* Tabla para listar diseños */}
                <ListarDisenos />
            </div>
        </div>
    );
};

export default Diseno;
