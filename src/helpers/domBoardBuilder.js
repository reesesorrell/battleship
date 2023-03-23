import displayAdder from "display-adder-reese"
import "../style.css"

const makeBoard = (boardParent, ID) => {
    for(let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            displayAdder.createDiv(boardParent, '', '' + ID + i + j, 'board-space');
        }
    }
}

export {makeBoard}