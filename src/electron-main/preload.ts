import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  send: (channel: string, ...args: any[]): void => ipcRenderer.send(channel, ...args),
})
