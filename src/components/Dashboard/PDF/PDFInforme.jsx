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
  valorOrden,
  compras,
  proveedores,
  ordenes,
  clientes,
}) => {
  const sumarValores = (valores) => {
    return valores.reduce((total, valor) => total + valor, 0);
  };

  const totalCompra = sumarValores(valorCompra);
  const totalOrden = sumarValores(valorOrden);

  const obtenerNombreProveedores = (fechaCompra) => {
    const comprasFecha = compras.filter(
      (compra) => compra.fecha === fechaCompra
    );
    const proveedoresUnicos = new Set();
    comprasFecha.forEach((compra) => {
      const proveedor = proveedores.find(
        (proveedor) => proveedor.id_proveedor === compra.fk_proveedor
      );
      if (proveedor) {
        proveedoresUnicos.add(proveedor.nombre);
      }
    });
    return Array.from(proveedoresUnicos);
  };

  const obtenerNombrecliente = (fechaOrdenParam) => {
    const fechaOrden = ordenes.filter(
      (orden) => orden.fecha_entrega === fechaOrdenParam
    );
    const ClienteUnico = new Set();
    fechaOrden.forEach((orden) => {
      const cliente = clientes.find(
        (cliente) => cliente.id_cliente === orden.fk_cliente
      );
      if (cliente) {
        ClienteUnico.add(`${cliente.nombre} ${cliente.apellido}`);
      }
    });
    return Array.from(ClienteUnico);
  };

  const styles = StyleSheet.create({
    fecha: {
      fontSize: 14,
      left: 130,
      height: "35px",
    },
    fechas: {
      fontSize: 14,
      position: "relative",
      top: "50px",
      height: "35px",
      right: 130,
    },
    TotalDeCompra: {
      fontSize: 14,
      left: "300px",
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
      marginLeft: 100,
      position: "absolute",
      left: 190,
    },
    borderD: {
      fontSize: 15,
      position: "absolute",
      left: "400px",
      top: "-1px",
    },

    nombreProveedor: {
      fontSize: 15,
      width: "85%",
      marginLeft: 50,
      position: "absolute",
      left: 35,
    },

    borde: {
      borderBottomWidth: 1,
      borderBottomColor: "#47684E",
      width: "85%",
      position: "absolute",
      top: "20px",
      left: "45px",
    },
    logos: {
      position: "absolute",
      top: "10px",
      opacity: 0.3,
      width: "50%",
    },
    position: {
      position: "absolute",
      top: "185px",
    },
    total: {
      fontSize: 14,
      position: "relative",
      left: "25px",
      top: "60x",
      height: "35px",
    },
    UbiFecha: {
      fontSize: 14,
      left: "400px",
      height: "35px",
    },
    proveedor: {
      fontSize: 14,
      left: 170,
      top: "-20px",
      height: "35px",
    },
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
          <Text style={styles.nombreProveedor}>Proveedores</Text>
          <Text style={styles.borde}></Text>
        </View>
        <View>
          {rangoDeFechas.map((fecha, index) => {
            const num = valorCompra[index];
            if (num !== 0) {
              return (
                <View style={styles.fechas} key={index}>
                  <Text style={styles.UbiFecha}>{fecha}</Text>
                  <Text style={styles.proveedor}>
                    {obtenerNombreProveedores(fecha).join(", ")}
                  </Text>
                </View>
              );
            } else {
              return null;
            }
          })}
        </View>
        <View style={styles.position}>
          {valorCompra.map((num, index) => {
            if (num !== 0) {
              return (
                <View style={styles.fecha} key={index}>
                  <Text style={styles.TotalDeCompra}>
                    {num.toLocaleString()}
                  </Text>
                </View>
              );
            } else {
              return null;
            }
          })}
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
          <Text style={styles.titulos}> Ordenes de la fecha</Text>
          <Text style={styles.titulo}>
            {fechaInicio} - {fechaFin}
          </Text>
        </View>
        <View>
          <Text style={styles.border}>Fecha</Text>
          <Text style={styles.borderD}>Total de Ordenes</Text>
          <Text style={styles.nombreProveedor}>Clientes</Text>
          <Text style={styles.borde}></Text>
        </View>
        <View>
          {rangoDeFechas.map((fecha, index) => {
            const num = valorOrden[index];
            if (num !== 0) {
              return (
                <View style={styles.fechas} key={index}>
                  <Text style={styles.UbiFecha}>{fecha}</Text>
                  <Text style={styles.proveedor}>
                    {obtenerNombrecliente(fecha).join(", ")}
                  </Text>
                </View>
              );
            } else {
              return null;
            }
          })}
        </View>
        <View style={styles.position}>
          {valorOrden.map((num, index) => {
            if (num !== 0) {
              return (
                <View style={styles.fecha} key={index}>
                  <Text style={styles.TotalDeCompra}>
                    {num.toLocaleString()}
                  </Text>
                </View>
              );
            } else {
              return null;
            }
          })}
        </View>
        <View>
          <Text style={styles.total}>
            Total de ordenes: ${totalOrden.toLocaleString()}{" "}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default PDFInforme;
