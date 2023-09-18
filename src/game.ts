"use strict";
import { Player } from "./player";
import { Ship } from "./ship";
export type Game = {
  player: Player;
  computer: Player;
};

export function startNewGame(): Game {
  const player = new Player("Player");
  const computer = new Player("Enemy");
  //placeAllShips(player);
  placeAllShips(computer);
  return {
    player: player,
    computer: computer,
  };
}

function placeAllShips(player: Player) {
  
  const shipLength: number[] = [5, 4, 3, 3, 2];
    for (let i = 0; i < shipLength.length; i++) {
      let shipPlaced: undefined | Error;
      do {
        const row: number = Math.floor(Math.random() * 10);
        const column: number = Math.floor(Math.random() * 10);
        let horVer: number = Math.floor(Math.random() * 2);
        const horVerString: "Vertical" | "Horizontal" = horVer === 1 ? "Vertical" : "Horizontal";
        shipPlaced = player.board.placeShip(new Ship(shipLength[i], horVerString), horVerString, [row, column]);
      } while (shipPlaced);
    }
  }


export function checkEnd(game: Game): string {
  if (game.player.board.allSunk()) {
    return "lose";
  }
  if (game.computer.board.allSunk()) {
    return "win";
  }
  return "not yet";
}
