// Activated by clicking on the intro screen. Also begins game.
const removeIntro = () => {
    introScreen.style.display = "none";
    multiChoice.style.display = "flex";

    startTimer(13);
}
// Activated by clicking "Begin QuizTime". Begins game.
const startGame = () => {
    multiChoice.style.display = "flex";
    resultsScreen.style.display = "none";

    startTimer(13);
}

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

const startTimer = (availableTime) => {
    let timeToGuess = availableTime; // prints 12
    let questionsSet = createRandomQuestions(); // Prints an array of random questions - 1 when popped.
    let setQuestion = questionsSet.pop(); // Prints an array of one question from questionsSet.

    let questionsCorrect = 0;
    let questionsIncorrect = 0;

    const addNewQuestion = () => {
        setQuestion = questionsSet.pop(); 
    } // Reduces questionSet by 1 and changes setQuestion if called.
    setQAndA(setQuestion); // Populates the field with the current question during this interval
    
    const timeInterStarter = () => {
        addNewQuestion(); // Change the question, reduce remaining questions
        setQAndA(setQuestion); // Add the next question to the screen

        let timeInterval = setInterval(function () { // Creat an interval that runs every second

            answers.addEventListener("click", function (event) {
                console.log(event.target.closest('li').querySelector('code').getAttribute('data-true'));
                if (event.target.closest('li').querySelector('code').getAttribute('data-true') === "true") {
                    clearInterval(timeInterval);
                    questionsCorrect++;
                    console.log(questionsCorrect)
                    timer.innerHTML = "Correct!";
                }
            });

            if (timeToGuess <= 0) {
                clearInterval(timeInterval);
                timer.innerHTML = "Times Up!";
                // cycles the menu, adds the score, etc.
                setTimeout(function () {
                    if (questionsSet.length === 0) {
                        gameFinished(); // Tally results
                    } else if (questionsSet.length > 0) {
                        timeToGuess = 13;
                        timeInterStarter();
                    }
                }, 2000);
            } else {
                timer.innerHTML = timeToGuess; // Set inner HTML to time reamining
                timeToGuess--; // Naturally reduce time remaining by 1
            }
        }, 1000); 
    }
    timeInterStarter();

}

const setQAndA = (questions) => {
    let newQuestions = questions;
    let currentQuestion = newQuestions.question; // prints the current question
    question.innerHTML = `Question: ${currentQuestion}`; // Sets current question
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


// HTML Selectors
let introScreen = document.querySelector("#intro-container");
let multiChoice = document.querySelector("#multiple-choice-container");
let resultsScreen = document.querySelector("#results-container");
let questionNumber = document.querySelector("#questionNumber");
let question = document.querySelector(".MC-question");
let timer = document.querySelector("#time-left");
let answers = document.querySelector("#MC-answers");
let userGuess = document.querySelectorAll(".answer");
// Answers Class = .answer - add to each list items code tag (querySelectorAll("code"));
let pass = document.querySelector("#pass");
let judgement = document.querySelector("#results-judge");
let beginGameButton = document.querySelector("#results-header");
let correctAnswersTotal = document.querySelector("AO-current-correct");
let incorrectAnswersTotal = document.querySelector("AO-current-incorrect");
let initialsSaved = document.getElementById("#initials");
let scoreHistory = document.querySelector("#score-history-wrapper");
// Score History has four items that are added.
let highestScore = document.querySelector("#first-highest");
let mostRecentScore = document.querySelector("#most-recent");
let secontMostRecentScore = document.querySelector("#second-most-recent");
// There's a datetimeattribute that can be set to the time of submission as well when the time is submitted.
let clearHistory = document.querySelector("#clear-history")

// Event Listeners
introScreen.addEventListener("click", removeIntro);
beginGameButton.addEventListener("click", startGame);

// temp listers
pass.addEventListener ("click", function () {
    multiChoice.style.display = "none";
    resultsScreen.style.display = "grid";
})

