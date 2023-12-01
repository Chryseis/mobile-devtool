export interface IElectronAPI {
  send: (channel: string, ...args: any[]) => void
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }

  interface ElectronWebViewElement extends HTMLWebViewElement {
    openDevTools: () => void
    reload: () => void
    getWebContentsId: () => number
  }
}

export type First<T extends any[]> = T extends [infer F, ...infer _] ? F : never
