import EntityForm from '@/components/EntityForm'
import { propostaFatturaFields } from './proposta-fattura.fields'
import type { PropostaFattura, Incarico } from '@/types'

type Props = {
    modo: 'inserisci' | 'modifica' | 'visualizza'
    dati?: PropostaFattura
    incarico?: Incarico
    onChiudi: () => void
    onSalva?: (dati: PropostaFattura) => void
}

export default function PropostaFatturaForm({ modo, dati, incarico, onChiudi, onSalva }: Props) {
    return (
        <EntityForm
            fields={propostaFatturaFields}
            modo={modo}
            dati={dati}
            onChiudi={onChiudi}
            onSalva={(d) => onSalva?.(d as PropostaFattura)}
            contestoPadre={incarico ? {
                titolo: 'Incarico',
                campi: [
                    { label: 'Numero', valore: incarico.numero },
                    { label: 'Responsabile', valore: incarico.responsabile },
                ]
            } : undefined}
        />
    )
}