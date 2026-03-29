import { useEffect, useState } from "react"
import type { Articolo, Incarico, Offerta, PropostaFattura } from "../types"
import DataGrid, { type Colonna } from "../components/DataGrid"
import { fetchArticoli, fetchIncarichi, fetchProposteFattura, fetchOfferte } from "../features/commerciale/commericale.data"
import Dialog from "../components/Dialog"

type ModoDialog = 'inserisci' | 'modifica' | 'visualizza' | null

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
    const [dialogOfferta, setDialogOfferta] = useState<ModoDialog>(null)
    const [dialogIncarico, setDialogIncarico] = useState<ModoDialog>(null)
    const [dialogArticolo, setDialogArticolo] = useState<ModoDialog>(null)
    const [dialogProposta, setDialogProposta] = useState<ModoDialog>(null)

    const [caricamento, setCaricamento] = useState(true)

    const [offertaSelezionata, setOffertaSelezionata] = useState<Offerta | null>(null)
    const [incaricoSelezionato, setIncaricoSelezionato] = useState<Incarico | null>(null)
    const [articoloSelezionato, setArticoloSelezionato] = useState<Articolo | null>(null)
    const [propostaSelezionata, setPropostaSelezionata] = useState<PropostaFattura | null>(null)

    const incarichiFiltrati = offertaSelezionata
        ? incarichi.filter(i => i.offertaId === offertaSelezionata.id)
        : incarichi

    const articoliFiltrati = incaricoSelezionato
        ? articoli.filter(a => a.incaricoId === incaricoSelezionato.id)
        : offertaSelezionata
            ? articoli.filter(a => incarichiFiltrati.some(i => i.id === a.incaricoId))
            : articoli

    const proposteFiltrate = incaricoSelezionato
        ? proposte.filter(p => p.incaricoId === incaricoSelezionato.id)
        : offertaSelezionata
            ? proposte.filter(p => incarichiFiltrati.some(i => i.id === p.incaricoId))
            : proposte

    useEffect(() => {
        Promise.all([
            fetchOfferte(),
            fetchIncarichi(),      // senza parametri — prende tutto
            fetchArticoli(),
            fetchProposteFattura()
        ]).then(([o, i, a, p]) => {
            setOfferte(o)
            setIncarichi(i)
            setArticoli(a)
            setProposte(p)
        }).finally(() => setCaricamento(false))
    }, [])

    return (
        <div className="flex flex-col h-[calc(100vh-64px)] p-4 gap-4">
            <div className="flex-1">
                <DataGrid<Offerta>
                    titolo="Offerte"
                    colonne={colonneOfferte}
                    dati={offerte}
                    rigaSelezionata={offertaSelezionata}
                    onSeleziona={(riga) => {
                        setOffertaSelezionata(riga)
                        setIncaricoSelezionato(null)
                    }}
                    onInserisci={() => setDialogOfferta('inserisci')}
                    onModifica={() => setDialogOfferta('modifica')}
                    onVisualizza={() => setDialogOfferta('visualizza')}
                    onElimina={(riga) => console.log('elimina', riga)}
                    caricamento={caricamento}
                />
            </div>

            <div className="flex-1">
                <DataGrid<Incarico>
                    titolo="Incarichi"
                    colonne={colonneIncarichi}
                    dati={incarichiFiltrati}
                    rigaSelezionata={incaricoSelezionato}
                    onSeleziona={setIncaricoSelezionato}
                    onInserisci={() => setDialogIncarico('inserisci')}
                    onModifica={() => setDialogIncarico('modifica')}
                    onVisualizza={() => setDialogIncarico('visualizza')}
                    onElimina={(riga) => console.log('elimina', riga)}
                    caricamento={caricamento}
                />
            </div>

            <div className="flex-1 flex gap-4">
                <div className="flex-1">
                    <DataGrid<Articolo>
                        titolo="Articoli"
                        colonne={colonneArticoli}
                        dati={articoliFiltrati}
                        rigaSelezionata={articoloSelezionato}
                        onSeleziona={setArticoloSelezionato}
                        onInserisci={() => setDialogArticolo('inserisci')}
                        onModifica={() => setDialogArticolo('modifica')}
                        onVisualizza={() => setDialogArticolo('visualizza')}
                        onElimina={(riga) => console.log('elimina', riga)}
                        caricamento={caricamento}
                    />
                </div>

                <div className="flex-1">
                    <DataGrid<PropostaFattura>
                        titolo="Proposte fattura"
                        colonne={colonneProposte}
                        dati={proposteFiltrate}
                        rigaSelezionata={propostaSelezionata}
                        onSeleziona={setPropostaSelezionata}
                        onInserisci={() => setDialogProposta('inserisci')}
                        onModifica={() => setDialogProposta('modifica')}
                        onVisualizza={() => setDialogProposta('visualizza')}
                        onElimina={(riga) => console.log('elimina', riga)}
                        caricamento={caricamento}
                    />
                </div>
            </div>
            <Dialog
                titolo={
                    dialogOfferta === 'inserisci' ? 'Nuova Offerta' :
                        dialogOfferta === 'modifica' ? 'Modifica Offerta' :
                            'Dettaglio Offerta'
                }
                aperto={dialogOfferta !== null}
                onChiudi={() => setDialogOfferta(null)}
                larghezza="lg"
            >
                <p className="text-sm text-gray-500">Form Offerta ({dialogOfferta})</p>
            </Dialog>
            <Dialog
                titolo={
                    dialogIncarico === 'inserisci' ? 'Nuova Incarico' :
                        dialogIncarico === 'modifica' ? 'Modifica Incarico' :
                            'Dettaglio Offerta'
                }
                aperto={dialogIncarico !== null}
                onChiudi={() => setDialogIncarico(null)}
                larghezza="lg"
            >
                <p className="text-sm text-gray-500">Form Incarico ({dialogIncarico})</p>
            </Dialog>
            <Dialog
                titolo={
                    dialogArticolo === 'inserisci' ? 'Nuova Articolo' :
                        dialogArticolo === 'modifica' ? 'Modifica Articolo' :
                            'Dettaglio Articolo'
                }
                aperto={dialogArticolo !== null}
                onChiudi={() => setDialogArticolo(null)}
                larghezza="lg"
            >
                <p className="text-sm text-gray-500">Form Articolo ({dialogArticolo})</p>
            </Dialog>
            <Dialog
                titolo={
                    dialogProposta === 'inserisci' ? 'Nuova Proposta' :
                        dialogProposta === 'modifica' ? 'Modifica Proposta' :
                            'Dettaglio Proposta'
                }
                aperto={dialogProposta !== null}
                onChiudi={() => setDialogProposta(null)}
                larghezza="lg"
            >
                <p className="text-sm text-gray-500">Form Proposta ({dialogProposta})</p>
            </Dialog>
        </div>
    )
}