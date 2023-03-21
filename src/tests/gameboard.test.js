import gameBoard from "../factories/gameboardFactory";
import ship from "../factories/shipFactory";

const shipOne = ship(4);
const currentBoard = gameBoard();
currentBoard.placeShip(shipOne, [0,0]);

test('check missing an attack', () => {
    expect(currentBoard.receiveAttack([3,3])).toBe('miss');
});

test('check hitting an attack', () => {
    expect(currentBoard.receiveAttack([0, 1])).toBe('hit');
})

test('check double hitting an attack', () => {
    currentBoard.receiveAttack([0, 1]);
    expect(currentBoard.receiveAttack([0, 1])).toBe('double hit');
});

test('check double missing an attack', () => {
    currentBoard.receiveAttack([3, 3])
    expect(currentBoard.receiveAttack([3, 3])).toBe('double miss');
});

test('check all sunk is default false', () => {
    expect(currentBoard.areAllSunk()).toBe(false);
});

test('check all sunk is true', () => {
    currentBoard.receiveAttack([0, 0]);
    currentBoard.receiveAttack([0, 1]);
    currentBoard.receiveAttack([0, 2]);
    currentBoard.receiveAttack([0, 3]);
    expect(currentBoard.areAllSunk()).toBe(true);
});