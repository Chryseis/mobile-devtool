import { BrowserView, BrowserViewConstructorOptions } from 'electron'

export const createSimulator = (options?: BrowserViewConstructorOptions): BrowserView => {
  const view = new BrowserView(options)

  view.setAutoResize({ width: true, height: true })

  return view
}
