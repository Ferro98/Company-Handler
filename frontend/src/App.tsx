import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AnagraficaPage from './pages/AnagraficaPage'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/anagrafica" element={<AnagraficaPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App