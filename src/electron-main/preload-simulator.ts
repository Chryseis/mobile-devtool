import { contextBridge, ipcRenderer } from 'electron'
import store from './store'
import sailerActions from './constants/sailerActions'

const webContentId = ipcRenderer.sendSync('get-web-contentId')

const callbackMap = new Map<
  any,
  { successCallback: (...args: any[]) => void; failCallback: (...args: any[]) => void }
>()

const nativeCall = (
  action: string,
  params: any,
  successCallback: (...args: any[]) => void,
  failCallback: (...args: any[]) => void
) => {
  const callbackId = Symbol(`${action}${params.toString()}`)
  ipcRenderer.once(action, (event, args) => {
    const type = args[0]
    const callbackId = args[1] as Symbol
    const result = args[2] as { result: { ok: boolean; data: any } }
    const callback = callbackMap.get(callbackId)

    if (type === 'success') {
      callback?.successCallback(result)
    } else {
      callback?.failCallback(result)
    }
  })
  callbackMap.set(callbackId, { successCallback, failCallback })
  ipcRenderer.send(action, { callbackId, params })
}

contextBridge.exposeInMainWorld('Sailer', {
  getUserInfo() {
    return { token: '', uid: '', appver: '' }
  },
  nativeCall,
  on(event: string, callback: (...args: any[]) => void) {
    ipcRenderer.on(event, (event, args) => {
      callback(args)
    })
  },
  fire(event: string, ...args: any[]) {
    ipcRenderer.send(event, args)
  },
  ready(callback: (args: any[]) => void) {
    this.on('ready', callback)
  },
  getVersion() {
    return store.get(`${webContentId}.version`)
  },
  ...sailerActions.reduce((obj, key) => {
    return { ...obj, [key]: nativeCall.bind(null, key) }
  }, {}),
})

ipcRenderer.on('ready', () => {
  console.log('ready')
})
