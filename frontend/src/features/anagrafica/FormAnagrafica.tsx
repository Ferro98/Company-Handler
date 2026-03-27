import type { Anagrafica } from "../../types"

type Props = {
    anagrafica: Anagrafica
    onCampoChange: (campo: string, valore: string) => void
    onSalva: () => void
    idInModifica: number | null
}

export default function FormAnagrafica({ anagrafica, onCampoChange, onSalva, idInModifica }: Props) {

    return (
        <div>
            <input type="text" value={anagrafica.nome} onChange={(e) => onCampoChange('nome', e.target.value)} />
            <input type="text" value={anagrafica.cognome} onChange={(e) => onCampoChange('cognome', e.target.value)} />
            <p>Nome completo: {anagrafica.nome} {anagrafica.cognome}</p>
            <button onClick={onSalva}>{idInModifica ? 'Modifica' : 'Salva'}</button>
        </div>
    )
}