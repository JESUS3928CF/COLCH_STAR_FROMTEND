export const formatDate = (date) => {
    // const newDate = new Date(date);

    // return new Intl.DateTimeFormat("es", { dateStyle: "medium" }).format(newDate);

    return date;
};


export const formatMoney = (value) => {
    // Convertir a número y redondear a dos decimales
    const roundedValue = Math.round(value * 100) / 100;

    const formatter = new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0, // Establecer el mínimo de dígitos para los centavos
        maximumFractionDigits: 0  // Establecer el máximo de dígitos para los centavos
    });

    return formatter.format(roundedValue);
};
