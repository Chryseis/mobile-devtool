import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  send: (channel: string, ...args: any[]): void => ipcRenderer.send(channel, ...args),
  setDeviceMetrics: (metrics: { width?: number; height?: number; scale?: number; usageAgent?: string }) =>
    ipcRenderer.send('set-device-metrics', metrics),
})
