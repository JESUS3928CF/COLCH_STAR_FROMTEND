import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx';
import '@tremor/react/dist'
import '@react-pdf/renderer';

// import "./main.css"


ReactDOM.createRoot(document.getElementById('root')).render(
    <ErrorBoundary>
        {/* <React.StrictMode> */}
            <App />
        {/* </React.StrictMode> */}
    </ErrorBoundary>
);
