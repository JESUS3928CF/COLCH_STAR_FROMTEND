
import '../css-general/cssgeneral.css'
import '../css-general/tailwind.min.css'
import '../css-general/inicio_style.css'
import '../css-general/table.min.css'
import ListarProducto from '../components/producto/ListarProducto';
import AgregarProducto from '../components/producto/AgregarProducto';



const Productos = () => {

    return (
        <div>
            <ListarProducto />
            <AgregarProducto/>




            {/* Modal para eidtar el producto */}

            <div className="modal" id="modalEditar">
                <div className="modal-dialog modal-dialog-centered" style={{ width: 800, marginLeft: 450 }}>
                    <div className="modal-content" style={{ width: 800 }}>
                        <div className="modal-header modal-head-editar" style={{ width: 800 }}>
                            <h5 className="modal-title">Editar datos del producto</h5>
                            <button type="button" id="Editar" className="btn-close" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                        <div className="formulario">
                            <div className="modal-body">

                                {/* formulario para editar la tabla producto */}

                                <form action="" id="formularioEditarProducto">
                                    <div className="mb-3" name="divProducto">
                                        <label htmlFor="nombreEditar" className="col-form-label">Producto:</label>
                                        <input type="text" name="productoEditar" className="form-control" id="productoEditar"
                                            placeholder="Ingresar producto" />
                                    </div>

                                    <div className="mb-3" name="divCantidad">
                                        <label htmlFor="apellidoEditar" className="col-form-label">Cantidad:</label>
                                        <input type="text" name="cantidadEditar" className="form-control" id="cantidadEditar"
                                            placeholder="Ingresar cantidad" />
                                    </div>

                                    <div className="mb-3" name="divPrecio">
                                        <label htmlFor="precioEditar" className="col-form-label">Precio:</label>
                                        <input type="text" name="precioEditar" className="form-control" id="precioEditar"
                                            placeholder="Ingresar el Precio" />
                                    </div>

                                    <div className="mb-3" name="divTalla">
                                        <label htmlFor="tallaEditar" className="col-form-label">Talla:</label>
                                        <input type="text" name="tallaEditar" className="form-control" id="tallaEditar"
                                            placeholder="Ingresar la talla " />
                                    </div>

                                    <div className="mb-3" name="divTela">
                                        <label htmlFor="telaEditar" className="col-form-label">Tela:</label>
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
                                    <div className="form-label" style={{ textAlign: 'center' }} >
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
    );
};

export default Productos;
