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
  setDeviceMetrics: (
    simulatorContentId: number,
    metrics: { width?: number; height?: number; dpr?: number }
  ) => Promise<any>
  simulatorPreload: string
}

export type First<T extends any[]> = T extends readonly (infer ElementType)[] ? ElementType : never
