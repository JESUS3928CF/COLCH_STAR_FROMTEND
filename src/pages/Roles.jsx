import { Navbar } from '../components/Navbar';
import logof from '../../public/imgNavbar/light_switch off.svg';
import logon from '../../public/imgNavbar/light_switch on.svg';
import logadm from '../../public/imgNavbar/crossing_out.svg';

const Roles = () => {
    const contentStyle = {
        marginLeft: '260px', // Ancho del Navbar
    };

    return (
        <div>
            <Navbar />
            <div style={contentStyle} className='contenedor'>

                {/* titulo */}

                <h1 className="titulo">Roles</h1>

                {/* boton de agregar */}

                <div className="container-fluid seccion2" style={{marginLeft:-120 } }>
                    <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#myModal">Agregar
                        Rol</button>

                        {/* modal agregar usuario */}

                    <div className="modal" id="myModal">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header modal-head-agregar">
                                    <h5 className="modal-title" id="exampleModalLabel" >
                                        Agregar Rol
                                    </h5>
                                    <button type="button" id="xAgregar" className="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div className="formulario">
                                    <div className="modal-body">

                                    {/* <!-- formulario para agregar un usuario --> */}
                            <form action="" id="formularioagregartol">
                                <div class="mb-3" name="divNombre">
                                    <label for="nombreGuardar" class="col-form-label">Nombre del Rol:</label>
                                    <input type="text" class="form-control" id="nombreGuardarr" name="nombreGuardar"
                                        placeholder="Ingresar nombre del rol"/>
                                </div>
                                <div class="row">
                                        <div class="col form-check form-check-inline">
                                            <input class="form-check-input" name="check" type="checkbox" id="check" value="vista"/>
                                            <label class="form-check-label" for="inlineCheckbox1">Vista</label>
                                          </div>
                                          <div class="col form-check form-check-inline">
                                            <input class="form-check-input" type="checkbox" name="checkDos" id="inlineCheckbox2" value="editar"/>
                                            <label class="form-check-label" for="inlineCheckbox2">Editar</label>
                                          </div>
                                          <div class="col form-check form-check-inline">
                                            <input class="form-check-input" type="checkbox" id="inlineCheckbox3" name="checkTres" value="agregar"/>
                                            <label class="form-check-label" for="inlineCheckbox3">Agregar</label>
                                          </div>
                                          <div class="col form-check form-check-inline">
                                            <input class="form-check-input" type="checkbox" id="inlineCheckbox4" name="checkCuatro" value="eliminar"/>
                                            <label class="form-check-label" for="inlineCheckbox4">Eliminar</label>
                                          </div>
                                          <br/>
                                  
                                          <br/>
                                    </div>
                                    <label for="">Seleccionar permisos: </label>
                                <br/>
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" id="proveedoresAgregar" name="seleccion"/>
                                    <label class="form-check-label" for="proveedoresAgregar">Proveedores</label>
                                </div>
                                
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" name="seleccionDos" id="productosAgregar" checked/>
                                    <label class="form-check-label" for="productosAgregar">Productos</label>
                                </div>
                                
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" name="seleccionTres" id="clientesAgregar" checked/>
                                    <label class="form-check-label" for="clientesAgregar">Clientes</label>
                                </div>
                                
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" id="comprasAgregar" name="seleccionCuatro" checked/>
                                    <label class="form-check-label" for="comprasAgregar">Compras</label>
                                </div>
                                
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" name="seleccionCinco" id="ventasAgregar" checked/>
                                    <label class="form-check-label" for="ventasAgregar">Ventas</label>
                                </div>
                                
                                <div class="modal-footer">
                                    <button type="button" id="guardarCancelado" class="btn btn-danger"
                                        data-bs-dismiss="modal">Cancelar</button>
                                    <input type="submit" class="btn btn-success" value="Guardar"/>
                                </div>
                            </form>
                        </div>


                </div>
        </div>

</div>
</div>

            {/* Boton para Buscar/filtrar */}

            <form class="d-flex">
                <input class="form-control me-2" type="search" placeholder="" aria-label="Search"/>
                <button class="btn btn-outline-success" type="submit">Buscar</button>
            </form>

                </div>

                {/* tabla  para listar el producto */}

                <div className="tabla">
                    <table className="table caption-top ">
                        <caption>Lista de roles</caption>
                        <thead>
                            <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Roles</th>
                            <th scope="col">Fecha de creación</th>
                            <th scope="col">Permisos</th>
                            <th scope="col">Permisos especificos</th>
                            <th scope="col">Estado</th>
                            <th scope="col">Editar</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <th scope="row">1</th>
                                <td>Administrador</td>
                                <td>10/05/2023</td>
                                <td>Usuarios Roles-Proveedores-Productos-Clientes-Compras-Ventas-Catalogo</td>
                                <td><button type="button" class="btn btn-secondary" data-bs-toggle="modal"
                                    data-bs-target="#modalPermisos">Ver</button></td>
                                <td><img class="centrarIcono estado" src={logadm} /></td>
                                <td><img width="35px" src={logadm} /></td>
                            </tr>
                            <tr>
                            <th scope="row">2</th>
                                    <td>Empleado</td>
                                    <td>10/05/2023</td>
                                    <td>Proveedores Productos-Clientes-Compras-Ventas-Catalogo</td>
                                    <td><button type="button" class="btn btn-secondary" data-bs-toggle="modal"
                                    data-bs-target="#modalPermisos">Ver</button></td>
                                     <td><img class="centrarIcono estado" src={logon} /></td>
                                    <td><button type="button" class="btn btn-info" data-bs-toggle="modal"
                                    data-bs-target="#modalEditar">Editar</button></td>
                            </tr>
                            <tr>
                            <th scope="row">3</th>
                                <td>Vendedor</td>
                                <td>10/05/2023</td>
                                <td>Ventas - Compras</td>
                                <td><button type="button" class="btn btn-secondary" data-bs-toggle="modal"
                                    data-bs-target="#modalPermisos">Ver</button></td>
                                <td><img class="centrarIcono estado" src={logof} /></td>
                                <td><button type="button" class="btn btn-info" data-bs-toggle="modal"
                                        data-bs-target="#modalEditar">Editar</button></td>

                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* <!-- modal de editar cliente --> */}
                {/* <!--! modal de editar cliente --> */}
    <div class="modal" id="modalEditar">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header modal-head-editar">
                    <h5 class="modal-title">Editar permisos del rol</h5>
                    <button type="button" id="xEditar" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                
                    {/* <!--! formulario para editar los datos de un rol --> */}
                    <form action="" id="formularioeditarrol">
                        <div class="mb-3" name="divNombre">
                            <label for="nombreRolGuardarr" class="col-form-label">Nombre del rol:</label>
                            <input type="text" class="form-control" id="nombreRolGuardarr" name="nombreGuardar"
                                placeholder="Ingresar nombre del rol"/>
                        </div>
                        <div class="container">
                            <div class="row">
                                <p class="text-center">Permisos específicos de proveedor</p>
                            </div>
                            <div class="row">
                                <div class="col form-check form-check-inline">
                                    <input class="form-check-input" type="checkbox" name="checkEditar" id="vista" value="vista"/>
                                    <label class="form-check-label" for="inlineCheckbox1">Vista</label>
                                  </div>
                                  <div class="col form-check form-check-inline">
                                    <input class="form-check-input" type="checkbox" name="checkEditarDos" id="editar" value="editar"/>
                                    <label class="form-check-label" for="inlineCheckbox2">Editar</label>
                                  </div>
                                  <div class="col form-check form-check-inline">
                                    <input class="form-check-input" type="checkbox" name="checkEditarTres" id="agregar" value="agregar"/>
                                    <label class="form-check-label" for="inlineCheckbox3">Agregar</label>
                                  </div>
                                  <div class="col form-check form-check-inline">
                                    <input class="form-check-input" type="checkbox" name="checkEditarCuatro" id="eliminar" value="eliminar"/>
                                    <label class="form-check-label" for="inlineCheckbox4">Eliminar</label>
                                  </div>
                            </div>
                            <br/>
                        <label for="">Seleccionar permisos:</label>
                        <br/>
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" name="seleccionEditar" id="proveedoresEditar"/>
                            <label class="form-check-label" for="proveedoresAgregar">Proveedores</label>
                        </div>
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" name="seleccionEditarDos" id="productosEditar" checked/>
                            <label class="form-check-label" for="productosAgregar">Productos</label>
                        </div>
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" name="seleccionEditarTres" id="clientesEditar" checked/>
                            <label class="form-check-label" for="clientesAgregar">Clientes</label>
                        </div>
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" name="seleccionEditarCuatro" id="comprasEditar" checked/>
                            <label class="form-check-label" for="comprasAgregar">Compras</label>
                        </div>
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" id="ventasEditar" name="seleccionEditarCinco" checked/>
                            <label class="form-check-label" for="ventasAgregar">Ventas</label>
                        </div>
                        <div class="modal-footer">
                            <button type="button" id="editarCancelado" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                            <input type="submit" class="btn btn-success" value="Guardar"/>
                        </div>
                        </div>
                    </form> 
                </div>

            </div>
        </div>
    </div>
    {/* <!--! modal para ver los permisos especificos --> */}
    <div class="modal" id="modalPermisos">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header modal-head-info">
                    <h5 class="modal-title">Permisos del rol</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    
                    {/* <!--! formulario para los datos de un rol --> */}
                    <div class="mb-3" name="divpermisoEspecificos">
                        <label for="rolEditar" class="col-form-label"></label>
                        <select class="form-control" name="permisosEspecificos">
                            <option value="">Seleccione un modulo:</option>
                            <option value="Proveedores">Proveedores</option>
                            <option value="Productos">Productos</option>
                            <option value="Clientes">Clientes</option>
                            <option value="Compras">Compras</option>
                            <option value="Ventas">Ventas</option>
                          </select>
                    </div>


                    <form action="">
                        <div class="container">
                            <div class="row">
                                <p class="text-center">Permisos específicos de proveedor</p>
                            </div>
                            <div class="row">
                                <div class="col form-check form-check-inline">
                                    <input class="form-check-input" type="checkbox" id="vistaVer" value="vista"/>
                                    <label class="form-check-label" for="inlineCheckbox1">Vista</label>
                                  </div>
                                  <div class="col form-check form-check-inline">
                                    <input class="form-check-input" type="checkbox" id="editarVer" value="editar"/>
                                    <label class="form-check-label" for="inlineCheckbox2">Editar</label>
                                  </div>
                                  <div class="col form-check form-check-inline">
                                    <input class="form-check-input" type="checkbox" id="agregarVer" value="agregar"/>
                                    <label class="form-check-label" for="inlineCheckbox3">Agregar</label>
                                  </div>
                                  <div class="col form-check form-check-inline">
                                    <input class="form-check-input" type="checkbox" id="eliminarVer" value="eliminar"/>
                                    <label class="form-check-label" for="inlineCheckbox4">Eliminar</label>
                                  </div>
                            </div>
                            
                        </div>
                        
                        <div class="modal-footer">
                            <button type="button" id="editarSalir" class="btn btn-info" data-bs-dismiss="modal">Salir</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    </div>
            </div>
        </div>
    );
};

export default Roles;
