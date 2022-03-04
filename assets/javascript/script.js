const removeIntro = () => {
    introScreen.style.display = "none";
}

let introScreen = document.querySelector("#intro-container");
introScreen.addEventListener("click", removeIntro);

