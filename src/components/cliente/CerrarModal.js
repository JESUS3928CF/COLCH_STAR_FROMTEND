
export const cerrarModal = () => {
    console.log(window.bootstrap);
        // Cerrar el modal Bootstrap
        const modal = document.getElementById('myModal');
        console.log(modal)
        const modalInstance = new window.bootstrap.Modal(modal);
        console.log(modalInstance);
        modalInstance.hide();
}