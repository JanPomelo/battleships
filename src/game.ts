"use strict";
import { Player } from "./player";
export type Game = {
  player: Player;
  computer: Player;
};

export function startNewGame(): Game {
  const player = new Player("Player");
  const computer = new Player("Computer");
  //player.placeAllShips();
  computer.placeAllShips();
  return {
    player: player,
    computer: computer,
  };
}

export function endGame(game: Game) {
  if (game.player.board.allSunk()) {
    alert("Computer won, you stupid loser");
    return true;
  }
  if (game.computer.board.allSunk()) {
    alert("You won.");
    return true;
  }
  return false;
}
