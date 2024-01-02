import { ipcMain } from 'electron'
import actions, { callbackEnum } from '@/constants/sailerActions'
import type { ElementType } from '@/common'

const event: ElementType<typeof actions> = 'open'

export function ipcHandleSailerOpen() {
  ipcMain.handle(event, async (e, ...args: any[]) => {
    const hostWebContents = e.sender.hostWebContents
    const { callbackId, params } = args[0]
    hostWebContents.send('sailer-event', { event, ...params })

    return { type: callbackEnum.SUCCESS, callbackId, result: { returnCode: '0000', returnMsg: '调用成功', data: {} } }
  })
}
