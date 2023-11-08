
import '../css-general/cssgeneral.css'
import '../css-general/tailwind.min.css'
import '../css-general/inicio_style.css'
import '../css-general/table.min.css'
import ListarProducto from '../components/producto/ListarProducto';
import AgregarProducto from '../components/producto/AgregarProducto';



const Productos = () => {

    return (
        <div>
            <ListarProducto />
            <AgregarProducto/>



        </div>
    );
};

export default Productos;
