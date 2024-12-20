import AppWithProviders from '@/providers'
import ReactDOM from 'react-dom/client'

const rootElement = document.getElementById('app')!

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(<AppWithProviders />)
}
