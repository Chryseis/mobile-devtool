import { ipcMain } from 'electron'
import actions, { callbackEnum } from '@/constants/sailerActions'
import type { ElementType } from '@/common'

const event: ElementType<typeof actions> = 'copyWord'

export function ipcHandleSailerCopyWord() {
  ipcMain.handle(event, async (e, ...args: any[]) => {
    const { callbackId, params } = args[0]
    return { type: callbackEnum.SUCCESS, callbackId, result: { ok: false, message: 'todo' } }
  })
}
