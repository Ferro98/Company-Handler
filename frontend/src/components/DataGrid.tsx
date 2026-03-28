// src/components/DataGrid.tsx
export type Colonna<T> = {
    key: keyof T
    label: string
    width?: string
}

type Props<T> = {
    colonne: Colonna<T>[]
    dati: T[]
    onSeleziona?: (riga: T) => void
    rigaSelezionata?: T | null
    caricamento?: boolean
}

export default function DataGrid<T extends { id: number }>({ colonne, dati, onSeleziona, rigaSelezionata, caricamento }: Props<T>) {
    if (caricamento) return <p className="p-4 text-gray-500">Caricamento...</p>

    return (
        <div className="overflow-auto h-full">
            <table className="w-full text-sm border-collapse">
                <thead>
                    <tr className="bg-gray-100 text-left">
                        {colonne.map((col) => (
                            <th key={String(col.key)} className="px-3 py-2 border-b font-medium">
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {dati.map((riga) => (
                        <tr
                            key={riga.id}
                            onClick={() => onSeleziona?.(riga)}
                            className={`cursor-pointer hover:bg-blue-50 border-b ${rigaSelezionata && (rigaSelezionata as any).id === riga.id ? 'bg-blue-100' : ''}`}
                        >
                            {colonne.map((col) => (
                                <td key={String(col.key)} className="px-3 py-2">
                                    {String(riga[col.key])}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}