import game from "../helpers/gameloop";

const newGame = game('Reese');
newGame.setUpTestGame();

test('check hitting an attack in test game', () => {
    expect(newGame.takeTurn([0,0])).toBe('hit');
})