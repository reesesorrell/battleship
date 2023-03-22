
const player = (name, playerGameboard) => {
    const getName = () => {
        return name;
    }

    const attack = (gameboard, coors) => {
        return gameboard.receiveAttack(coors);
    }

    return {getName, attack, playerGameboard}
}

export default player;