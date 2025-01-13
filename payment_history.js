document.addEventListener("DOMContentLoaded", () => {
    const paymentTable = document.getElementById("paymentTable").getElementsByTagName("tbody")[0];
    const payments = JSON.parse(localStorage.getItem("payments")) || [];

    if (payments.length === 0) {
        const noDataRow = paymentTable.insertRow();
        noDataRow.innerHTML = '<td colspan="4" style="text-align: center;">Nu există plăți efectuate.</td>';
        return;
    }

    payments.forEach(payment => {
        const row = paymentTable.insertRow();
        row.innerHTML = `
            <td>${payment.utilityType}</td>
            <td>${payment.amount}</td>
            <td>${payment.date}</td>
            <td>${payment.method}</td>
        `;
    });
});
