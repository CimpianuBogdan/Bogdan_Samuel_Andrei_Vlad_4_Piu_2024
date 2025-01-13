function handleLogin() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const users = {
        "proprietar": { username: "proprietar", password: "parola123", role: "proprietar" },
        "admin": { username: "admin", password: "admin123", role: "admin" }
    };

    if (username in users && users[username].password === password) {
        const role = users[username].role;
        localStorage.setItem("userRole", role);  // Salvăm rolul utilizatorului în localStorage
        window.location.href = "login1.html";
        return false;
    } else {
        document.getElementById("error-message").style.display = "block";
        return false;
    }
}
