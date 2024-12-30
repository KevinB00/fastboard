import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ConfigProvider, Layout } from 'antd'
import './index.sass'
import Inicio from './pages/Landing/Inicio.jsx'

const config = {
  token: {
    colorPrimary: '#7dacda',
    colorInfo: '#7dacda',
    colorLinkHover: '#7ddad9',
    borderRadius: 10,
    colorSuccess: '#7ac157',
    fontFamilyCode: '"Noto Sans", serif'
  },
  components: {
    Layout: {
      headerBg: 'rgba(112,158,201,0.59)'
    }
  }
};


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ConfigProvider theme={config}>
      <Inicio />
    </ConfigProvider>
  </StrictMode>,
)
