const gameBoard = () => {

    const boardSize = 10;

    var boardArray = []
    for (let i = 0; i < boardSize; i++) {
        var emptyRow = []
        for (let i = 0; i < boardSize; i++) {
            emptyRow.push(null);
        }
        boardArray.push(emptyRow);
    }

    var shipList = []

    const placeShip = (shipObject, startingCoor, yDirection = false) => {
        var shipLength = shipObject.getLength();
        var startingX = startingCoor[0];
        var startingY = startingCoor[1];
        if (yDirection) {
            for (let i = 0; i < shipLength; i++) {
                boardArray[startingY+i][startingX] = [shipObject, null];
            }
        }
        else {
            for (let i = 0; i < shipLength; i++) {
                boardArray[startingY][startingX+i] = [shipObject, null];
            }
        }
        shipList.push(shipObject);
    }

    const receiveAttack = (coor) => {
        var xCoor = coor[0];
        var yCoor = coor[1];
        var currentSpot = boardArray[yCoor][xCoor];
        if(currentSpot == 'miss') {
            return 'double miss';
        }
        else if (currentSpot) {
            if (!currentSpot[1]) {
                if(_trackHit(xCoor, yCoor)) {
                    return 'sunk';
                }
                return 'hit';
            }
            else {
                return 'double hit';
            }
        }
        else {
            _trackMiss(xCoor, yCoor);
            return 'miss';
        }
    }

    const areAllSunk = () => {
        for (let i = 0; i < shipList.length; i++){
            if (!shipList[i].isSunk()) {
                return false;
            }
        }
        return true;
    }

    const _trackHit = (xCoor, yCoor) => {
        const shipObject = boardArray[yCoor][xCoor][0];
        shipObject.hit();
        boardArray[yCoor][xCoor][1] = 'hit';
        if (shipObject.isSunk()) {
            return true;
        }
    }

    const _trackMiss = (xCoor, yCoor) => {
        boardArray[yCoor][xCoor] = 'miss';
    }
    
    return {placeShip, receiveAttack, areAllSunk};
}

export default gameBoard;