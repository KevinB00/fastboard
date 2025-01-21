import axios from "axios";
const usuario = async (data, type) => {
    const endpoint = type === "registrar" ? "registrar" : "login";
    const dataJson = JSON.stringify(
      type === "registrar"
        ? {
            name: data.name,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
          }
        : {
            email: data.email,
            password: data.password,
          }
    );

    try {
      const response = await axios.post(
        `/api/auth/${endpoint}`,
        {
          email: data.email,
          password: data.password,
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      return response.data === "success" ? "success" : "error";
    } catch (error) {
      console.error("Error en la solicitud:", error);
      return "error";
    }
  }
export default usuario;
