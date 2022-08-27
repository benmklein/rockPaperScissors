const buttons = document.querySelectorAll('button');
const playerTopCard = document.querySelector('#player > .top');
const computerTopCard = document.querySelector('#computer > .top');
const playerBottomCard = document.querySelector('#player > .bottom');
const computerBottomCard = document.querySelector('#computer > .bottom');
const CHOICES = ['rock', 'paper', 'scissors'];


function updateScore(arr) {
    const computerScoreText = document.querySelector('#computer-score');
    const playerScoreText = document.querySelector('#player-score');
    playerScoreText.textContent = 'Player: ' + arr[0];
    computerScoreText.textContent = 'Computer: ' + arr[1];
}


// add event listeners to buttons that will play a round with the player's choice and return the result
function initGame() {
    let promise = new Promise((resolve, reject) => {
        buttons.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                let computerPick = getComputerChoice();
                let playerChoiceImgPath = 'images/' + e.target.id + '.jpg';
                let computerChoiceImgPath = 'images/' + computerPick + '.jpg';
                playerBottomCard.setAttribute('src', playerChoiceImgPath);
                computerBottomCard.setAttribute('src', computerChoiceImgPath);

                let gameResult = playRound(e.target.id, computerPick);
                resolve(gameResult);

            });
        });
    })

    return promise;
}

function disableButtons() {
    buttons.forEach((btn) => {
        btn.disabled = true;
    });
}

function enableButtons() {
    buttons.forEach((btn) => {
        btn.disabled = false;
    });
}

function revealCards() {
    disableButtons();
    playerTopCard.classList.add('active');
    computerTopCard.classList.add('active');
    setTimeout(() => {
        playerTopCard.classList.remove('active');
        computerTopCard.classList.remove('active');
    }, 2500);
    //after animation finishes, enable buttons
    setTimeout(() => {
        enableButtons();
    }, 3500);
}

function getComputerChoice() {
    let choice = Math.floor(Math.random() * 3);
    return CHOICES[choice];
}

function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.toLowerCase();
    if (playerSelection === computerSelection) return 'tie';
    switch (playerSelection) {
        case 'rock':
            if (computerSelection === 'scissors') return 'win';
            return 'loss';
        case 'paper':
            if (computerSelection === 'rock') return 'win';
            return 'loss';
        case 'scissors':
            if (computerSelection === 'paper') return 'win';
            return 'loss';
    }
    return 'invalid';
}

function endGame(result) {
    // create a div, put result text in it, and fade out the game container
    const body = document.querySelector('body');
    let container = document.querySelector('.container');
    
    let endText = document.createElement('h1');
    let endTextContainer = document.createElement('div');
    endTextContainer.classList.add('end-text', 'invisible');
    endTextContainer.classList.remove('invisible');
    
    endTextContainer.appendChild(endText);
    body.appendChild(endTextContainer);
    
    endText.textContent = result;
    container.classList.add('removed');
    
    setTimeout( () => {
        container.remove();
    },2000);
    console.log(result);
}


async function runGame() {
    // runs 5 rounds of RPS
    // score = [wins, losses, ties]
    let score = [0, 0, 0];
    while (score[0] < 5 && score[1] < 5) {
        let result = await initGame();
        revealCards();
        switch (result) {
            case 'win':
                score[0]++;
                break;
            case 'loss':
                score[1]++;
                break;
            case 'tie':
                score[2]++;
                break;
            case 'invalid':
                i--;
                break;
        }
        console.log('Current score out of 5 rounds: ' + score[0] + ' wins, ' + score[1] + ' losses, ' + score[2] + ' ties.');
        setTimeout(() => {
            updateScore(score);
        }, 1200);
    }
    let gameResult = (score[0] > score[1]) ? 'You won!' : 'You lost.';
    disableButtons();
    setTimeout(() => {
        endGame(gameResult);
    }, 2000);
}

runGame();
// endGame('test');