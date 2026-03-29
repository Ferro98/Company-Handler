import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

type Props = {
    titolo: string
    aperto: boolean
    onChiudi: () => void
    children: React.ReactNode
    larghezza?: 'sm' | 'md' | 'lg' | 'xl'
}

const larghezze = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-2xl'
}

export default function Dialog({ titolo, aperto, onChiudi, children, larghezza = 'md' }: Props) {

    // chiudi con Escape
    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === 'Escape') onChiudi()
        }
        if (aperto) document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [aperto, onChiudi])

    // blocca scroll del body quando aperto
    useEffect(() => {
        document.body.style.overflow = aperto ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [aperto])

    if (!aperto) return null

    return createPortal(
        <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            onClick={onChiudi}  // click fuori chiude
        >
            {/* overlay scuro */}
            <div className="absolute inset-0 bg-black opacity-40" />

            {/* contenuto dialog */}
            <div
                className={`relative bg-white rounded-lg shadow-xl w-full ${larghezze[larghezza]} mx-4 flex flex-col max-h-[90vh]`}
                onClick={(e) => e.stopPropagation()}  // click dentro non chiude
            >
                {/* header */}
                <div className="flex items-center justify-between px-4 py-2 bg-gray-700 rounded-t-lg">
                    <span className="text-sm font-semibold text-white uppercase tracking-wide">{titolo}</span>
                    <button onClick={onChiudi} className="p-1 rounded hover:bg-gray-600 text-white">
                        <X size={14} />
                    </button>
                </div>

                {/* corpo — scrollabile se alto */}
                <div className="overflow-y-auto flex-1 p-4">
                    {children}
                </div>
            </div>
        </div>,
        document.body
    )
}