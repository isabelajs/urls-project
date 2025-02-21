import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Button } from '@isabelajs/design-system'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    
    <Button
      onClick={() => {}}
      text="Botón Primario"
      variant="primary"
    />
  </StrictMode>,
)
