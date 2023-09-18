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
        new Ship(5, "Horizontal"),
        new Ship(5, "Horizontal"),
        new Ship(5, "Horizontal"),
        new Ship(5, "Horizontal"),
        new Ship(5, "Horizontal"),
        null,
        null,
        null,
        null,
        null,
      ],
      [null, null, null, null, null, null, null, null, null, null],
      [
        new Ship(3, "Horizontal"),
        new Ship(3, "Horizontal"),
        new Ship(3, "Horizontal"),
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
        new Ship(3, "Horizontal"),
        new Ship(3, "Horizontal"),
        new Ship(3, "Horizontal"),
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
        new Ship(2, "Horizontal"),
        new Ship(2, "Horizontal"),
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        new Ship(4, "Vertical"),
      ],
      [null, null, null, null, null, null, null, null, null, new Ship(4, "Vertical")],
      [null, null, null, null, null, null, null, null, null, new Ship(4, "Vertical")],
      [null, null, null, null, null, null, null, null, null, new Ship(4, "Vertical")],
    ]);
    expect(game.player.board.ships.length).toBe(5);
  });
});
