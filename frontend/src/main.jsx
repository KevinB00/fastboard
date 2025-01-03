import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { ConfigProvider } from "antd";
import config from "./styles/globalStyles";
import "./index.sass";
import Inicio from "./pages/Landing/Inicio.jsx";
import InicioSesion from "./pages/Signin/InicioSesion.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ConfigProvider theme={config}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="inicio" element={<Inicio />} />
          <Route path="inicio-sesion" element={<InicioSesion />} />
          <Route path="*" element={<Inicio />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  </StrictMode>
);
