// Activated by clicking on the intro screen. Also begins game.
const removeIntro = () => {
    introScreen.style.display = "none";
    multiChoice.style.display = "flex";
}
// Activated by clicking "Begin QuizTime". Begins game.
const startGame = () => {
    multiChoice.style.display = "flex";
    resultsScreen.style.display = "none"
}



// HTML Selectors
let introScreen = document.querySelector("#intro-container");
let multiChoice = document.querySelector("#multiple-choice-container");
let resultsScreen = document.querySelector("#results-container");
let question = document.querySelector(".MC-question");
let timer = document.querySelector("#time-left");
let answers = document.querySelector("#MC-answers");
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
beginGameButton.addEventListener("click", startGame)

// temp listers
pass.addEventListener ("click", function () {
    multiChoice.style.display = "none";
    resultsScreen.style.display = "grid";
})

