// script.js
function luhnAlgorithm(cardNumber) {
    let sum = 0;
    let shouldDouble = false;

    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber[i]);

        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }

        sum += digit;
        shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
}

function getCardType(cardNumber) {
    if (cardNumber.startsWith('4')) {
        return 'Visa';
    } else if (cardNumber.startsWith('5')) {
        return 'Mastercard';
    } else {
        return 'Bilinmeyen Kart Tipi';
    }
}

function displayCardLogo(cardType) {
    const cardLogo = document.getElementById('cardLogo');

    if (cardType === 'Visa') {
        cardLogo.src = 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg';
        cardLogo.style.display = 'block';
    } else if (cardType === 'Mastercard') {
        cardLogo.src = 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg';
        cardLogo.style.display = 'block';
    } else {
        cardLogo.style.display = 'none';
    }
}

function checkCard() {
    const cardNumber = document.getElementById('cardNumber').value;
    const resultDiv = document.getElementById('result');

    if (!/^\d+$/.test(cardNumber)) {
        resultDiv.textContent = "Lütfen yalnızca sayılardan oluşan bir kart numarası girin.";
        resultDiv.style.color = "orange";
        displayCardLogo(''); // Logoyu gizlemek için
        return;
    }

    const cardType = getCardType(cardNumber);
    const isValid = luhnAlgorithm(cardNumber);

    displayCardLogo(cardType);

    if (isValid) {
        resultDiv.textContent = `${cardType} Kart Numarası Geçerli ✅`;
        resultDiv.style.color = "lightgreen";
    } else {
        resultDiv.textContent = `${cardType} Kart Numarası Geçersiz ❌`;
        resultDiv.style.color = "red";
    }
}

// Hem "Enter" tuşuna basınca hem de butona tıklayınca kontrol etme
document.getElementById('cardNumber').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        checkCard();
    }
});
