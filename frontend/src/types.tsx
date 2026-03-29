export type Anagrafica = {
    id: number
    nome: string
    cognome: string
}

export const anagraficaVuota: Anagrafica = {
    id: 0,
    nome: '',
    cognome: ''
}

export type Offerta = {
    id: number
    numero: string
    cliente: string
    stato: 'BOZZA' | 'INVIATA' | 'ACCETTATA' | 'RIFIUTATA' | 'ANNULLATA'
    totale: number
}

export type Incarico = {
    id: number
    numero: string
    offertaId: number
    responsabile: string
    stato: 'APERTO' | 'IN_CORSO' | 'COMPLETATO' | 'ANNULLATO'
}

export type Articolo = {
    id: number
    incaricoId: number
    codice: string
    quantita: number
    prezzoUnitario: number
}

export type PropostaFattura = {
    id: number
    incaricoId: number
    numero: string
    stato: 'BOZZA' | 'EMESSA' | 'PAGATA' | 'ANNULLATA'
    importoTotale: number
}

export type FieldConfig = {
    key: string
    label: string
    type: 'text' | 'number' | 'select' | 'date' | 'checkbox'
    required?: boolean
    readonlyOn?: ('inserisci' | 'modifica' | 'visualizza')[]
    showOn?: ('inserisci' | 'modifica' | 'visualizza')[]
    options?: { label: string; value: string }[]  // solo per select
}