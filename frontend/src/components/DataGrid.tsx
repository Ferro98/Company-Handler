import { useState } from "react"
import { Plus, Eye, Pencil, Trash2, MoreHorizontal, Filter } from 'lucide-react'

export type Colonna<T> = {
    key: keyof T
    label: string
    width?: number  // larghezza in px, fissa
}

export type OperazioneExtra<T> = {
    label: string
    onClick: (riga: T) => void
}

type Props<T> = {
    titolo: string
    colonne: Colonna<T>[]
    dati: T[]
    onSeleziona?: (riga: T | null) => void
    rigaSelezionata?: T | null
    caricamento?: boolean
    onInserisci?: () => void
    onModifica?: (riga: T) => void
    onVisualizza?: (riga: T) => void
    onElimina?: (riga: T) => void
    operazioniExtra?: OperazioneExtra<T>[]
}

export default function DataGrid<T extends { id: number }>({
    titolo,
    colonne,
    dati,
    onSeleziona,
    rigaSelezionata,
    caricamento,
    onInserisci,
    onModifica,
    onVisualizza,
    onElimina,
    operazioniExtra
}: Props<T>) {
    const [filtri, setFiltri] = useState<Record<string, string>>({})
    const [menuApertoId, setMenuApertoId] = useState<number | null>(null)
    const [colonnaFiltroAttiva, setColonnaFiltroAttiva] = useState<string | null>(null)

    const datiFiltrati = dati.filter((riga) =>
        colonne.every((col) => {
            const filtro = filtri[String(col.key)]
            if (!filtro) return true
            return String(riga[col.key]).toLowerCase().includes(filtro.toLowerCase())
        })
    )

    const selezionata = rigaSelezionata ?? null
    const hasSelezione = selezionata !== null

    function handleFiltro(key: string, valore: string) {
        setFiltri(prev => ({ ...prev, [key]: valore }))
    }

    return (
        <div className="flex flex-col border border-gray-300 rounded-lg overflow-hidden bg-white h-full">

            {/* RIGA 1: titolo + contatore */}
            <div className="flex items-center justify-center gap-2 px-3 py-1 bg-gray-700 border-b border-gray-600">
                <span className="font-semibold text-xs text-white tracking-wide uppercase">{titolo}</span>
                <span className="text-xs bg-gray-500 text-white rounded-full px-2">{datiFiltrati.length}</span>
            </div>

            {/* RIGA 2: bottoni azioni */}
            <div className="flex items-center gap-1 px-2 py-0.5 bg-gray-50 border-b border-gray-300">
                <button title="Inserisci" onClick={onInserisci} className="p-1 rounded bg-blue-600 text-white hover:bg-blue-700">
                    <Plus size={12} />
                </button>
                <button title="Visualizza" disabled={!hasSelezione} onClick={() => selezionata && onVisualizza?.(selezionata)} className="p-1 rounded border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-40">
                    <Eye size={12} />
                </button>
                <button title="Modifica" disabled={!hasSelezione} onClick={() => selezionata && onModifica?.(selezionata)} className="p-1 rounded border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-40">
                    <Pencil size={12} />
                </button>
                <button title="Elimina" disabled={!hasSelezione} onClick={() => selezionata && onElimina?.(selezionata)} className="p-1 rounded border border-red-300 text-red-600 bg-white hover:bg-red-50 disabled:opacity-40">
                    <Trash2 size={12} />
                </button>
                {operazioniExtra && operazioniExtra.length > 0 && (
                    <div className="relative">
                        <button title="Altre operazioni" disabled={!hasSelezione} onClick={() => setMenuApertoId(menuApertoId === -1 ? null : -1)} className="p-1 rounded border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-40">
                            <MoreHorizontal size={12} />
                        </button>
                        {menuApertoId === -1 && hasSelezione && (
                            <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded shadow-lg z-10 min-w-40">
                                {operazioniExtra.map((op) => (
                                    <button key={op.label} onClick={() => { selezionata && op.onClick(selezionata); setMenuApertoId(null) }} className="block w-full text-left px-4 py-2 text-xs hover:bg-gray-50">
                                        {op.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* TABELLA */}
            {caricamento ? (
                <p className="p-4 text-sm text-gray-400">Caricamento...</p>
            ) : (
                <div className="overflow-auto flex-1">
                    <table className="text-sm border-collapse" style={{ tableLayout: 'fixed', width: colonne.reduce((acc, c) => acc + (c.width ?? 150), 0) }}>
                        {/* HEADER */}
                        <thead className="sticky top-0 z-10">
                            <tr className="bg-gray-600 text-white">
                                {colonne.map((col) => (
                                    <th
                                        key={String(col.key)}
                                        style={{ width: col.width ?? 150, height: 28 }}
                                        className="px-2 border-r border-gray-500 last:border-r-0 cursor-pointer select-none align-middle"
                                        onClick={() => setColonnaFiltroAttiva(colonnaFiltroAttiva === String(col.key) ? null : String(col.key))}
                                    >
                                        {colonnaFiltroAttiva === String(col.key) ? (
                                            <input
                                                autoFocus
                                                type="text"
                                                value={filtri[String(col.key)] ?? ''}
                                                onChange={(e) => handleFiltro(String(col.key), e.target.value)}
                                                onClick={(e) => e.stopPropagation()}
                                                onBlur={() => setColonnaFiltroAttiva(null)}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Escape') setColonnaFiltroAttiva(null)
                                                    e.stopPropagation()
                                                }}
                                                style={{ width: (col.width ?? 150) - 16, height: 16 }}
                                                className="w-full text-xs px-1 py-0 bg-gray-800 text-white border-b border-white outline-none placeholder-gray-400 box-border"
                                                placeholder={col.label}
                                            />
                                        ) : (
                                            <div className="flex items-center gap-1 text-xs font-semibold text-white">
                                                {col.label}
                                                {filtri[String(col.key)] && <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 inline-block" />}
                                                <Filter size={9} className="opacity-50 ml-auto" />
                                            </div>
                                        )}
                                    </th>
                                ))}
                            </tr>

                        </thead>

                        {/* BODY */}
                        <tbody>
                            {datiFiltrati.map((riga, idx) => {
                                const isSelezionata = selezionata?.id === riga.id
                                return (
                                    <tr
                                        key={riga.id}
                                        onClick={() => {
                                            if (rigaSelezionata && (rigaSelezionata as any).id === riga.id) {
                                                onSeleziona?.(null as any)  // deseleziona
                                            } else {
                                                onSeleziona?.(riga)
                                            }
                                        }}
                                        className={`cursor-pointer border-b border-gray-100 
                                            ${isSelezionata ? 'bg-blue-100 font-medium' : idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                                            hover:bg-blue-50`}
                                    >
                                        {colonne.map((col) => (
                                            <td
                                                key={String(col.key)}
                                                className="px-3 py-1 border-r border-gray-100 last:border-r-0 truncate"
                                            >
                                                {String(riga[col.key])}
                                            </td>
                                        ))}
                                    </tr>
                                )
                            })}
                            {datiFiltrati.length === 0 && (
                                <tr>
                                    <td colSpan={colonne.length} className="px-3 py-6 text-center text-xs text-gray-400">
                                        Nessun record
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}