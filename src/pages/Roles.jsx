import { Navbar } from '../components/Navbar';
import AgregarRol from '../components/roles/AgregarRol';
import ListarRol from '../components/roles/ListarRol';
// import EditarRol from '../components/roles/EditarRol';

const Roles = () => {
    return (

        <div>
        <Navbar />
        <ListarRol/>
        <AgregarRol/>
        {/* <EditarRol/>  */}
    </div>
        );
    };
    
export default Roles;
    