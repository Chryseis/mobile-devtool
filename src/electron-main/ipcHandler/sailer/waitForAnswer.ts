import { ipcMain } from 'electron'
import actions, { callbackEnum } from '@/constants/sailerActions'
import type { ElementType } from '@/common'

const event: ElementType<typeof actions> = 'waitForAnswer'

export function ipcHandleSailerWaitForAnswer() {
  ipcMain.handle(event, async (e, ...args: any[]) => {
    const { callbackId, params } = args[0]
    return { type: callbackEnum.SUCCESS, callbackId, result: { returnCode: '0000', returnMsg: '调用成功', data: {} } }
  })
}