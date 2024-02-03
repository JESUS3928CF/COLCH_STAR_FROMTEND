import {
  Button,
  Card,
  Flex,
  Grid,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Text,
  Title,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";

import {
  FaPhoneAlt,
  FaTshirt,
  FaTruck,
  FaArrowAltCircleRight,
  FaArrowAltCircleLeft,
} from "react-icons/fa";

import { BiBox } from "react-icons/bi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  ComposedChart,
  Area,
} from "recharts";

import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { MdOutlineMoneyOffCsred } from "react-icons/md";
import { PiShootingStarThin } from "react-icons/pi";
import { registrosPorPagina } from "../../constantes/constantes.js";
import { IoAccessibility } from "react-icons/io5";
import { AiFillCrown } from "react-icons/ai";
import Header from "../chared/header/Header";
import styleDashboard from "../Dashboard/Css/styleDashboard.css";
import useProveedor from "../../hooks/useProveedor";
import useClientes from "../../hooks/useCliente";
import usePrendas from "../../hooks/usePrendas";
import { useDisenosContext } from "../../context/disenosProvider";
import useProducto from "../../hooks/useProducto";
import { Link } from "react-router-dom";
import useMovimientos from "../../hooks/useMovimientos";
import { useEffect, useState } from "react";
import Paginador from "../chared/Paginador";
import useCompras from "../../hooks/useCompras.jsx";
import useOrden from "../../hooks/useOrden.jsx";

