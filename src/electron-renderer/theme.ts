import { DefaultTheme } from 'styled-components'

const theme: DefaultTheme = {
  colorPrimary: '#52c41a',
  colorBgBase: '#424242',
  colorBgContent: '#2e2e2e',
  colorBgToolbar: '#383838',
  colorText: 'rgba(255,255,255,0.5)',
  colorBgPopupHover: 'rgba(82,192,26,0.1)',
  colorBgPopupActive: 'rgba(82,192,26,0.3)',
  borderRadius: 6,
  fontSize: 14,
  contentFontSize: 12,
  component: {
    colorBgContainer: '#4b4b4b',
    colorBorder: 'rgba(255,255,255,.3)',
    colorText: '#fff',
  },
  input: {
    colorPrimary: '#fff',
    colorPrimaryActive: '#fff',
    colorTextQuaternary: 'rgba(255,255,255,0.65)',
    colorTextTertiary: 'rgba(255,255,255,0.85)',
  },
  select: {
    colorPrimary: '#fff',
    colorPrimaryHover: '#fff',
    colorText: '#fff',
    optionActiveBg: '#4b4b4b',
    optionSelectedBg: '#4b4b4b',
    colorBgElevated: '#333',
    colorTextQuaternary: '#fff',
    colorTextPlaceholder: '#fff',
  },
  icon: {
    colorPrimary: '#fff',
  },
  button: {
    colorPrimary: '#7b7b7b',
    colorPrimaryHover: '#737373',
    colorPrimaryActive: '#737373',
  },
}

export default theme
