import { PDFDownloadLink } from "@react-pdf/renderer";
import { Button } from "@tremor/react";
import { FaArrowAltCircleRight } from "react-icons/fa";
import '../Dashboard/Css/styleDashboard.css'
import PDFComprasSemana from "./PDF/PDFComprasSemana";
import PDFOrdenSemanal from "./PDF/PDFOrdenSemanal";
import PropTypes from 'prop-types'; // Importa PropTypes en lugar de propTypes

const BtnPDF = ({namePDf,componente}) => {

let documento 


if(componente==1){
  documento =  <PDFComprasSemana/>
} else if (componente==2){

  documento =  <PDFOrdenSemanal/>

}


  return (
    <PDFDownloadLink document={documento} fileName={namePDf}>
      {({ loading, url, error, blob }) =>
        loading ? (
          <Button className="botonInfoC">
            {" "}
            <span className="BotonPdfUltimosSieteDias">Descargar Informe</span>
            <FaArrowAltCircleRight className="btnIconsPDFUltimosSieteDias" />
          </Button>
        ) : (
          <Button className="botonInfoC">
            {" "}
            <span className="BotonPdfUltimosSieteDias">Descargar Informe</span>
            <FaArrowAltCircleRight className="btnIconsPDFUltimosSieteDias" />
          </Button>
        )
      }
    </PDFDownloadLink>
  );
};

BtnPDF.propTypes = {
  namePDf: PropTypes.string.isRequired, // Usa PropTypes en lugar de propTypes
  componente: PropTypes.number // Usa PropTypes en lugar de propTypes
};


export default BtnPDF;
