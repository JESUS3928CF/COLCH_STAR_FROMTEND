/// valida que una imagen sea de tipo png o jpg
export function validarImagen(archivo) {
    if (archivo) {
        const allowedImageTypes = ['image/png', 'image/jpeg', 'image/jpg'];
        if (!allowedImageTypes.includes(archivo.type)) {
            return 'La imagen debe ser de tipo PNG o JPG';
        }
    }
    return true;
}


export const validarEspaciosVacios = (value) => {
    const valueArray = value.toString().split('');

    return valueArray.every((letra) => letra === ' ')
        ? 'No se pueden espacios vacíos'
        : true;
};


/// Validar booleanos
export const validarBooleanos = (value) => {
    const valueBool = Boolean(value)
    if (valueBool === true || value === false) return true;
    return 'El estado de publicación es obligatorio';
}


//Valida las Fecha
export const validarFecha = (value) => {
    const fechaIngresada = new Date(value);
    const fechaActual = new Date();
  
    if (fechaIngresada >= fechaActual) {
      return 'La fecha no puede ser futura';
    }
  
    return true; 
  };
  