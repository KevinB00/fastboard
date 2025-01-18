import React from 'react'
import { Navigate } from 'react-router-dom'
const ProtectedRoute = ({ children }) => {
    // Verificar si el usuario está autenticado comprobandolo en localStorage
    const authToken = localStorage.getItem('token');

    // Si el usuario no está autenticado, redirigirlo a la página de inicio de sesión
    if (!authToken) {
        return <Navigate to="/inicio-sesion" />;
    }

    // Si el usuario está autenticado, mostrar el contenido protegido
    return children
};

export default ProtectedRoute;
