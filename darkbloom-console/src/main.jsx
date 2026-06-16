import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App, { ShellLayout, BareLayout } from './App.jsx'

import Chat from './components/views/Chat.jsx'
import NetworkStats from './components/views/NetworkStats.jsx'
import ActiveModels from './components/views/ActiveModels.jsx'
import ProviderDashboard from './components/views/ProviderDashboard.jsx'
import Earn from './components/views/Earn.jsx'
import ApiConsole from './components/views/ApiConsole.jsx'
import Billing from './components/views/Billing.jsx'
import Settings from './components/views/Settings.jsx'
import Login from './components/views/Login.jsx'
import Link from './components/views/Link.jsx'

import './styles/tokens.css'
import './styles/base.css'
import './styles/components.css'
import './styles/charts.css'
import './styles/views.css'
import './styles/app-shell.css'
import './styles/forms-modals.css'
import './styles/trust.css'
import './styles/chat.css'
import './styles/api.css'
import './styles/billing.css'
import './styles/earn.css'
import './styles/fleet.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: <ShellLayout />,
        children: [
          { index: true, element: <Chat /> },
          { path: 'stats', element: <NetworkStats /> },
          { path: 'models', element: <ActiveModels /> },
          { path: 'providers', element: <ProviderDashboard /> },
          { path: 'earn', element: <Earn /> },
          { path: 'api', element: <ApiConsole /> },
          { path: 'billing', element: <Billing /> },
          { path: 'settings', element: <Settings /> },
        ],
      },
      {
        element: <BareLayout />,
        children: [
          { path: 'login', element: <Login /> },
          { path: 'link', element: <Link /> },
        ],
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
