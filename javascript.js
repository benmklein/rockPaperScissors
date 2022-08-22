const CHOICES = ['rock', 'paper', 'scissors'];

function getComputerChoice(){
    let choice = Math.floor(Math.random()*3);
    return CHOICES[choice];
}

function checkComputerChoices(){
    let choiceCounts = {'rock': 0, 'paper': 0, 'scissors': 0};
    for (let i = 0; i < 100; i++){
        switch(getComputerChoice()){
            case 'rock': 
                choiceCounts.rock++;
                break;
            case 'paper': 
                choiceCounts.paper++;
                break;
            case 'scissors': 
                choiceCounts.scissors++;
                break;
        }
    } console.log(choiceCounts);
}

function playRound(playerSelection, computerSelection){
    playerSelection = playerSelection.toLowerCase();
    if (playerSelection === computerSelection) return 'tie';
    switch(playerSelection){
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

function game(){
    // runs 5 rounds of RPS
    // score = [wins, losses, ties]
    let score = [0,0,0];
    for (let i = 0; i < 5; i++){
        let x = prompt('Type: rock, paper or scissors.');
        let y = getComputerChoice();
        console.log('You chose ' + x + ' and your opponent chose ' + y + '.');
        switch(playRound(x,y)){
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
                console.log('input is invalid.');
                i--;
                break;
        }
        console.log('Current score out of 5 rounds: ' + score[0] + ' wins, ' + score[1] + ' losses, ' + score[2] + ' ties.');
    } 
    if (score[0]>score[1]) console.log('You won!');
    if (score[1]>score[0]) console.log('You lost.');
    if (score[0] === score[1]) console.log('You tied.');
}
game();