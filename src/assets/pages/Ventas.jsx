import { Navbar } from "../components/Navbar";

const Ventas = () => {
  const contentStyle = {
      marginLeft: '260px', // Ancho del Navbar
  };

  return (
      <div>
          <Navbar />
          <div style={contentStyle}>
              <h1>Ventas</h1>
          </div>
      </div>
  );
}

export default Ventas
