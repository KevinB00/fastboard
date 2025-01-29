import axios from "axios";
const usuario = async (data, type) => {
  const endpoint = type === "registrar" ? "registrar" : "login";

  try {
    const response = await axios.post(
      `/api/auth/${endpoint}`,
      type === "registrar" ? {
        name: data.name,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      } : {
        email: data.email,
        password: data.password,
      }
      ,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("role", response.data.role);
    localStorage.setItem("email", response.data.email);
    return response.status === 200 ? "success" : "error";
  } catch (error) {
    console.error("Error en la solicitud:", error);
    return "error";
  }
};
export default usuario;
