import { BrowserView, BrowserViewConstructorOptions, BrowserWindow, WebContents, webContents } from 'electron'
import isDev from 'electron-is-dev'
import path from 'path'
import { createSimulator } from './simulator'

export const createDevtoolsPanel = async (
  win: BrowserWindow,
  options?: BrowserViewConstructorOptions
): Promise<BrowserView> => {
  const [width, height] = win.getSize()

  const view = new BrowserView({
    ...options,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, '../preload.js'),
      webviewTag: true,
    },
  })

  const panelWebContents = view.webContents

  view.setAutoResize({ width: true, height: true })

  await panelWebContents.loadURL(
    isDev ? 'http://localhost:3000/#devtoolsPanel' : `file://${path.join(__dirname, '../build/index.html')}`
  )

  win.addBrowserView(view)

  view.setBounds({
    x: 0,
    y: 0,
    width,
    height,
  })

  panelWebContents.ipc.on('set-devtools', (e, { rect, src, devtoolsContentId, device }) => {
    console.log(rect, device, src, devtoolsContentId)
    const devtoolsContents = webContents.fromId(devtoolsContentId) as WebContents
    const { x, y, width, height } = rect
    console.log('set-devtools', x, y, width, height)
    const simulatorView = createSimulator()

    simulatorView.webContents.loadURL(src)

    win.addBrowserView(simulatorView)

    simulatorView.setBounds({ x: 140, y: 157, width: 375, height: 667 })

    if (devtoolsContents) {
      simulatorView.webContents.setDevToolsWebContents(devtoolsContents)
      simulatorView.webContents.openDevTools()
    }
  })

  if (isDev) {
    panelWebContents.openDevTools({ mode: 'detach' })
  }

  return view
}
