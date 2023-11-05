import '../../css-general/cssgeneral.css'
import '../../css-general/tailwind.min.css'
import '../../css-general/inicio_style.css'
import '../../css-general/table.min.css'
import style from '../../pages/Productos.module.css'

const AgregarProducto = () => {
  return (
    <div>
      <div className="modal" id="myModal">
                <div className="modal-dialog modal-dialog-centered"  >
                    <div className="modal-content" style={{ width: 680 }} >
                        <div className="modal-header modal-head-agregar" style={{ width: 680 }}>
                            <h5 className="modal-title" id="exampleModalLabel" >
                                Agregar producto
                            </h5>
                            <button type="button" id="xAgregar" className="btn-close" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                        <div className='formulario'>


                            {/* Formulario para agregar producto */}
                            <form action="" id="formularioAgregarProducto">

                                <div className={style.szs}>

                                    <div className="mb-3" >
                                        <label htmlFor="productoGuardar" className="col-form-label">Producto:</label>
                                        <input type="text" className="form-control" id="productoGuardar" name="productoGuardar" placeholder="Ingresar producto" />
                                    </div>

                                    <div className="mb-3" >
                                        <label htmlFor="cantidadGuardar" className="col-form-label">Cantidad:</label>
                                        <input type="text" className="form-control" name="cantidadGuardar" id="cantidadGuardar" placeholder="Ingresar cantidad" />
                                    </div>

                                    <div className="mb-3" >
                                        <label htmlFor="precioGuardar" className="col-form-label">Precio</label>
                                        <input type="text" className="form-control" name="precioGuardar" id="precioGuardar" placeholder="Ingresar precio" />
                                    </div>

                                </div>


                                <div  className={style.szss}>

                                    <div className='mb-3'>
                                        <p style={{ textAlign: 'center', fontWeight: 500 }}>Imagen del producto: </p>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="nombreCompraAgregar" className="col-form-label">Imagen:</label>
                                        <input type="file" className="form-control" id="imagen" placeholder="Ingresar nombre" />
                                    </div>
                                    <div className={style.aa}>
                                        <div className="mb-3" >
                                            <label htmlFor="Publicar" className="col-form-control">
                                                ¿Deseas publicarlo?
                                            </label>

                                            <select
                                                name="publicado"
                                                id=""
                                                className="form-control"
                                                title="Seleccione una opcion"
                                            >
                                                <option value="Seleccione una opción" >
                                                    Selecciona una opcion
                                                </option>
                                                <option value="true">Si</option>
                                                <option value="false">No</option>
                                            </select>

                                        </div>
                                    </div>
                                </div>



                                <div className="modal-footer">
                                    <button type="button" id="guardarCancelado" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                                    <input type="submit" className="btn btn-success" value="Guardar" id="guardar" />
                                </div>



                            </form>

                        </div>


                    </div>
                </div>

            </div>
      
    </div>
  )
}

export default AgregarProducto
