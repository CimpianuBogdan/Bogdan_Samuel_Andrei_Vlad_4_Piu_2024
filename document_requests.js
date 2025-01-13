function downloadDocument(type) {
    // Generăm un fișier simplu pentru descărcare (simulare)
    const documentText = type === 'contract' ? "Contract de proprietate" : "Raport Financiar";
    const blob = new Blob([documentText], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = type === 'contract' ? "contract.txt" : "raport_financiar.txt";
    link.click();

    // Afișăm un mesaj de confirmare a descărcării
    document.getElementById("downloadMessage").style.display = "block";
}
