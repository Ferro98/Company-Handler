import EntityForm from '@/components/EntityForm'
import type { Incarico, Offerta } from '@/types'
import { incaricoFields } from './incarico.fields'

type Props = {
    modo: 'inserisci' | 'modifica' | 'visualizza'
    dati?: Incarico
    offerta?: Offerta
    onChiudi: () => void
    onSalva?: (dati: Incarico) => void
}

export default function IncaricoForm({ modo, dati, offerta, onChiudi, onSalva }: Props) {
    return (
        <EntityForm
            fields={incaricoFields}
            modo={modo}
            dati={dati}
            onChiudi={onChiudi}
            onSalva={(d) => onSalva?.(d as Incarico)}
            contestoPadre={offerta ? {
                titolo: 'Offerta',
                campi: [
                    { label: 'Numero', valore: offerta.numero },
                    { label: 'Cliente', valore: offerta.cliente },
                ]
            } : undefined}
        />
    )
}