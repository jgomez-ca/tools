// EMAIL REDACTOR
document.getElementById('redactButton').addEventListener('click', function() {
    const email = document.getElementById('emailInput').value.trim();

    // Basic validation check for empty input.
    if (!email) {
      alert("Please enter an email address.");
      return;
    }

    const redactedEmail = redactEmail(email);
    document.getElementById('redacted').innerText = redactedEmail;
  });

  /**
   * Redacts an email address.
   * For the local part, it preserves the first and last characters if there are more than two characters.
   * For the domain name (before the TLD), it preserves the first two and the last character if the length permits.
   * The TLD remains unaltered. george.of.the.jungle@hovermailbox.com
   *
   * @param {string} email - The email address to redact.
   * @returns {string} - The redacted email.
   */
function redactEmail(email) {
    // Split the email into local and domain parts.
  const parts = email.split("@");
  console.log('Parts -> ',parts);
  if (parts.length !== 2) {
    return "Invalid email format.";
  }
  const localPart = parts[0];
  console.log('Local Parts ->', localPart);
  const domainFull = parts[1];
  console.log('FULL domain name ->', domainFull);

  // Redacts the local part.
  let redactedLocal = localPart;
  redactedLocal = "*".repeat(localPart.length);
  
  // Separate the domain into the domain name and TLD.
  const lastDotPos = domainFull.lastIndexOf(".");
  let domainName, tld;
  if (lastDotPos === -1) {
    domainName = domainFull;
    tld = "";
  } else {
    domainName = domainFull.substring(0, lastDotPos);
    tld = domainFull.substring(lastDotPos); // includes the dot
  }

  // Redacts the domain name.
  let redactedDomain = domainName;
  redactedDomain = "*".repeat(domainName.length)
  // Redacts the tld.
  let redactedTld = tld;
  redactedTld = "*".repeat(tld.length - 1);

  fullRE = "Full Redaction:\n-> " + redactedLocal + "@" + redactedDomain + "." + redactedTld + "\n\n";

  optionTwoRE = "Showing more:\n-> " + localPart.charAt(0) + "*".repeat(Math.max(0, localPart.length - 2)) + localPart.charAt(localPart.length - 1) + "@" + domainName.charAt(0) + "*".repeat(Math.max(0, domainName.length - 2)) + domainName.charAt(domainName.length - 1) + tld + "\n\n";

   optionThreeRE = "Showing 1st + TLD:\n-> " + localPart.charAt(0) + "*".repeat(Math.max(0, localPart.length - 1)) + "@" + domainName.charAt(0) + "*".repeat(Math.max(0, domainName.length - 1)) + tld + "\n\n";

  totalREOptions = fullRE + optionThreeRE + optionTwoRE;
  return totalREOptions;


/*   innerHTML =
        `<strong>Original Price:</strong> $${price.toFixed(2)}<br>
         <strong>Federal Tax (GST):</strong> $${federalTax.toFixed(2)}<br>
         <strong>Provincial Tax:</strong> $${provincialTax.toFixed(2)}<br>
         <strong>Total:</strong> $${total.toFixed(2)}`; */

}

// PASSWORD GENERATOR
const generatePassBtn = document.getElementById("generatePassBtn");
const copyPassBtn = document.getElementById("copyPassBtn");
const outputPassBox = document.getElementById("outputPassBox");
const passwordOutput = document.getElementById("passwordOutput");
const passwordOutputHalf = document.getElementById("passwordOutputHalf");

generatePassBtn.addEventListener("click", () => {
  const length = parseInt(document.getElementById("length").value);

  if (isNaN(length) || length < 8 || length > 128) {
    passwordOutput.textContent = "Please enter a valid length (8–128).";
    outputBox.classList.remove("hidden");
    return;
  }

  const lower = "abcdefghijklmnopqrstuvwxyz";
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+-=[]{}|;:',.<>?/`~";
  const symbolsHalf = "!@#$%^&*()";


  const allChars = lower + upper + numbers + symbols;
  const halfChars = lower + upper + numbers + symbolsHalf;

  let password = "";
  let passwordHalf = "";


  for (let i = 0; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
    passwordHalf += halfChars[Math.floor(Math.random() * halfChars.length)];
  }

  passwordOutput.textContent = password;
  passwordOutputHalf.textContent = passwordHalf;
  outputBox.classList.remove("hidden");
});

