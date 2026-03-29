import type { FieldConfig } from '@/types'

export const propostaFatturaFields: FieldConfig[] = [
    { key: 'numero',        label: 'Numero',  type: 'text',   readonlyOn: ['modifica', 'visualizza'] },
    { key: 'importoTotale', label: 'Importo', type: 'number', required: true },
    { key: 'stato',         label: 'Stato',   type: 'select', options: [
        { label: 'Bozza',    value: 'BOZZA' },
        { label: 'Emessa',   value: 'EMESSA' },
        { label: 'Pagata',   value: 'PAGATA' },
        { label: 'Annullata',value: 'ANNULLATA' },
    ]},
]