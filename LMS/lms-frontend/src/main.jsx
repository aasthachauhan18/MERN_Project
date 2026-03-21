import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import Main_Route from './Routes/Main_Route'
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Main_Route/>
  </BrowserRouter>
)
