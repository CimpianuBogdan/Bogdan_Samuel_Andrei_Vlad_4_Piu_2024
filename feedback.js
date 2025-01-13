// Funcția pentru trimiterea unei reclamații sau feedback
function submitFeedback() {
    const type = document.getElementById("type").value;
    const message = document.getElementById("message").value;

    if (!type || !message) {
        alert("Toate câmpurile sunt obligatorii.");
        return false;
    }

    const feedback = {
        type,
        message,
        date: new Date().toLocaleString(),
    };

    // Salvăm feedback-ul în Local Storage
    let feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
    feedbacks.push(feedback);
    localStorage.setItem("feedbacks", JSON.stringify(feedbacks));

    alert("Mesajul a fost trimis cu succes!");
    document.getElementById("feedbackForm").reset();
    return false;
}

// Funcția pentru afișarea istoricului
function showFeedbackHistory() {
    const feedbackHistoryModal = document.getElementById("feedbackHistoryModal");
    const feedbackHistoryList = document.getElementById("feedbackHistoryList");

    // Ștergem istoricul existent
    feedbackHistoryList.innerHTML = "";

    // Obținem feedback-urile din Local Storage
    const feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];

    if (feedbacks.length === 0) {
        const noFeedback = document.createElement("li");
        noFeedback.textContent = "Nu există reclamații sau feedback trimise.";
        feedbackHistoryList.appendChild(noFeedback);
    } else {
        // Generăm lista feedback-urilor
        feedbacks.forEach((feedback, index) => {
            const listItem = document.createElement("li");
            listItem.textContent = `${index + 1}. [${feedback.type}] ${feedback.message} (${feedback.date})`;
            feedbackHistoryList.appendChild(listItem);
        });
    }

    // Afișăm pop-up-ul
    feedbackHistoryModal.style.display = "flex";
}

// Funcția pentru închiderea pop-up-ului
function closeFeedbackHistory() {
    const feedbackHistoryModal = document.getElementById("feedbackHistoryModal");
    feedbackHistoryModal.style.display = "none";
}
