import '../../css-general/cssgeneral.css'
import '../../css-general/tailwind.min.css'
import '../../css-general/inicio_style.css'
import '../../css-general/table.min.css'
import CancelarModal from '../chared/CancelarModal';
import GuardarModal from '../chared/GuardarModal';
import HeaderModals from '../chared/HeaderModals';
import style from '../../pages/Productos.module.css'

const AgregarProducto = () => {
  return (
    <div>
         {/* modal agregar producto */}
         <div className='modal' id='myModal' >
                <div className="modal-dialog modal-dialog-centered modal-lg ">
                    <div className="modal-content">

                        <HeaderModals title={'Agregar Producto'} />

                        <div className="modal-body">

                            <form className="row g-3 needs-validation" >

                                <div className="col-md-6">

                                    <label htmlFor="productoGuardar" className="col-form-label">Producto:</label>
                                    <input type="text" className="form-control" id="productoGuardar" name="productoGuardar" placeholder="Ingresar producto" />

                                </div>

                                <div className="col-md-6 ms-auto">

                                    <label htmlFor="cantidadGuardar" className="col-form-label">Cantidad:</label>
                                    <input type="text" className="form-control" name="cantidadGuardar" id="cantidadGuardar" placeholder="Ingresar cantidad" />

                                </div>

                                <div className="col-md-6 mt-2" name="precio">

                                    <label htmlFor="precioGuardar" className="col-form-label">Precio: </label>
                                    <input type="text" className="form-control" name="precioGuardar" id="precioGuardar" placeholder="Ingresar precio" />

                                </div>



                                <div className="col-md-6" name="Publicado">
                                    <label htmlFor="Publicar" className="col-form-control">
                                        ¿Deseas publicarlo?
                                    </label>

                                    <select
                                        name="publicado"
                                        id=""
                                        className="form-control"
                                        title="Seleccione una opcion"
                                    >

                                        <option value="Seleccione una opcion" >
                                            Selecciona una opcion
                                        </option>
                                        <option value="true">Si</option>
                                        <option value="false">No</option>
                                    </select>
                                </div>

                                <div className="mb-2" name="Archivo">

                                    <div className='mb-3'>
                                        <p style={{ textAlign: 'center', fontWeight: 500 }}>Imagen del producto: </p>
                                    </div>

                                    <label htmlFor="Archivo" className="col-from-label">
                                        Imagen de la prenda:
                                    </label>
                                    <input
                                        type="file"
                                        className={style.customer}
                                        name="imagen"
                                        placeholder="PNG o JPG"
                                        title="Ingrese la imagen de la prenda"

                                    />

                                </div>



                                <div className="modal-footer">

                                    <CancelarModal modalToCancel="myModal" />
                                    <GuardarModal />
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
