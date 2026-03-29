import type { FieldConfig } from '@/types'

export const offertaFields: FieldConfig[] = [
    { key: 'numero',  label: 'Numero',  type: 'text',   readonlyOn: ['modifica', 'visualizza'] },
    { key: 'cliente', label: 'Cliente', type: 'text',   required: true },
    { key: 'stato',   label: 'Stato',   type: 'select', options: [
        { label: 'Bozza',     value: 'BOZZA' },
        { label: 'Inviata',   value: 'INVIATA' },
        { label: 'Accettata', value: 'ACCETTATA' },
        { label: 'Rifiutata', value: 'RIFIUTATA' },
        { label: 'Annullata', value: 'ANNULLATA' },
    ]},
    { key: 'totale',  label: 'Totale',  type: 'number' },
]