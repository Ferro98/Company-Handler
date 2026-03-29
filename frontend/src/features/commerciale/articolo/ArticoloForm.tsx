import EntityForm from '@/components/EntityForm'
import { articoloFields } from './articolo.fields'
import type { Articolo, Incarico } from '@/types'

type Props = {
    modo: 'inserisci' | 'modifica' | 'visualizza'
    dati?: Articolo
    incarico?: Incarico
    onChiudi: () => void
    onSalva?: (dati: Articolo) => void
}

export default function ArticoloForm({ modo, dati, incarico, onChiudi, onSalva }: Props) {
    return (
        <EntityForm
            fields={articoloFields}
            modo={modo}
            dati={dati}
            onChiudi={onChiudi}
            onSalva={(d) => onSalva?.(d as Articolo)}
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