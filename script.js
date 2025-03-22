//Get all the DOMS
const result = document.querySelector('#passwordDisplay');

const lengthEl = document.querySelector('#length');

const useUpperCase = document.querySelector('#useUpperCase');

const useLowerCase = document.querySelector('#useLowerCase');

const useNumber = document.querySelector('#useNumber');

const useSymbol = document.querySelector('#useSymbols');

const useSpecialChar = document.querySelector('#useSpecialChars');

const clipboard = document.querySelector('.clipboard');

const generate = document.querySelector('.generate');


// Create an object 
const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

//Listen for event
generate.addEventListener('click', () => {
    
    const length = +lengthEl.value;
    const hasUpper = useUpperCase.checked;
    const hasLower = useLowerCase.checked;
    const hasNumber = useNumber.checked;
    const hasSymbol = useSymbol.checked;
   
    result.innerText = generatePassword (
        hasNumber,
        hasUpper,
        hasLower,
        hasSymbol,    
        length,
    ); 
});

// Copy password to clipboard
clipboard.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = result.innerText;

    if(!password) {
        return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    setTimeout(function() {
        alert('Password copied to clipboard');
    }, 1000)
});

 // Generate password function 
 function generatePassword(lower, upper, number, symbol, length) {
        let generatedPassword = "";
        const typeCount = lower + upper + number + symbol;
        
        const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(
            items => Object.values(items)[0]
        );
        
        if(typeCount === 0){
            return "";
        };
        
        for(i = 0; i < length; i += typeCount){
            typesArr.forEach(type => {
                const funcName = Object.keys(type)[0];
                //console.log(funcName);
                generatedPassword += randomFunc[funcName]();
            });
        }
        
        const finalPassword = generatedPassword.slice(0, length);
        
        return finalPassword;     
    }

//Generator functions 
function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 98);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 10 ) + 48);
}

function getRandomSymbol() {
    const symbols = "!@#$%^&*()_+{}[]<>?";
    return symbols[Math.floor(Math.random() * symbols.length)];
}