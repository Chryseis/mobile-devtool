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

export interface IElectronAPI {
  send: (channel: string, ...args: any[]) => void
}

export type First<T extends any[]> = T extends readonly (infer ElementType)[] ? ElementType : never
