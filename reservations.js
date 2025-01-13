document.addEventListener("DOMContentLoaded", () => {
    updateSchedule(); // Actualizează orarul la încărcarea paginii
});

function updateSchedule() {
    const space = document.getElementById("space").value;
    const date = document.getElementById("date").value;
    const scheduleTable = document.getElementById("scheduleTable").getElementsByTagName("tbody")[0];
    const timeSelect = document.getElementById("time");

    // Ștergem conținutul tabelului și al dropdown-ului
    scheduleTable.innerHTML = "";
    timeSelect.innerHTML = '<option value="">Selectează o oră disponibilă</option>';

    if (!space || !date) {
        scheduleTable.innerHTML = '<tr><td colspan="2">Selectează un spațiu și o dată pentru a vedea orarul.</td></tr>';
        return;
    }

    // Generăm orarul pentru ziua selectată
    let reservations = JSON.parse(localStorage.getItem("reservations")) || [];
    for (let hour = 8; hour <= 20; hour++) {
        const time = `${hour.toString().padStart(2, "0")}:00`;
        const reservationKey = `${space}-${date}-${time}`;
        const isReserved = reservations.some(r => r.key === reservationKey);

        const row = scheduleTable.insertRow();
        row.className = isReserved ? "occupied" : "available";

        const timeCell = row.insertCell(0);
        timeCell.textContent = time;

        const statusCell = row.insertCell(1);
        statusCell.textContent = isReserved ? "Ocupat" : "Liber";

        // Adăugăm orele disponibile în dropdown
        if (!isReserved) {
            const option = document.createElement("option");
            option.value = time;
            option.textContent = time;
            timeSelect.appendChild(option);
        }
    }
}

function makeReservation() {
    const space = document.getElementById("space").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    if (!space || !date || !time) {
        alert("Toate câmpurile sunt obligatorii.");
        return false;
    }

    // Verificăm dacă există deja rezervarea
    let reservations = JSON.parse(localStorage.getItem("reservations")) || [];
    const reservationKey = `${space}-${date}-${time}`;
    if (reservations.some(r => r.key === reservationKey)) {
        alert("Intervalul selectat este deja rezervat.");
        return false;
    }

    // Adăugăm rezervarea
    reservations.push({ key: reservationKey, space, date, time });
    localStorage.setItem("reservations", JSON.stringify(reservations));

    alert("Rezervarea a fost efectuată cu succes!");
    updateSchedule(); // Actualizăm orarul

    return false; // Prevenim reîncărcarea paginii
}
