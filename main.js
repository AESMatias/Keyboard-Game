let lorem_text = "The enigmatic moon cast its silver glow upon the tranquil lake"

const loremTextArray = lorem_text.split('')
let actualArrayIndex = 0 // Index of the array of the actual word

let initialTime
let writtingWords = String('')
let writingIndexRight = 0
let writingIndexWrong = 0
let wordsLeft = lorem_text.split(' ').length - 1
let finishedStatus = false

let arrayOfRightAttempts = [];// Contains all the right attempts in a row
let arrayOfWrongAttempts = [];// Contains all the wrong attempts in a row

// Counter of correct and wrong attempts
let incorrectAttemptsInRow = 0
let correctAttemptsInRow = 0

// we get the paragraph with id word-to-write and write the lorem text inside it
const wordToWrite = document.getElementById("word-to-write");
wordToWrite.textContent = lorem_text;

let actualWord = document.getElementById("actual-text");
let currentWritedWord = document.getElementById("current-writed-word");

// We get the words left paragraph
let wordsLeftParagraph = document.getElementById("words-left");
wordsLeftParagraph.textContent = `Words left: ${wordsLeft}`;

// We fill the divs
document.querySelectorAll('#to-fill').forEach(div => {
    for (let i = 0; i < 10; i++) {
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
    if (pressedKey == 'Enter' || finishedStatus == true || pressedKey == 'CapsLock' ||
        pressedKey == 'Tab' || pressedKey == 'Shift' || pressedKey == 'Alt' || pressedKey == 'Control' ||
        pressedKey == 'Meta' || pressedKey == 'Escape' || pressedKey == 'ArrowLeft' || pressedKey == 'ArrowRight' ||
        pressedKey == 'ArrowUp' || pressedKey == 'ArrowDown' || pressedKey == 'Delete') {
        // If the user press press some invalid key or has finished the text, we return
        return;
    }
    isDoubleSpace = checkDoubleSpace();
    // We check if the user pressed space twice
    if (isDoubleSpace == true && pressedKey == ' ') {
        console.warn('The user has been pressed double space, so we return and nothing happend');
        return;
    };
    currentWrited(pressedKey);

    if (checkKey(pressedKey, writingIndexRight)) {
        writtingWords += pressedKey;
        actualWord.textContent = writtingWords;
        writingIndexRight++;
        writingIndexWrong++;
        console.log("Correct key");
        correctAttemptsInRow++;
        arrayOfWrongAttempts.push(incorrectAttemptsInRow);
        incorrectAttemptsInRow = 0;
        // Checking if the key is the last one of the entire text
        if (writingIndexRight == lorem_text.length) {
            console.log("You finished the text");
            alert("You finished the text");
            finishedStatus = true;
            let rightPuntuation = arrayOfRightAttempts.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
            let wrongPuntuation = lorem_text.length - rightPuntuation;
            const finalTime = new Date();
            let timeElapsed = finalTime - initialTime;
            timeElapsed = timeElapsed / 1000;
            alert(`Your final score is: ${rightPuntuation} and took you ${timeElapsed} seconds!`);
            return;

        }
    } else {
        // If the pressedKey is not Backspace, means that we have one more wrong attempt
        if (pressedKey != 'Backspace') {
            writingIndexWrong++;
            incorrectAttemptsInRow++;
            arrayOfRightAttempts.push(correctAttemptsInRow);
            correctAttemptsInRow = 0;
            console.log("Wrong key");
        }
    }
    console.log("Correct attempts in row:", correctAttemptsInRow);
    console.log("Incorrect attempts in row:", incorrectAttemptsInRow);
    console.error('current right index', writingIndexRight);
    console.error('current wrong index', writingIndexWrong);

});

function deleteLastWord() {
    //if the index of the right word and the wrong are the same, then:
    if (writingIndexRight == writingIndexWrong) {
        if (currentWritedWord.textContent.slice(-1) != actualWord.textContent.slice(-1)) {
            alert(' NOOOOOOOOOOOOOOOOOOOOOO');
            // We delete the last character of the current writed word
            newWritedWord = currentWritedWord.textContent.slice(0, -1);
            currentWritedWord.textContent = newWritedWord;
            // writingIndexWrong-- ? (writingIndexWrong) > 0 : writingIndexWrong = 0;
            writingIndexWrong -= (writingIndexWrong > 0) ? 1 : 0;

        } else if (currentWritedWord.textContent.slice(-1) == actualWord.textContent.slice(-1)) {

            //First, we check if the word is the right or not
            writtingWords = writtingWords.slice(0, -1);
            actualWord.textContent = writtingWords;
            writingIndexRight-- ? (writingIndexRight) > 0 : writingIndexRight = 0;
            writingIndexWrong -= (writingIndexWrong > 0) ? 1 : 0;

            // TODO: WRONG WORDS
            newWritedWord = currentWritedWord.textContent.slice(0, -1);
            currentWritedWord.textContent = newWritedWord;
            // writingIndexWrong-- ? (writingIndexWrong) > 0 : writingIndexWrong = 0;

        }

    }
    else if (writingIndexWrong > writingIndexRight) {
        // If the writting index wrong is bigger than the right one,
        // this means that we have more wrong words than right ones
        console.warn('NO MISMOS INDICES');
        console.warn('wrong word');
        // We delete the last character of the current writed word
        newWritedWord = currentWritedWord.textContent.slice(0, -1);
        currentWritedWord.textContent = newWritedWord;
        // writingIndexWrong-- ? (writingIndexWrong) > 0 : writingIndexWrong = 0;
        writingIndexWrong -= (writingIndexWrong > 0) ? 1 : 0;



    }
}

function currentWrited(pressedKey) {
    if (pressedKey != 'Backspace' && pressedKey != 'Enter' &&
        pressedKey != 'Shift' && pressedKey != 'Alt' && pressedKey != 'Control' &&
        pressedKey != 'CapsLock' && pressedKey != 'Tab' && pressedKey != 'Meta' &&
        pressedKey != 'Escape' && pressedKey != 'ArrowLeft' &&
        pressedKey != 'ArrowRight' && pressedKey != 'ArrowUp' &&
        pressedKey != 'ArrowDown' && pressedKey != 'Delete') {
        currentWritedWord.textContent += pressedKey;
    } else if (pressedKey == 'Backspace') {
        deleteLastWord();
    }
}

function checkWordInArray(letter, arrayIndex) {
    console.log('check word array', letter, arrayIndex);
    // Check if the word is finished below
    if (letter == ' ' && letter != ',' &&
        letter != '.' && letter != ';' && letter != ':' &&
        letter != '!' && letter != '?' && letter != '¿' && letter != '¡' &&
        writingIndexRight == writingIndexWrong) {
        actualArrayIndex++; // These are the words that we have already written
        if (wordsLeft > 0) {
            wordsLeft--;
            console.log('words left', wordsLeft);
        } else {
            // TODO:
            // alert('You finished the text???? FIX THIS!');
        }
    }
}

function checkKey(key, index) {
    console.error("Index", index);
    if (key == lorem_text[index] && !finishedStatus && (writingIndexRight == writingIndexWrong)) {
        //Check if the word is finished
        wordsLeftParagraph.textContent = `Words left: ${wordsLeft} `;
        checkWordInArray(key, actualArrayIndex);
        if (!initialTime) {
            initialTime = Date.now();
        }
        return true;
    } else {
        console.warn('wrong letter');
        return false;
    }
}

function checkDoubleSpace() {
    if ((currentWritedWord.textContent.slice(-1) == ' ' || actualWord.textContent.slice(-1) == ' ')
        && (writingIndexRight != 0 && writingIndexWrong != 0)) {
        // The user lost the all attempts in a row
        arrayOfRightAttempts.push(correctAttemptsInRow);
        correctAttemptsInRow = 0;
        return true;
        // // We delete the last character of the current writed word
        // newWritedWord = currentWritedWord.textContent.slice(0, -1);
        // currentWritedWord.textContent = newWritedWord;
        // // writingIndexWrong-- ? (writingIndexWrong) > 0 : writingIndexWrong = 0;
        // writingIndexWrong -= (writingIndexWrong > 0) ? 1 : 0;
    }
    else {
        return false;
    }
}