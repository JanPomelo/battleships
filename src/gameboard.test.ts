import { Gameboard } from "./gameboard";
import { Ship } from "./ship";

describe("Ship Placement test", () => {
  test("Place Ship Horizontal on GameBoard in Middle", () => {
    const gameBoard = new Gameboard();
    const carrier = new Ship(5);
    gameBoard.placeShip(carrier, "Horizontal", [2, 3]);
    expect(gameBoard.board[2][1]).toEqual(carrier);
    expect(gameBoard.board[2][2]).toEqual(carrier);
    expect(gameBoard.board[2][3]).toEqual(carrier);
    expect(gameBoard.board[2][4]).toEqual(carrier);
    expect(gameBoard.board[2][5]).toEqual(carrier);
  });

  test("Place Ship Horizontal on GameBoard - CornerCase 1", () => {
    const gameBoard = new Gameboard();
    const carrier = new Ship(5);
    gameBoard.placeShip(carrier, "Horizontal", [0, 0]);
    expect(gameBoard.board[0][0]).toEqual(carrier);
    expect(gameBoard.board[0][1]).toEqual(carrier);
    expect(gameBoard.board[0][2]).toEqual(carrier);
    expect(gameBoard.board[0][3]).toEqual(carrier);
    expect(gameBoard.board[0][4]).toEqual(carrier);
  });
  test("Place Ship horizontal on GameBoard - CornerCase 2", () => {
    const gameBoard = new Gameboard();
    const carrier = new Ship(5);
    gameBoard.placeShip(carrier, "Horizontal", [0, 9]);
    expect(gameBoard.board[0][5]).toEqual(carrier);
    expect(gameBoard.board[0][6]).toEqual(carrier);
    expect(gameBoard.board[0][7]).toEqual(carrier);
    expect(gameBoard.board[0][8]).toEqual(carrier);
    expect(gameBoard.board[0][9]).toEqual(carrier);
  });

  test("Place Ship vertical on GameBoard in Middle", () => {
    const gameBoard = new Gameboard();
    const carrier = new Ship(5);
    gameBoard.placeShip(carrier, "Vertical", [2, 3]);
    expect(gameBoard.board[0][3]).toEqual(carrier);
    expect(gameBoard.board[1][3]).toEqual(carrier);
    expect(gameBoard.board[2][3]).toEqual(carrier);
    expect(gameBoard.board[3][3]).toEqual(carrier);
    expect(gameBoard.board[4][3]).toEqual(carrier);
  });

  test("Place Ship vertical on GameBoard - CornerCase 1", () => {
    const gameBoard = new Gameboard();
    const carrier = new Ship(5);
    gameBoard.placeShip(carrier, "Vertical", [0, 0]);
    expect(gameBoard.board[0][0]).toEqual(carrier);
    expect(gameBoard.board[1][0]).toEqual(carrier);
    expect(gameBoard.board[2][0]).toEqual(carrier);
    expect(gameBoard.board[3][0]).toEqual(carrier);
    expect(gameBoard.board[4][0]).toEqual(carrier);
  });
  test("Place Ship vertical on GameBoard - CornerCase 2", () => {
    const gameBoard = new Gameboard();
    const carrier = new Ship(5);
    gameBoard.placeShip(carrier, "Vertical", [9, 0]);
    expect(gameBoard.board[5][0]).toEqual(carrier);
    expect(gameBoard.board[6][0]).toEqual(carrier);
    expect(gameBoard.board[7][0]).toEqual(carrier);
    expect(gameBoard.board[8][0]).toEqual(carrier);
    expect(gameBoard.board[9][0]).toEqual(carrier);
  });

  test("Place 4-tile Ship", () => {
    const gameBoard = new Gameboard();
    const carrier = new Ship(4);
    gameBoard.placeShip(carrier, "Vertical", [9, 0]);
    expect(gameBoard.board[5][0]).toEqual(null);
    expect(gameBoard.board[6][0]).toEqual(carrier);
    expect(gameBoard.board[7][0]).toEqual(carrier);
    expect(gameBoard.board[8][0]).toEqual(carrier);
    expect(gameBoard.board[9][0]).toEqual(carrier);
  });

  test("Place 3-tile Ship", () => {
    const gameBoard = new Gameboard();
    const carrier = new Ship(3);
    gameBoard.placeShip(carrier, "Horizontal", [0, 0]);
    expect(gameBoard.board[0][0]).toEqual(carrier);
    expect(gameBoard.board[0][1]).toEqual(carrier);
    expect(gameBoard.board[0][2]).toEqual(carrier);
    expect(gameBoard.board[0][4]).toEqual(null);
  });

  test("Place 2-tile Ship", () => {
    const gameBoard = new Gameboard();
    const carrier = new Ship(2);
    gameBoard.placeShip(carrier, "Horizontal", [0, 9]);
    expect(gameBoard.board[0][7]).toEqual(null);
    expect(gameBoard.board[0][8]).toEqual(carrier);
    expect(gameBoard.board[0][9]).toEqual(carrier);
  });

  test("Check double placement Error", () => {
    const gameBoard = new Gameboard();
    const uBoot = new Ship(3);
    const mini = new Ship(2);
    gameBoard.placeShip(uBoot, "Horizontal", [0, 9]);
    expect(gameBoard.placeShip(mini, "Horizontal", [0, 9])).toEqual(Error("Space is not available!"));
  });

  test("Check if hits call is valid other several tales", () => {
    const gameBoard = new Gameboard();
    const uBoot = new Ship(3);
    gameBoard.placeShip(uBoot, "Horizontal", [0, 9]);
  });
});

describe("receiveAttack tests", () => {
  test('check if an attack is received but no hit', () => {
    const gameBoard = new Gameboard();
    gameBoard.receiveAttack([0, 0]);
    expect(gameBoard.board[0][0]).toEqual('Sea');
  });
  
  test("check if an attack is received on a ship", () => {
    const gameBoard = new Gameboard();
    const mini = new Ship(2);
    gameBoard.placeShip(mini, 'Horizontal', [0, 0]);
    gameBoard.receiveAttack([0, 0]);
    expect(gameBoard.board[0][0]).toEqual("Hit");
    expect(mini.hits).toBe(1);
  });

  test("check for double shot on the same field", () => {
    const gameBoard = new Gameboard();
    const mini = new Ship(2);
    gameBoard.placeShip(mini, 'Horizontal', [0, 0]);
    gameBoard.receiveAttack([0, 0]);
    expect(gameBoard.receiveAttack([0, 0])).toEqual(Error('Field 0,0 has already been checked'));
  });

  test("check for ship to sink when fully hit", () => {
    const gameBoard = new Gameboard();
    const mini = new Ship(2);
    gameBoard.placeShip(mini, 'Horizontal', [0, 0]);
    gameBoard.receiveAttack([0, 0]);
    gameBoard.receiveAttack([0, 1]);
    expect(mini.isSunk()).toBe(true);
  });

});
