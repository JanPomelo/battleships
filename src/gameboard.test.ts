import { Gameboard } from "./gameboard";
import { Ship } from './ship';
describe("Gameboard Class Test", () => {
  
  test('Place Ship on GameBoard in Middle', () => {
    const gameBoard = new Gameboard();
    const carrier = new Ship(5);
    gameBoard.placeShip(carrier, 'Horizontal', [2, 3]);
    expect(gameBoard.board[2][1]).toEqual(1);
    expect(gameBoard.board[2][2]).toEqual(1);
    expect(gameBoard.board[2][3]).toEqual(1);
    expect(gameBoard.board[2][4]).toEqual(1);
    expect(gameBoard.board[2][5]).toEqual(1);
  });

  test('Place Ship on GameBoard - CornerCase 1', () => {
    const gameBoard = new Gameboard();
    const carrier = new Ship(5);
    gameBoard.placeShip(carrier, 'Horizontal', [0, 0]);
    expect(gameBoard.board[0][0]).toEqual(1);
    expect(gameBoard.board[0][1]).toEqual(1);
    expect(gameBoard.board[0][2]).toEqual(1);
    expect(gameBoard.board[0][3]).toEqual(1);
    expect(gameBoard.board[0][4]).toEqual(1);
  });
  test("Place Ship on GameBoard - CornerCase 2", () => {
    const gameBoard = new Gameboard();
    const carrier = new Ship(5);
    gameBoard.placeShip(carrier, 'Horizontal', [0, 9]);
    expect(gameBoard.board[0][5]).toEqual(1);
    expect(gameBoard.board[0][6]).toEqual(1);
    expect(gameBoard.board[0][7]).toEqual(1);
    expect(gameBoard.board[0][8]).toEqual(1);
    expect(gameBoard.board[0][9]).toEqual(1);
  });
});