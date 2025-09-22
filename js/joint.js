// Password Generator
document.getElementById("generateBtn").addEventListener("click", () => {
  const length = parseInt(document.getElementById("length").value);
  const output = document.getElementById("passwordOutput");

  if (isNaN(length) || length < 14 || length > 120) {
    output.textContent = "Please enter a length between 14 and 120.";
    return;
  }

  const lower = "abcdefghijklmnopqrstuvwxyz";
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbolsFull = "!@#$%^&*()_+-=[]{}|;:',.<>?/`~";
  const symbolsHalf = "!@#$%^&*()";

  const allChars = lower + upper + numbers + symbolsFull;
  const halfChars = lower + upper + numbers + symbolsHalf;

  let passwordFull = "";
  let passwordHalf = "";

  for (let i = 0; i < length; i++) {
    const randomChar = allChars[Math.floor(Math.random() * allChars.length)];
    passwordFull += randomChar;
  }
 //output.textContent = passwordFull;
  document.getElementById("passwordOutput").textContent = "\nFull: " + passwordFull;

  
  for (let i = 0; i < length; i++) {
    const randomChar = halfChars[Math.floor(Math.random() * halfChars.length)];
    passwordHalf += randomChar;
  }
  document.getElementById("passwordOutputHalf").textContent = "\nHalf: " + passwordHalf;

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
        `<strong>Original Price:</strong> $${price.toFixed(2)}<br>
         <strong>Federal Tax (GST):</strong> $${federalTax.toFixed(2)}<br>
         <strong>Provincial Tax:</strong> $${provincialTax.toFixed(2)}<br>
         <strong>Total:</strong> $${total.toFixed(2)}`;
});

// Email Redactor
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

  fullRE = "\n-> " + redactedLocal + "@" + redactedDomain + "." + redactedTld;

  optionTwoRE = "\n-> " + localPart.charAt(0) + "*".repeat(Math.max(0, localPart.length - 2)) + localPart.charAt(localPart.length - 1) + "@" + domainName.charAt(0) + "*".repeat(Math.max(0, domainName.length - 2)) + domainName.charAt(domainName.length - 1) + tld;

   optionThreeRE = "\n-> " + localPart.charAt(0) + "*".repeat(Math.max(0, localPart.length - 1)) + "@" + domainName.charAt(0) + "*".repeat(Math.max(0, domainName.length - 1)) + tld;

  totalREOptions = fullRE + optionThreeRE + optionTwoRE;
  return totalREOptions;
}