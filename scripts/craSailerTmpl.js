const fs = require('fs')
const yargs = require('yargs/yargs')
const path = require('path')

const args = yargs(process.argv.slice(2)).parse()

const actionName = args?.name

if (!actionName) {
  console.error(`please input name,like 'yarn craSailer --name example'`)
  process.exit(0)
}

const templateContent = `import type { BrowserWindow } from 'electron'
import actions, { callbackType } from '@/constants/sailerActions'
import type { ElementType } from '@/common'

const event: ElementType<typeof actions> = '${actionName}'

export function ipcHandleSailer${actionName.charAt(0).toUpperCase()}${actionName.slice(1)}(win: BrowserWindow) {
  win.webContents.ipc.on(event, async (e, ...args: any[]) => {
    const callbackId = args[0]
    const params = args[1]
    win.webContents.send(event, { type: callbackType.SUCCESS, callbackId, result: { ok: false, message: 'todo' } })
  })
}
`

function createTemplateFile(filename, templateContent, flag = 'wx') {
  fs.writeFile(filename, templateContent, { flag }, (err) => {
    if (err) {
      console.error(`Error creating template file: ${err.message}`)
    } else {
      console.log(`Template file "${filename}" created successfully.`)
    }
  })
}

function editIndex() {
  const filename = path.join(__dirname, '../src/electron-main/ipcHandler/index.ts')
  fs.readFile(filename, 'utf8', (err, data) => {
    const content = `${data.replace(/\n$/, '')}\nexport { ipcHandleSailer${actionName
      .charAt(0)
      .toUpperCase()}${actionName.slice(1)} } from './sailer/${actionName}'
`

    createTemplateFile(filename, content, 'w')
  })
}

const filename = `${path.join(__dirname, '../src/electron-main/ipcHandler/sailer')}/${actionName}.ts`

createTemplateFile(filename, templateContent)

editIndex()
