
const player = (name) => {
    const getName = () => {
        return name;
    }

    const attack = (gameboard, coors) => {
        return gameboard.receiveAttack(coors);
    }

    return {getName, attack}
}

export default player;