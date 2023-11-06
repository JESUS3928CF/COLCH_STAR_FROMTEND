import AgregarCliente from '../components/cliente/AgregarCliente';
import ListarCliente from '../components/cliente/ListarCliente';
// import EditarCliente from '../components/cliente/EditarCliente';


const Clientes = () => {
    

    return (
        <div>
            <ListarCliente/>
            <AgregarCliente/>
            {/* <EditarCliente/> */}
            
        </div>
    );
};

export default Clientes;
