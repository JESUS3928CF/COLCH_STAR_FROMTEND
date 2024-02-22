import React, { useEffect, useState } from "react";
import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { startOfToday, subDays, parseISO } from "date-fns";
import clienteAxios from "../../../config/axios";

const PDFComprasPrendas = () => {
  const [comprasUltimosSieteDias, setComprasUltimosSieteDias] = useState([]);
  const [detalleCompra, setDetalleCompra] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompras = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data: comprasData } = await clienteAxios.get(
          "/compras",
          config
        );
        const { data: detalleCompraData } = await clienteAxios.get(
          "/compraDetalles"
        );

        const filtaraFkCompras = detalleCompraData.filter(
          (detalle) => detalle.fk_compra
        );

        // Obtener IDs de compras
        const fk_compras = filtaraFkCompras.map((detalle) => detalle.fk_compra);
        const id_compra = comprasData.filter((compra) =>
          fk_compras.includes(compra.id_compra)
        );

        const fechaActual = startOfToday();
        const fechaInicioSemanaActual = subDays(fechaActual, 8);

        const comprasUltimosSieteDias = id_compra.filter((compra) => {
          const fechaCompra = parseISO(compra.fecha);
          return (
            fechaCompra >= fechaInicioSemanaActual && fechaCompra <= fechaActual
          );
        });

        setComprasUltimosSieteDias(comprasUltimosSieteDias);
        setDetalleCompra(detalleCompraData);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchCompras();
  }, []); // <-- arreglo de dependencias vacío

  // Estilos para el PDF
  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      padding: 10,
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    title: {
      fontSize: 24,
      marginBottom: 10,
      textAlign: "center",
    },
    subtitle: {
      fontSize: 18,
      marginBottom: 10,
      textAlign: "center",
    },
    text: {
      fontSize: 12,
      marginBottom: 5,
    },
  });

  return (
    <PDFViewer style={{ width: "100%", height: "100vh" }}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.title}>Reporte de Compras de Prendas</Text>
            <Text style={styles.subtitle}>Últimos 7 días</Text>
            {comprasUltimosSieteDias.map((compra, index) => (
              <Text key={index} style={styles.text}>
                Fecha: {compra.fecha}, Cantidad:{" "}
                {detalleCompra.reduce((total, detalle) => {
                  if (detalle.fk_compra === compra.id_compra) {
                    return total + detalle.cantidad;
                  }
                  return total;
                }, 0)}
              </Text>
            ))}
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default PDFComprasPrendas;
