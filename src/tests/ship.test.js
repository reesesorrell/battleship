import ship from "../factories/shipFactory";

test('check ship length getter method', () => {
    const shipOne = ship(6);
    expect(shipOne.getLength()).toBe(6);
  });

test('check ship objects hits getter method', () => {
    const shipOne = ship(6);
    expect(shipOne.getHits()).toBe(0);
})

test('check ship increase hits method (increases it by 1)', () => {
    const shipOne = ship(6);
    shipOne.hit();
    shipOne.hit();
    expect(shipOne.getHits()).toBe(2);
})

test('check a sunk ship', () => {
    const sunkShip = ship(6);
    for (let i = 0; i < 6; i++) {
        sunkShip.hit();
    }
    expect(sunkShip.isSunk()).toBe(true);
})

test('check a alive ship', () => {
    const aliveShip = ship(6);
    expect(aliveShip.isSunk()).toBe(false);
})