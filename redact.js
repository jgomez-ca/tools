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
   * The TLD remains unaltered.
   *
   * @param {string} email - The email address to redact.
   * @returns {string} - The redacted email.
   */
  function redactEmail(email) {
    // Split the email into local and domain parts.
    const parts = email.split("@");
    console.log(parts);
    if (parts.length !== 2) {
      return "Invalid email format.";
    }
    const localPart = parts[0];
    const domainFull = parts[1];

    // Redacts the local part.
    let redactedLocal = localPart;
    if (localPart.length > 1) {
      console.log(localPart.length);
      redactedLocal = localPart.charAt(0) + "*".repeat(localPart.length - 2) + localPart.charAt(localPart.length - 1);
      console.log(redactedLocal);
    }

    // Separate the domain into the domain name and TLD.
    const lastDotPos = domainFull.lastIndexOf(".");
    console.log(lastDotPos);
    let domainName, tld;
    if (lastDotPos === -1) {
      domainName = domainFull;
      tld = "";
    } else {
      domainName = domainFull.substring(0, lastDotPos);
      tld = domainFull.substring(lastDotPos); // includes the dot
    }

    // Redact the domain name.
    let redactedDomain = domainName;
    if (domainName.length > 3) {
      redactedDomain = domainName.substring(0, 1) + "*".repeat(domainName.length - 3) + domainName.charAt(domainName.length - 1);
    } else if (domainName.length > 1) {
      redactedDomain = domainName.charAt(0) + "*".repeat(domainName.length - 2) + domainName.charAt(domainName.length - 1);
    }

    return redactedLocal + "@" + redactedDomain + tld;
  }
