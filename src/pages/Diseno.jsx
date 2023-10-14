import { Navbar } from '../components/Navbar';
import { Link } from 'react-router-dom';
import disenoo from '../imgNavbar/1153861.png';
import logof from '../imgNavbar/light_switch off.svg';
import logon from '../imgNavbar/light_switch on.svg';
import '../css-general/cssgeneral.css'
import '../css-general/tailwind.min.css'
import '../css-general/inicio_style.css'
import '../css-general/table.min.css'


export const Diseno = () => {
    const contentStyle = {
        marginLeft: '260px', // Ancho del Navbar
    };

    return (
        <div>
            <Navbar />
            <div style={contentStyle}>

            <h1 className="titulo">Diseños</h1>
            <div class="container-fluid seccion2">
            <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#myModal1">Agregar
                diseño</button>

             {/* modal de agregar diseño  */}

            <div class="modal" id="myModal1">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header modal-head-agregar">
                            <h5 class="modal-title" id="exampleModalLabel1">Agregar diseño</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" id="xAgregar"
                                aria-label="Close"></button>
                        </div>
                        <div class="modal-body">

                             {/* formulario para agregar un Diseño */}
                            <form action="" id="formularioAgregarDiseño">
                                <div class="mb-3" name="divNombre">
                                    <label for="nombreGuardar" class="col-form-label">Nombre:</label>
                                    <input type="text" class="form-control"  id="NombreDiseno"
                                        placeholder="ingresar nombre" required/>
                                </div>
                                <div class="mb-3" name="divImagen">
                                    <label for="formFile" class="form-label">Subir imagen del diseño</label>
                                    <input class="form-control" name="imagenGuardar" type="file" id="formFile1"
                                        required/>
                                </div>

                                <div class="modal-footer">
                                    <button type="button" class="btn btn-danger" id="guardarCancelado"
                                        data-bs-dismiss="modal">Cancelar</button>
                                    <input type="submit" id="disenosA"class="btn btn-success" value="Guardar"/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

         

            <form class="d-flex">
                <input class="form-control me-2" type="search" placeholder="" aria-label="Search"/>
                <button class="btn btn-outline-success" type="submit">Buscar</button>
            </form>

             {/* botón para mostrar la lista de productos    */}
             <Link to={'/productos'}><button type="button" class="btn btn-secondary">Atrás</button></Link>
            {/* <a href="./productos.html"><button type="button" class="btn btn-secondary">Atrás</button></a> */}

            </div>
        <div class="seccion4">
            <button type="button" class="btn btn-success" data-bs-toggle="modal"
                data-bs-target="#myModalPrecio">Modificar precio</button>

             {/* modal de agregar diseño  */}

            <div class="modal" id="myModalPrecio">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header modal-head-agregar">
                            <h5 class="modal-title" id="exampleModalLabelPrecio">Modificar precio del diseño</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">

                             {/* formulario para agregar un cliente  */}
                            <form action="" id="formularioModificar">
                                <select id="select" class="form-select" aria-label="Default select example">
                                    <option value="">Seleccione un tamaño</option>
                                    <option value="1">Pequeño (0-10cm)</option>
                                    <option value="2">Mediano (11-25cm)</option>
                                    <option value="3">Grande (26-60cm)</option>
                                </select>
                                <div class="mb-3">
                                    <label for="precioGuardar" class="col-form-label">Precio:</label>
                                    <input type="text" class="form-control" id="precioGuardar"
                                        placeholder="ingresar precio por tamaño" required/>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-danger"
                                        data-bs-dismiss="modal">Cancelar</button>
                                    <input type="submit" id="ModificarDiseno" class="btn btn-success" value="Guardar"/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="tabla">
        <table class="table caption-top ">
            <caption>Lista de diseños</caption>
            <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Tamaños</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Ver imagen</th>
                    <th scope="col">Publicado</th>
                    <th scope="col">Inhabilitar</th>
                    <th scope="col">Editar</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">001</th>
                    <td>Vaca</td>
                    <td>Pequeño (0-10cm) - Mediano (11-25cm) - Grande (26-60)</td>
                    <td>P (2000) - M (4000) - G (6000)</td>
                    <td><button type="button" class="btn btn-secondary" data-bs-toggle="modal"
                            data-bs-target="#modalDetalles">Ver</button></td>
                    <td><img class="centrarIcono estado" src={logon} /></td>
                    <td><img class="centrarIcono estado" src={logon} /></td>
                    <td><button type="button" class="btn btn-info" data-bs-toggle="modal"
                            data-bs-target="#modalDiseño">Editar</button></td>
                </tr>
                <tr>
                    <th scope="row">002</th>
                    <td>Batman Logo</td>
                    <td>Pequeño (0-10cm) - Mediano (11-25cm) - Grande (26-60)</td>
                    <td>P (2000) - M (4000) - G (6000)</td>
                    <td><button type="button" class="btn btn-secondary" data-bs-toggle="modal"
                            data-bs-target="#modalDetalles">Ver</button></td>
                    <td><img class="centrarIcono estado" src={logon} /></td>
                    <td><img class="centrarIcono estado" src={logof}  /></td>
                    <td><button type="button" class="btn btn-info" data-bs-toggle="modal"
                            data-bs-target="#modalDiseño">Editar</button></td>
                </tr>
                <tr>
                    <th scope="row">003</th>
                    <td>Vaca</td>
                    <td>Pequeño (0-10cm) - Mediano (11-25cm) - Grande (26-60)</td>
                    <td>P (2000) - M (4000) - G (6000)</td>
                    <td><button type="button" class="btn btn-secondary" data-bs-toggle="modal"
                            data-bs-target="#modalDetalles">Ver</button></td>
                    <td><img class="centrarIcono estado" src={logon}  /></td>
                    <td><img class="centrarIcono estado" src={logon}  /></td>
                    <td><button type="button" class="btn btn-info" data-bs-toggle="modal"
                            data-bs-target="#modalDiseño">Editar</button></td>
                </tr>
            </tbody>
        </table>
    </div>
    {/* <!-- modal para editar diseño --> */}

    <div class="modal" id="modalDiseño">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header modal-head-editar">
                    <h5 class="modal-title" id="PublicarDiseño">Editar el diseño</h5>
                    <button type="button" class="btn-close" id="xAgregar" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body">

                    {/* <!-- formulario para editar un diseno --> */}
                    <form action="" id="formularioEditarDiseno">
                        <div class="mb-3" name="divNombre">
                            <label for="nombreDiseñoGuardar" class="col-form-label">Nombre:</label>
                            <input type="text" class="form-control" id="nombreEditar"
                                placeholder="Ingresar nombre"/>
                        </div>
                        <div class="mb-3" name="divImagen">
                            <label for="formFile" class="form-label">Subir imagen del diseño</label>
                            <input class="form-control" name="imagenEditar" type="file" id="archivoDiseño"/>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" id="editarCancelado"
                                data-bs-dismiss="modal">Cancelar</button>
                            <input type="submit" id="EditarDiseno" class="btn btn-success" value="Guardar"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    {/* <!-- ver detalle de productos --> */}

    <div class="modal" id="modalDetalles">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header modal-head-editar">
                    <h5 class="modal-title">Información del diseño</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="formulario">
                    <div class="modal-body">

                        <div class="container">

                            <div class="col">
                                <div class="row ">
                                    <p>Proveedor:</p>
                                    <p>Daniel</p>
                                </div>
                                <div class="row ">
                                    <p>Imagen Diseño:</p>
                                </div>
                                <div class="row">
                                    <div>
                                        <img src={disenoo} width="400px" height="250px" alt=""/>
                                    </div>
                                </div>
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

export default Diseno;