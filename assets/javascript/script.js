// HTML Selectors
// Screen Selectors
let introScreen = document.querySelector("#intro-container");
let multiChoice = document.querySelector("#multiple-choice-container");
let resultsScreen = document.querySelector("#results-container");
// Multichoice Section
let question = document.querySelector(".MC-question");
let wait = document.querySelector("#wait-prompts");
let timer = document.querySelector("#time-left");
let timerPrompt = document.querySelector("#timerprompt");
let answers = document.querySelector("#MC-answers");
let userGuess = document.querySelectorAll(".answer");
let pass = document.querySelector("#pass");
// Results Section
let judgement = document.querySelector("#results-judge");
let beginGameButton = document.querySelector("#results-header");
let correctAnswersTotal = document.querySelector("#AO-current-correct");
let incorrectAnswersTotal = document.querySelector("#AO-current-incorrect");
let initialsSaved = document.querySelector("#initials");
let enteredInitials = document.querySelector("#enteredInitials");
let highestScore = document.querySelector("#highest-score");
let nextHighestScore = document.querySelector("#second-highest");
let currentScore = document.querySelector("#saved-current-score");
let saveInitials = document.querySelector("#save-initials");
let clearHistory = document.querySelector("#clear-history");
let cancelGame = document.querySelector("#cancelGame");
let outcome = document.querySelector("#answers-outcome");

// Questions and Answers
const qAndA = [
    {
        question: "Select all h3 tags",
        answer1: "querySelector(\"h3\");",
        answer2: "document.getElementById(\"h3\");",
        answer3: "document.querySelectorAll(\"h3\");",
        answer4: "element.getElementById(\"h3-tag\");",
    },
    {
        question: "Set timeout for 10 seconds",
        answer1: "document.startTimeout(function {}, 1000)",
        answer2: "setTimeout(function {}, 10000)",
        answer3: "querySelector(timeout, 10s)",
        answer4: "element.startTimeout.10s",
    },
    {
        question: "Set \"display\" of tag with id \"main\"",
        answer1: "#main { display }",
        answer2: "document.getElementByClassName(\".main\");",
        answer3: "document.querySelector(\"#main\").style = \"\";",
        answer4: "docElement.style.display = \"\";",
    },
    {
        question: "What javascript syntax creates an object?",
        answer1: "const array = {};",
        answer2: "let object = [];",
        answer3: "var style = \"\"",
        answer4: "const person = [{}]",
    },
    {
        question: "Add eventListener to \"p\" and call \"a function\"",
        answer1: "function.addEventListener(\"click\");",
        answer2: "p.addEventListener(\"click\", function(){});",
        answer3: "document.addEventListener(\"click\", \"p\");",
        answer4: "p.addEventListener(\"click\", anonymous)",
    }
];

// Create a randomised array from qAndA
const createRandomQuestions = () => {
    let randomisedArray = qAndA
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

    return randomisedArray;
};

// Default Variables
let initialsEntered = "";
let questionsCorrect = 0;
let questionsIncorrect = 0;

let highScore = JSON.parse(localStorage.getItem("highScore"));
if (highScore != null) {
    highestScore.childNodes[1].childNodes[1].innerHTML = highScore.initials;
    highestScore.childNodes[3].childNodes[1].innerHTML = highScore.correct;
    highestScore.childNodes[5].childNodes[1].innerHTML = highScore.incorrect;
}

let nextHighest = JSON.parse(localStorage.getItem("nextHighest"));
if (nextHighest != null) {
    nextHighestScore.childNodes[1].childNodes[1].innerHTML = nextHighest.initials;
    nextHighestScore.childNodes[3].childNodes[1].innerHTML = nextHighest.correct;
    nextHighestScore.childNodes[5].childNodes[1].innerHTML = nextHighest.incorrect;
}
let newestSave;

let timeToGuess = 15; 
let clickTimeout = 0;
let correctGuess = false;
let passed = false;
let skipped = true;

let questionsSet = createRandomQuestions(); 
let setQuestion = "";

