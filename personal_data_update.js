function updateData() {
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const idProof = document.getElementById("idProof").files[0];

    // Validăm dimensiunea fișierului încărcat
    if (idProof && idProof.size > 2 * 1024 * 1024) {  // limită de 2 MB
        alert("Fișierul încărcat este prea mare. Alegeți un fișier mai mic de 2 MB.");
        return false;
    }

    // Ascundem formularul și afișăm mesajul de succes și butonul de întoarcere
    document.getElementById("updateForm").style.display = "none";
    document.getElementById("updateMessage").style.display = "block";
    document.getElementById("backButton").style.display = "block";

    return false;  // Prevenim reîncărcarea formularului
}
