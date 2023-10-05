import { Navbar } from '../components/Navbar';

const Roles = () => {
    const contentStyle = {
        marginLeft: '260px', // Ancho del Navbar
    };

    return (
        <div>
            <Navbar />
            <div style={contentStyle}>
                <h1 className='pt-5'>Roles</h1>
            </div>
        </div>
    );
};

export default Roles;
