import { contextBridge, ipcRenderer } from 'electron'
import store from './store'
import sailerActions, { callbackEnum } from './constants/sailerActions'
import { ValueOf } from './common'

type Result = {
  type: ValueOf<typeof callbackEnum>
  callbackId: string
  result: { ok: boolean; data?: any; message?: string }
}

const webContentId = ipcRenderer.sendSync('get-web-contentId')

const callbackMap = new Map<
  string,
  { successCallback: (...args: any[]) => void; failCallback: (...args: any[]) => void }
>()

const nativeCall = (
  action: string,
  params: any,
  successCallback: (...args: any[]) => void,
  failCallback: (...args: any[]) => void
) => {
  const callbackId = `${action}_${+new Date()}`
  callbackMap.set(callbackId, { successCallback, failCallback })
  ipcRenderer.invoke(action, { callbackId, params }).then((res: Result) => {
    const type = res.type
    const callbackId = res.callbackId
    const result = res.result
    const callback = callbackMap.get(callbackId)

    if (type === callbackEnum.SUCCESS) {
      callback?.successCallback(result)
    } else {
      callback?.failCallback(result)
    }
  })
}

contextBridge.exposeInMainWorld('Sailer', {
  getUserInfo() {
    return { token: '', uid: '', appver: '' }
  },
  nativeCall,
  on(event: string, callback: (...args: any[]) => void) {
    ipcRenderer.on(event, (event, ...args) => {
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
    return {
      ...obj,
      [key]: ({
        params = undefined,
        successCallback = (result: { ok: boolean; data: any }) => {
          console.log('success=', result.data)
        },
        failCallback = (error: { ok: boolean; data: any }) => {
          console.log('fail=', error.data)
        },
      } = {}) => nativeCall(key, params, successCallback, failCallback),
    }
  }, {}),
})

ipcRenderer.on('ready', () => {
  console.log('ready')
})
