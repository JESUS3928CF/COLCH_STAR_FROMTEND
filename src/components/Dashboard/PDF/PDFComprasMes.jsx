import React, { useEffect, useState } from "react";
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import { parseISO, getMonth, getYear } from "date-fns";
import logo from "../PDF/LogoPNGModificado.png";
import clienteAxios from "../../../config/axios";

const PDFComprasMes = ({ monthIndex, monthName }) => {
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
        
        const year = getYear(new Date());
        // Filtrar compras para el mes y año proporcionados
        const comprasMes = data.filter((compra) => {
          const fecha = parseISO(compra.fecha);
          return getMonth(fecha) === monthIndex && getYear(fecha) === year;
        });

        // Agrupar las compras por fecha y sumar los totales
        const resumen = {};
        comprasMes.forEach((compra) => {
          const fecha = compra.fecha;
          if (resumen[fecha]) {
            resumen[fecha].total_de_compra += compra.total_de_compra;
          } else {
            resumen[fecha] = { fecha: fecha, total_de_compra: compra.total_de_compra };
          }
        });

        setResumenCompras(Object.values(resumen));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [monthIndex]);

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
              <Text style={styles.TotalDeCompra}>${compra.total_de_compra}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default PDFComprasMes;
