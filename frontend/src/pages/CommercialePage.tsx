export default function CommercialePage() {
    return (
        <div className="flex flex-col h-[calc(100vh-64px)] p-4 gap-4">
            <div className="border rounded p-4 flex-1">
                <h2 className="text-lg font-medium mb-2">Offerte</h2>
            </div>
            <div className="border rounded p-4 flex-1">
                <h2 className="text-lg font-medium mb-2">Incarichi</h2>
            </div>
            <div className="flex gap-4 flex-1">
                <div className="border rounded p-4 flex-1">
                    <h2 className="text-lg font-medium mb-2">Articoli</h2>
                </div>
                <div className="border rounded p-4 flex-1">
                    <h2 className="text-lg font-medium mb-2">Proposte Fattura</h2>
                </div>
            </div>
        </div>
    )
}