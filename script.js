let lorem_text = "lorem ipsum dolor sit abc aaaa ma"

var loremTextArray = lorem_text.split('')
let actualArrayIndex = 0 // Index of the array of the actual word

let writtingWords = String('')
let writingIndex = 0
let wordsLeft = lorem_text.split(' ').length - 1
let finishedStatus = false

// Counter of correct and wrong attempts
let incorrectAttemptsInRow = 0
let correctAttemptsInRow = 0

// we get the paragraph with id word-to-write and write the lorem text inside it
var wordToWrite = document.getElementById("word-to-write");
wordToWrite.textContent = lorem_text;

let actualWord = document.getElementById("actual-text");
let currentWritedWord = document.getElementById("current-writed-word");

// We get the words left paragraph
let wordsLeftParagraph = document.getElementById("words-left");
wordsLeftParagraph.textContent = `Words left: ${wordsLeft}`;

// We fill the divs
document.querySelectorAll('#to-fill').forEach(div => {
    for (let i = 0; i < 50; i++) {
        //creamos un child 
        let child = document.createElement('p');
        child.textContent = `Number ${i}`;
        div.appendChild(child);
    }
});

// Check the key pressed
document.addEventListener("keydown", function (event) {

    let pressedKey = event.key;
    if (pressedKey != 'F5') {
        event.preventDefault();
    }
    currentWrited(pressedKey);

    if (checkKey(pressedKey, writingIndex)) {
        writtingWords += pressedKey;
        actualWord.textContent = writtingWords;
        writingIndex++;
        console.log("Correct key");
        correctAttemptsInRow++;
        incorrectAttemptsInRow = 0;
        // Checking if the key is the last one of the entire text
        if (writingIndex == lorem_text.length) {
            console.log("You finished the text");
            alert("You finished the text");
            finishedStatus = true;
            return;

        }
    } else {
        console.log("Wrong key");
        incorrectAttemptsInRow++;
        correctAttemptsInRow = 0;
    }
    console.log("Correct attempts in row:", correctAttemptsInRow);
    console.log("Incorrect attempts in row:", incorrectAttemptsInRow);
});

function currentWrited(pressedKey) {
    if (pressedKey != 'Backspace' && pressedKey != 'Enter' &&
        pressedKey != 'Shift' && pressedKey != 'Alt' && pressedKey != 'Control' &&
        pressedKey != 'CapsLock' && pressedKey != 'Tab' && pressedKey != 'Meta' &&
        pressedKey != 'Escape' && pressedKey != 'ArrowLeft' &&
        pressedKey != 'ArrowRight' && pressedKey != 'ArrowUp' &&
        pressedKey != 'ArrowDown' && pressedKey != 'Delete') {
        currentWritedWord.textContent += pressedKey;
    }
}

function checkWordInArray(word, arrayIndex) {
    console.log('check word array', word, arrayIndex);
    // Check if the word is finished below
    if (word == ' ' && word != ',' &&
        word != '.' && word != ';' && word != ':' &&
        word != '!' && word != '?') {
        console.log('space after a right word attempt');
        actualArrayIndex++; // These are the words that we have already written
        if (wordsLeft > 0) {
            wordsLeft--;
            console.log('words left', wordsLeft);
        } else {
            // TODO:
            console.log('You finished the text????');
        }
    }
}

function checkKey(key, index) {
    console.error("Index", index);
    if (key == lorem_text[index]) {
        //Check if the word is finished
        wordsLeftParagraph.textContent = `Words left: ${wordsLeft} `;
        checkWordInArray(key, actualArrayIndex)
        return true;
    } else {
        return false;
    }
}
