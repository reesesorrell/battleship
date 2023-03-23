import player from "../factories/playerFactory";

const computerPlayer = (newName, playerGameboard) => {
    const {getName, attack} = player(newName, playerGameboard);

    var unAttackedArray = []
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            unAttackedArray.push([i, j]);
        }
    }
    const makeRandomAttack = (gameboard) => {

        let index = Math.floor(Math.random()*unAttackedArray.length)
        let coor = unAttackedArray[index];
        unAttackedArray.splice(index, 1);

        return attack(gameboard, coor);
    }

    return {getName, makeRandomAttack, playerGameboard}
}

export default computerPlayer