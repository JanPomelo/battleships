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
      [new Ship(5), new Ship(5), new Ship(5), new Ship(5), new Ship(5), null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [new Ship(3), new Ship(3), new Ship(3), null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [new Ship(3), new Ship(3), new Ship(3), null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [new Ship(2), new Ship(2), null, null, null, null, null, null, null, new Ship(4)],
      [null, null, null, null, null, null, null, null, null, new Ship(4)],
      [null, null, null, null, null, null, null, null, null, new Ship(4)],
      [null, null, null, null, null, null, null, null, null, new Ship(4)],
    ]);
    expect(game.player.board.ships.length).toBe(5);
  });
});
