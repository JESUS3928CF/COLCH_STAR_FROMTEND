import { useEffect, useState } from "react";
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import { format, subDays, startOfToday, parseISO } from "date-fns";
import clienteAxios from "../../../config/axios";
import logo from "../PDF/LogoPNGModificado.png";
import Swal from "sweetalert2";

export const PDFOrdenSemanal = () => {
  const [resumenVentas, setResumenVentas] = useState([]);
  const [totalComprasUltimosSieteDias, setTotalComprasUltimosSieteDias] = useState(0);

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
        const { data } = await clienteAxios.get("/ordenes", config);

        const fechaActual = startOfToday();
        const fechaInicioSemanaActual = subDays(fechaActual, 7);

        const VentasUltimosSieteDias = data.filter((orden) => {
          const fecha = parseISO(orden.fecha_creacion);
          return fecha >= fechaInicioSemanaActual && fecha <= fechaActual && orden.estado_de_orden === 'Entregada';
        });

        const totalVentas = VentasUltimosSieteDias.reduce((total, orden) => total + orden.precio_total, 0);
        setTotalComprasUltimosSieteDias(totalVentas);

        const resumen = {};
        VentasUltimosSieteDias.forEach((orden) => {
          const fecha = format(parseISO(orden.fecha_creacion), "dd/MM/yyyy");
          if (resumen[fecha]) {
            resumen[fecha].total += orden.precio_total;
          } else {
            resumen[fecha] = { fecha: fecha, total: orden.precio_total };
          }
        });

        setResumenVentas(Object.values(resumen));
        
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
      top: 25,
      height: 35,
    },
    totalDeCompra: {
      fontSize: 14,
      position: "relative",
      left: 265,
      top: -10,
      height: 35,
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
      left: 365,
      top: -1,
    },
    borde: {
      borderBottomWidth: 1,
      borderBottomColor: "#47684E",
      width: "65%",
      position: "absolute",
      top: 20,
      left: 115,
    },
    logos: {
      position: "absolute",
      opacity: 0.3,
      width: "50%",
    },
    total:{
      fontSize: 14,
      position: "relative",
      left: 25,
      top: 25,
      height: 35,
    }
  });

  return (
    <Document>
      <Page>
        <Image src={logo} style={styles.logos} />
        <View style={styles.section}>
          <Text style={styles.titulo}>Ordenes de los ultimos 7 dias</Text>
        </View>
        <View>
          <Text style={styles.border}>Fecha</Text>
          <Text style={styles.borderD}>Total de Órdenes</Text>
          <Text style={styles.borde}></Text>
        </View>
        <View>
          {resumenVentas.map((orden, index) => (
            <View style={styles.fecha} key={index}>
              <Text>{orden.fecha}</Text>
              <Text style={styles.totalDeCompra}>${orden.total.toLocaleString()}</Text>
            </View>
          ))}
        </View>
        <View >
          <Text style={styles.total}>Total de Ordenes de los últimos 7 días: ${totalComprasUltimosSieteDias.toLocaleString()}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default PDFOrdenSemanal;
