export interface IElectronAPI {
  send: (channel: string, ...args: any[]) => void
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }

  interface ElectronWebViewElement extends HTMLWebViewElement {
    openDevTools: () => void
    getWebContentsId: () => number
  }
}
