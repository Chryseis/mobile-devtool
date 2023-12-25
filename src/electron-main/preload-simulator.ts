import { contextBridge, ipcRenderer } from 'electron'
import store from './store'

const webContentId = ipcRenderer.sendSync('get-web-contentId')

const actionList = []
const callbackMap = new Map<
  any,
  { successCallback: (...args: any[]) => void; failCallback: (...args: any[]) => void }
>()

contextBridge.exposeInMainWorld('Sailer', {
  getUser() {
    return { token: '', uid: '', appver: '' }
  },
  nativeCall(
    action: string,
    params: any,
    successCallback: (...args: any[]) => void,
    failCallback: (...args: any[]) => void
  ) {
    const callbackId = Symbol(`${action}${params.toString()}`)
    ipcRenderer.once(action, (event, args) => {
      const type = args[0]
      const callbackId = args[1] as Symbol
      const params = Array.from(args).slice(2) as any[]
      const callback = callbackMap.get(callbackId)

      if (type === 'success') {
        callback?.successCallback(params)
      } else {
        callback?.failCallback(params)
      }
    })
    ipcRenderer.send(action, params)
    callbackMap.set(callbackId, { successCallback, failCallback })
  },
  on(event: string, callback: (...args: any[]) => void) {
    ipcRenderer.on(event, (event, args) => {
      callback(args)
    })
  },
  fire(event: string, ...args: any[]) {
    ipcRenderer.send(event, args)
  },
  ready(callback: (args: any[]) => void) {
    ipcRenderer.on('ready', (event, args) => {
      callback(args)
    })
  },
  getVersion() {
    return store.get(`${webContentId}.version`)
  },
})
