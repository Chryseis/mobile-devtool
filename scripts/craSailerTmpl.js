const fs = require('fs')
const yargs = require('yargs/yargs')
const path = require('path')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const generate = require('@babel/generator').default
const template = require('@babel/template').default

const args = yargs(process.argv.slice(2)).parse()

const actionName = args?.name

if (!actionName) {
  console.error(`please input name,like 'yarn craSailer --name example'`)
  process.exit(0)
}

const templateContent = `import { ipcMain } from 'electron'
import actions, { callbackEnum } from '@/constants/sailerActions'
import type { ElementType } from '@/common'

const event: ElementType<typeof actions> = '${actionName}'

export function ipcHandleSailer${actionName.charAt(0).toUpperCase()}${actionName.slice(1)}() {
  ipcMain.handle(event, async (e, ...args: any[]) => {
    const { callbackId, params } = args[0]
    return { type: callbackEnum.SUCCESS, callbackId, result: { ok: false, message: 'todo' } }
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
  const filename = path.join(__dirname, '../src/electron-main/ipcHandler/sailer/index.ts')
  fs.readFile(filename, 'utf8', (err, data) => {
    const ast = parser.parse(data, { sourceType: 'module' })

    traverse(ast, {
      enter(path) {
        const body = path.get('body')

        const importDeclarationPaths = body.filter((statement) => statement.isImportDeclaration())

        const lastImportDeclarationPath = importDeclarationPaths[importDeclarationPaths.length - 1]

        const importStatement = template.ast(
          `import { ipcHandleSailer${actionName.charAt(0).toUpperCase()}${actionName.slice(1)} } from './${actionName}'`
        )

        lastImportDeclarationPath.insertAfter(importStatement)

        const exportDeclarationPaths = body.filter((statement) => statement.isExportDeclaration())

        const lastExportDeclarationPath = exportDeclarationPaths[exportDeclarationPaths.length - 1]

        const expressionPaths = lastExportDeclarationPath.get('declaration').get('body').get('body')

        const expressionPath = expressionPaths[expressionPaths.length - 1]

        const expressStatement = template.ast(
          `ipcHandleSailer${actionName.charAt(0).toUpperCase()}${actionName.slice(1)}()`
        )

        expressionPath.insertAfter(expressStatement)

        path.stop()
      },
    })

    createTemplateFile(filename, generate(ast).code, 'w')
  })
}

const filename = `${path.join(__dirname, '../src/electron-main/ipcHandler/sailer')}/${actionName}.ts`

createTemplateFile(filename, templateContent)

editIndex()
