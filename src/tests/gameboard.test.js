import gameBoard from "../factories/gameboardFactory";
import ship from "../factories/shipFactory";

const shipOne = ship(4);
const currentBoard = gameBoard();
currentBoard.placeShip(shipOne, [0,0]);

test('check missing an attack', () => {
    expect(currentBoard.receiveAttack([3,3])).toBe('miss');
});

test('check hitting an attack', () => {
    expect(currentBoard.receiveAttack([0, 0])).toBe('hit');
})

test('check double hitting an attack', () => {
    currentBoard.receiveAttack([1, 0]);
    expect(currentBoard.receiveAttack([1, 0])).toBe('double hit');
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
    currentBoard.receiveAttack([1, 0]);
    currentBoard.receiveAttack([2, 0]);
    currentBoard.receiveAttack([3, 0]);
    expect(currentBoard.areAllSunk()).toBe(true);
});

test('check adding boat in y direction', () => {
    const shipTwo = ship(3);
    currentBoard.placeShip(shipTwo, [3,3], true);
    expect(currentBoard.receiveAttack([3, 5])).toBe('hit');
})