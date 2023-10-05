import { Navbar } from '../components/Navbar';

const Productos = () => {
    const contentStyle = {
        marginLeft: '260px', // Ancho del Navbar
    };

    return (
        <div>
            <Navbar />
            <div style={contentStyle}>
                <h1>Dashboard</h1>
            </div>
        </div>
    );
};

export default Productos;
