const bird = document.getElementById('bird');
const gameContainer = document.getElementById('game-container');
const scoreDisplay = document.getElementById('score');
const playButton = document.getElementById('play-button');
let birdTop = bird.offsetTop;
let birdSpeed = 0;
let gravity = 0.2;
let isGameOver = false;
let score = 0;

document.addEventListener('keydown', () => {
    if (!isGameOver) {
        birdSpeed = -5;
    }
});

document.addEventListener('touchstart', () => {
    if (!isGameOver) {
        birdSpeed = -5;
    }
});

playButton.addEventListener('click', startGame);

function startGame() {
    playButton.style.display = 'none';
    createPipe();
    gameLoop();
}

function createPipe() {
    const pipeGap = 150;
    const minPipeHeight = 50;
    const maxPipeHeight = gameContainer.clientHeight - pipeGap - minPipeHeight;
    const pipeHeight = Math.floor(Math.random() * (maxPipeHeight - minPipeHeight + 1) + minPipeHeight);
    const pipeTop = document.createElement('div');
    pipeTop.classList.add('pipe', 'top');
    pipeTop.style.height = `${pipeHeight}px`;
    pipeTop.style.left = '400px';

    const pipeBottom = document.createElement('div');
    pipeBottom.classList.add('pipe', 'bottom');
    pipeBottom.style.height = `${gameContainer.clientHeight - pipeHeight - pipeGap}px`;
    pipeBottom.style.left = '400px';

    gameContainer.appendChild(pipeTop);
    gameContainer.appendChild(pipeBottom);

    let pipeInterval = setInterval(() => {
        const pipeLeft = parseInt(pipeTop.style.left);
        if (pipeLeft <= -60) {
            clearInterval(pipeInterval);
            pipeTop.remove();
            pipeBottom.remove();
            score++;
            scoreDisplay.textContent = score;
        } else {
            pipeTop.style.left = `${pipeLeft - 2}px`;
            pipeBottom.style.left = `${pipeLeft - 2}px`;
        }

        if (pipeLeft < 110 && pipeLeft > 50) {
            if (bird.offsetTop < pipeTop.clientHeight || bird.offsetTop + bird.clientHeight > gameContainer.clientHeight - pipeBottom.clientHeight) {
                gameOver();
            }
        }
    }, 20);

    setTimeout(createPipe, 3000);
}

function gameOver() {
    isGameOver = true;
    alert('Game Over! Your score: ' + score);
    document.location.reload();
}

function gameLoop() {
    if (!isGameOver) {
        birdSpeed += gravity;
        birdTop += birdSpeed;
        bird.style.top = `${birdTop}px`;

        if (birdTop <= 0 || birdTop >= gameContainer.clientHeight - bird.clientHeight) {
            gameOver();
        }

        requestAnimationFrame(gameLoop);
    }
}
