document.addEventListener("DOMContentLoaded", () => {
    const gameContainer = document.getElementById("game-container");
    const basket = document.getElementById("basket");
    const scoreDisplay = document.getElementById("score");
    const timeDisplay = document.getElementById("time");
    const fruits = ["apple", "banana", "orange"];
    const catchSound = new Audio('sound/Catch.mp3');
    const backgroundMusic = new Audio('sound/BackgroundMusic.mp3');
    backgroundMusic.loop = true;

    let score = 0;
    let time = 30;
    let gameInterval;
    let countdownInterval;

    document.addEventListener("mousemove", (event) => {
        const rect = gameContainer.getBoundingClientRect();
        let x = event.clientX - rect.left - basket.offsetWidth / 2;
        x = Math.max(0, Math.min(gameContainer.offsetWidth - basket.offsetWidth, x));
        basket.style.left = `${x}px`;
    });

    function createFruit() {
        const fruit = document.createElement("div");
        fruit.classList.add("fruit");
        const fruitType = fruits[Math.floor(Math.random() * fruits.length)];
        fruit.classList.add(fruitType);
        fruit.style.left = `${Math.random() * (gameContainer.offsetWidth - 50)}px`;
        gameContainer.appendChild(fruit);

        let fallInterval = setInterval(() => {
            const top = parseFloat(fruit.style.top || 0);
            fruit.style.top = `${top + 5}px`;

            if (top + 50 >= gameContainer.offsetHeight) {
                gameContainer.removeChild(fruit);
                clearInterval(fallInterval);
            } else if (top + 50 >= gameContainer.offsetHeight - 70 && 
                       fruit.getBoundingClientRect().left >= basket.getBoundingClientRect().left && 
                       fruit.getBoundingClientRect().right <= basket.getBoundingClientRect().right) {
                catchSound.play();
                score++;
                scoreDisplay.textContent = score;
                gameContainer.removeChild(fruit);
                clearInterval(fallInterval);
            }
        }, 50);
    }

    function startGame() {
        backgroundMusic.play();
        gameInterval = setInterval(createFruit, 1000);
        countdownInterval = setInterval(() => {
            time--;
            timeDisplay.textContent = time;
            if (time <= 0) {
                endGame();
            }
        }, 1000);
    }

    function endGame() {
        clearInterval(gameInterval);
        clearInterval(countdownInterval);
        backgroundMusic.pause();
        alert(`Game over! Your score: ${score}`);
    }

    // Thêm nút bắt đầu trò chơi
    const startButton = document.createElement("button");
    startButton.textContent = "Start Game";
    startButton.style.position = "absolute";
    startButton.style.top = "50%";
    startButton.style.left = "50%";
    startButton.style.transform = "translate(-50%, -50%)";
    document.body.appendChild(startButton);

    startButton.addEventListener("click", () => {
        startButton.remove();
        startGame();
    });
});
