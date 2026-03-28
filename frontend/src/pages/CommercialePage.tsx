import { useEffect, useState } from "react"
import type { Articolo, Incarico, Offerta, PropostaFattura } from "../types"
import DataGrid, { type Colonna } from "../components/DataGrid"
import { fetchArticoli, fetchIncarichi, fetchProposteFattura, fetchOfferte } from "../features/commerciale/commericale.data"

const colonneOfferte: Colonna<Offerta>[] = [
    { key: 'numero', label: 'Numero', width: 160 },
    { key: 'cliente', label: 'Cliente', width: 200 },
    { key: 'stato', label: 'Stato', width: 120 },
    { key: 'totale', label: 'Totale', width: 120 },
]

const colonneIncarichi: Colonna<Incarico>[] = [
    { key: 'numero', label: 'Numero', width: 160 },
    { key: 'responsabile', label: 'Responsabile', width: 200 },
    { key: 'stato', label: 'Stato', width: 120 },
]

const colonneArticoli: Colonna<Articolo>[] = [
    { key: 'codice', label: 'Codice', width: 120 },
    { key: 'quantita', label: 'Qtà', width: 80 },
    { key: 'prezzoUnitario', label: 'Prezzo', width: 100 },
]

const colonneProposte: Colonna<PropostaFattura>[] = [
    { key: 'numero', label: 'Numero', width: 160 },
    { key: 'stato', label: 'Stato', width: 120 },
    { key: 'importoTotale', label: 'Importo', width: 120 },
]

export default function CommercialePage() {
    const [offerte, setOfferte] = useState<Offerta[]>([])
    const [incarichi, setIncarichi] = useState<Incarico[]>([])
    const [articoli, setArticoli] = useState<Articolo[]>([])
    const [proposte, setProposte] = useState<PropostaFattura[]>([])

    const [caricamento, setCaricamento] = useState(true)

    const [offertaSelezionata, setOffertaSelezionata] = useState<Offerta | null>(null)
    const [incaricoSelezionato, setIncaricoSelezionato] = useState<Incarico | null>(null)

    const incarichiFiltrati = offertaSelezionata
        ? incarichi.filter(i => i.offertaId === offertaSelezionata.id)
        : incarichi

    const articoliFiltrati = incaricoSelezionato
        ? articoli.filter(a => a.incaricoId === incaricoSelezionato.id)
        : articoli

    const proposteFiltrate = incaricoSelezionato
        ? proposte.filter(p => p.incaricoId === incaricoSelezionato.id)
        : proposte

    useEffect(() => {
        Promise.all([
            fetchOfferte(),
            fetchIncarichi(),      // senza parametri — prende tutto
            fetchArticoli(),
            fetchProposteFattura()
        ]).then(([o, i, a, p]) => {
            console.log(o, i, a, p)
            setOfferte(o)
            setIncarichi(i)
            setArticoli(a)
            setProposte(p)
        }).finally(() => setCaricamento(false))
    }, [])

    return (
        <div className="flex flex-col h-[calc(100vh-64px)] p-4 gap-4">
            <DataGrid<Offerta>
                titolo="Offerte"
                colonne={colonneOfferte}
                dati={offerte}
                rigaSelezionata={offertaSelezionata}
                onSeleziona={(riga) => {
                    setOffertaSelezionata(riga)
                    setIncaricoSelezionato(null)
                }}
                caricamento={caricamento}
            />

            <DataGrid<Incarico>
                titolo="Incarichi"
                colonne={colonneIncarichi}
                dati={incarichiFiltrati}
                rigaSelezionata={incaricoSelezionato}
                onSeleziona={setIncaricoSelezionato}
                caricamento={caricamento}
            />

            <DataGrid<Articolo>
                titolo="Articoli"
                colonne={colonneArticoli}
                dati={articoliFiltrati}
                caricamento={caricamento}
            />

            <DataGrid<PropostaFattura>
                titolo="Proposte fattura"
                colonne={colonneProposte}
                dati={proposteFiltrate}
                caricamento={caricamento}
            />
        </div>
    )
}