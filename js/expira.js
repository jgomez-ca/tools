    const reminderOffsets = [60, 30, 15, 7, 3, 1];

    const expirationInput = document.getElementById("expirationDate");
    const remindersDiv = document.getElementById("reminders");

    // Create the checkbox rows
    reminderOffsets.forEach(days => {
        const row = document.createElement("div");
        row.className = "reminder-row";

        row.innerHTML = `
            <div>
                <input type="checkbox" class="reminder-check" data-days="${days}">
                <label>${days} days before</label>
            </div>
            <div class="date-output" id="date-${days}">—</div>
        `;

        remindersDiv.appendChild(row);
    });

    // Update reminder dates when expiration date changes
    expirationInput.addEventListener("change", updateDates);

    // Update when checkboxes are toggled
    remindersDiv.addEventListener("change", updateDates);

    function updateDates() {
        const expDateValue = expirationInput.value;
        if (!expDateValue) return;

        const expDate = new Date(expDateValue);

        document.querySelectorAll(".reminder-check").forEach(checkbox => {
            const days = parseInt(checkbox.dataset.days);
            const output = document.getElementById(`date-${days}`);

            if (checkbox.checked) {
                const reminderDate = new Date(expDate);
                reminderDate.setDate(reminderDate.getDate() - days);

                // output.textContent = reminderDate.toISOString().split("T")[0];
                function formatDate(date) {
                    const options = { month: "long", day: "2-digit", year: "numeric" };
                    return date.toLocaleDateString("en-US", options);
                }

                output.textContent = formatDate(reminderDate);

            } else {
                output.textContent = "—";
            }
        });
    }