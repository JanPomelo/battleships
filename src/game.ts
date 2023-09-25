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
  
  const ships: (number | string)[][] = [[5, 'carrier'], [4, 'battleship'], [3, 'submarine'], [3, 'cruiser'], [2, 'destroyer']];
    for (let i = 0; i < ships.length; i++) {
      let shipPlaced: undefined | Error;
      do {
        const row: number = Math.floor(Math.random() * 10);
        const column: number = Math.floor(Math.random() * 10);
        let horVer: number = Math.floor(Math.random() * 2);
        const horVerString: "Vertical" | "Horizontal" = horVer === 1 ? "Vertical" : "Horizontal";
        shipPlaced = player.board.placeShip(new Ship(ships[i][0] as number, horVerString, ships[i][1] as string), horVerString, [row, column]);
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
