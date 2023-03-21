import player from "../factories/playerFactory";

const computerPlayer = (newName) => {
    const {getName, attack} = player(newName);

    var attackedArray = []
    const makeRandomAttack = (gameboard) => {

        var xCoor, yCoor;
        xCoor = Math.floor(Math.random() * 10);
        yCoor = Math.floor(Math.random() * 10);
    
        while(attackedArray.includes(''+xCoor+yCoor)) {
            xCoor = Math.floor(Math.random() * 10);
            yCoor = Math.floor(Math.random() * 10);
        }

        attackedArray.push(''+xCoor+yCoor);
        return attack(gameboard, [xCoor, yCoor]);
    }

    return {getName, makeRandomAttack}
}

export default computerPlayer