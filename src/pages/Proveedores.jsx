import { Navbar } from '../components/Navbar';
// import '../css-general/cssgeneral.css'
// import '../css-general/tailwind.min.css'
// import '../css-general/inicio_style.css'
// import '../css-general/table.min.css'


const Proveedores = () => {
    const contentStyle = {
        marginLeft: '260px', // Ancho del Navbar
    };

    return (
        <div>
            <Navbar />
            <div style={contentStyle} className='contenedor'></div>

            {/* titulo */}

            <h1 className="titulo">Proveedores</h1>









        </div>
        
    );
};

export default Proveedores;
