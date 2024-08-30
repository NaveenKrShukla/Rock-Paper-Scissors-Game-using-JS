let userScore = 0;
let compScore = 0;
const winningScore = 5;
const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const resetButton = document.querySelector("#reset");

const winSound = document.querySelector("#win-sound");
const loseSound = document.querySelector("#lose-sound");
const drawSound = document.querySelector("#draw-sound");

const genCompChoice = () => {
    const options = ["rock", "paper", "scissor"];
    const randIx = Math.floor(Math.random() * 3);
    return options[randIx];
}

const drawGame = () => {
    msg.innerText = "Game Draw! Try Again";
    msg.style.backgroundColor = "#081b31";
    drawSound.play(); // Play draw sound effect
}

const showWinner = (userWin, userChoice, compChoice) => {
    if (userWin) {
        userScore++;
        userScorePara.innerText = userScore;
        msg.innerText = `You Win! Your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
        winSound.play(); // Play win sound effect
    } else {
        compScore++;
        compScorePara.innerText = compScore;
        msg.innerText = `You Lose! ${compChoice} beats Your ${userChoice}`;
        msg.style.backgroundColor = "red";
        loseSound.play(); // Play lose sound effect
    }

    // Check if game is over (Best of Three)
    if (userScore === winningScore || compScore === winningScore) {
        gameOver();
    }
}

const playGame = (userChoice) => {
    const compChoice = genCompChoice();

    document.getElementById(userChoice).classList.add("shake");
    setTimeout(() => {
        document.getElementById(userChoice).classList.remove("shake");
    }, 500);

    if (userChoice === compChoice) {
        drawGame();
    } else {
        let userWin = true;
        if (userChoice === "rock") {
            userWin = compChoice === "scissor";
        } else if (userChoice === "paper") {
            userWin = compChoice === "rock";
        } else {
            userWin = compChoice === "paper";
        }

        showWinner(userWin, userChoice, compChoice);
    }
}

const gameOver = () => {
    msg.innerText += " - Game Over!";
    choices.forEach(choice => choice.style.pointerEvents = "none");
}

const resetGame = () => {
    userScore = 0;
    compScore = 0;
    userScorePara.innerText = userScore;
    compScorePara.innerText = compScore;
    msg.innerText = "Play Your Move";
    msg.style.backgroundColor = "#081b31";
    choices.forEach(choice => choice.style.pointerEvents = "auto");
}

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        playGame(choice.getAttribute("id"));
    });
});

resetButton.addEventListener("click", resetGame);
