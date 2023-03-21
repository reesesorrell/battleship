import player from "../factories/playerFactory"
import gameboard from "../factories/gameboardFactory"
import ship from "../factories/shipFactory"

const firstPlayer = player('Reese');
const enemyGameboard = gameboard();
const enemyShip = ship(5);
enemyGameboard.placeShip(enemyShip, [0,3]);

test('check player name getter', () => {
    expect(firstPlayer.getName()).toBe('Reese');
});

test('check missing enemy gameboard', () => {
    expect(firstPlayer.attack(enemyGameboard, [0, 0])).toBe('miss');
})

test('check hitting enemy gameboard', () => {
    expect(firstPlayer.attack(enemyGameboard, [1, 3])).toBe('hit');
})