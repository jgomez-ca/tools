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
