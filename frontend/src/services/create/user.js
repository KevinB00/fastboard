import axios from "axios";
const usuario = async (data, type) => {
  if (type === "registrar") {
    try {
      // Crear un JSON con los datos del usuario
      const dataJson = JSON.stringify({
        name: data.name,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      });
      const response = await axios.post(
        "http://localhost:8080/api/auth/registrar",
        dataJson,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data === "success") {
        return "success";
      } else {
        return "error";
      }
    } catch (error) {
      console.log(error);
      return "error";
    }
  }else if (type === "login") {
    try {
      // Crear un JSON con los datos del usuario
      const dataJson = JSON.stringify({
        email: data.email,
        password: data.password,
      });
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        dataJson,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data === "success") {
        return "success";
      } else {
        return "error";
      }
    } catch (error) {
      console.log(error);
      return "error";
    }
  }

};
export default usuario;