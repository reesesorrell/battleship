import player from "../factories/playerFactory";

const computerPlayer = (newName, playerGameboard) => {
    const {getName, attack} = player(newName, playerGameboard);

    var attackedArray = []
    const makeRandomAttack = (gameboard) => {

        var xCoor, yCoor;
        do {
            xCoor = Math.floor(Math.random() * 10);
            yCoor = Math.floor(Math.random() * 10);
        } while(attackedArray.includes(''+xCoor+yCoor));

        attackedArray.push(''+xCoor+yCoor);
        return attack(gameboard, [xCoor, yCoor]);
    }

    return {getName, makeRandomAttack, playerGameboard}
}

export default computerPlayer