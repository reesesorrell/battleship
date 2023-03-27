import "./style.css";
import displayAdder from "display-adder-reese";
import game from "./helpers/gameloop";
import { makeBoard } from "./helpers/domBoardBuilder";

const realGame = game('Reese');
realGame.setUpTestGame();

function runGame(){
    let xCoor = +this.id.slice(-2, -1);
    let yCoor = +this.id.slice(-1);
    let hitState = realGame.takeTurn([xCoor, yCoor]);
    if (hitState == 'hit') {
        this.textContent = 'X';
        this.onclick = '';
    }
    else if (hitState == 'miss') {
        this.textContent = 'O';
        this.onclick = '';
    }
    else if (hitState == 'sunk') {
        this.textContent = '!';
        this.onclick = '';
    }
    if (realGame.checkPlayerWin()) {
        console.log('gg');
    }
    setTimeout(() => {
        makeComputerMove();
    }, 200);
}

function makeComputerMove() {
    let computerHitArray = realGame.takeTurn();
    let computerHitState = computerHitArray[0];
    let computerAttackCoors = computerHitArray[1];
    if (computerHitState == 'hit') {
        let space = document.getElementById('player' + computerAttackCoors[0] + computerAttackCoors[1]);
        space.textContent = 'X';
    }
    else if (computerHitState == 'miss') {
        let space = document.getElementById('player' + computerAttackCoors[0] + computerAttackCoors[1]);
        space.textContent = 'O';
    }
    else if (computerHitState == 'sunk') {
        let space = document.getElementById('player' + computerAttackCoors[0] + computerAttackCoors[1]);
        space.textContent = '!';
    }
    if (realGame.checkComputerWin()) {
        console.log('just luck');
    }
}

const content = displayAdder.createDiv(document.body, '', 'content');

const boardHolder = displayAdder.createDiv(content, '', 'player-board-holder', 'board-holder');
makeBoard(boardHolder, 'player', runGame);

const computerBoardHolder = displayAdder.createDiv(content, '', 'computer-board-holder', 'board-holder');
makeBoard(computerBoardHolder, 'computer', runGame);