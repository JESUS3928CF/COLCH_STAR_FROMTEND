import React, { useEffect, useState } from "react";
import { Document, Page, Text, View } from "@react-pdf/renderer";
import clienteAxios from "../../../config/axios";
import useAuth from "../../../hooks/useAuth";
import { parseISO, getMonth } from "date-fns";

export const PDF = () => {
  const [compras, setCompras] = useState([]);
  const [mes, setMes]= useState([])
  //   const {config}=useAuth()

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
        // Filtrar compras solo para enero
        const comprasEnero = data.filter((compra) => {
          const fecha = parseISO(compra.fecha);
          return getMonth(fecha) === 1; // 0 representa enero
        });
        setMes(comprasEnero);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  console.log('mes',mes)

  return (
    <>
      <Document>
        <Page size="A4">
          <View>
            {mes.map((R) => (
              <Text key={R.id_compra}>{R.fecha}</Text>
            ))}
          </View>
        </Page>
      </Document>
    </>
  );
};

export default PDFCompras;
