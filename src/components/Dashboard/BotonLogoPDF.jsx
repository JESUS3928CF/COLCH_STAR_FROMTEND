import { PDFDownloadLink } from "@react-pdf/renderer";
import { FaRegFilePdf } from "react-icons/fa6";
import '../Dashboard/Css/styleDashboard.css'
import PropTypes from 'prop-types'; // Importa PropTypes desde 'prop-types'
import PDFComprasMes from "./PDF/PDFComprasMes";
import PDFComprasPrendas from "./PDF/PDFComprasPrendas";
import PDFInforme from "./PDF/PDFInforme";

const BotonLogoPDF = ({ namePDf, componente ,rangoDeFechas,valorCompra,valorOrden,fechaInicio,fechaFin }) => {
  let documento;

  if (componente === 1) {
    documento =  <PDFComprasMes />;
  } else if (componente === 2) {
    documento =  <PDFComprasPrendas />;
  } else if (componente === 3){
    documento = <PDFInforme   rangoDeFechas={rangoDeFechas} valorOrden={valorOrden} valorCompra={valorCompra}  fechaInicio={fechaInicio} fechaFin={fechaFin}/>
  }

  return (
    <PDFDownloadLink document={documento} fileName={namePDf} className="PDF">
      {({ loading, url, error, blob }) =>
        loading ? (
          <span><FaRegFilePdf /></span>
        ) : (
          <span><FaRegFilePdf /></span>
        )
      }
    </PDFDownloadLink>
  );
};

BotonLogoPDF.propTypes = { // Cambia 'PropTypes' a 'propTypes'
  namePDf: PropTypes.string.isRequired, // Usa PropTypes en lugar de propTypes
  componente: PropTypes.number // Usa PropTypes en lugar de propTypes
};

export default BotonLogoPDF;
