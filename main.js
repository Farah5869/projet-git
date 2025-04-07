// Hangman game data
const words = ["JAVASCRIPT", "HANGMAN", "DEVELOPER", "KEYBOARD", "MONITOR", "PROGRAMMING", "COMPUTER"];
let selectedWord = "";
let guessedLetters = [];
let wrongLetters = [];
let remainingGuesses = 6;
let gameOver = false;

// Hangman drawing stages
const hangmanStages = [
    `
       _______
      |/      |
      |      
      |      
      |       
      |      
      |
     _|___`,
    `
       _______
      |/      |
      |      (_)
      |      
      |       
      |      
      |
     _|___`,
    `
       _______
      |/      |
      |      (_)
      |       |
      |       |
      |      
      |
     _|___`,
    `
       _______
      |/      |
      |      (_)
      |      \\|
      |       |
      |      
      |
     _|___`,
    `
       _______
      |/      |
      |      (_)
      |      \\|/
      |       |
      |      
      |
     _|___`,
    `
       _______
      |/      |
      |      (_)
      |      \\|/
      |       |
      |      / 
      |
     _|___`,
    `
       _______
      |/      |
      |      (_)
      |      \\|/
      |       |
      |      / \\
      |
     _|___`
];

// DOM elements
const wordDisplay = document.getElementById("word-display");
const hangmanDrawing = document.getElementById("hangman-drawing");
const keyboard = document.getElementById("keyboard");
const remainingGuessesDisplay = document.getElementById("remaining-guesses");
const wrongLettersDisplay = document.getElementById("wrong-letters");
const resetBtn = document.getElementById("reset-btn");

// Initialize the game
function initGame() {
    // Reset game state
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    wrongLetters = [];
    remainingGuesses = 6;
    gameOver = false;
    
    // Update UI
    updateWordDisplay();
    updateHangmanDrawing();
    updateKeyboard();
    updateGameInfo();
    
    // Create keyboard buttons
    createKeyboard();
}

// Create keyboard buttons
function createKeyboard() {
    keyboard.innerHTML = "";
    for (let i = 65; i <= 90; i++) {
        const letter = String.fromCharCode(i);
        const button = document.createElement("button");
        button.textContent = letter;
        button.addEventListener("click", () => handleGuess(letter));
        keyboard.appendChild(button);
    }
}

// Handle letter guess
function handleGuess(letter) {
    if (gameOver || guessedLetters.includes(letter)) return;
    
    guessedLetters.push(letter);
    
    if (selectedWord.includes(letter)) {
        // Correct guess
        if (isWordGuessed()) {
            endGame(true);
        }
    } else {
        // Wrong guess
        wrongLetters.push(letter);
        remainingGuesses--;
        
        if (remainingGuesses <= 0) {
            endGame(false);
        }
    }
    
    updateWordDisplay();
    updateHangmanDrawing();
    updateKeyboard();
    updateGameInfo();
}

// Check if word is completely guessed
function isWordGuessed() {
    return selectedWord.split("").every(letter => guessedLetters.includes(letter));
}

// Update the word display with underscores and guessed letters
function updateWordDisplay() {
    wordDisplay.innerHTML = selectedWord
        .split("")
        .map(letter => guessedLetters.includes(letter) ? letter : "_")
        .join(" ");
}

// Update the hangman drawing
function updateHangmanDrawing() {
    const stageIndex = 6 - remainingGuesses;
    hangmanDrawing.textContent = hangmanStages[stageIndex];
}

// Update the keyboard buttons (disable guessed letters)
function updateKeyboard() {
    const buttons = keyboard.querySelectorAll("button");
    buttons.forEach(button => {
        const letter = button.textContent;
        button.disabled = guessedLetters.includes(letter);
    });
}

// Update the game info display
function updateGameInfo() {
    remainingGuessesDisplay.textContent = remainingGuesses;
    wrongLettersDisplay.textContent = wrongLetters.join(", ");
}

// End the game
function endGame(won) {
    gameOver = true;
    if (won) {
        wordDisplay.innerHTML = `<span class="win-message">Congratulations! You won! The word was ${selectedWord}.</span>`;
    } else {
        wordDisplay.innerHTML = `<span class="lose-message">Game Over! The word was ${selectedWord}.</span>`;
    }
}

// Event listener for reset button
resetBtn.addEventListener("click", initGame);

// Initialize the game when page loads
window.addEventListener("DOMContentLoaded", initGame);
