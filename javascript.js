let buttons = document.querySelectorAll('button');
const playerTopCard = document.querySelector('#player > .top');
const computerTopCard = document.querySelector('#computer > .top');
const playerBottomCard = document.querySelector('#player > .bottom');
const computerBottomCard = document.querySelector('#computer > .bottom');
const CHOICES = ['rock', 'paper', 'scissors'];

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

// disable button listeners
function endGame() {
    buttons.forEach((btn) => {
        var new_element = btn.cloneNode(true);
        btn.parentNode.replaceChild(new_element, btn);
    });
}

function revealCards() {
    playerTopCard.classList.add('active');
    computerTopCard.classList.add('active');
    setTimeout(() => {
        playerTopCard.classList.remove('active');
        computerTopCard.classList.remove('active');
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
    }
    if (score[0] > score[1]) console.log('You won!');
    if (score[1] > score[0]) console.log('You lost.');
    endGame();
}

runGame();