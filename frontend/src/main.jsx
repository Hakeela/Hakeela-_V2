import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

// Apply saved theme before render to avoid a flash of the wrong theme.
// Light is the default when the user has not explicitly chosen a theme.
;(() => {
  const saved = localStorage.getItem('theme')
  const theme = saved === 'light' || saved === 'dark' ? saved : 'light'
  document.documentElement.setAttribute('data-theme', theme)
})()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
