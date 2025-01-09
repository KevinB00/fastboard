import axios from "axios";
import { Navigate } from "react-router";
const registrarUsuario = async (data) => {
    try {
        const response = await axios.post("http://localhost:8080/api/auth/registrar", data);
        if (response.data.status === "success") {
            localStorage.setItem("authToken", response.data.token);
            Navigate("/landing-user");
        }
    } catch (error) {
        console.error("Error al registrar el usuario:", error);
        alert("Credenciales incorrectas");
    }
};
export default registrarUsuario;