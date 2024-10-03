const vatCalculator = document.getElementById('vat-calculator');
vatCalculator.innerHTML = /* html */ `
<h1>VAT Calculator</h1>
<table>
  <tr>
    <td>VAT Percentage (%):</td>
    <td>
      <input type="number" id="vatPercentage" value="24" />
    </td>
  </tr>
  <tr>
    <td>Price Without VAT:</td>
    <td>
      <input type="number" id="priceWithoutVAT" />
    </td>
    <td id="resultWithoutVAT" class="result">€0.00</td>
  </tr>
  <tr>
    <td>Price With VAT:</td>
    <td>
      <input type="number" id="priceWithVAT" />
    </td>
    <td id="resultWithVAT" class="result">€0.00</td>
  </tr>
  <tr>
    <td>VAT Amount:</td>
    <td></td>
    <td id="resultVAT" class="result">€0.00</td>
  </tr>
</table>
<div id="calculate">Live results as you type</div>
`;

const vatPercentageInput = document.getElementById('vatPercentage');
const priceWithoutVATInput = document.getElementById('priceWithoutVAT');
const priceWithVATInput = document.getElementById('priceWithVAT');
const resultWithoutVAT = document.getElementById('resultWithoutVAT');
const resultWithVAT = document.getElementById('resultWithVAT');
const resultVAT = document.getElementById('resultVAT');

vatPercentageInput.addEventListener('input', handleVATInput);
priceWithoutVATInput.addEventListener('input', calculateVAT);
priceWithVATInput.addEventListener('input', calculateVAT);

resultWithoutVAT.addEventListener('click', () =>
  copyToClipboard(resultWithoutVAT)
);
resultWithVAT.addEventListener('click', () => copyToClipboard(resultWithVAT));
resultVAT.addEventListener('click', () => copyToClipboard(resultVAT));

function handleVATInput() {
  let vatPercentage = parseFloat(vatPercentageInput.value);
  if (vatPercentage < 0) {
    vatPercentageInput.value = '';
  }
  calculateVAT();
}

function calculateVAT() {
  let vatPercentage = parseFloat(vatPercentageInput.value);
  const priceWithoutVATValue = parseFloat(priceWithoutVATInput.value);
  const priceWithVATValue = parseFloat(priceWithVATInput.value);

  if (isNaN(vatPercentage) || vatPercentage < 0) {
    vatPercentage = 0;
  }

  let priceWithoutVAT, priceWithVAT, vatAmount;

  if (!isNaN(priceWithoutVATValue) && priceWithoutVATValue > 0) {
    // Calculate based on price without VAT
    priceWithoutVAT = priceWithoutVATValue;
    vatAmount = (priceWithoutVAT * vatPercentage) / 100;
    priceWithVAT = priceWithoutVAT + vatAmount;
  } else if (!isNaN(priceWithVATValue) && priceWithVATValue > 0) {
    // Calculate based on price with VAT
    priceWithVAT = priceWithVATValue;
    vatAmount = (priceWithVAT * vatPercentage) / (100 + vatPercentage);
    priceWithoutVAT = priceWithVAT - vatAmount;
  } else {
    // If neither input is valid, reset the results to zero
    priceWithoutVAT = 0;
    priceWithVAT = 0;
    vatAmount = 0;
  }

  // Display the results
  resultWithoutVAT.innerText = `€${formatNumber(priceWithoutVAT, threshold)}`;
  resultWithVAT.innerText = `€${formatNumber(priceWithVAT, threshold)}`;
  resultVAT.innerText = `€${formatNumber(vatAmount, threshold)}`;
}
