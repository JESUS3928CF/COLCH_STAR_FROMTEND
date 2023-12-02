import { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Puedes loguear el error aquí o enviarlo a un servicio de monitoreo de errores
        console.error('Error:', error);
    }

    render() {
        if (this.state.hasError) {
            return <h1>Hubo un error en la aplicación.</h1>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
