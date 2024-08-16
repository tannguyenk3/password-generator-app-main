document.addEventListener('DOMContentLoaded', () => {
    const charLengthSlider = document.querySelector('.char-length-slider');
    const amountChar = document.querySelector('.amount-char');

    const generateButton = document.querySelector('.btn');

    const randomCharDisplay = document.querySelector('.random-char');
    const copyIcon = document.querySelector('.icon-copy');

    const levelStrength = document.querySelector('.level-strength');
    const levelBars = document.querySelectorAll('.bar');


    //Display number length of Silder
    charLengthSlider.addEventListener('input', () => {
        amountChar.textContent = charLengthSlider.value;
    });


    //Display random passwords 
    generateButton.addEventListener('click', () => {
        const charLength = parseInt(charLengthSlider.value);
        const includeUppercase = document.getElementById('uppercase').checked;
        const includeLowercase = document.getElementById('lowercase').checked;
        const includeNumbers = document.getElementById('numbers').checked;
        const includeSymbols = document.getElementById('symbols').checked;

        if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
            randomCharDisplay.textContent = 'Select at least one option';
            return;
        }

        const password = generatePassword(charLength, includeUppercase, includeLowercase, includeNumbers, includeSymbols);
        randomCharDisplay.textContent = password;
        updateStrengthLevel(charLength);
    });

    //Copied 
    copyIcon.addEventListener('click', () => {
        const password = randomCharDisplay.textContent;
        if (password && password !== 'Select at least one option') {
            navigator.clipboard.writeText(password);
            alert('Password copied to clipboard!');
        }
    });


    //set up for characters 
    function generatePassword(length, uppercase, lowercase, numbers, symbols) {
        const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
        const numberChars = '0123456789';
        const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?';
        let allChars = '';
        let password = '';

        if (uppercase) allChars += uppercaseChars;
        if (lowercase) allChars += lowercaseChars;
        if (numbers) allChars += numberChars;
        if (symbols) allChars += symbolChars;

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * allChars.length);
            password += allChars[randomIndex];
        }
        return password;
    }


    // set up bars level
    function updateStrengthLevel(length) {
        let strengthColor = '';

        if (length >= 1 && length <= 4) {
            strengthColor = '#f74b4b';
        } else if (length >= 5 && length <= 10) {
            strengthColor = '#fb7a56';
        } else if (length >= 11 && length <= 15) {
            strengthColor = '#f8cb63';
        } else if (length >= 16 && length <= 20) {
            strengthColor = '#a3ffae';
        }

        levelBars.forEach((bar, index) => {
            bar.style.backgroundColor = index < Math.ceil(length / 5) ? strengthColor : '';
        });

        levelStrength.querySelector('.level').textContent = getStrengthLabel(length);
        levelStrength.querySelector('.level').style.color = strengthColor;
    }


    // display level of password
    function getStrengthLabel(length) {
        if (length >= 1 && length <= 4) return 'Too Weak!';
        if (length >= 5 && length <= 10) return 'Weak';
        if (length >= 11 && length <= 15) return 'Medium';
        return 'Strong';
    }
});
