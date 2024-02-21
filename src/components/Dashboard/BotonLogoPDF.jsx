import { PDFDownloadLink } from "@react-pdf/renderer";
import { Button } from "@tremor/react";
import { FaRegFilePdf } from "react-icons/fa6";
import '../Dashboard/Css/styleDashboard.css'
import PropTypes from 'prop-types';



const BotonLogoPDF = ({namePDf,componente}) => {


  return (
  <PDFDownloadLink document={componente} fileName={namePDf}>

    {({ loading, url, error, blob }) =>
      loading ? (
          <span><FaRegFilePdf/></span>
      ) : (
          <span><FaRegFilePdf className="PDF"/></span>
      )
    }
  </PDFDownloadLink>)


};

BotonLogoPDF.PropTypes ={
    namePDf: PropTypes.string.isRequired,
    componente: PropTypes.func
}

export default BotonLogoPDF;