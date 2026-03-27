import { useEffect, useState } from "react";
import { anagraficaVuota, type Anagrafica } from "../types";
import { fetchAnagrafiche } from "../features/anagrafica/anagrafica.data";
import FormAnagrafica from "../features/anagrafica/FormAnagrafica";
import ListaAnagrafiche from "../features/anagrafica/ListaAnagrafiche";

function App() {

    const [anagrafica, setAnagrafica] = useState<Anagrafica>(anagraficaVuota)
    const [lista, setLista] = useState<Anagrafica[]>([])
    const [idInModifica, setIdInModifica] = useState<number | null>(null)
    const [caricamento, setCaricamento] = useState(true)
    const [errore, setErrore] = useState<string | null>(null)

    useEffect(() => {
        fetchAnagrafiche()
            .then((dati) => setLista(dati))
            .catch((e: Error) => setErrore(e.message))
            .finally(() => setCaricamento(false))
    }, [])

    function handleCampoChange(campo: string, valore: string) {
        setAnagrafica({ ...anagrafica, [campo]: valore })
    }

    function handleSalva() {
        if (idInModifica === null) {
            setLista([...lista, { ...anagrafica, id: Date.now() }])
        }
        else {
            setLista(lista.map((elemento) =>
                elemento.id === idInModifica ? anagrafica : elemento))
        }
        setIdInModifica(null);
        setAnagrafica(anagraficaVuota)
    }

    function handleElimina(id: number) {
        setLista(lista.filter((anagrafica) =>
            anagrafica.id !== id
        ))
    }

    function handleModifica(elemento: Anagrafica) {
        setAnagrafica(elemento);
        setIdInModifica(elemento.id)
    }

    return (
        <div>
            <FormAnagrafica anagrafica={anagrafica} onCampoChange={handleCampoChange} onSalva={handleSalva} idInModifica={idInModifica} />
            {caricamento && <p>Caricamento...</p>}
            {errore && <p style={{ color: 'red' }}>{errore}</p>}
            {!caricamento && !errore && <ListaAnagrafiche lista={lista} onElimina={handleElimina} onModifica={handleModifica} />}
        </div>
    )
}

export default App