import AppWithProviders from '@/providers'
import ReactDOM from 'react-dom/client'

import '@/styles/index.css'
import '@fontsource/geist-sans'

const rootElement = document.getElementById('app')!

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(<AppWithProviders />)
}