// Copies FULL password
copyPassBtn.addEventListener("click", () => {
  const password = passwordOutput.textContent;

  navigator.clipboard.writeText(password).then(() => {
    copyPassBtn.textContent = "Copied!";
    setTimeout(() => (copyPassBtn.textContent = "Copy Full Password"), 1500);
  });
});

// Copies HALF password
copyHalfBtn.addEventListener("click", () => {
  const passwordHalf = passwordOutputHalf.textContent;

  navigator.clipboard.writeText(passwordHalf).then(() => {
    copyHalfBtn.textContent = "Copied!";
    setTimeout(() => (copyHalfBtn.textContent = "Copy Half Password"), 1500);
  });
});


// Tax Calculator
document.getElementById('calculateBtn').addEventListener('click', function() {
    const price = parseFloat(document.getElementById('price').value);
    const province = document.getElementById('province').value;

    if (isNaN(price) || price < 0) {
        document.getElementById('taxOutput').textContent = "Please enter a valid price.";
        return;
    }

    // Federal GST is 5% everywhere
    const federalTaxRate = 0.05;

    // Provincial tax rates (approximate, for demo)
    const provincialRates = {
        ON: 0.08, QC: 0.09975, BC: 0.07, AB: 0, SK: 0.06, MB: 0.07,
        NL: 0.10, NB: 0.10, NS: 0.10, PE: 0.10, NT: 0, YK: 0, NU: 0
    };

    const federalTax = price * federalTaxRate;
    const provincialTax = price * (provincialRates[province] || 0);
    const total = price + federalTax + provincialTax;

    document.getElementById('taxOutput').innerHTML =
        `<strong>Original Price:</strong>  $${price.toFixed(2)}<br>
         <strong>Federal Tax (GST):</strong>  $${federalTax.toFixed(2)}<br>
         <strong>Provincial Tax:</strong  $${provincialTax.toFixed(2)}<br>
         <strong>Total:</strong>  $${total.toFixed(2)}`;
});


// Reminder Calculator
 const reminderOffsets = [60, 30, 15, 7, 3, 1];

    const expirationInput = document.getElementById("expirationDate");
    const remindersDiv = document.getElementById("reminders");
    const outputBox = document.getElementById("outputBox");
    const generateBtn = document.getElementById("generateText");
    const copyBtn = document.getElementById("copyText");

    // Create the checkbox rows
    reminderOffsets.forEach(days => {
        const row = document.createElement("div");
        row.className = "reminder-row";

        row.innerHTML = `
            <div>
                <input type="checkbox" class="reminder-check" data-days="${days}">
                <label>${days} days before</label>
            </div></p>
            <div class="date-output" id="date-${days}">—</div>
        `;

        remindersDiv.appendChild(row);
    });

    // Format date as Month DD, YYYY
    function formatDate(date) {
        const options = { month: "long", day: "2-digit", year: "numeric" };
        return date.toLocaleDateString("en-US", options);
    }

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
     // Generate raw text output for email
    generateBtn.addEventListener("click", () => {
        const expDateValue = expirationInput.value;
        if (!expDateValue) {
            outputBox.value = "Please select an expiration date first.";
            return;
        }

        const expDate = new Date(expDateValue);
        let textOutput = "";

        document.querySelectorAll(".reminder-check").forEach(checkbox => {
            if (checkbox.checked) {
                const days = parseInt(checkbox.dataset.days);
                const reminderDate = new Date(expDate);
                reminderDate.setDate(reminderDate.getDate() - days);

                textOutput += `- ${days} days before: ${formatDate(reminderDate)}\n`;
            }
        });

        outputBox.value = textOutput.trim();
    });

    // Copy to clipboard
    copyBtn.addEventListener("click", () => {
        outputBox.select();
        outputBox.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(outputBox.value);
    });