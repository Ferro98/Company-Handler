import type { Anagrafica } from "../../types"

export function fetchAnagrafiche(): Promise<Anagrafica[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, nome: 'Mario', cognome: 'Rossi' },
        { id: 2, nome: 'Anna', cognome: 'Bianchi' },
      ])
    }, 1000)
  })
}