import { PDFDownloadLink } from "@react-pdf/renderer";
import { FaRegFilePdf } from "react-icons/fa6";
import '../Dashboard/Css/styleDashboard.css'
import PropTypes from 'prop-types'; // Importa PropTypes desde 'prop-types'
import PDFComprasMes from "./PDF/PDFComprasMes";
import PDFComprasPrendas from "./PDF/PDFComprasPrendas";

const BotonLogoPDF = ({ namePDf, componente }) => {
  let documento;

  if (componente === 1) {
    documento =  <PDFComprasMes />;
  } else if (componente === 2) {
    documento =  <PDFComprasPrendas />;
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