export const InicioDashboard = () => {
  const { proveedores } = useProveedor();
  const { clientes } = useClientes();
  const { Prendas } = usePrendas();
  const { disenosDB } = useDisenosContext();
  const { productos, detailsDiseno } = useProducto();
  const { movimiento } = useMovimientos();
  const { compras } = useCompras();
  const { ordenes, detailsOrden } = useOrden();
  const [movimientosFiltrar, setMovimientosFiltrar] = useState([]);

  const cantidadDeProveedores = proveedores.length;
  const cantidadDeClientes = clientes.length;
  const cantidadDePrendas = Prendas.length;
  const cantidadDeDisenos = disenosDB.length;
  const cantidadDeProductos = productos.length;
  const ClienteEstrella = ordenes.map((star) => star.fk_cliente);
  const ProductoEstrella = detailsOrden.map(
    (starProducts) => starProducts.fk_producto
  );
  const DisenoEstrella = detailsDiseno.map(
    (starDiseno) => starDiseno.fk_diseno
  );

  console.log(detailsDiseno);

  const cantidadDeCompras = compras.map(
    (comprasEnTotal) => comprasEnTotal.total_de_compra
  );
  let cantidad = 0;

  for (let i = 0; i < cantidadDeCompras.length; i++) {
    cantidad += cantidadDeCompras[i];
  }

  const cantidadTotalDeCompras = cantidad.toLocaleString();
  const totoalRecortado = parseFloat(cantidadTotalDeCompras).toFixed(0);

  const frecuenciaDeOrdenesEnLosClientes = {};
  let ClienteStar;
  let maxFrecuenciaCliente = 0;

  ClienteEstrella.forEach((repetidos) => {
    frecuenciaDeOrdenesEnLosClientes[repetidos] =
      (frecuenciaDeOrdenesEnLosClientes[repetidos] || 0) + 1;
  });

  for (const repetidos in frecuenciaDeOrdenesEnLosClientes) {
    if (frecuenciaDeOrdenesEnLosClientes[repetidos] > maxFrecuenciaCliente) {
      maxFrecuenciaCliente = frecuenciaDeOrdenesEnLosClientes[repetidos];
      ClienteStar = repetidos;
    }
  }

  const frecuenciaDeProductos = {};
  let ProductoStar;
  let maxFrecuenciaProducto = 0;

  ProductoEstrella.forEach((repetidos) => {
    frecuenciaDeProductos[repetidos] =
      (frecuenciaDeProductos[repetidos] || 0) + 1;
  });

  for (const repetidos in frecuenciaDeProductos) {
    if (frecuenciaDeProductos[repetidos] > maxFrecuenciaProducto) {
      maxFrecuenciaProducto = frecuenciaDeProductos[repetidos];
      ProductoStar = repetidos;
    }
  }

  const frecuenciaDeDiseno = {};
  let DisenoStar;
  let maxFrecuenciaDiseno = 0;

  DisenoEstrella.forEach((repetidos) => {
    frecuenciaDeDiseno[repetidos] = (frecuenciaDeDiseno[repetidos] || 0) + 1;
  });

  for (const repetidos in frecuenciaDeDiseno) {
    if (frecuenciaDeDiseno[repetidos] > maxFrecuenciaDiseno) {
      maxFrecuenciaDiseno = frecuenciaDeDiseno[repetidos];
      DisenoStar = repetidos;
    }
  }

  useEffect(() => {
    setMovimientosFiltrar(movimiento.slice(0, registrosPorPagina - 5));
  }, [movimiento]);

  const datosAgrupados = compras.reduce((resultado, compra) => {
    const fecha = compra.fecha;

    if (!resultado[fecha]) {
      resultado[fecha] = {
        Total_de_compras: 0,
        name: fecha,
      };
    }

    resultado[fecha].Total_de_compras += compra.total_de_compra;

    return resultado;
  }, {});

  const datosGrafica = Object.values(datosAgrupados);

  // const cities = [
  //   {
  //     name: "New York",
  //     sales: 9800,
  //   },
  //   {
  //     name: "London",
  //     sales: 4567,
  //   },
  //   {
  //     name: "Hong Kong",
  //     sales: 3908,
  //   },
  //   {
  //     name: "San Francisco",
  //     sales: 2400,
  //   },
  //   {
  //     name: "Singapore",
  //     sales: 1908,
  //   },
  //   {
  //     name: "Zurich",
  //     sales: 1398,
  //   },
  // ];

  return (
    <>
      <div className="contenedor">
        <div className="separador">
          <Header titulo="Dashboard" />
        </div>

        <div className="cards">
          <div id="carouselExampleIndicators" class="carousel slide">
            <div class="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="0"
                class="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
            <div class="carousel-inner">
              <div class="carousel-item active">
                <Card className="CardPrincipal">
                  <div className="textDatosGenerales">
                    <Title>Datos económicos</Title>
                  </div>

                  <Flex>
                    <Card className="two">
                      <Title className="textCompras">Total de compras</Title>
                      <MdOutlineMoneyOffCsred className="iconsE" />
                      <Text className="Cantidad">
                        {cantidad >= 1000000 ? (
                          <p>{totoalRecortado} Ml </p>
                        ) : (
                          <p>{totoalRecortado}MP</p>
                        )}
                      </Text>
                      <Button className="botonInfoC">
                        <Link to={"/administracion/proveedores"}>
                          <span className="textBoton">Más Info</span>
                          <FaArrowAltCircleRight className="btnIcons" />
                        </Link>
                      </Button>
                    </Card>

                    <Card className="two">
                      <Title className="textCompras">Total de ventas</Title>
                      <FaMoneyBillTrendUp className="iconsE" />

                      <Text className="Cantidad">{cantidadDeProductos}</Text>
                      <Button className="botonInfoC">
                        <Link to={"/administracion/productos"}>
                          <span className="textBoton">Más Info</span>
                          <FaArrowAltCircleRight className="btnIcons" />
                        </Link>
                      </Button>
                    </Card>
                  </Flex>
                </Card>
              </div>
              <div class="carousel-item">
                <Card className="CardPrincipal">
                  <div className="textDatosGenerales">
                    <Title>Datos generales</Title>
                  </div>

                  <Flex>
                    <Card className="two">
                      <Title className="textProveedor">
                        Total de proveedores
                      </Title>
                      <FaPhoneAlt className="icons" />
                      <Text className="Cantidad">{cantidadDeProveedores}</Text>
                      <Button className="botonInfo">
                        <Link to={"/administracion/proveedores"}>
                          <span className="textBoton">Más Info</span>
                          <FaArrowAltCircleRight className="btnIcons" />
                        </Link>
                      </Button>
                    </Card>

                    <Card className="two">
                      <Title className="textGeneral">Total de clientes</Title>
                      <IoAccessibility className="icons" />
                      <Text className="Cantidad">{cantidadDeClientes}</Text>
                      <Button className="botonInfo">
                        <Link to={"/administracion/clientes"}>
                          <span className="textBoton">Más Info</span>
                          <FaArrowAltCircleRight className="btnIcons" />
                        </Link>
                      </Button>
                    </Card>

                    <Card className="two">
                      <Title className="textGeneral">Total de prendas</Title>
                      <FaTshirt className="icons" />
                      <Text className="Cantidad">{cantidadDePrendas}</Text>

                      <Button className="botonInfo">
                        <Link to={"/administracion/prendas"}>
                          <span className="textBoton">Más Info</span>
                          <FaArrowAltCircleRight className="btnIcons" />
                        </Link>
                      </Button>
                    </Card>

                    <Card className="two">
                      <Title className="textGeneral">Total de diseños</Title>
                      <AiFillCrown className="icons" />
                      <Text className="Cantidad">{cantidadDeDisenos}</Text>
                      <Button className="botonInfo">
                        <Link to={"/administracion/disenos"}>
                          <span className="textBoton">Más Info</span>
                          <FaArrowAltCircleRight className="btnIcons" />
                        </Link>
                      </Button>
                    </Card>

                    <Card className="two">
                      <Title className="textGeneral">Total de productos</Title>
                      <FaTruck className="icons" />
                      <Text className="Cantidad">{cantidadDeProductos}</Text>
                      <Button className="botonInfo">
                        <Link to={"/administracion/productos"}>
                          <span className="textBoton">Más Info</span>
                          <FaArrowAltCircleRight className="btnIcons" />
                        </Link>
                      </Button>
                    </Card>
                  </Flex>
                </Card>
              </div>
              <div class="carousel-item">
                <Card className="CardPrincipal">
                  <div className="textDatosGenerales">
                    <Title>Más frecuente</Title>
                  </div>

                  <Flex>
                    <Card className="two">
                      <Title className="textGeneralMas">Cliente Star</Title>
                      <PiShootingStarThin className="star" />

                      {clientes.map((clienteElegido) => (
                        <Text className="NombreStar">
                          {clienteElegido.id_cliente == ClienteStar
                            ? clienteElegido.nombre
                            : ""}
                        </Text>
                      ))}

                      <Button className="botonInfoF">
                        <Link to={"/administracion/clientes"}>
                          <span className="textBoton">Más Info</span>
                          <FaArrowAltCircleRight className="btnIcons" />
                        </Link>
                      </Button>
                    </Card>

                    <Card className="two">
                      <Title className="textGeneralMas">Productos Star</Title>
                      <BiBox className="icons" />

                      {productos.map((productsElegido) => (
                        <Text className="NombreStar">
                          {productsElegido.id_producto == ProductoStar
                            ? productsElegido.nombre
                            : ""}
                        </Text>
                      ))}

                      <Button className="botonInfoF">
                        <Link to={"/administracion/clientes"}>
                          <span className="textBoton">Más Info</span>
                          <FaArrowAltCircleRight className="btnIcons" />
                        </Link>
                      </Button>
                    </Card>

                    <Card className="two">
                      <Title className="textGeneralMas">Diseños Star</Title>
                      <AiFillCrown className="icons" />

                      {disenosDB.map((disenoElegido) => (
                        <Text className="NombreStar">
                          {disenoElegido.id_diseno == DisenoStar
                            ? disenoElegido.nombre
                            : ""}
                        </Text>
                      ))}

                      <Button className="botonInfoF">
                        <Link to={"/administracion/disenos"}>
                          <span className="textBoton">Más Info</span>
                          <FaArrowAltCircleRight className="btnIcons" />
                        </Link>
                      </Button>
                    </Card>
                  </Flex>
                </Card>{" "}
              </div>
            </div>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
            >
              <span>
                {" "}
                <FaArrowAltCircleLeft className="iconsCarrusel" />
              </span>
            </button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
            >
              <span>
                <FaArrowAltCircleRight className="iconsCarruselD" />
              </span>
            </button>
          </div>
        </div>

        <div className="Fondo">
          <Card className="cardsNavBar">
            <TabGroup className="mt-4">
              <div>
                <Card className="CardPrincipalNavBar">
                  <div className="TabList">
                    <TabList>
                      <Tab className="Tabs">
                        <center>
                          <Text>Graficas</Text>
                        </center>
                      </Tab>
                      <Tab className="Tabs">
                        <Text className="TexNav">Movimientos</Text>
                      </Tab>
                    </TabList>
                  </div>
                </Card>

                <TabPanels>
                  <TabPanel>
                    <Grid numItems={2} numItemsLg={3} className="gap-6 mt-6" />

                    <Card className="containerHeaderGrafica  customChartContainer">
                    <BarChart className="grafica" width={600} height={300} data={datosGrafica}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar  dataKey="Total_de_compras" fill="#14131B" />
                      </BarChart>
                    </Card>
                  </TabPanel>

                  <TabPanel>
                    <Grid numItems={2} numItemsLg={3} className="gap-6 mt-6" />

                    <Card className="containerHeaderTable">
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableHeaderCell className="textH">
                              ID
                            </TableHeaderCell>
                            <TableHeaderCell className="textH">
                              Descripcion
                            </TableHeaderCell>
                            <TableHeaderCell className="textH">
                              Fecha
                            </TableHeaderCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {movimientosFiltrar.map((item) => (
                            <TableRow key={item.name}>
                              <TableCell className="textH">{item.ID}</TableCell>
                              <TableCell className="textH">
                                <Text>{item.descripcion}</Text>
                              </TableCell>
                              <TableCell className="textH">
                                <Text>{item.fecha}</Text>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      <div className="paginador">
                        <Paginador
                          setDatosFiltrar={setMovimientosFiltrar}
                          datos={movimiento}
                          registroPorPaginas={5}
                        />
                      </div>
                    </Card>

                    {/* <div className="tabla">
            <table className="table caption-top"> */}
                    {/* lista de prendas */}
                    {/* <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Descripcion</th>
                  <th scope="col">Fecha</th>
                </tr>
              </thead>
              <tbody> */}
                    {/* {Datos traidos por el set prendas que realiza un mapeo} */}

                    {/* {movimientoDb.map((Mover, index) => (
                  <tr key={index}>
                    <td>{Mover.ID}</td>
                    <td>{Mover.descripcion}</td>
                    <td>{Mover.fecha}</td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div> */}
                  </TabPanel>
                </TabPanels>
              </div>
            </TabGroup>
          </Card>
        </div>

        {/* <div className="cardD">
            <div className="title">

                <Card>
                <Text className="text"> Datos generales</Text>
                </Card>
           
            </div>
          <Flex>

          <Card
              className="max-w-xs mx-auto"
              decoration="top"
              decorationColor="blue"
            >
              <Text>Sales</Text>
              <Metric>$ 34,743</Metric>
            </Card>
            
            <Card
              className="max-w-xs mx-auto"
              decoration="top"
              decorationColor="red"
            >
              <Text>Sales</Text>
              <Metric>$ 34,743</Metric>
            </Card>
          </Flex>
        </div> */}
      </div>
    </>
  );
};

export default InicioDashboard;
