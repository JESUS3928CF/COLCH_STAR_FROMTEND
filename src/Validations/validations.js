
/// Utiliza esta validación solo si quieres validar un campo de tipo string que esta vacío y nada más 
export function validarCampoStringVacio(campo, nombreCampo) {
    if (campo.trim() === '') {
        return `El ${nombreCampo} es obligatorio`;
    }
    return '';
}

/// valida que una imagen no este vacía y sea de tipo png o jpg
export function validarImagen(archivo) {
    if (!archivo) {
        return 'La imagen es obligatoria';
    }

    const allowedImageTypes = ['image/png', 'image/jpg'];
    if (!allowedImageTypes.includes(archivo.type)) {
        return 'La imagen debe ser de tipo PNG o JPG';
    }

    return '';
}

/// Utiliza esta validación solo si quieres validar un campo de tipo booleano que esta vacío y nada más 
export function validarSeleccion(campo, mensaje) {
    if (campo === null) {
        return mensaje;
    }
    return '';
}