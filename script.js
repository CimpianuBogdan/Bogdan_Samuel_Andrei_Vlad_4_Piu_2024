function toggleDropdown(id) {
    const dropdown = document.getElementById(id);
    
    // Ascunde toate secțiunile deschise
    document.querySelectorAll('.dropdown').forEach(d => {
        if (d !== dropdown) {
            d.style.display = 'none';
        }
    });
    
    // Afișează sau ascunde secțiunea selectată
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}

function showDescription(text) {
    const modal = document.getElementById("subsection-details");
    const subsectionTitle = document.getElementById("subsection-title");
    const subsectionContent = document.getElementById("subsection-content");

    // Setează titlul și conținutul pentru fiecare subsecțiune în funcție de textul selectat
    let details = {
        "Plata întreținerii": {
            title: "Plata întreținerii",
            content: "Aici poți vizualiza și efectua plata pentru întreținerea lunară a apartamentului tău. Asigură-te că achiți suma la timp pentru a evita penalitățile."
        },
        "Istoricul plăților": {
            title: "Istoricul plăților",
            content: "Această secțiune îți permite să vizualizezi istoricul complet al plăților efectuate pentru întreținere, inclusiv chitanțele descărcabile."
        },
        "Probleme tehnice": {
            title: "Probleme tehnice",
            content: "Raportează problemele tehnice întâmpinate în clădire, cum ar fi reparații urgente la instalații, pentru o rezolvare cât mai rapidă."
        },
        "Reclamații și feedback": {
            title: "Reclamații și feedback",
            content: "Trimite reclamații și oferă feedback administrației pentru a îmbunătăți serviciile oferite în cadrul asociației."
        },
        "Rezervarea spațiilor": {
            title: "Rezervarea spațiilor",
            content: "Rezervă spațiile comune, cum ar fi sala de evenimente sau spațiul pentru grătare, pentru evenimente personale."
        },
        "Anunțuri": {
            title: "Anunțuri",
            content: "Verifică anunțurile importante de la administrație, inclusiv notificări legate de reparații programate și adunări generale."
        },
        "Rapoarte lunare": {
            title: "Rapoarte lunare",
            content: "Primește rapoarte lunare detaliate despre situația financiară și activitățile din cadrul asociației, trimise automat pe e-mail."
        },
        "Gestionarea parcărilor": {
            title: "Gestionarea parcărilor",
            content: "Verifică disponibilitatea locurilor de parcare și gestionează propriul loc de parcare în funcție de cerințele tale."
        },
        "Costuri utilități": {
            title: "Costuri utilități",
            content: "Află detalii despre costurile pentru utilități, repartizate pe baza consumului fiecărui apartament."
        },
        "Solicitare documente": {
            title: "Solicitare documente",
            content: "Solicită documente oficiale necesare pentru diverse instituții direct din această secțiune."
        },
        "Actualizare date personale": {
            title: "Actualizare date personale",
            content: "Actualizează-ți datele de contact și alte informații personale pentru a te asigura că administrația are datele corecte."
        },
        "Voturi și decizii": {
            title: "Voturi și decizii",
            content: "Participă la voturile organizate de administrație pentru decizii importante ce vizează întreaga asociație."
        }
    };

    // Afișează detaliile corespunzătoare pentru subsecțiunea selectată
    if (details[text]) {
        subsectionTitle.innerText = details[text].title;
        subsectionContent.innerText = details[text].content;
        currentPageLink = details[text].page;
        modal.style.display = "flex"; // Afișează modalul ca pop-up
    }
    
    document.querySelectorAll('.card').forEach(card => card.classList.remove('active'));
    event.target.closest('.card').classList.add('active');
    const selectedCard = document.querySelector(`[onclick="toggleDropdown('${text}')"]`);
    if (selectedCard) {
        selectedCard.classList.add('active');
    }
}

window.onclick = function(event) {
    const modal = document.getElementById("subsection-details");
    if (event.target === modal) {
        closeModal();
    }
};

function openSubsectionPage() {
    if (currentPageLink) {
        window.location.href = currentPageLink; // Redirecționează către pagina setată
    }
}

function closeModal() {
    const modal = document.getElementById("subsection-details");
    modal.style.display = "none";

    document.querySelectorAll('.card').forEach(card => card.classList.remove('active'));

}

// Salvează starea modului de noapte
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    document.querySelector(".container").classList.toggle("dark-mode");
    document.querySelectorAll(".card").forEach(card => card.classList.toggle("dark-mode"));
    document.querySelectorAll("button").forEach(button => button.classList.toggle("dark-mode"));
    document.querySelectorAll(".modal").forEach(modal => modal.classList.toggle("dark-mode"));

    // Salvează preferința în localStorage
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "enabled");
    } else {
        localStorage.setItem("darkMode", "disabled");
    }
}

// Încarcă preferința din localStorage la încărcarea paginii
window.onload = function() {
    if (localStorage.getItem("darkMode") === "enabled") {
        toggleDarkMode(); // Activează modul de noapte dacă era deja activat
    }
};




const clickSound = new Audio('click.mp3');

function playClickSound() {
    clickSound.play();
}


let tutorialStep = 0;
const tutorialSteps = [
    "Bine ai venit! Acesta este meniul principal.",
    "Aici poți vedea lista de secțiuni.",
    "Folosește pop-up-urile pentru a accesa detalii despre secțiuni.",
    "Apasă pe butonul 'Accesează pagina' pentru a vedea mai multe informații."
];

// Funcția care începe tutorialul
function startTutorial() {
    tutorialStep = 0; // Resetează tutorialul la primul pas
    document.getElementById("tutorial-text").innerText = tutorialSteps[tutorialStep];
    document.getElementById("tutorial-modal").style.display = "flex"; // Afișează tutorialul
}

// Funcția care trece la pasul următor
function nextStep() {
    tutorialStep++;
    if (tutorialStep < tutorialSteps.length) {
        document.getElementById("tutorial-text").innerText = tutorialSteps[tutorialStep];
    } else {
        closeTutorial(); // Închide tutorialul după ultimul pas
    }
}

// Funcția care închide tutorialul
function closeTutorial() {
    document.getElementById("tutorial-modal").style.display = "none";
}


let currentPageLink = '';

function openSubsection(title, content, pageLink) {
    document.getElementById("subsection-title").innerText = title;
    document.getElementById("subsection-content").innerText = content;
    currentPageLink = pageLink;
    document.getElementById("subsection-details").style.display = "flex";
    
    // Setăm redirecționarea pentru butonul "Accesează pagina"
    document.getElementById("access-page-button").onclick = function() {
        window.location.href = currentPageLink;
    };
}

function closeModal() {
    document.getElementById("subsection-details").style.display = "none";
}
