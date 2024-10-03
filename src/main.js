const formatNumber = (num, threshold) => {
  // Convert to exponential if above threshold
  if (Math.abs(num) >= threshold) {
    return num.toExponential(2);
  } else {
    if (num === 0) {
      return '0.00';
    } else {
      const formattedNum = addCommas(Math.abs(Math.round(num)));
      if (num % 1 !== 0) {
        const decimalPart = Math.abs(num).toString().split('.')[1] || '00';
        return `${formattedNum}.${decimalPart.slice(0, 2)}`;
      } else {
        return formattedNum;
      }
    }
  }
};

const addCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

let threshold = 99999999; // Threshold for exponential notation

const copyToClipboard = (td) => {
  const textToCopy = td.innerText.slice(1); // Exclude the Euro sign

  const tempTextarea = document.createElement('textarea');
  tempTextarea.value = textToCopy;
  document.body.appendChild(tempTextarea);

  tempTextarea.select();
  tempTextarea.setSelectionRange(0, 99999); // For mobile devices

  document.execCommand('copy');
  document.body.removeChild(tempTextarea);

  showTooltip(td);
};

const showTooltip = (td) => {
  const tooltip = document.getElementById('tooltip');
  tooltip.innerText = `Copied!`;
  const rect = td.getBoundingClientRect();
  tooltip.style.left = `${rect.left + window.scrollX}px`;
  tooltip.style.top = `${rect.bottom + window.scrollY}px`;
  tooltip.style.visibility = 'visible';
  tooltip.style.opacity = 1;

  setTimeout(() => {
    tooltip.style.opacity = 0;
    tooltip.style.visibility = 'hidden';
  }, 900);
};
