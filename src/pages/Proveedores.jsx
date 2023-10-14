import { Navbar } from '../components/Navbar';
import AgregarProveedor from '../components/proveedor/AgregarProveedor';
import ListarProveedores from '../components/proveedor/ListarProveedores';



const Proveedores = () => {

    

    return (
        <div>
            <Navbar />
           <ListarProveedores/>
           <AgregarProveedor/>
           

        </div>

    );
};


export default Proveedores;
