import { Navbar } from '../components/Navbar';
import AgregarProveedor from '../components/proveedor/AgregarProveedor';
import EditarProveedor from '../components/proveedor/EditarProveedor';
import ListarProveedores from '../components/proveedor/ListarProveedores';


const Proveedores = () => {

    

    return (
        <div>
            <Navbar />
           <ListarProveedores/>
           <AgregarProveedor/>
           <EditarProveedor/>
           

        </div>

    );
};


export default Proveedores;
