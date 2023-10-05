import { Navbar } from "../components/Navbar";

const Usuarios = () => {
  const contentStyle = {
      marginLeft: '260px', // Ancho del Navbar
  };

  return (
      <div>
          <Navbar />
          <div style={contentStyle}>
              <h1>Usuarios</h1>
          </div>
      </div>
  );
}

export default Usuarios
