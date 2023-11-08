
/// Función para calcular el ancho de pantalla en cada momento
/// PARA: implementar elementos responsivos en alguna pagina
/// REQUIERE: una función para cambiar el estado de una variable que contendrá el ancho de pantalla actual
export const calcularAnchoDePantalla = (setAnchoPantalla) => {
    const handleResize = () => {
        setAnchoPantalla(window.innerWidth);
    };

    // Agregar el evento de cambio de tamaño de ventana
    window.addEventListener('resize', handleResize);

    // Limpia el evento cuando el componente se desmonta
    return () => {
        window.removeEventListener('resize', handleResize);
    };
};