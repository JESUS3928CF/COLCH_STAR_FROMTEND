

export const redirigirWhatsApp = () => {
    console.log('Redirigiendo a WhatsApp');
    console.log(import.meta.env.LINK_WA_COLCH_STAR);
    window.location.href = `${import.meta.env.VITE_LINK_WA_COLCH_STAR}`;
};
