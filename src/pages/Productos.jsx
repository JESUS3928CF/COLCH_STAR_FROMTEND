import { Navbar } from '../components/Navbar';
import { Link } from 'react-router-dom';
import logof from '../imgNavbar/light_switch off.svg';
import logon from '../imgNavbar/light_switch on.svg';
import '../css-general/cssgeneral.css'
import '../css-general/tailwind.min.css'
import '../css-general/inicio_style.css'
import '../css-general/table.min.css'



const Productos = () => {
    const contentStyle = {
        marginLeft: '260px', // Ancho del Navbar
    }; 

    return (
        <div>
            <Navbar />
            <div style={contentStyle} className='contenedor'>
 
                {/* titulo */}

                <h1 class="titulo" >Productos</h1>

                {/* boton de agregar */}

                <div className="container-fluid seccion2">
                    <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#myModal" style={{marginLeft:20    }} >Agregar
                        producto</button>

                        {/* modal agregar producto */}

                    <div className="modal" id="myModal">
                        <div className="modal-dialog modal-dialog-centered" style={{width:800, marginLeft:450}}>
                            <div className="modal-content" style={{width: 800}} >
                                <div className="modal-header modal-head-agregar" style={{width: 800}} >
                                    <h5 className="modal-title" id="exampleModalLabel" >
                                        Agregar producto
                                    </h5>
                                    <button type="button" id="xAgregar" className="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div className="formulario">
                                    <div className="modal-body">

                                        {/* Formulario para agregar producto */}
                                        <form action="" id="formularioAgregarProducto">

                                            <div className="mb-3" name="divProducto">
                                                <label for="productoGuardar" className="col-form-label">Producto:</label>
                                                <input type="text" className="form-control" id="productoGuardarr"
                                                    name="productoGuardar" placeholder="Ingresar producto" required />
                                            </div>

                                            <div className="mb-3" name="divCantidad">
                                                <label for="cantidadGuardar" className="col-form-label">Cantidad:</label>
                                                <input type="text" className="form-control" name="cantidadGuardar"
                                                    id="cantidadGuardar" placeholder="Ingresar cantidad" />
                                            </div>

                                            <div className="mb-3" name="divPrecio">
                                                <label for="precioGuardar" className="col-form-label">Precio</label>
                                                <input type="text" className="form-control" name="precioGuardar" id="precioGuardar"
                                                    placeholder="Ingresar precio" />
                                            </div>

                                            <div className="mb-3" name="divTalla">
                                                <label for="tallaGuardar" className="col-form-label">Talla:</label>
                                                <input type="text" className="form-control" id="tallaGuardar" name="tallaGuardar"
                                                    placeholder="Ingresar Talla" required />
                                            </div>

                                            <div className="mb-3" name="divTela">
                                                <label for="telaGuardar" className="col-form-label">Tela:</label>
                                                <input type="text" className="form-control" id="telaGuardar" name="telaGuardar"
                                                    placeholder="Ingresar Tela" required />
                                            </div>

                                            <div className="modal-footer">
                                                <button type="button" id="guardarCancelado" className="btn btn-danger"
                                                    data-bs-dismiss="modal">Cancelar</button>
                                                <input type="submit" className="btn btn-success" value="Guardar" id="guardar" />
                                            </div>

                                        </form>
                                    </div>

                                    <div className="modal-body ">
                                        <form action="" id="Colores" name="Colores">
                                            <div className="form-label" >
                                                <p className="detalleCompra">Agregar datos de los productos </p>
                                            </div>
                                            <div className="subFormulario">

                                                <div className="mb-3">
                                                    <label for="nombreCompraAgregar" className="col-form-label">Imagen:</label>
                                                    <input type="file" className="form-control" id="imagen"
                                                        placeholder="Ingresar nombre" />
                                                </div>

                                            </div>
                                            <div className="bottonAgregarProducto">
                                                <div> <button type="button" className="btn btn-info">Agregar nueva imagen</button>
                                                </div>
                                            </div>
                                            <div className="subFormulario">

                                                <div className="mb-3">
                                                    <br />
                                                    <label for="">Seleccionar Colores: </label>
                                                    <br />

                                                    <div className="form-check form-switch">
                                                        <input className="form-check-input" type="checkbox" name="negroAgregar" />
                                                        <label className="form-check-label" for="NegroAgregar">Negro</label>
                                                    </div>

                                                    <div className="form-check form-switch">
                                                        <input className="form-check-input" type="checkbox" name="rojoAgregar"
                                                            checked />
                                                        <label className="form-check-label" for="rojoAgregar">Rojo</label>
                                                    </div>

                                                    <div className="form-check form-switch">
                                                        <input className="form-check-input" type="checkbox" name="azulAgregar"
                                                            checked />
                                                        <label className="form-check-label" for="azulAgregar">Azul</label>
                                                    </div>

                                                    <div className="form-check form-switch">
                                                        <input className="form-check-input" type="checkbox" name="verdeAgregar"
                                                            checked />
                                                        <label className="form-check-label" for="verdeAgregar">verde</label>
                                                    </div>

                                                    <div className="form-check form-switch">
                                                        <input className="form-check-input" type="checkbox" name="grisAgregar"
                                                            checked />
                                                        <label className="form-check-label" for="grisAgregar">gris</label>
                                                    </div>
                                                    <br />



                                                </div>
                                            </div>

                                        </form>


                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>

                        {/* Boton para Buscar/filtrar */}

                    <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Buscar</button>
                    </form>

                        {/* Boton para mostrar la lista de prendas */}

                    <a href="./prendas.html"><button type="button" className="btn btn-secondary" id="ee">Lista de
                        Prendas</button></a>

                        {/* Boton para mostrar la lista de  diseños */}

                       
                    <Link to={'/diseno'}><button type="button" className="btn btn-secondary">Lista de diseños</button></Link>
                    {/* <a href={Diseno}><button type="button" className="btn btn-secondary">Lista de diseños</button></a> */}



                </div>

                {/* tabla  para listar el producto */}

                <div className="tabla">
                    <table className="table caption-top ">
                        <caption>Lista de productos</caption>
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Producto</th>
                                <th scope="col">Cantidad</th>
                                <th scope="col">Precio</th>
                                <th scope="col">Ver Detalle</th>
                                <th scope="col">Inhabilitar</th>
                                <th scope="col">Editar</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">001</th>
                                <td>Camisas</td>
                                <td>2</td>
                                <td>25000</td>
                                <td><button type="button" className="btn btn-secondary" data-bs-toggle="modal"
                                    data-bs-target="#modalDetalles">Ver</button></td>
                                <td><img className="centrarIcono estado" src={logon} /></td>
                                <td><button type="button" className="btn btn-info" data-bs-toggle="modal"
                                    data-bs-target="#modalEditar">Editar</button></td>
                            </tr>
                            <tr>
                                <th scope="row">002</th>
                                <td>Buzos</td>
                                <td>10</td>
                                <td>20000</td>
                                <td><button type="button" className="btn btn-secondary" data-bs-toggle="modal"
                                    data-bs-target="#modalDetalles">Ver</button></td>
                                <td><img className="centrarIcono estado" src={logof} /></td>
                                <td><button type="button" className="btn btn-info" data-bs-target="#modalEditar">Editar</button></td>
                            </tr>
                            <tr>
                                <th scope="row">003</th>
                                <td>Sudaderas</td>
                                <td>7</td>
                                <td>35000</td>
                                <td><button type="button" className="btn btn-secondary" data-bs-toggle="modal"
                                    data-bs-target="#modalDetalles">Ver</button></td>
                                <td><img className="centrarIcono estado" src={logon} /></td>
                                <td><button type="button" className="btn btn-info" data-bs-toggle="modal"
                                    data-bs-target="#modalEditar">Editar</button></td>

                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Modal para eidtar el producto */}

                <div className="modal" id="modalEditar">
                    <div className="modal-dialog modal-dialog-centered"  style={{width :800, marginLeft:450 }}>
                        <div className="modal-content" style={{width :800 }}>
                            <div className="modal-header modal-head-editar" style={{width :800 }}>
                                <h5 className="modal-title">Editar datos del producto</h5>
                                <button type="button" id="Editar" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div className="formulario">
                                <div className="modal-body">

                                    {/* formulario para editar la tabla producto */}

                                    <form action="" id="formularioEditarProducto">
                                        <div className="mb-3" name="divProducto">
                                            <label for="nombreEditar" className="col-form-label">Producto:</label>
                                            <input type="text" name="productoEditar" className="form-control" id="productoEditar"
                                                placeholder="Ingresar producto" />
                                        </div>

                                        <div className="mb-3" name="divCantidad">
                                            <label for="apellidoEditar" className="col-form-label">Cantidad:</label>
                                            <input type="text" name="cantidadEditar" className="form-control" id="cantidadEditar"
                                                placeholder="Ingresar cantidad" />
                                        </div>

                                        <div className="mb-3" name="divPrecio">
                                            <label for="precioEditar" className="col-form-label">Precio:</label>
                                            <input type="text" name="precioEditar" className="form-control" id="precioEditar"
                                                placeholder="Ingresar el Precio" />
                                        </div>

                                        <div className="mb-3" name="divTalla">
                                            <label for="tallaEditar" className="col-form-label">Talla:</label>
                                            <input type="text" name="tallaEditar" className="form-control" id="tallaEditar"
                                                placeholder="Ingresar la talla " />
                                        </div>

                                        <div className="mb-3" name="divTela">
                                            <label for="telaEditar" className="col-form-label">Tela:</label>
                                            <input type="text" name="telaEditar" className="form-control" id="telaEditar"
                                                placeholder="Ingresar la tela" />
                                        </div>

                                        <div className="modal-footer">
                                            <button type="button" id="editarCancelado" className="btn btn-danger"
                                                data-bs-dismiss="modal">Cancelar</button>
                                            <input type="submit" className="btn btn-success" value="Guardar" />
                                        </div>

                                    </form>
                                </div>
                                <div className="modal-body ">
                                    <form action="" id="ColoresEditar">
                                        <div className="form-label" style={{textAlign:'center'}} >
                                            <p className="detalleCompra">Agregar datos de los productos </p>
                                        </div>
                                        <div className="subFormulario">

                                            <div className="mb-3">
                                                <label for="nombreCompraAgregar" className="col-form-label">Imagen:</label>
                                                <input type="file" className="form-control" id="nombreCompraEditar"
                                                    placeholder="Ingresar nombre" />
                                            </div>

                                        </div>

                                        <div className="bottonAgregarProducto">
                                            <div> <button type="button" className="btn btn-info">Agregar nueva imagen</button> </div>
                                        </div>

                                        <div className="subFormulario">

                                            <div className="mb-3">
                                                <br />
                                                <label for="">Seleccionar Color: </label>
                                                <br />
                                                <div className="form-check form-switch">
                                                    <input className="form-check-input" type="checkbox" id="negroEditar" />
                                                    <label className="form-check-label" for="NegroAgregar">Negro</label>
                                                </div>
                                                <div className="form-check form-switch">
                                                    <input className="form-check-input" type="checkbox" id="rojoEditar" checked />
                                                    <label className="form-check-label" for="rojoAgregar">Rojo</label>
                                                </div>
                                                <div className="form-check form-switch">
                                                    <input className="form-check-input" type="checkbox" id="azulEditar" checked />
                                                    <label className="form-check-label" for="azulAgregar">Azul</label>
                                                </div>
                                                <div className="form-check form-switch">
                                                    <input className="form-check-input" type="checkbox" id="verdeEditar" checked />
                                                    <label className="form-check-label" for="verdeAgregar">verde</label>
                                                </div>
                                                <div className="form-check form-switch">
                                                    <input className="form-check-input" type="checkbox" id="grisEditar" checked />
                                                    <label className="form-check-label" for="grisAgregar">gris</label>
                                                </div>


                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>


                {/* ver detalles modal */}
                
                <div className="modal" id="modalDetalles">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header modal-head-editar">
                                <h5 className="modal-title">Información del producto</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="formulario">
                                <div className="modal-body">

                                    <div className="container">
                                        <div className="col">
                                            <div className="row">
                                                <p> Precio de Compra </p>
                                            </div>
                                            <div className="row">
                                                <ul>
                                                    <li>Tela:<ul>
                                                        <li>Tela fria </li>
                                                    </ul>
                                                    </li>
                                                    <li>Talla:<ul>
                                                        <li>S</li>

                                                    </ul>
                                                    </li>

                                                </ul>
                                            </div>
                                        </div>


                                        <div className="col">
                                            <div className="row ">
                                                <p>Imagen:</p>
                                            </div>
                                            <div className="row">
                                                <div>
                                                    <img src="/imagenes/1153861.png" width="200px" alt="" />
                                                </div>
                                            </div>
                                        </div>
                                        <br />
                                        <div className="col">
                                            <ul>
                                                <li>Color:<ul>
                                                    <li>
                                                        <div className="row">
                                                            <div className="col">
                                                                <div> Negro: <div>
                                                                </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                                </li>
                                            </ul>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>






            </div>
        </div>
    );
};

export default Productos;
