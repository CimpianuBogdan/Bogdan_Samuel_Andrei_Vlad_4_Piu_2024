document.addEventListener("DOMContentLoaded", () => {
    const role = localStorage.getItem("userRole");
    if (role === "admin") {
        document.getElementById("admin-section").style.display = "block";
    }
});
