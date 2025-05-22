import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ColorModeProvider } from './ColorModeContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ColorModeProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<App />} />
        </Routes>
      </BrowserRouter>
    </ColorModeProvider>
  </StrictMode>,
)
