import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import Router from './Router/Router'
import AuthProvider from './AuthProvider/AuthProvider'

const rootElement = document.getElementById('root') as HTMLElement;

createRoot(rootElement).render(
  <StrictMode>
    <AuthProvider routes={<RouterProvider router={Router} />} />
  </StrictMode>,
)