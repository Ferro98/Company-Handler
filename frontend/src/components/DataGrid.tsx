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
    onSeleziona?: (riga: T) => void
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

            {/* TOOLBAR */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border-b border-gray-300">
                <span className="font-medium text-sm text-gray-700 mr-2">{titolo}</span>
                <span className="text-xs text-gray-400 mr-auto">{datiFiltrati.length} record</span>

                <button title="Inserisci" onClick={onInserisci} className="p-1.5 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40">
                    <Plus size={14} />
                </button>
                <button title="Visualizza" disabled={!hasSelezione} onClick={() => selezionata && onVisualizza?.(selezionata)} className="p-1.5 rounded border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-40">
                    <Eye size={14} />
                </button>
                <button title="Modifica" disabled={!hasSelezione} onClick={() => selezionata && onModifica?.(selezionata)} className="p-1.5 rounded border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-40">
                    <Pencil size={14} />
                </button>
                <button title="Elimina" disabled={!hasSelezione} onClick={() => selezionata && onElimina?.(selezionata)} className="p-1.5 rounded border border-red-300 text-red-600 bg-white hover:bg-red-50 disabled:opacity-40">
                    <Trash2 size={14} />
                </button>
                {operazioniExtra && operazioniExtra.length > 0 && (
                    <div className="relative">
                        <button
                            title="Altre operazioni"
                            disabled={!hasSelezione}
                            onClick={() => setMenuApertoId(menuApertoId === -1 ? null : -1)}
                            className="p-1.5 rounded border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-40"
                        >
                            <MoreHorizontal size={14} />
                        </button>
                        {menuApertoId === -1 && hasSelezione && (
                            <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded shadow-lg z-10 min-w-40">
                                {operazioniExtra.map((op) => (
                                    <button
                                        key={op.label}
                                        onClick={() => {
                                            selezionata && op.onClick(selezionata)
                                            setMenuApertoId(null)
                                        }}
                                        className="block w-full text-left px-4 py-2 text-xs hover:bg-gray-50"
                                    >
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
                            <tr className="bg-blue-700 text-white">
                                {colonne.map((col) => (
                                    <th
                                        key={String(col.key)}
                                        style={{ width: col.width ?? 150 }}
                                        className="px-3 py-1 text-left text-xs font-semibold border-r border-blue-600 last:border-r-0 cursor-pointer select-none"
                                        onClick={() => setColonnaFiltroAttiva(colonnaFiltroAttiva === String(col.key) ? null : String(col.key))}
                                    >
                                        <div className="flex items-center gap-1">
                                            {col.label}
                                            <Filter size={10} className="opacity-50" />
                                        </div>
                                        {colonnaFiltroAttiva === String(col.key) && (
                                            <input
                                                autoFocus
                                                type="text"
                                                value={filtri[String(col.key)] ?? ''}
                                                onChange={(e) => handleFiltro(String(col.key), e.target.value)}
                                                onClick={(e) => e.stopPropagation()}
                                                className="mt-1 w-full text-xs px-1 py-0.5 border border-blue-300 rounded font-normal"
                                            />
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
                                        onClick={() => onSeleziona?.(riga)}
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