// Set local storage with results and print to screen
const saveScore = () => {
    initialsEntered = enteredInitials.textContent;
    initialsSaved.setAttribute("readonly", "");
    saveInitials.disabled = true;
    
    if (highScore == null) {

        highScore = newestSave;
        localStorage.setItem("highScore", JSON.stringify(highScore));
        highestScore.childNodes[1].childNodes[1].innerHTML = highScore.initials;
        highestScore.childNodes[3].childNodes[1].innerHTML = highScore.correct;
        highestScore.childNodes[5].childNodes[1].innerHTML = highScore.incorrect;

    } else if (highScore.correct < newestSave.correct) {

        highScore = newestSave;
        nextHighest = JSON.parse(localStorage.getItem("highScore"));
        nextHighestScore.childNodes[1].childNodes[1].innerHTML = nextHighest.initials;
        nextHighestScore.childNodes[3].childNodes[1].innerHTML = nextHighest.correct;
        nextHighestScore.childNodes[5].childNodes[1].innerHTML = nextHighest.incorrect;
        highestScore.childNodes[1].childNodes[1].innerHTML = highScore.initials;
        highestScore.childNodes[3].childNodes[1].innerHTML = highScore.correct;
        highestScore.childNodes[5].childNodes[1].innerHTML = highScore.incorrect;

        localStorage.setItem("highScore", JSON.stringify(highScore));
        localStorage.setItem("nextHighest", JSON.stringify(nextHighest));
    } 
    
    if (nextHighest == null) {
        
        if (highScore.correct > newestSave.correct) {
            nextHighest = newestSave;
            localStorage.setItem("nextHighest", JSON.stringify(nextHighest));
            nextHighestScore.childNodes[1].childNodes[1].innerHTML = nextHighest.initials;
            nextHighestScore.childNodes[3].childNodes[1].innerHTML = nextHighest.correct;
            nextHighestScore.childNodes[5].childNodes[1].innerHTML = nextHighest.incorrect;
        }

    } 

    enteredInitials.textContent = "";
    initialsSaved.value = "";
}

// Print initials input 
const updateInitials = (event) => {
    enteredInitials.textContent = event.target.value;
}

// Display current results and judge player >:)
const tallyResults = () => {
    correctAnswersTotal.innerHTML = questionsCorrect;
    incorrectAnswersTotal.innerHTML = questionsIncorrect;
    

    if (questionsCorrect < 3) {
        judgement.innerHTML = "Try again (:";
    } else if (questionsCorrect === 3) {
        judgement.innerHTML = "Nice Attempt";
    } else if (questionsCorrect === 4) {
        judgement.innerHTML = "Well Done";
    } else if (questionsCorrect === 5) {
        judgement.innerHTML = "Perfect Score!";
    }
}

// Change to game screen, set defaults, and remove answers.
const moveToGame = () => {
    multiChoice.style.display = "flex";
    resultsScreen.style.display = "none";
    introScreen.style.display = "none";


    if (answers.childNodes[1].childNodes[0].textContent != undefined || answers.childNodes[1].childNodes[0].textContent != undefined  || answers.childNodes[1].childNodes[0].textContent != undefined  || answers.childNodes[1].childNodes[0].textContent != undefined ) {
        answers.childNodes[1].childNodes[0].textContent = "";
        answers.childNodes[3].childNodes[0].textContent = "";
        answers.childNodes[5].childNodes[0].textContent = "";
        answers.childNodes[7].childNodes[0].textContent = "";
    }

    initialsSaved.disabled = false;
    saveInitials.disabled = false;
    initialsSaved.removeAttribute("readonly", "");
}

// Set game start defaults and begin timer
const startGame = () => {
    startTimer();
    question.disabled = true;
    skipped = false;
    timerPrompt.innerHTML = "Countdown: ";

    questionsCorrect = 0;
    questionsIncorrect = 0;
}

// Set end of game defaults and print results. Call tally.
const endGame = () => {
    multiChoice.style.display = "none";
    resultsScreen.style.display = "grid";

    newestSave = { initials: initialsEntered, correct: questionsCorrect, incorrect: questionsIncorrect };
    
    localStorage.setItem("newestSave", JSON.stringify(newestSave));
    currentScore.childNodes[1].childNodes[1].innerHTML = newestSave.initials;
    currentScore.childNodes[3].childNodes[1].innerHTML = newestSave.correct;
    currentScore.childNodes[5].childNodes[1].innerHTML = newestSave.incorrect;

    tallyResults();

    questionsSet = createRandomQuestions(); 
    question.disabled = false;
    timerPrompt.textContent = "Ready: "; 
    timer.innerHTML = "";
    question.innerHTML = "Click here to start";
}

// Helper to return text to default.
const resetPrompt = () => {
    setTimeout(function () {
        timerPrompt.innerHTML = "Countdown: ";
    }, 1000)
}

