import { Navbar } from '../components/Navbar';
import AgregarUsuario from '../components/usuario/AgregarUsuario';
import ListarUsuario from '../components/usuario/ListarUsuario';
import EditarUsuario from '../components/usuario/EditarUsuario';


const Usuarios = () => {
    return (
        <div>
            <Navbar />
            <ListarUsuario/>
            <AgregarUsuario/>
            <EditarUsuario/>
        </div>
    );
};

export default Usuarios;
