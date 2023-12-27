import { ipcMain } from 'electron'
import actions, { callbackEnum } from '@/constants/sailerActions'
import type { ElementType } from '@/common'

const event: ElementType<typeof actions> = 'aliPay'

export function ipcHandleSailerAliPay() {
  ipcMain.handle(event, async (e, ...args: any[]) => {
    const { callbackId, params } = args[0]
    return { type: callbackEnum.SUCCESS, callbackId, result: { ok: false, message: 'todo' } }
  })
}