// Timer function for game.
const startTimer = () => {
    
    
    // Add a new question
    const addNewQuestion = () => {
        setQuestion = questionsSet.pop(); 
    } 
    // Print question to screen
    setQAndA(setQuestion); 
    
    // Function for recursion of questions.
    const timeInterStarter = () => {
        // Call next question
        addNewQuestion();
        // Print again to screen
        setQAndA(setQuestion); 

        // Timer interval for game
        let timeInterval = setInterval(function () { 
            
            // If skipped set defaults for non play
            if (skipped === true) {
                // Stop current interval for next question
                clearInterval(timeInterval);

                // reset defaults for next question
                timeToGuess = 15;
                correctGuess = false;
                passed = false;

            // if true has been clicked, increase correct answers.
            } else if (correctGuess === true) {
                questionsCorrect++;
                
                correctGuess = false;
                clearInterval(timeInterval);
                setTimeout(function () {
                    // If round has ended - run end of game function
                    if (questionsSet.length === 0) {
                        timerPrompt.innerHTML = "Round over!";
                        setTimeout(function () {
                            endGame();
                        }, 2000);
                    // If question is correct or incorrect and there are more questions, run next question.
                    } else if (questionsSet.length > 0) {
                        timerPrompt.innerHTML = "Get Ready.";
                        setTimeout(function () {
                            timeToGuess = 15;
                            timerPrompt.innerHTML = "Go!";
                            resetPrompt();
                            timeInterStarter();
                        }, 1000);
                    }
                }, 2000);

            // If question is passed, increase incorrect answers.
            } else if (passed === true) {
                questionsIncorrect++;
                
                clearInterval(timeInterval);
                passed = false;

                timerPrompt.innerHTML = "You passed.";

                // test for passed question - run next question
                setTimeout(function () {
                    if (questionsSet.length === 0) {
                        timerPrompt.innerHTML = "Round over!";
                        setTimeout(function () {
                            endGame();
                        }, 2000)
                    } else if (questionsSet.length > 0) {
                        timerPrompt.innerHTML = "Go!";
                        resetPrompt();
                        setTimeout(function () {
                            timeToGuess = 15;
                            timeInterStarter();
                        }, 1000);
                    }
                }, 2000);
            
            // If timer runs out. Check criteria.
            } else if (timeToGuess <= 0) {
                clearInterval(timeInterval);
                
                questionsIncorrect++;
                
                timerPrompt.innerHTML = "Times Up!";
                // cycles the menu, adds the score, etc.
                setTimeout(function () {
                    if (questionsSet.length === 0) {
                        timerPrompt.innerHTML = "Round over!";
                        setTimeout(function () {
                            endGame();
                        }, 2000)
                    } else if (questionsSet.length > 0) {
                        timerPrompt.innerHTML = "Go!";
                        resetPrompt();
                        setTimeout(function () {
                            timeToGuess = 15;
                            timeInterStarter();
                        }, 1000);
                    }
                }, 2000);

            // Continue running timer if no user input is found.
            } else {
                timer.innerHTML = timeToGuess; // Set inner HTML to time reamining
                timeToGuess--; // Naturally reduce time remaining by 1
            }
        }, 1000); 
    }
    // Call initial function.
    timeInterStarter();


}

// Setup question randimisation and print to screen. set attributes for testing.
const setQAndA = (questions) => {
    let newQuestions = questions;
    let currentQuestion = newQuestions.question; 
    question.innerHTML = `Question: ${currentQuestion}`; 
    currentAnswers = Object.entries(newQuestions).slice(1, 5);

    userGuess[0].setAttribute("data-true", "false");
    userGuess[1].setAttribute("data-true", "false");
    userGuess[2].setAttribute("data-true", "false");
    userGuess[3].setAttribute("data-true", "false");
    
    for (let i = 0; i < userGuess.length; i++) {
        if (currentQuestion === qAndA[0].question) {
            userGuess[2].setAttribute("data-true", "true");
            userGuess[0].innerHTML = qAndA[0].answer1;
            userGuess[1].innerHTML = qAndA[0].answer2;
            userGuess[2].innerHTML = qAndA[0].answer3;
            userGuess[3].innerHTML = qAndA[0].answer4;
        } else if (currentQuestion === qAndA[1].question) {
            userGuess[1].setAttribute("data-true", "true");
            userGuess[0].innerHTML = qAndA[1].answer1;
            userGuess[1].innerHTML = qAndA[1].answer2;
            userGuess[2].innerHTML = qAndA[1].answer3;
            userGuess[3].innerHTML = qAndA[1].answer4;
            userGuess[0].innerHTML = currentAnswers[i][1];
        } else if (currentQuestion === qAndA[2].question) {
            userGuess[2].setAttribute("data-true", "true");
            userGuess[0].innerHTML = qAndA[2].answer1;
            userGuess[1].innerHTML = qAndA[2].answer2;
            userGuess[2].innerHTML = qAndA[2].answer3;
            userGuess[3].innerHTML = qAndA[2].answer4;
        } else if (currentQuestion === qAndA[3].question) {
            userGuess[0].setAttribute("data-true", "true");
            userGuess[0].innerHTML = qAndA[3].answer1;
            userGuess[1].innerHTML = qAndA[3].answer2;
            userGuess[2].innerHTML = qAndA[3].answer3;
            userGuess[3].innerHTML = qAndA[3].answer4;
        } else if (currentQuestion === qAndA[4].question) {
            userGuess[3].setAttribute("data-true", "true");
            userGuess[0].innerHTML = qAndA[4].answer1;
            userGuess[1].innerHTML = qAndA[4].answer2;
            userGuess[2].innerHTML = qAndA[4].answer3;
            userGuess[3].innerHTML = qAndA[4].answer4;
        }
    }
}

