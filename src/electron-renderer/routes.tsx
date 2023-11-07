import { createHashRouter } from 'react-router-dom'
import DevtoolsPanel from '@/pages/devtoolsPanel'
import ProjectPanel from '@/pages/projectPanel'

const router = createHashRouter([
  { path: '/', element: <ProjectPanel /> },
  { path: '/devtoolsPanel', element: <DevtoolsPanel /> },
])

export default router
