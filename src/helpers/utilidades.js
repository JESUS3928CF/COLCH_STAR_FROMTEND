/**
 * Verifica si han pasado más de 15 días desde la fecha de compra.
 * @param {string} fechaCompraString La fecha de compra en formato "YYYY-MM-DD".
 * @returns {boolean} True si han pasado más de 15 días desde la fecha de compra, de lo contrario false.
 */
export function hanPasado15Dias(fechaCompraString) {
    // Convertir la fecha de compra de tipo string a un objeto Date
    const fechaCompra = new Date(fechaCompraString);

    // Obtener la fecha actual
    const fechaActual = new Date();

    // Calcular la diferencia en milisegundos entre la fecha actual y la fecha de compra
    const diferenciaMilisegundos = fechaActual - fechaCompra;

    // Convertir la diferencia de milisegundos a días
    const diferenciaDias = diferenciaMilisegundos / (1000 * 60 * 60 * 24);

    // Verificar si han pasado más de 15 días
    return diferenciaDias > 15;
}