// Event Listeners

// Move user to game
introScreen.addEventListener("click", moveToGame);
beginGameButton.addEventListener("click", moveToGame);

// Set defaults and start game on click.
question.addEventListener("click", startGame);

// Add function to pass on question
pass.addEventListener("click", function () {
    if (clickTimeout === 0) {
        clickTimeout = 2;
        passed = true;
        setTimeout(function () {
            clickTimeout = 0;
        }, 2000)
    } else {
        wait.innerHTML = "Please pace your clicks.";
        setTimeout(function () {
            wait.innerHTML = "Select an answer or pass";
        }, 2000);
    }
})

// Check user guess and add feedback and control click pacing. 
answers.addEventListener("click", function (event) {
    
    if (clickTimeout === 0) {
        
        // Slow click pacing.
        clickTimeout = 2;
        setTimeout(function () {
            clickTimeout = 0;
        }, 2000);

        // User guesses correct answer, request new question from timer function.
        if (event.target.closest('li').querySelector('code').getAttribute('data-true') === "true") {
            event.target.closest('li').setAttribute("data-background", "correctGreen");
            setTimeout(function() {
                event.target.closest('li').setAttribute("data-background", "opac");
            }, 2000);
            timerPrompt.innerHTML = "Correct!";
            correctGuess = true;
        
        // User guesses inforrect answer - 2 seconds. 
        } else if (event.target.closest('li').querySelector('code').getAttribute('data-true') === "false") {
            event.target.closest('li').setAttribute("data-background", "inCorrectGreen");
            setTimeout(function() {
                event.target.closest('li').setAttribute("data-background", "opac");
            }, 2000);
            timerPrompt.innerHTML = "Incorrect!";
            resetPrompt();
            timeToGuess-=2;
        } 
    // for click pacing.
    } else {
        wait.innerHTML = "Please pace your clicks.";
        setTimeout(function () {
            wait.innerHTML = "Select an answer or pass";
        }, 2000);
    }
});

// Event listener to clear local storage. Specific to leave current storage as is.
clearHistory.addEventListener("click", function () {
    window.localStorage.removeItem('highScore');
    window.localStorage.removeItem('nextHighest');
    window.localStorage.removeItem('newestSave');

    currentScore.childNodes[1].childNodes[1].innerHTML = "";
    currentScore.childNodes[3].childNodes[1].innerHTML = "";
    currentScore.childNodes[5].childNodes[1].innerHTML = "";

    nextHighestScore.childNodes[1].childNodes[1].innerHTML = "";
    nextHighestScore.childNodes[3].childNodes[1].innerHTML = "";
    nextHighestScore.childNodes[5].childNodes[1].innerHTML = "";

    highestScore.childNodes[1].childNodes[1].innerHTML = "";
    highestScore.childNodes[3].childNodes[1].innerHTML = "";
    highestScore.childNodes[5].childNodes[1].innerHTML = "";
})

// Input into textarea displays initials as they will be entered.
initialsSaved.addEventListener("input", updateInitials);

// If initials are entered. They are saved to storage
saveInitials.addEventListener("click", function () {
    if (initialsSaved.value) {
        saveScore();
    } else {
        initialsSaved.setAttribute("placeholder", "Enter initials here");
        setTimeout(function() {
            initialsSaved.setAttribute("placeholder", "J.K ..");
        }, 2000);
    }
});

// Function for user to stop game if desired or frustrated.
cancelGame.addEventListener("click", function () {
    questionsCorrect = 0;
    questionsIncorrect = 0;

    endGame();
    resetPrompt();

    initialsSaved.disabled = true;
    saveInitials.disabled = true;
    skipped = true;
})