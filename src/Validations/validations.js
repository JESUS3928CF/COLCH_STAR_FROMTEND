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


export const validarFecha = (value) => {
    // Obtener la fecha ingresada en formato UTC
    const fechaIngresada = new Date(value);

    // Obtener la fecha actual en formato UTC
    const fechaActual = new Date();
  
    // Aplicar el desplazamiento horario para Colombia (UTC-5)
    fechaActual.setHours(fechaActual.getHours() - 5);
  
    // Verificar si la fecha es futura
    if (fechaIngresada >= fechaActual) {
      return 'La fecha no puede ser futura';
    }
  
    // Calcular la fecha mínima permitida, 15 días antes de la fecha actual
    const fechaMinimaPermitida = new Date();
    fechaMinimaPermitida.setDate(fechaMinimaPermitida.getDate() - 15);
  
    // Aplicar el desplazamiento horario para Colombia (UTC-5)
    fechaMinimaPermitida.setHours(fechaMinimaPermitida.getHours() - 5);

    // Verificar si la fecha es menor a 15 días desde la fecha actual
    if (fechaIngresada < fechaMinimaPermitida) {
      return 'La fecha no puede ser menor a 15 días desde la fecha actual';
    }
  
    return true;
};  



  export const validarFechaOrden = (value) => {
    let fechaIngresada = new Date(value);
    //sumar un dia a la fecha porque le resta un dia cuando la transforma
    fechaIngresada.setDate(fechaIngresada.getDate() + 1)
    const fechaActual = new Date();
    // Calcular la fecha máxima permitida, 15 días desde la fecha actual
    const fechaMaximaPermitida = new Date();
    fechaMaximaPermitida.setDate(fechaMaximaPermitida.getDate() + 15);

    // Verificar si la fecha es anterior a la actual
    if (fechaIngresada < fechaActual) {
       
        return 'La fecha no puede ser anterior a la actual';
    }

    // Verificar si la fecha es futura a más de 15 días
    if (fechaIngresada > fechaMaximaPermitida) {
        return 'La fecha no puede ser futura a más de 15 días';
    }

    return true;
};

  
  