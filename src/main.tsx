if (import.meta.env.DEV) {
  import("react-grab");
  import("react-scan").then(({ scan }) => scan({ enabled: true }));
}

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/baloo-2'
import '@fontsource/baloo-bhai-2'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
