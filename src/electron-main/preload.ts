import path from 'path'
import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  send: (channel: string, ...args: any[]): void => ipcRenderer.send(channel, ...args),
  setDeviceMetrics: (simulatorContentId: number, device: { width?: number; height?: number; dpr?: number }) =>
    ipcRenderer.invoke('set-device-metrics', { simulatorContentId, device }),
  simulatorPreload: `file://${path.join(__dirname, 'preload-simulator.js')}`,
})
