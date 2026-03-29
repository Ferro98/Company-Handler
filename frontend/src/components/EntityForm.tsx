import { useState } from 'react'
import { Button } from '@/components/ui/button'
import type { FieldConfig } from '@/types'

type Modo = 'inserisci' | 'modifica' | 'visualizza'

type ContestoPadre = {
    titolo: string
    campi: { label: string; valore: string }[]
}

type Props = {
    fields: FieldConfig[]
    modo: Modo
    dati?: Record<string, unknown>
    onChiudi: () => void
    onSalva?: (dati: Record<string, unknown>) => void
    contestoPadre?: ContestoPadre
}

export default function EntityForm({ fields, modo, dati, onChiudi, onSalva, contestoPadre }: Props) {
    const [formData, setFormData] = useState<Record<string, unknown>>(dati ?? {})

    // filtra i campi da mostrare in base al modo
    const campiVisibili = fields.filter(f =>
        !f.showOn || f.showOn.includes(modo)
    )

    function handleChange(key: string, value: unknown) {
        setFormData(prev => ({ ...prev, [key]: value }))
    }

    function renderCampo(field: FieldConfig) {
        const valore = formData[field.key] ?? ''
        const isReadonly = modo === 'visualizza' || field.readonlyOn?.includes(modo)

        const baseClass = "border border-slate-300 rounded px-3 py-1.5 text-sm w-full"
        const readonlyClass = isReadonly ? "bg-slate-50 text-slate-500 cursor-not-allowed" : ""

        switch (field.type) {
            case 'select':
                return (
                    <select
                        value={String(valore)}
                        disabled={isReadonly}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                        className={`${baseClass} ${readonlyClass}`}
                    >
                        {field.options?.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                )
            case 'number':
                return (
                    <input
                        type="number"
                        value={String(valore)}
                        readOnly={isReadonly}
                        tabIndex={isReadonly ? -1 : undefined}
                        onChange={(e) => handleChange(field.key, Number(e.target.value))}
                        className={`${baseClass} ${readonlyClass}`}
                    />
                )
            default:
                return (
                    <input
                        type="text"
                        value={String(valore)}
                        readOnly={isReadonly}
                        tabIndex={isReadonly ? -1 : undefined}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                        className={`${baseClass} ${readonlyClass}`}
                    />
                )
        }
    }

    return (
        <div className="flex flex-col gap-4">
            {contestoPadre && (
                <fieldset className="border border-slate-300 rounded px-3 pt-1 pb-3 mb-4 mt-2">
                    <legend className="text-xs text-slate-400 px-1">{contestoPadre.titolo}</legend>
                    {contestoPadre.campi.map(campo => (
                        <p key={campo.label} className="text-xs text-slate-600 mt-1">
                            <span className="text-slate-400">{campo.label}: </span>
                            {campo.valore}
                        </p>
                    ))}
                </fieldset>
            )}
            {campiVisibili.map(field => (
                <div key={field.key} className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-slate-600">
                        {field.label}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    {renderCampo(field)}
                </div>
            ))}

            <div className="flex justify-end gap-2 mt-2 pt-4 border-t border-slate-200">
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