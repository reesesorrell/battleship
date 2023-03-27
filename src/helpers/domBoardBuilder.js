import displayAdder from "display-adder-reese"
import "../style.css"

const makeBoard = (boardParent, ID, onclickFunction) => {
    for(let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const space = displayAdder.createDiv(boardParent, '', '' + ID + i + j, 'board-space');
            if (ID == 'computer') {
                space.onclick = onclickFunction;
            }
        }
    }
}

export {makeBoard}