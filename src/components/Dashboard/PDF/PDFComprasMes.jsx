import { useEffect, useState } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { parseISO, getMonth, getYear } from "date-fns";
import logo from "../PDF/LogoPNGModificado.png";
import clienteAxios from "../../../config/axios";
import Swal from "sweetalert2";

const PDFComprasMes = () => {
  const [resumenCompras, setResumenCompras] = useState([]);
  const [resumenOrdenes, setResumenOrdenes] = useState([]);
  const [monthIndex, setMonthIndex] = useState(0);
  const [monthName, setMonthName] = useState("");

  const nombreDelMes = {
    0: "Enero",
    1: "Febrero",
    2: "Marzo",
    3: "Abril",
    4: "Mayo",
    5: "Junio",
    6: "Julio",
    7: "Agosto",
    8: "Septiembre",
    9: "Octubre",
    10: "Noviembre",
    11: "Diciembre",
  };

  const token = localStorage.getItem("token");

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await clienteAxios.get("/compras", config);

        const year = getYear(new Date());
        const mesActual = getMonth(new Date());
        // Filtrar compras para el mes y año proporcionados
        const comprasMes = data.filter((compra) => {
          const fecha = parseISO(compra.fecha);
          setMonthIndex(mesActual);
          return (
            getMonth(fecha) === monthIndex &&
            getYear(fecha) === year &&
            compra.estado === true
          );
        });

        const nombrePDF = nombreDelMes[mesActual];
        setMonthName(nombrePDF);

        // Agrupar las compras por fecha y sumar los totales
        const resumen = {};
        comprasMes.forEach((compra) => {
          const fecha = compra.fecha;
          if (resumen[fecha]) {
            resumen[fecha].total_de_compra += compra.total_de_compra;
          } else {
            resumen[fecha] = {
              fecha: fecha,
              total_de_compra: compra.total_de_compra,
            };
          }
        });

        setResumenCompras(Object.values(resumen));
      } catch (error) {
        Swal.fire({
            title: `${error}`,
            icon: 'error',
        });
      }
    };

    fetchData();
  }, [monthIndex, monthName]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await clienteAxios.get("/ordenes", config);

        const year = getYear(new Date());
        const mesActual = getMonth(new Date());
        const OrdenesMes = data.filter((orden) => {
          const fecha = parseISO(orden.fecha_creacion);
          setMonthIndex(mesActual);
          return (
            getMonth(fecha) === monthIndex &&
            getYear(fecha) === year &&
            orden.estado_de_orden === "Entregada"
          );
        });

        const nombrePDF = nombreDelMes[mesActual];
        setMonthName(nombrePDF);

        // Agrupar las compras por fecha y sumar los totales
        const resumen = {};
        OrdenesMes.forEach((orden) => {
          const fecha = orden.fecha_creacion;
          if (resumen[fecha]) {
            resumen[fecha].precio_total += orden.precio_total;
          } else {
            resumen[fecha] = {
              fecha: fecha,
              precio_total: orden.precio_total,
            };
          }
        });

        setResumenOrdenes(Object.values(resumen));
      } catch (error) {
        Swal.fire({
            title: `${error}`,
            icon: 'error',
        });
      }
    };

    fetchData();
  }, [monthIndex, monthName]);

  const totalCompra = resumenCompras.reduce(
    (total, compra) => total + compra.total_de_compra,
    0
  );
  const totalOrdenes = resumenOrdenes.reduce(
    (total, orden) => total + orden.precio_total,
    0
  );

  const styles = StyleSheet.create({
    fecha: {
      fontSize: 14,
      position: "relative",
      left: 130,
      top: "25px",
      height: "35px",
    },
    TotalDeCompra: {
      fontSize: 14,
      position: "relative",
      left: "265px",
      top: "-10px",
      height: "35px",
    },
    section: {
      padding: 50,
      marginLeft: 125,
    },
    titulo: {
      fontWeight: "bold",
      fontSize: 17,
      left: 20,
    },
    border: {
      fontSize: 15,
      width: "85%",
      marginLeft: 95,
      position: "absolute",
      left: 45,
    },
    borderD: {
      fontSize: 15,
      position: "absolute",
      left: "365px",
      top: "-1px",
    },
    borde: {
      borderBottomWidth: 1,
      borderBottomColor: "#47684E",
      width: "65%",
      position: "absolute",
      top: "20px",
      left: "115px",
    },
    logos: {
      position: "absolute",
      top: "10px",
      opacity: 0.3,
      width: "50%",
    },
    total: {
      fontSize: 14,
      position: "relative",
      left: "25px",
      top: "60x",
      height: "35px",
    },
  });

  return (
    <Document>
      <Page>
        <Image src={logo} style={styles.logos} />
        <View style={styles.section}>
          <Text style={styles.titulo}>Compras Del Mes De {monthName}</Text>
        </View>
        <View>
          <Text style={styles.border}>Fecha</Text>
          <Text style={styles.borderD}>Total de compra</Text>
          <Text style={styles.borde}></Text>
        </View>
        <View>
          {resumenCompras.map((compra, index) => (
            <View style={styles.fecha} key={index}>
              <Text>{compra.fecha}</Text>
              <Text style={styles.TotalDeCompra}>
                ${compra.total_de_compra.toLocaleString()}
              </Text>
            </View>
          ))}
        </View>
        <View>
          <Text style={styles.total}>
            Total de compras: ${totalCompra.toLocaleString()}{" "}
          </Text>
        </View>
      </Page>
      <Page>
        <Image src={logo} style={styles.logos} />
        <View style={styles.section}>
          <Text style={styles.titulo}> Ordenes Del Mes De {monthName}</Text>
        </View>
        <View>
          <Text style={styles.border}>Fecha</Text>
          <Text style={styles.borderD}>Total de Ordenes</Text>
          <Text style={styles.borde}></Text>
        </View>
        <View>
          {resumenOrdenes.map((orden, index) => (
            <View style={styles.fecha} key={index}>
              <Text>{orden.fecha}</Text>
              <Text style={styles.TotalDeCompra}>
                ${orden.precio_total.toLocaleString()}
              </Text>
            </View>
          ))}
        </View>
        <View>
          <Text style={styles.total}>
            Total de ordenes: ${totalOrdenes.toLocaleString()}{" "}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default PDFComprasMes;
