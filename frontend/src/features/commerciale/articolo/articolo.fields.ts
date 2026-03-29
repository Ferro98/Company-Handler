import type { FieldConfig } from '@/types'

export const articoloFields: FieldConfig[] = [
    { key: 'codice',         label: 'Codice',   type: 'text',   readonlyOn: ['modifica', 'visualizza'] },
    { key: 'quantita',       label: 'Quantità', type: 'number', required: true },
    { key: 'prezzoUnitario', label: 'Prezzo',   type: 'number', required: true },
]