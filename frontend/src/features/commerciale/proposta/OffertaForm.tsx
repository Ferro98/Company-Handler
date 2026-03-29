import EntityForm from '@/components/EntityForm'
import type { Offerta } from '@/types'
import { offertaFields } from './offerta.fields'

type Props = {
    modo: 'inserisci' | 'modifica' | 'visualizza'
    dati?: Offerta
    onChiudi: () => void
    onSalva?: (dati: Offerta) => void
}

export default function OffertaForm({ modo, dati, onChiudi, onSalva }: Props) {
    return (
        <EntityForm
            fields={offertaFields}
            modo={modo}
            dati={dati}
            onChiudi={onChiudi}
            onSalva={(d) => onSalva?.(d as Offerta)}
        />
    )
}