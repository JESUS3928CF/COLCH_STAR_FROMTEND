import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import logo from "../PDF/LogoPNGModificado.png";
export const PDFInforme = ({
  fechaInicio,
  fechaFin,
  rangoDeFechas,
  valorCompra,
}) => {
  

  const styles = StyleSheet.create({
    fecha: {
      fontSize: 14,
      left: 130,
      height: "35px",
    },
    fechas:{

        fontSize: 14,
        position: "relative",
        top: "50px",
        height: "35px",
        right: 130

    },
    TotalDeCompra: {
      fontSize: 14,
      left: "265px",
      height: "35px",
    },
    section: {
      padding: 50,
      marginLeft: 150,
    },
    titulo: {
      fontWeight: "bold",
      fontSize: 17,
      position: "relative",
      zIndex: 1,
      left: 10,
    },

    titulos: {
      fontWeight: "bold",
      fontSize: 17,
      position: "relative",
      zIndex: 1,
      left: 30,
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

    position:{
        position: 'relative',
        marginTop: '-200px'
    }
  });

  return (
    <Document>
      <Page>
        <Image src={logo} style={styles.logos} />

        <View style={styles.section}>
          <Text style={styles.titulos}>Compras de la fecha</Text>

          <Text style={styles.titulo}>
            {fechaInicio} - {fechaFin}
          </Text>
        </View>
        <View>
          <Text style={styles.border}>Fecha</Text>
          <Text style={styles.borderD}>Total de compra</Text>
          <Text style={styles.borde}></Text>
        </View>
        <View>
        {rangoDeFechas.map((fecha , index)=>(
            <View style={styles.fechas} key={index}>

<Text style={styles.TotalDeCompra}> {fecha} </Text>


            </View>
        ))}

</View>


        <View style={styles.position}>
        {valorCompra.map((num, index) => (
            <View style={styles.fecha} key={index}>
              <Text style={styles.TotalDeCompra}>{num}</Text>
            </View>
          ))}

        </View>

         
      </Page>
    </Document>
  );
};

export default PDFInforme;
