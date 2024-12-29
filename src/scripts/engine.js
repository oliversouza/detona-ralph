const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives"),
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
    },
    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    }
};

function resetGame() {
    // Resetar valores no estado
    state.values.currentTime = 60;
    state.values.result = 0;
    state.view.score.textContent = 0;
    state.view.lives.textContent = 3;

    // Limpar intervalos existentes
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);

    // Reiniciar os timers
    state.actions.countDownTimerId = setInterval(countDown, 1000);
    state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;
    if(state.values.currentTime <= 0){
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert("Game Over por tempo! O seu resultado foi: " + state.values.result);
    }
}

function playSound(audioName){
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomRumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomRumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function addListenerHitbox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
            }else if (square.id !== state.values.hitPosition && state.view.lives.textContent>0){
                state.view.lives.textContent = state.view.lives.textContent-1;
                playSound("error");
            } else{
                playSound("lose");
                alert("Você perdeu todas as vidas. O seu resultado foi: " + state.values.result);
                resetGame();
            }
        });
    });
}

function initialize() {
    addListenerHitbox();
}

initialize();