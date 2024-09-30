function calculateVAT() {
  const vatPercentage = parseFloat(
    document.getElementById('vatPercentage').value
  );
  const priceWithoutVATInput = parseFloat(
    document.getElementById('priceWithoutVAT').value
  );
  const priceWithVATInput = parseFloat(
    document.getElementById('priceWithVAT').value
  );

  let priceWithoutVAT, priceWithVAT, vatAmount;

  if (!isNaN(priceWithoutVATInput) && priceWithoutVATInput > 0) {
    // Calculate based on price without VAT
    priceWithoutVAT = priceWithoutVATInput;
    vatAmount = (priceWithoutVAT * vatPercentage) / 100;
    priceWithVAT = priceWithoutVAT + vatAmount;
  } else if (!isNaN(priceWithVATInput) && priceWithVATInput > 0) {
    // Calculate based on price with VAT
    priceWithVAT = priceWithVATInput;
    vatAmount = (priceWithVAT * vatPercentage) / (100 + vatPercentage);
    priceWithoutVAT = priceWithVAT - vatAmount;
  } else {
    return;
  }

  // Display the results in the table
  document.getElementById(
    'resultWithoutVAT'
  ).innerText = `€${priceWithoutVAT.toFixed(2)}`;
  document.getElementById('resultWithVAT').innerText = `€${priceWithVAT.toFixed(
    2
  )}`;
  document.getElementById('resultVAT').innerText = `€${vatAmount.toFixed(2)}`;
}

function copyToClipboard(td) {
  // Get the text content excluding the Euro sign
  const textToCopy = td.innerText.slice(1);

  // Create a temporary textarea element
  const tempTextarea = document.createElement('textarea');
  tempTextarea.value = textToCopy;
  document.body.appendChild(tempTextarea);

  // Select the text in the textarea
  tempTextarea.select();
  tempTextarea.setSelectionRange(0, 99999); // For mobile devices

  // Copy the text to the clipboard
  document.execCommand('copy');

  // Remove the temporary textarea
  document.body.removeChild(tempTextarea);

  // Show the tooltip
  showTooltip(textToCopy, td);
}

function showTooltip(text, td) {
  const tooltip = document.getElementById('tooltip');
  tooltip.innerText = `Copied!`;
  const rect = td.getBoundingClientRect();
  tooltip.style.left = `${rect.left + window.scrollX}px`;
  tooltip.style.top = `${rect.bottom + window.scrollY}px`;
  tooltip.style.visibility = 'visible';
  tooltip.style.opacity = 1;

  // Hide the tooltip
  setTimeout(() => {
    tooltip.style.opacity = 0;
    tooltip.style.visibility = 'hidden';
  }, 900);
}
