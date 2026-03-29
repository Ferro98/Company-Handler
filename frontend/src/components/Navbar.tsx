import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

export default function Navbar() {
    const [menuAperto, setMenuAperto] = useState<string | null>(null)
    const [sottomenuAperto, setSottomenuAperto] = useState<string | null>(null)
    const navRef = useRef<HTMLElement>(null)

    useEffect(() => {
        function handleClickFuori(e: MouseEvent) {
            if (navRef.current && !navRef.current.contains(e.target as Node)) {
                setMenuAperto(null)
                setSottomenuAperto(null)
            }
        }
        document.addEventListener('click', handleClickFuori, true)  // true = capture phase
        return () => document.removeEventListener('click', handleClickFuori, true)
    }, [])

    function toggleMenu(nome: string, sottomenu?: boolean) {
        if (sottomenu) {
            setSottomenuAperto(sottomenuAperto === nome ? null : nome)
        } else {
            if (menuAperto === nome) {
                setMenuAperto(null)
                setSottomenuAperto(null)
            } else {
                setMenuAperto(nome)
                setSottomenuAperto(null)
            }
        }
    }

    function chiudiTutto() {
        setMenuAperto(null)
        setSottomenuAperto(null)
    }

    return (
        <nav ref={navRef} className="bg-slate-900 text-white px-6 h-12 flex items-center gap-1 relative shadow-md">
            <div className="relative">
                <button onClick={() => toggleMenu('archivio')} className="h-12 px-4 text-sm hover:bg-slate-700 transition-colors flex items-center gap-1">
                    Archivio <span className="text-xs opacity-60">▾</span>
                </button>
                {menuAperto === 'archivio' && (
                    <div className="absolute top-full left-0 bg-gray-800 mt-1 rounded shadow-lg min-w-48 z-50">
                        <Link to="/anagrafica" onClick={chiudiTutto} className="block px-4 py-2 hover:bg-gray-700 text-sm">
                            Anagrafica
                        </Link>
                        <div className="relative">
                            <button onClick={() => toggleMenu('commerciale', true)} className="w-full text-left px-4 py-2 hover:bg-gray-700 text-sm">
                                Archivio Commerciale <span className="text-xs opacity-60">▾</span>
                            </button>
                            {sottomenuAperto === 'commerciale' && (
                                <div className="absolute left-full top-0 bg-gray-700 rounded shadow-lg min-w-48 z-50">
                                    <Link to="/listino-articoli" onClick={chiudiTutto} className="block px-4 py-2 hover:bg-gray-600 text-sm">Listino Articoli</Link>
                                    <Link to="/tipi-documento-offerta" onClick={chiudiTutto} className="block px-4 py-2 hover:bg-gray-600 text-sm">Tipi Documento Offerta</Link>
                                    <Link to="/tipi-documento-incarico" onClick={chiudiTutto} className="block px-4 py-2 hover:bg-gray-600 text-sm">Tipi Documento Incarico</Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <div className="w-px h-5 bg-slate-600 mx-1" />

            <Link to="/commerciale" onClick={chiudiTutto} className="h-12 px-4 text-sm hover:bg-slate-700 transition-colors flex items-center">
                Settore Commerciale
            </Link>

            <div className="w-px h-5 bg-slate-600 mx-1" />

            <Link to="/settore-operativo" onClick={chiudiTutto} className="h-12 px-4 text-sm hover:bg-slate-700 transition-colors flex items-center">
                Settore Operativo
            </Link>
        </nav>
    )
}