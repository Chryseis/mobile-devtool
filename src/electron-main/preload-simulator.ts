import { contextBridge } from 'electron'

contextBridge.exposeInMainWorld('Sailer', {})
