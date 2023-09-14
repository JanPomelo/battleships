"use strict";
import { Player } from "./player";
import { Ship } from "./ship";
export type Game = {
  player: Player;
  computer: Player;
};

export function startNewGame(): Game {
  const player = new Player('Player');
  const computer = new Player('Enemy');
  placeAllShips(player);
  placeAllShips(computer);
  return {
    player: player,
    computer: computer,
  };
}

function placeAllShips(player: Player) {
  const carrier: Ship = new Ship(5);
  const battleship: Ship = new Ship(4);
  const cruiser: Ship = new Ship(3);
  const submarine: Ship = new Ship(3);
  const destroyer: Ship = new Ship(2);
  const shipsToPlace: Ship[] = [carrier, battleship, cruiser, submarine, destroyer];

  player.board.placeShip(carrier, "Horizontal", [0, 0]);
  player.board.placeShip(battleship, "Vertical", [9, 9]);
  player.board.placeShip(cruiser, "Horizontal", [2, 0]);
  player.board.placeShip(submarine, "Horizontal", [4, 0]);
  player.board.placeShip(destroyer, "Horizontal", [6, 0]);

  /*for (let i = 0; i < shipsToPlace.length; i++) {
    let shipPlaced: undefined | Error;
    do {
      shipPlaced = player.board.placeShip(shipsToPlace[i],)
    }
  }*/
}

export function checkEnd(game: Game): string {
  if (game.player.board.allSunk()) {
    return 'lose';
  }
  if (game.computer.board.allSunk()) {
    return 'win';
  }
  return 'not yet';
}
