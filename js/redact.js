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

  fullRedactedEmail = "\nOption 1:\n-> " + redactedLocal + "@" + redactedDomain + "." + redactedTld;

  partiallyRedactedEmail = "\nOption 2:\n-> " + localPart.charAt(0) + "*".repeat(Math.max(0, localPart.length - 2)) + localPart.charAt(localPart.length - 1) + "@" + domainName.charAt(0) + "*".repeat(Math.max(0, domainName.length - 2)) + domainName.charAt(domainName.length - 1) + tld;

  otherPartiallyRedactedEmail = "\nOption 3:\n-> " + localPart.charAt(0) + "*".repeat(Math.max(0, localPart.length - 1)) + "@" + domainName.charAt(0) + "*".repeat(Math.max(0, domainName.length - 1)) + tld;

  totalRedactedEmailOptions = fullRedactedEmail + partiallyRedactedEmail + otherPartiallyRedactedEmail;
  return totalRedactedEmailOptions;
}