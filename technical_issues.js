document.addEventListener("DOMContentLoaded", loadIssueHistory);

function reportIssue() {
    const description = document.getElementById("description").value;
    const location = document.getElementById("location").value;

    if (!description || !location) {
        alert("Toate câmpurile sunt obligatorii.");
        return false;
    }

    const issue = {
        description,
        location,
        date: new Date().toLocaleString(),
    };

    // Salvăm problema în Local Storage
    let issues = JSON.parse(localStorage.getItem("technicalIssues")) || [];
    issues.push(issue);
    localStorage.setItem("technicalIssues", JSON.stringify(issues));

    alert("Problema a fost raportată cu succes!");
    document.getElementById("reportForm").reset();

    // Actualizăm lista de istoric
    loadIssueHistory();

    return false;
}

function loadIssueHistory() {
    const historyList = document.getElementById("historyList");

    // Ștergem istoricul existent
    historyList.innerHTML = "";

    // Obținem problemele din Local Storage
    const issues = JSON.parse(localStorage.getItem("technicalIssues")) || [];

    if (issues.length === 0) {
        const noIssues = document.createElement("li");
        noIssues.textContent = "Nu există probleme raportate.";
        historyList.appendChild(noIssues);
    } else {
        // Generăm lista problemelor raportate
        issues.forEach((issue, index) => {
            const listItem = document.createElement("li");
            listItem.textContent = `${index + 1}. ${issue.description} - ${issue.location} (${issue.date})`;
            historyList.appendChild(listItem);
        });
    }
}
