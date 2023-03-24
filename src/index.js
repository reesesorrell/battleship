import "./style.css";
import displayAdder from "display-adder-reese";
import game from "./helpers/gameloop";
import { makeBoard } from "./helpers/domBoardBuilder";

const realGame = game('Reese');
realGame.setUpTestGame();

const content = displayAdder.createDiv(document.body, '', 'content');

const boardHolder = displayAdder.createDiv(content, '', 'player-board-holder', 'board-holder');
makeBoard(boardHolder, 'player');

const computerBoardHolder = displayAdder.createDiv(content, '', 'computer-board-holder', 'board-holder');
makeBoard(computerBoardHolder, 'computer');