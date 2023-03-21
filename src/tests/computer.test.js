import computerPlayer from "../helpers/computerPlayer"
import gameboard from "../factories/gameboardFactory"
import ship from "../factories/shipFactory"

const computer = computerPlayer('Computer');
const enemyGameboard = gameboard();
const enemyShip = ship(5);
enemyGameboard.placeShip(enemyShip, [0,3]);

test('check computer name getter', () => {
    expect(computer.getName()).toBe('Computer');
});

test('check for computer random coordinates that are never the same', () => {
    let calls = 0
    while(!enemyGameboard.areAllSunk()) {
        computer.makeRandomAttack(enemyGameboard);
        calls++;
    }
    expect(calls).toBeLessThan(101);
})