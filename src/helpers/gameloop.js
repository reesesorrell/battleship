import ship from "../factories/shipFactory";
import player from "../factories/playerFactory";
import gameboard from "../factories/gameboardFactory";
import computerPlayer from "./computerPlayer";

const game = (playerName) => {
    var playerShipOne;
    var playerShipTwo;
    var computerShipOne;
    var computerShipTwo;
    var computerGameboard
    var playerGameboard
    var realPlayer;
    var aiPlayer;
    var isPlayerTurn = true;

    const setUpTestGame = () => {
        computerShipOne = ship(5);
        computerShipTwo = ship(4);
        computerGameboard = gameboard();
        computerGameboard.placeShip(computerShipOne, [0,0]);
        computerGameboard.placeShip(computerShipTwo, [5, 0], true);
        aiPlayer = computerPlayer('Computer', computerGameboard);

        playerShipOne = ship(5);
        playerShipTwo = ship(4);
        playerGameboard = gameboard();
        playerGameboard.placeShip(playerShipOne, [0, 9]);
        playerGameboard.placeShip(playerShipTwo, [5, 6], true);
        realPlayer = player(playerName, playerGameboard);
    }

    const takeTurn = (coors) => {
        if (isPlayerTurn) {
            var attackResponse = realPlayer.attack(computerGameboard, coors);
            return attackResponse;
        }
        else {
            aiPlayer.makeRandomAttack(playerGameboard);
        }
    }

    const _assignShips = (shipArray) => {
        for (let i = 0; i<5; i++) {
            shipArray[i] = ship(i+1);
        }
    }

    return {setUpTestGame, takeTurn}
}

export default game;