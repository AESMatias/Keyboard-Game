"use strict";
let lorem_text = "The enigmatic moon cast its silver glow upon the tranquil lake";
const loremTextArray = lorem_text.split('');
let actualArrayIndex = 0;
let initialTime = Date.now();
let writtingWords = String('');
let writingIndexRight = 0;
let writingIndexWrong = 0;
let wordsLeft = lorem_text.split(' ').length - 1;
let finishedStatus = false;
let arrayOfRightAttempts = [];
let arrayOfWrongAttempts = [];
let incorrectAttemptsInRow = 0;
let correctAttemptsInRow = 0;
const wordToWrite = document.getElementById("word-to-write");
wordToWrite.textContent = lorem_text;
let actualWord = document.getElementById("actual-text");
let currentWritedWord = document.getElementById("current-writed-word");
let newWritedWord = currentWritedWord.textContent.slice(0, -1);
let wordsLeftParagraph = document.getElementById("words-left");
wordsLeftParagraph.textContent = `Words left: ${wordsLeft}`;
document.querySelectorAll('#to-fill').forEach(div => {
    for (let i = 0; i < 40; i++) {
        let child = document.createElement('p');
        child.textContent = `Number ${i} `;
        div.appendChild(child);
    }
});
document.addEventListener("keydown", function (event) {
    let pressedKey = event.key;
    if (pressedKey != 'F5') {
        event.preventDefault();
    }
    if (pressedKey == 'Enter' || finishedStatus == true || pressedKey == 'CapsLock' ||
        pressedKey == 'Tab' || pressedKey == 'Shift' || pressedKey == 'Alt' || pressedKey == 'Control' ||
        pressedKey == 'Meta' || pressedKey == 'Escape' || pressedKey == 'ArrowLeft' || pressedKey == 'ArrowRight' ||
        pressedKey == 'ArrowUp' || pressedKey == 'ArrowDown' || pressedKey == 'Delete') {
        return;
    }
    let isDoubleSpace = checkDoubleSpace();
    if (isDoubleSpace == true && pressedKey == ' ') {
        console.warn('The user has been pressed double space, so we return and nothing happend');
        return;
    }
    ;
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
        if (writingIndexRight == lorem_text.length) {
            console.log("You finished the text");
            alert("You finished the text");
            finishedStatus = true;
            const finalTime = Date.now();
            const timeElapsed = (finalTime - initialTime) / 1000;
            alert(`Your final score is: ${"rightPuntuation"} and took you ${timeElapsed} seconds!`);
            return;
        }
    }
    else {
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
    if (writingIndexRight == writingIndexWrong) {
        if (currentWritedWord.textContent.slice(-1) != actualWord.textContent.slice(-1)) {
            alert(' NOOOOOOOOOOOOOOOOOOOOOO');
            newWritedWord = currentWritedWord.textContent.slice(0, -1);
            currentWritedWord.textContent = newWritedWord;
            writingIndexWrong -= (writingIndexWrong > 0) ? 1 : 0;
        }
        else if (currentWritedWord.textContent.slice(-1) == actualWord.textContent.slice(-1)) {
            writtingWords = writtingWords.slice(0, -1);
            actualWord.textContent = writtingWords;
            writingIndexRight-- ? (writingIndexRight) > 0 : writingIndexRight = 0;
            writingIndexWrong -= (writingIndexWrong > 0) ? 1 : 0;
            newWritedWord = currentWritedWord.textContent.slice(0, -1);
            currentWritedWord.textContent = newWritedWord;
        }
    }
    else if (writingIndexWrong > writingIndexRight) {
        console.warn('NO MISMOS INDICES');
        console.warn('wrong word');
        newWritedWord = currentWritedWord.textContent.slice(0, -1);
        currentWritedWord.textContent = newWritedWord;
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
    }
    else if (pressedKey == 'Backspace') {
        deleteLastWord();
    }
}
function checkWordInArray(letter, arrayIndex) {
    console.log('check word array', letter, arrayIndex);
    if (letter == ' ' && (writingIndexRight == writingIndexWrong)) {
        actualArrayIndex++;
        if (wordsLeft > 0) {
            wordsLeft--;
            console.log('words left', wordsLeft);
        }
        else {
        }
    }
}
function checkKey(key, index) {
    console.error("Index", index);
    if (key == lorem_text[index] && !finishedStatus && (writingIndexRight == writingIndexWrong)) {
        wordsLeftParagraph.textContent = `Words left: ${wordsLeft} `;
        checkWordInArray(key, actualArrayIndex);
        if (!initialTime) {
            initialTime = Date.now();
        }
        return true;
    }
    else {
        console.warn('wrong letter');
        return false;
    }
}
function checkDoubleSpace() {
    if ((currentWritedWord.textContent.slice(-1) == ' ' || actualWord.textContent.slice(-1) == ' ')
        && (writingIndexRight != 0 && writingIndexWrong != 0)) {
        arrayOfRightAttempts.push(correctAttemptsInRow);
        correctAttemptsInRow = 0;
        return true;
    }
    else {
        return false;
    }
}
