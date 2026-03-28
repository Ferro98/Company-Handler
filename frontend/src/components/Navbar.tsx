import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function Navbar() {
    const [menuAperto, setMenuAperto] = useState<string | null>(null)
    const [sottomenuAperto, setSottomenuAperto] = useState<string | null>(null)

    function toggleMenu(nome: string, sottomenu?: boolean) {
        sottomenu ? setSottomenuAperto(sottomenuAperto === nome ? null : nome) : setMenuAperto(menuAperto === nome ? null : nome)
    }

    return (
        <nav>
            <div>
                <button onClick={() => toggleMenu('archivio')}>Archivio ▾</button>
                {menuAperto === 'archivio' && (
                    <div>
                        <Link to="/anagrafica">Anagrafica</Link>
                        <div>
                            <button onClick={() => toggleMenu('commerciale', true)}>Settore Commerciale ▾</button>
                            {sottomenuAperto === 'commerciale' && (
                                <div>
                                    <Link to="/listino-articoli">Listino Articoli</Link>
                                    <Link to="/tipi-documento-offerta">Tipi Documento Offerta</Link>
                                    <Link to="/tipi-documento-incarico">Tipi Documento Incarico</Link>
                                </div>
                            )}
                        </div>
                        <Link to="/settore-operativo">Settore Operativo</Link>
                    </div>
                )}
            </div>
        </nav>
    )
}