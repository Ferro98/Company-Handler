import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AnagraficaPage from './pages/AnagraficaPage'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'
import ListinoArticoliPage from './pages/ListinoArticoliPage'
import TipiDocumentoOffertaPage from './pages/TipiDocumentoOffertaPage'
import TipiDocumentoIncaricoPage from './pages/TipiDocumentoIncaricoPage'
import SettoreOperativoPage from './pages/SettoreOperativoPage'

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/anagrafica" element={<AnagraficaPage />} />
                <Route path="/listino-articoli" element={<ListinoArticoliPage />} />
                <Route path="/tipi-documento-offerta" element={<TipiDocumentoOffertaPage />} />
                <Route path="/tipi-documento-incarico" element={<TipiDocumentoIncaricoPage />} />
                <Route path="/settore-operativo" element={<SettoreOperativoPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App