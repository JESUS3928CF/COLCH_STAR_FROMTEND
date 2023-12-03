import '../../css-general/cssgeneral.css';
import '../../css-general/tailwind.min.css';
import '../../css-general/inicio_style.css';
import '../../css-general/table.min.css';
import style from '../../pages/Clientes.module.css';
import Header from '../chared/header/Header';
import Buscador from '../chared/Buscador';
import Paginador from '../chared/Paginador';
import BotonNegro from '../chared/BotonNegro';
import BotonCambioEstado from '../chared/BotonCambioEstado';
import { useEffect, useState } from 'react';
import { registrosPorPagina } from '../../constantes/constantes';
import useCompras from '../../hooks/useCompras';
import { DetalleCompras } from './DetallesCompras';
// import { calcularAnchoDePantalla } from '../../helpers/calcularAnchoDePantalla';

const ListarCompra = () => {
    const { compras } = useCompras();

    /// Estado de la barra de busqueda y para lastar en la tabla la información
    const [comprasFiltrar, setComprasFiltrar] = useState([]);

    const [detallesCompra, setDetallesCompra] = useState({});

    /// Filtrar los 10 primeras ventas a mostrar en la vista
    useEffect(() => {
        setComprasFiltrar(
            compras.slice(0, registrosPorPagina, registrosPorPagina)
        );
        console.log(comprasFiltrar);
    }, [compras]);

    // const [anchoPantalla, setAnchoPantalla] = useState(window.innerWidth);

    // useEffect(() => {
    //     /// Calcular el ancho de pantalla actual
    //     calcularAnchoDePantalla(setAnchoPantalla);
    // }, []);

    return (
        <>
            <div>
                <div>
                    <Header titulo='Gestión de Compras' />

                    {/* botón agregar */}
                    <div className='container-fluid'>
                        <div className='row'>
                            <div
                                className={`${style.ap} col-md-6 col-ms-6 pb-md-0 pb-4 d-flex justify-content-center align-items-center`}
                            >
                                <button
                                    type='button'
                                    className='btn-a'
                                    data-bs-toggle='modal'
                                    data-bs-target='#myModalAgregarComprar'
                                >
                                    Agregar Compra
                                </button>
                            </div>

                            {/* Boton para Buscar/filtrar */}
                            <div
                                className={`${style.buscador} col-md-6 col-ms-6 pb-md-0 pb-4 d-flex justify-content-center align-items-center`}
                            >
                                {/* Esta función requiere el set de los datos a filtrar, los datos de respaldo, y los campos por los cuales se permite filtrar*/}
                                <Buscador
                                    setDatosFiltrar={setComprasFiltrar}
                                    datos={compras}
                                    camposFiltrar={[
                                        'total_de_compra',
                                        'fecha',
                                        'proveedor',
                                        'prenda',
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='tabla'>
                        <table className='table caption-top '>
                            <thead>
                                <tr>
                                    <th scope='col'>ID</th>
                                    <th scope='col'>Proveedor</th>
                                    <th scope='col'>Total compra</th>
                                    <th scope='col'>Fecha de compra</th>
                                    <th scope='col'>Estado</th>
                                    <th scope='col'>Detalles</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comprasFiltrar.map((compra) => (
                                    <tr key={compra.id_compra}>
                                        <td>{compra.id_compra}</td>
                                        <td>
                                            {compra.proveedor
                                                ? compra.proveedor.nombre
                                                : 'N/A'}
                                        </td>
                                        <td>{compra.total_de_compra}</td>
                                        <td>{compra.fecha}</td>
                                        <td>
                                            <BotonCambioEstado
                                                id={compra.id_compra}
                                                isChecked={compra.estado}
                                                nombreRegistro={'compra'}
                                                ruta={`/compra/estado/${compra.id_compra}`}
                                            />
                                        </td>
                                        <td>
                                            <BotonNegro
                                                text='Ver'
                                                modalToOpen={
                                                    '#modalDetalleCompra'
                                                }
                                                onClick={() => {
                                                    setDetallesCompra(compra);
                                                }}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className='seccion4'>
                    {/* Esta función requiere el set de los datos a filtrar, los datos de respaldo, y los campos por los cuales se permite filtrar*/}
                    <Paginador
                        setDatosFiltrar={setComprasFiltrar}
                        datos={compras}
                    />
                </div>
            </div>
            <DetalleCompras detallesCompras={detallesCompra} />
        </>
    );
};

export default ListarCompra;
