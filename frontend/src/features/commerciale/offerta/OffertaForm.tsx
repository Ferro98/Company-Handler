import { Button } from '@/components/ui/button'
import type { Offerta } from '@/types'
import { useState } from 'react'

type Props = {
    modo: 'inserisci' | 'modifica' | 'visualizza'
    dati?: Offerta
    onChiudi: () => void
    onSalva?: (dati: Offerta) => void
}

export default function OffertaForm({ modo, dati, onChiudi, onSalva }: Props) {
    const [formData, setFormData] = useState<Offerta>(
        dati ?? { id: 0, numero: '', cliente: '', stato: 'BOZZA', totale: 0 }
    )

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-slate-600">Cliente</label>
                <input
                    type="text"
                    value={formData.cliente}
                    onChange={(e) => setFormData({ ...formData, cliente: e.target.value })}
                    readOnly={modo === 'visualizza'}
                    className="border border-slate-300 rounded px-3 py-1.5 text-sm"
                />
            </div>
            <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-slate-600">Stato</label>
                <select
                    value={formData.stato}
                    onChange={(e) => setFormData({ ...formData, stato: e.target.value as Offerta['stato'] })}
                    disabled={modo === 'visualizza'}
                    className="border border-slate-300 rounded px-3 py-1.5 text-sm"
                >
                    <option>BOZZA</option>
                    <option>INVIATA</option>
                    <option>ACCETTATA</option>
                    <option>RIFIUTATA</option>
                    <option>ANNULLATA</option>
                </select>
            </div>
            <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-slate-600">Totale</label>
                <input
                    type="number"
                    value={formData.totale}
                    onChange={(e) => setFormData({ ...formData, totale: Number(e.target.value) })}
                    readOnly={modo === 'visualizza'}
                    className="border border-slate-300 rounded px-3 py-1.5 text-sm"
                />
            </div>
            <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-slate-200">
                {modo === 'visualizza' ? (
                    <Button variant="outline" onClick={onChiudi}>Chiudi</Button>
                ) : (
                    <>
                        <Button variant="outline" onClick={onChiudi}>Annulla</Button>
                        <Button onClick={() => onSalva?.(formData)}>
                            {modo === 'inserisci' ? 'Salva' : 'Aggiorna'}
                        </Button>
                    </>
                )}
            </div>
        </div>
    )
}