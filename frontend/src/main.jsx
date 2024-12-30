import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ConfigProvider, Layout } from 'antd'
import config from './styles/globalStyles'
import './index.sass'
import Inicio from './pages/Landing/Inicio.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ConfigProvider theme={config}>
      <Inicio />
    </ConfigProvider>
  </StrictMode>,
)
