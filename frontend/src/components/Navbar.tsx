import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Navbar() {
    const [menuAperto, setMenuAperto] = useState<string | null>(null)
    const [sottomenuAperto, setSottomenuAperto] = useState<string | null>(null)

    useEffect(() => {
        function handleClickFuori(e: MouseEvent) {
            const nav = document.querySelector('nav')
            if (nav && !nav.contains(e.target as Node)) {
                setMenuAperto(null)
                setSottomenuAperto(null)
            }
        }

        document.addEventListener('click', handleClickFuori)

        return () => {
            document.removeEventListener('click', handleClickFuori)
        }
    }, [])

    function toggleMenu(nome: string, sottomenu?: boolean) {
        sottomenu ? setSottomenuAperto(sottomenuAperto === nome ? null : nome) : setMenuAperto(menuAperto === nome ? null : nome)
    }

    return (
        <nav className="bg-gray-900 text-white px-6 py-3 flex gap-6 relative">
            <div className="relative">
                <button
                    onClick={() => toggleMenu('archivio')}
                    className="hover:text-gray-300 transition-colors"
                >
                    Archivio ▾
                </button>
                {menuAperto === 'archivio' && (
                    <div className="absolute top-full left-0 bg-gray-800 mt-1 rounded shadow-lg min-w-48 z-50">
                        <Link to="/anagrafica" className="block px-4 py-2 hover:bg-gray-700">
                            Anagrafica
                        </Link>
                        <div className='relative'>
                            <button
                                onClick={() => toggleMenu('commerciale', true)}
                                className="w-full text-left px-4 py-2 hover:bg-gray-700"
                            >
                                Archivio Commerciale ▾
                            </button>
                            {sottomenuAperto === 'commerciale' && (
                                <div className="absolute left-full top-0 bg-gray-700 rounded shadow-lg min-w-48 z-50">
                                    <Link to="/listino-articoli" className="block px-4 py-2 hover:bg-gray-600">
                                        Listino Articoli
                                    </Link>
                                    <Link to="/tipi-documento-offerta" className="block px-4 py-2 hover:bg-gray-600">
                                        Tipi Documento Offerta
                                    </Link>
                                    <Link to="/tipi-documento-incarico" className="block px-4 py-2 hover:bg-gray-600">
                                        Tipi Documento Incarico
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}


            </div>
            <Link to="/commerciale" className="block px-4 py-2 hover:bg-gray-700">
                Settore Commerciale
            </Link>

            <Link to="/settore-operativo" className="block px-4 py-2 hover:bg-gray-700">
                Settore Operativo
            </Link>
        </nav>
    )
}