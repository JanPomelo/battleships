import { startNewGame } from "./game";
import { Player } from "./player";
import { Ship } from "./ship";

describe("GameStart Function Test", () => {
  test("Test initialization of game", () => {
    const game = startNewGame();
    expect(game).toHaveProperty("player");
    expect(game).toHaveProperty("computer");
    expect(game.player).toHaveProperty("board");
    expect(game.player.board).toHaveProperty("ships");
    expect(game.player.board).toHaveProperty("board");
  });

  test("Check if all 5 ships are added to the ships array", () => {
    const game = startNewGame();
    expect(game.computer.board.ships.length).toBe(5);
    expect(game.player.board.ships.length).toBe(5);
  });

  test("Check if all 5 ships placed accordingly", () => {
    const game = startNewGame();
    expect(game.computer.board.board).toStrictEqual([
      [
        new Ship(5, "Horizontal", "carrier"),
        new Ship(5, "Horizontal", "carrier"),
        new Ship(5, "Horizontal", "carrier"),
        new Ship(5, "Horizontal", "carrier"),
        new Ship(5, "Horizontal", "carrier"),
        null,
        null,
        null,
        null,
        null,
      ],
      [null, null, null, null, null, null, null, null, null, null],
      [
        new Ship(3, "Horizontal", "submarine"),
        new Ship(3, "Horizontal", "submarine"),
        new Ship(3, "Horizontal", "submarine"),
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      ],
      [null, null, null, null, null, null, null, null, null, null],
      [
        new Ship(3, "Horizontal", "submarine"),
        new Ship(3, "Horizontal", "submarine"),
        new Ship(3, "Horizontal", "submarine"),
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      ],
      [null, null, null, null, null, null, null, null, null, null],
      [
        new Ship(2, "Horizontal", "destroyer"),
        new Ship(2, "Horizontal", "destroyer"),
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        new Ship(4, "Vertical", "battleship"),
      ],
      [null, null, null, null, null, null, null, null, null, new Ship(4, "Vertical", 'battleship')],
      [null, null, null, null, null, null, null, null, null, new Ship(4, "Vertical", 'battleship')],
      [null, null, null, null, null, null, null, null, null, new Ship(4, "Vertical", 'battleship')],
    ]);
    expect(game.player.board.ships.length).toBe(5);
  });
});
