function togglePaymentFields() {
    const method = document.getElementById("method").value;
    document.getElementById("cardFields").style.display = method === "card" ? "block" : "none";
    document.getElementById("transferFields").style.display = method === "transfer" ? "block" : "none";
}

function processPayment() {
    const method = document.getElementById("method").value;
    const utilityType = document.getElementById("utilityType").value;
    const amount = document.getElementById("amount").value;

    if (!utilityType || !amount) {
        alert("Te rugăm să completezi toate câmpurile obligatorii.");
        return false;
    }

    // Salvăm informațiile plății în Local Storage
    const payment = {
        utilityType: utilityType,
        amount: amount,
        date: new Date().toLocaleString(), // Data și ora actuală
        method: method === "card" ? "Card de credit" : "Transfer bancar"
    };

    let payments = JSON.parse(localStorage.getItem("payments")) || [];
    payments.push(payment);
    localStorage.setItem("payments", JSON.stringify(payments));

    // Afișăm mesajul de succes
    document.getElementById("paymentForm").style.display = "none";
    document.getElementById("confirmationMessage").innerText = "Plata a fost efectuată cu succes.";
    document.getElementById("confirmationMessage").style.display = "block";

    // Afișăm butonul de descărcare a chitanței
    document.getElementById("downloadReceipt").style.display = "block";
    document.getElementById("backButton").style.display = "block";

    return false; // Prevenim reîncărcarea formularului
}

function downloadReceipt() {
    const utilityType = document.getElementById("utilityType").value;
    const amount = document.getElementById("amount").value;
    const receiptText = `Chitanță pentru plata întreținerii\nTipul de utilitate: ${utilityType}\nSuma: ${amount} RON\nStatus: Plata efectuată cu succes`;
    
    const blob = new Blob([receiptText], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "chitanta_plata.txt";
    link.click();
}

