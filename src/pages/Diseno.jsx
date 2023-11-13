/// Componentes integrados
import BotonVerde from '../components/chared/BotonVerde';
import AgregarDiseno from '../components/diseños/AgregarDiseno';
import PrecioDiseno from '../components/diseños/PrecioDiseno';


import ListarDisenos from '../components/diseños/ListarDisenos';
import Header from '../components/chared/header/Header';
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

export const Diseno = () => {
    /// extrayendo la información para la autenticación
    const { auth, loading } = useAuth();
    if (loading == true) return 'Cargando...';


    return auth.usuario.permisos.includes('producto') ? (
        <div>
            <div>
                <Header titulo='Gestionar Diseños' />

                {/* Sección de los Botones de diseños*/}
                <div className='container-fluid'>
                    <div className='row'>
                        {/* botón de agregar diseño  */}
                        <div className='col-md-6 pb-md-0 pb-4 d-flex justify-content-around align-items-center'>
                            <BotonVerde
                                text={'Agregar diseño'}
                                modalToOpen={'#myModalAgregarDiseno'}
                            />

                            {/* modal de agregar diseño  */}
                            <AgregarDiseno />
                        </div>
                        <div className='col-md-6 d-flex justify-content-around align-items-center'>
                            <BotonVerde
                                text='Modificar precio'
                                modalToOpen='#myModalPrecio'
                            />

                            {/* modal de precio de los diseños  */}
                            <PrecioDiseno />
                        </div>
                    </div>
                </div>

                {/* Tabla para listar diseños */}
                <ListarDisenos />
            </div>
        </div>
    ) : (
        <Navigate to={'/administracion'} />
    );
};

export default Diseno;
