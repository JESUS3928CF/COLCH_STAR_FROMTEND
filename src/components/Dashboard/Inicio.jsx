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
  DonutChart
} from "@tremor/react";

import {
  FaPhoneAlt,
  FaTshirt,
  FaTruck,
  FaArrowAltCircleRight,
} from "react-icons/fa";
import {
  registrosPorPagina,
} from "../../constantes/constantes.js";
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

export const InicioDashboard = () => {
  const { proveedores } = useProveedor();
  const { clientes } = useClientes();
  const { Prendas } = usePrendas();
  const { disenosDB } = useDisenosContext();
  const { productos } = useProducto();
  const { movimientoDb } = useMovimientos();
  const {compras}= useCompras()
  const [movimientosFiltrar, setMovimientosFiltrar] = useState([]);



  const cantidadDeProveedores = proveedores.length;
  const cantidadDeClientes = clientes.length;
  const cantidadDePrendas = Prendas.length;
  const cantidadDeDisenos = disenosDB.length;
  const cantidadDeProductos = productos.length;
  const  registropaginaDas =  registrosPorPagina-5


  useEffect(() => {
    setMovimientosFiltrar(movimientoDb.slice(0, 5, registrosPorPagina));
  }, [movimientoDb]);









  const cities = [
    {
      name: "New York",
      sales: 9800,
    },
    {
      name: "London",
      sales: 4567,
    },
    {
      name: "Hong Kong",
      sales: 3908,
    },
    {
      name: "San Francisco",
      sales: 2400,
    },
    {
      name: "Singapore",
      sales: 1908,
    },
    {
      name: "Zurich",
      sales: 1398,
    },
  ];

  return (
    <>
      <div className="contenedor">
        <div className="separador">
          <Header titulo="Dashboard" />
        </div>

        <div className="cards">
          <Card className="CardPrincipal">
            <div className="textDatosGenerales">
              <Title>Datos generales</Title>
            </div>

            <Flex>
              <Card className="two">
                <Title className="textProveedor">Total de proveedores</Title>
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



<div className="Fondo"> 


        <Card className="cardsNavBar"> 
        <TabGroup className="mt-4">
        <div >
          
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
              <Card>
                <div className="h-28">

                <Card className="GraficaOne">
      <Title>Ticket Monitoring</Title>
      <DonutChart data={cities}
      category="sales"
      

      
      />


      
    </Card>






                </div>
              </Card>
            </TabPanel>

            <TabPanel>
              <Grid numItems={2} numItemsLg={3} className="gap-6 mt-6" />

              <Card className="containerHeaderTable">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableHeaderCell className="textH">ID</TableHeaderCell>
                      <TableHeaderCell className="textH">Descripcion</TableHeaderCell>
                      <TableHeaderCell className="textH">Fecha</TableHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {movimientoDb.map((item) => (
                      
                      <TableRow key={item.name} >
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

<Paginador  setDatosFiltrar={setMovimientosFiltrar} datos={movimientoDb} />

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
