"use strict";
import { Gameboard } from "./gameboard";
import { printGameBoard } from "./UserInterface";

export class Player {
  private gameBoard: Gameboard;
  name: string;
  constructor(name: string) {
    this.gameBoard = new Gameboard();
    this.name = name;
  }

  get name() {
    return this.playerName;
  }
  get board() {
    return this.gameBoard;
  }

  placeAllShips() {
    const carrier: Ship = new Ship(5);
    const battleship: Ship = new Ship(4);
    const cruiser: Ship = new Ship(3);
    const submarine: Ship = new Ship(3);
    const destroyer: Ship = new Ship(2);
    const shipsToPlace: Ship[] = [carrier, battleship, cruiser, submarine, destroyer];

    /*this.board.placeShip(carrier, "Horizontal", [0, 0]);
    this.board.placeShip(battleship, "Vertical", [9, 9]);
    this.board.placeShip(cruiser, "Horizontal", [2, 0]);
    this.board.placeShip(submarine, "Horizontal", [4, 0]);
    this.board.placeShip(destroyer, "Horizontal", [6, 0]);
    */
    for (let i = 0; i < shipsToPlace.length; i++) {
      let shipPlaced: undefined | Error;
      do {
        const horVer = Math.floor(Math.random() * 2);
        let dir: "Horizontal" | "Vertical" = "Horizontal"
        if (horVer === 1) {
          dir = "Vertical";
        }
        shipPlaced = this.board.placeShip(shipsToPlace[i], dir, [
          Math.floor(Math.random() * 10),
          Math.floor(Math.random() * 10),
        ]);
      } while (shipPlaced);
    }
  }

  makeMove(coords: number[] | null, player: Player) {
    if (!coords) {
      let computerResponse;
      do {
        let row = Math.floor(Math.random() * 10);
        let column = Math.floor(Math.random() * 10);
        computerResponse = player.board.receiveAttack([row, column]);
      } while (computerResponse != undefined);
      return true;
    }
    let playerResponse = player.board.receiveAttack(coords);
    if (playerResponse != undefined) {
      return false;
    }
    return true;
  }
}
