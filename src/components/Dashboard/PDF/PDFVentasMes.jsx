import React, { useEffect, useState } from "react";
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import { parseISO, getMonth, getYear } from "date-fns";
import logo from "../PDF/LogoPNGModificado.png";
import clienteAxios from "../../../config/axios";

const PDFVentasMes = ({ monthIndex, monthName }) => {
  const [resumenOrdenes, setResumenOrdenes] = useState([]);

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
        
        const year = getYear(new Date());

        const OrdenesMes = data.filter((orden) => {
          const fecha = parseISO(orden.fecha_entrega);
          return getMonth(fecha) === monthIndex && getYear(fecha) === year && orden.estado_de_orden === 'Finalizado';
        });

        const resumen = {};
        OrdenesMes.forEach((orden) => {
          const fecha = orden.fecha_entrega;
          if (resumen[fecha]) {
            resumen[fecha].precio_total += orden.precio_total;
          } else {
            resumen[fecha] = { fecha: fecha, precio_total: orden.precio_total };
          }
        });

        setResumenOrdenes(Object.values(resumen));
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
    TotalDeVenta:{
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
          <Text style={styles.titulo}>Ventas Del Mes De {monthName}</Text>
        </View>
        <View>
          <Text style={styles.border}>Fecha</Text>
          <Text style={styles.borderD}>Total de venta</Text>
          <Text style={styles.borde}></Text>
        </View>
        <View>
          {resumenOrdenes.map((venta, index) => (
            <View style={styles.fecha} key={index}>
              <Text>{venta.fecha}</Text>
              <Text style={styles.TotalDeVenta}>${venta.total_de_venta}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default PDFVentasMes;
