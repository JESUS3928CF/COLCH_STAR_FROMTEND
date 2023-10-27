/// valida que una imagen sea de tipo png o jpg
export function validarImagen(archivo) {

    const allowedImageTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (!allowedImageTypes.includes(archivo.type)) {
        return 'La imagen debe ser de tipo PNG o JPG';
    }

    return true;
}
