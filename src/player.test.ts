import { Gameboard } from "./gameboard";
import { Player } from "./player";

describe("Player Class Test", () => {
  test("Test the player move", () => {
    const player = new Player('Player');
    const computer = new Player('Computer');
    player.makeMove([0, 0], computer);
    const cpBoard: Gameboard = computer.board;
    expect(cpBoard.board[0][0]).toBe("Sea");
  });
});
