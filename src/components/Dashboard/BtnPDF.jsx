import { PDFDownloadLink } from "@react-pdf/renderer";
import { Button } from "@tremor/react";
import { FaArrowAltCircleRight } from "react-icons/fa";
import '../Dashboard/Css/styleDashboard.css'
import PropTypes from 'prop-types';



const BtnPDF = ({namePDf,componente}) => {


  return (
  <PDFDownloadLink document={componente} fileName={namePDf}>

    {({ loading, url, error, blob }) =>
      loading ? (
        <Button className="botonInfoC">
          {" "}
          <span className="textBoton">Más Info</span>
          <FaArrowAltCircleRight className="btnIcons" />
        </Button>
      ) : (
        <Button className="botonInfoC">
          {" "}
          <span className="textBoton">Más Info</span>
          <FaArrowAltCircleRight className="btnIcons" />
        </Button>
      )
    }
  </PDFDownloadLink>)


};

BtnPDF.PropTypes ={
    namePDf: PropTypes.string.isRequired,
    componente: PropTypes.func
}

export default BtnPDF;