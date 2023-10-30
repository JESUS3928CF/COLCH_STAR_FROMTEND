import '../../css-general/cssgeneral.css'
import '../../css-general/tailwind.min.css'
import '../../css-general/inicio_style.css'
import '../../css-general/table.min.css'
import axios from 'axios'
import Swal from 'sweetalert2';
import CancelarModal from '../chared/CancelarModal';
import GuardarModal from '../chared/GuardarModal';
import AlertaError from '../chared/AlertaError';
import { validarEspaciosVacios } from '../../Validations/validations'
import { useForm } from 'react-hook-form';

const AgregarProducto = () => {






    return (
        <div>
            {/* modal agregar producto */}

            <div className="modal" id="myModal">
                <div className="modal-dialog modal-dialog-centered" style={{ width: 800, marginLeft: 450 }}>
                    <div className="modal-content" style={{ width: 800 }} >
                        <div className="modal-header modal-head-agregar" style={{ width: 800 }} >
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

                                        <label for="productoGuardar"
                                            className="col-form-label">Producto:
                                        </label>

                                        <input type="text" className="form-control"
                                            id="productoGuardarr"
                                            name="productoNombre"
                                            placeholder="..."
                                        />
                                    </div>

                                    <div className="mb-3" name="divCantidad">

                                        <label for="cantidadGuardar"
                                            className="col-form-label">Cantidad:
                                        </label>

                                        <input type="text" className="form-control"
                                            name="cantidad"
                                            id="cantidadGuardar"
                                            placeholder="..."
                                        />
                                    </div>

                                    <div className="mb-3" name="divPrecio">

                                        <label for="precioGuardar"
                                            className="col-form-label">Precio:
                                        </label>

                                        <input type="text"
                                            className="form-control"
                                            name="precio"
                                            id="precioGuardar"
                                            placeholder="..."
                                        />
                                    </div>

                                    <div className="mb-3" name="divTalla">

                                        <label for="tallaGuardar"
                                            className="col-form-label">Talla:
                                        </label>

                                        <input type="text" className="form-control"
                                            id="tallaGuardar"
                                            name="talla"
                                            placeholder="..."
                                        />
                                    </div>

                                    <div className="mb-3" name="divTela">

                                        <label for="telaGuardar"
                                            className="col-form-label">Tela:
                                        </label>

                                        <input type="text" className="form-control"
                                            id="telaGuardar"
                                            name="tela"
                                            placeholder="..."
                                        />
                                    </div>

                                    <div className="modal-footer">
                                        <button type="button" id="guardarCancelado"
                                            className="btn btn-danger"
                                            data-bs-dismiss="modal">Cancelar
                                        </button>
                                        <input type="submit" className="btn btn-success"
                                            value="Guardar" id="guardar" />
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

        </div>
    )
}

export default AgregarProducto
