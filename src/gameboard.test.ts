import { Gameboard } from "./gameboard";
import { Ship } from "./ship";
describe("Gameboard Class Test", () => {
  test("Place Ship Horizontal on GameBoard in Middle", () => {
    const gameBoard = new Gameboard();
    const carrier = new Ship(5);
    gameBoard.placeShip(carrier, "Horizontal", [2, 3]);
    expect(gameBoard.board[2][1]).toEqual(1);
    expect(gameBoard.board[2][2]).toEqual(1);
    expect(gameBoard.board[2][3]).toEqual(1);
    expect(gameBoard.board[2][4]).toEqual(1);
    expect(gameBoard.board[2][5]).toEqual(1);
  });

  test("Place Ship Horizontal on GameBoard - CornerCase 1", () => {
    const gameBoard = new Gameboard();
    const carrier = new Ship(5);
    gameBoard.placeShip(carrier, "Horizontal", [0, 0]);
    expect(gameBoard.board[0][0]).toEqual(1);
    expect(gameBoard.board[0][1]).toEqual(1);
    expect(gameBoard.board[0][2]).toEqual(1);
    expect(gameBoard.board[0][3]).toEqual(1);
    expect(gameBoard.board[0][4]).toEqual(1);
  });
  test("Place Ship horizontal on GameBoard - CornerCase 2", () => {
    const gameBoard = new Gameboard();
    const carrier = new Ship(5);
    gameBoard.placeShip(carrier, "Horizontal", [0, 9]);
    expect(gameBoard.board[0][5]).toEqual(1);
    expect(gameBoard.board[0][6]).toEqual(1);
    expect(gameBoard.board[0][7]).toEqual(1);
    expect(gameBoard.board[0][8]).toEqual(1);
    expect(gameBoard.board[0][9]).toEqual(1);
  });

  test("Place Ship vertical on GameBoard in Middle", () => {
    const gameBoard = new Gameboard();
    const carrier = new Ship(5);
    gameBoard.placeShip(carrier, "Vertical", [2, 3]);
    expect(gameBoard.board[0][3]).toEqual(1);
    expect(gameBoard.board[1][3]).toEqual(1);
    expect(gameBoard.board[2][3]).toEqual(1);
    expect(gameBoard.board[3][3]).toEqual(1);
    expect(gameBoard.board[4][3]).toEqual(1);
  });

  test("Place Ship vertical on GameBoard - CornerCase 1", () => {
    const gameBoard = new Gameboard();
    const carrier = new Ship(5);
    gameBoard.placeShip(carrier, "Vertical", [0, 0]);
    expect(gameBoard.board[0][0]).toEqual(1);
    expect(gameBoard.board[1][0]).toEqual(1);
    expect(gameBoard.board[2][0]).toEqual(1);
    expect(gameBoard.board[3][0]).toEqual(1);
    expect(gameBoard.board[4][0]).toEqual(1);
  });
  test("Place Ship vertical on GameBoard - CornerCase 2", () => {
    const gameBoard = new Gameboard();
    const carrier = new Ship(5);
    gameBoard.placeShip(carrier, "Vertical", [9, 0]);
    expect(gameBoard.board[5][0]).toEqual(1);
    expect(gameBoard.board[6][0]).toEqual(1);
    expect(gameBoard.board[7][0]).toEqual(1);
    expect(gameBoard.board[8][0]).toEqual(1);
    expect(gameBoard.board[9][0]).toEqual(1);
  });

  test('Place 4-tile Ship', () => {
    const gameBoard = new Gameboard();
    const carrier = new Ship(4);
    gameBoard.placeShip(carrier, "Vertical", [9, 0]);
    expect(gameBoard.board[5][0]).toEqual(0);
    expect(gameBoard.board[6][0]).toEqual(1);
    expect(gameBoard.board[7][0]).toEqual(1);
    expect(gameBoard.board[8][0]).toEqual(1);
    expect(gameBoard.board[9][0]).toEqual(1);
  })

   test("Place 3-tile Ship", () => {
     const gameBoard = new Gameboard();
     const carrier = new Ship(3);
     gameBoard.placeShip(carrier, "Horizontal", [0, 0]);
     expect(gameBoard.board[0][0]).toEqual(1);
     expect(gameBoard.board[0][1]).toEqual(1);
     expect(gameBoard.board[0][2]).toEqual(1);
     expect(gameBoard.board[0][4]).toEqual(0);
   });
  
  test("Place 2-tile Ship", () => {
    const gameBoard = new Gameboard();
    const carrier = new Ship(2);
    gameBoard.placeShip(carrier, "Horizontal", [0, 9]);
    expect(gameBoard.board[0][7]).toEqual(0);
    expect(gameBoard.board[0][8]).toEqual(1);
    expect(gameBoard.board[0][9]).toEqual(1);
  });

  test('Check double placement Error', () => {
    const gameBoard = new Gameboard();
    const uBoot = new Ship(3);
    const mini = new Ship(2);
    gameBoard.placeShip(uBoot, "Horizontal", [0, 9]);
    expect(gameBoard.placeShip(mini, "Horizontal", [0, 9])).toEqual(Error("Space is not available!"));

  }) 
});
