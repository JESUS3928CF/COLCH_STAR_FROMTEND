import React, { useEffect, useState } from "react";
import { Document, Page, Text, View, StyleSheet,Image } from "@react-pdf/renderer";
import { format, subDays, startOfToday, parseISO } from "date-fns";
import clienteAxios from "../../../config/axios";
import logo from "../PDF/LogoPNGModificado.png"

const PDFComprasSemana = () => {
  const [resumenCompras, setResumenCompras] = useState([]);

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

        // Obtener la fecha de hoy
        const fechaActual = startOfToday();

        // Calcular la fecha de hace 7 días
        const fechaInicioSemanaActual = subDays(fechaActual, 7);

        // Filtrar compras de los últimos 7 días
        const comprasUltimos7Dias = data.filter((compra) => {
          const fecha = parseISO(compra.fecha);
          return fecha >= fechaInicioSemanaActual && fecha <= fechaActual;
        });

        // Agrupar compras por fecha y calcular el total de compras para cada fecha
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
        console.log(error);
      }
    };

    fetchData();
  }, []);

 












  const styles = StyleSheet.create({
    fecha:{
      fontSize:14,
      position:'relative',
      left: 130,
      top: '25px',
      height: '35px'
    },
    TotalDeCompra:{
      fontSize:14,
      position:'relative',
      left: '265px',
      top: '-10px',
      height: '35px'
    },
    section: {
      padding: 50,
      marginLeft: 125
    },
    titulo:{
      fontWeight: 'bold',
      fontSize: 17,
      left: 20,
    },
    border:{
      fontSize: 15,
      width: '85%',
      marginLeft: 95,
      position: 'absolute',
      left: 45
    },
    borderD:{
      fontSize: 15,
      position: 'absolute',
      left: '365px',
      top: '-1px'
    },
    borde:{
      borderBottomWidth: 1,
      borderBottomColor: '#47684E',
      width: '65%',
      position: 'absolute',
      top: '20px',
      left: '115px'
    },
    logos: {
      position: 'absolute',
      opacity: 0.3, 
      width: '50%', 
    }
  });

  return (
    <Document>
      <Page>
        <Image src={logo} style={styles.logos}/>
       
        <View style={styles.section}>
          <Text style={styles.titulo}>Compras semanal </Text>
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
              <Text style={styles.TotalDeCompra}>${compra.total}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default PDFComprasSemana;
