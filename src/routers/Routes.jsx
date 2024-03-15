import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Catalogo from '../pages/Catalogo';
import { Dashboard } from '../pages/Dashboard';
import Usuarios from '../pages/Usuarios';
import Roles from '../pages/Roles';
import Productos from '../pages/Productos';
import Clientes from '../pages/Clientes';
import Compras from '../pages/Compras';
import Proveedores from '../pages/Proveedores';
import Ordenes from '../pages/Ordenes';
import Login from '../pages/Login';
import Diseno from '../pages/Diseno';
import Prendas from '../pages/Prendas';
import MenuLateral from '../layout/Menu_lateral';
import { AuthProvider } from '../context/AuthProvider';
import { DisenosProvider } from '../context/DisenosProvider';
import { ColorsProvider } from '../context/ColorsProvider';
import { ClientesProvider } from '../context/ClientesProvider';
import { GeneralProvider } from '../context/GeneralProvider';
import { RolesProvider } from '../context/RolesProvider';
import { UsuariosProvider } from '../context/UsuariosProvider';
import { ProveedoresProvider } from '../context/ProveedoresProvider';
import { ProductosProvider } from '../context/ProductosProvider';
import RecuperarPassword from '../pages/ResuperarPassword';
import { PrendasProvider } from '../context/PrendasProvider';
import { ComprasProviders } from '../context/ComprasProvider';
import { OrdenesProvider } from '../context/OrdenesProvider';
import { MovimientosProvider } from '../context/MovimientosProvider';
import { DetalleCompraProvider } from '../context/DetallesComprasProvider';


const MyRoutes = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <GeneralProvider>
                <MovimientosProvider>
                    <DisenosProvider>
                        <ColorsProvider>
                            <PrendasProvider>
                                <ClientesProvider>
                                    <UsuariosProvider>
                                        <RolesProvider>
                                            <ProveedoresProvider>
                                                <ProductosProvider>
                                                    <ComprasProviders>
                                                        <DetalleCompraProvider>
                                                        <OrdenesProvider>

                                                            <Routes>
                                                                <Route
                                                                    path='/'
                                                                    element={
                                                                        <Catalogo />
                                                                    }
                                                                ></Route>
                                                                <Route
                                                                    path='/login'
                                                                    element={
                                                                        <Login />
                                                                    }
                                                                ></Route>

                                                                <Route
                                                                    path='/recuperar-password/:token'
                                                                    element={
                                                                        <RecuperarPassword />
                                                                    }
                                                                ></Route>

                                                                {/* Área para rutas privadas */}
                                                                <Route
                                                                    path='/administracion'
                                                                    element={
                                                                        <MenuLateral />
                                                                    }
                                                                >
                                                                    <Route
                                                                        index
                                                                        element={
                                                                            <Dashboard />
                                                                        }
                                                                    />
                                                                    <Route
                                                                        path='usuarios'
                                                                        element={
                                                                            <Usuarios />
                                                                        }
                                                                    ></Route>
                                                                    <Route
                                                                        path='roles'
                                                                        element={
                                                                            <Roles />
                                                                        }
                                                                    ></Route>
                                                                    <Route
                                                                        path='proveedores'
                                                                        element={
                                                                            <Proveedores />
                                                                        }
                                                                    ></Route>
                                                                    <Route
                                                                        path='productos'
                                                                        element={
                                                                            <Productos />
                                                                        }
                                                                    ></Route>

                                                                    <Route
                                                                        path='clientes'
                                                                        element={
                                                                            <Clientes />
                                                                        }
                                                                    ></Route>

                                                                    <Route
                                                                        path='compras'
                                                                        element={
                                                                            <Compras />
                                                                        }
                                                                    ></Route>
                                                                    <Route
                                                                        path='ordenes'
                                                                        element={
                                                                            <Ordenes />
                                                                        }
                                                                    ></Route>
                                                                    <Route
                                                                        path='disenos'
                                                                        element={
                                                                            <Diseno />
                                                                        }
                                                                    ></Route>
                                                                    <Route
                                                                        path='prendas'
                                                                        element={
                                                                            <Prendas />
                                                                        }
                                                                    ></Route>
                                                                </Route>
                                                            </Routes>

                                                        </OrdenesProvider>
                                                        </DetalleCompraProvider>
                                                    </ComprasProviders>
                                                </ProductosProvider>
                                            </ProveedoresProvider>
                                        </RolesProvider>
                                    </UsuariosProvider>
                                </ClientesProvider>
                            </PrendasProvider>
                        </ColorsProvider>
                    </DisenosProvider>
                    </MovimientosProvider>

                </GeneralProvider>
            </AuthProvider>
        </BrowserRouter>
    );
};

export default MyRoutes;
