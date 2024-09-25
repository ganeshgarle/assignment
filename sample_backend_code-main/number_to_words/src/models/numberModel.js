// src/models/numberModel.js
function convertToWords(number) {
    const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  
    if (number === 0) return 'zero';
    if (number <= 0) return '';
    if (number >= 1000) return '';
  
    let words = '';
    if (number >= 100) {
      words += ones[Math.floor(number / 100)] + ' hundred ';
      number %= 100;
    }
    if (number >= 20) {
      words += tens[Math.floor(number / 10)] + ' ';
      number %= 10;
    }
    if (number >= 10) {
      words += teens[number - 10];
      number = 0;
    }
    if (number > 0) {
      words += ones[number];
    }
  
    return words.trim();
  }
  
  module.exports = { convertToWords };
  