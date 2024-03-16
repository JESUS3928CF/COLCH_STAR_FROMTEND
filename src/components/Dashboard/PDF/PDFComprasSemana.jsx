import { useEffect, useState } from "react";
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import { format, subDays, startOfToday, parseISO } from "date-fns";
import clienteAxios from "../../../config/axios";
import logo from "../PDF/LogoPNGModificado.png";
import Swal from "sweetalert2";

export const PDFComprasSemana = () => {
  const [resumenCompras, setResumenCompras] = useState([]);
  const [totalComprasUltimosSieteDias, setTotalComprasUltimosSieteDias] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await clienteAxios.get("/compras", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const fechaActual = startOfToday();
        const fechaInicioSemanaActual = subDays(fechaActual, 7);

        const comprasUltimos7Dias = data.filter((compra) => {
          const fecha = parseISO(compra.fecha);
          return fecha >= fechaInicioSemanaActual && fecha <= fechaActual && compra.estado === true
        });

        const totalCompras = comprasUltimos7Dias.reduce((total, compra) => total + compra.total_de_compra, 0);
        setTotalComprasUltimosSieteDias(totalCompras);

        const resumen = {};
        comprasUltimos7Dias.forEach((compra) => {
          const fecha = format(parseISO(compra.fecha), "dd/MM/yyyy");
          if (resumen[fecha]) {
            resumen[fecha].total += compra.total_de_compra;
          } else {
            resumen[fecha] = { fecha: fecha, total: compra.total_de_compra };
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
  }, []);

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
      opacity: 0.3,
      width: "50%",
    },
    total:{
      fontSize: 14,
      position: "relative",
      left: "25px",
      top: "25px",
      height: "35px",
    }
  });

  return (
    <Document>
      <Page>
        <Image src={logo} style={styles.logos} />
        <View style={styles.section}>
          <Text style={styles.titulo}>Compras de los últimos 7 días</Text>
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
              <Text style={styles.TotalDeCompra}>${compra.total.toLocaleString()}</Text>
            </View>
          ))}
        </View>
        <View >
          <Text style={styles.total}>Total de compras de los últimos 7 días: ${totalComprasUltimosSieteDias.toLocaleString()}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default PDFComprasSemana;
