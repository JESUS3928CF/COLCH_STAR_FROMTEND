import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Catalogo from '../pages/Catalogo';
import { Dashboard } from '../pages/Dashboard';
import Usuarios from '../pages/Usuarios';
import Roles from '../pages/Roles';
import Productos from '../pages/Productos';
import Clientes from '../pages/Clientes';
import Compras from '../pages/Compras';
import Proveedores from '../pages/Proveedores';
import Ventas from '../pages/Ventas';
import Login from '../pages/Login';



const MyRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Catalogo />}></Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/dashboard' element={<Dashboard />}></Route>
                <Route path='/usuarios' element={<Usuarios />}></Route>
                <Route path='/roles' element={<Roles />}></Route>
                <Route path='/proveedores' element={<Proveedores />}></Route>
                <Route path='/productos' element={<Productos />}></Route>
                <Route path='/clientes' element={<Clientes />}></Route>
                <Route path='/compras' element={<Compras />}></Route>
                <Route path='/ventas' element={<Ventas />}></Route>
            </Routes>
        </BrowserRouter>
    );
};

export default MyRoutes;
