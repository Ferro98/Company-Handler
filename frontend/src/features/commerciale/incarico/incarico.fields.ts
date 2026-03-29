import type { FieldConfig } from '@/types'

export const incaricoFields: FieldConfig[] = [
    { key: 'numero',       label: 'Numero',       type: 'text',   readonlyOn: ['modifica', 'visualizza'] },
    { key: 'responsabile', label: 'Responsabile', type: 'text',   required: true },
    { key: 'stato',        label: 'Stato',        type: 'select', options: [
        { label: 'Aperto',     value: 'APERTO' },
        { label: 'In corso',   value: 'IN_CORSO' },
        { label: 'Completato', value: 'COMPLETATO' },
        { label: 'Annullato',  value: 'ANNULLATO' },
    ]},
]