import type { Anagrafica } from "../../types"

type Props = {
    lista: Anagrafica[]
    onElimina: (id: number) => void
    onModifica: (elemento: Anagrafica) => void
}

export default function ListaAnagrafiche({ lista, onElimina, onModifica }: Props) {
    return (
        <ul>
            {lista.map((elemento) => (
                <li key={elemento.id}>
                    {elemento.nome} {elemento.cognome}
                    <button onClick={() => onElimina(elemento.id)}>Elimina</button>
                    <button onClick={() => onModifica(elemento)}>Modifica</button>
                </li>
            ))}
        </ul>
    )
}