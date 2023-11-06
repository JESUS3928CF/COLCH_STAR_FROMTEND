import AgregarUsuario from '../components/usuario/AgregarUsuario';
import ListarUsuario from '../components/usuario/ListarUsuario';


const Usuarios = () => {
    return (
        <div>
            <ListarUsuario/>
            <AgregarUsuario/>
            {/* <EditarUsuario/> */}
        </div>
    );
};

export default Usuarios;
