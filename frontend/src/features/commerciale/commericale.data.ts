import type { Offerta, Incarico, Articolo, PropostaFattura } from "../../types"

export function fetchOfferte(): Promise<Offerta[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, numero: 'OFF-2025-001', cliente: 'Rossi Srl', stato: 'ACCETTATA', totale: 12400 },
        { id: 2, numero: 'OFF-2025-002', cliente: 'Bianchi SpA', stato: 'BOZZA', totale: 5200 },
        { id: 3, numero: 'OFF-2025-003', cliente: 'Verdi Ltd', stato: 'INVIATA', totale: 8700 },
      ])
    }, 500)
  })
}

export function fetchIncarichi(offertaId?: number): Promise<Incarico[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, numero: 'INC-2025-001', offertaId: 1, responsabile: 'Mario Verdi', stato: 'IN_CORSO'as const },
        { id: 2, numero: 'INC-2025-002', offertaId: 1, responsabile: 'Anna Belli', stato: 'APERTO'as const },
        { id: 3, numero: 'INC-2025-003', offertaId: 2, responsabile: 'Luca Neri', stato: 'APERTO'as const },
      ].filter(i => offertaId === undefined || i.offertaId === offertaId))
    }, 500)
  })
}

export function fetchArticoli(incaricoId?: number): Promise<Articolo[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, incaricoId: 1, codice: 'ART-001', quantita: 2, prezzoUnitario: 150 },
        { id: 2, incaricoId: 1, codice: 'ART-002', quantita: 1, prezzoUnitario: 80 },
        { id: 3, incaricoId: 2, codice: 'ART-003', quantita: 5, prezzoUnitario: 40 },
      ].filter(a => incaricoId === undefined || a.incaricoId === incaricoId))
    }, 500)
  })
}

export function fetchProposteFattura(incaricoId?: number): Promise<PropostaFattura[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, incaricoId: 1, numero: 'PF-2025-001', stato: 'EMESSA' as const, importoTotale: 380 },
        { id: 2, incaricoId: 1, numero: 'PF-2025-002', stato: 'BOZZA' as const, importoTotale: 200 },
        { id: 3, incaricoId: 2, numero: 'PF-2025-003', stato: 'BOZZA' as const, importoTotale: 120 },
      ].filter(p => incaricoId === undefined || p.incaricoId === incaricoId))
    }, 500)
  })
}