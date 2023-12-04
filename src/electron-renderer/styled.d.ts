// import original module declarations
import 'styled-components'

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    colorPrimary: string
    colorBgBase: string
    colorBgContent: string
    colorText: string
    borderRadius: number
    fontSize: number
  }
}
