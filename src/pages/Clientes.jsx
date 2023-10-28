import { Navbar } from '../components/Navbar';
import AgregarCliente from '../components/cliente/AgregarCliente';
import ListarCliente from '../components/cliente/ListarCliente';
// import EditarCliente from '../components/cliente/EditarCliente';


const Clientes = () => {
    

    return (
        <div>
            <Navbar />
            <ListarCliente/>
            <AgregarCliente/>
            {/* <EditarCliente/> */}
            
        </div>
    );
};

export default Clientes;
