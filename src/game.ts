"use strict";
import { Player } from "./player";
export type Game = {
  player: Player;
  computer: Player;
};

export function startNewGame(): Game {
  const player = new Player("Player");
  const computer = new Player("Computer");
  player.placeAllShips();
  computer.placeAllShips();
  return {
    player: player,
    computer: computer,
  };
}
