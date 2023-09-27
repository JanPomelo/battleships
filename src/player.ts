"use strict";
import { Gameboard } from "./gameboard";
import { Ship } from "./ship";

// array for the guesses if a ship is hit
let previousGuessArr: { row: number; column: number }[] = [];
// object for the directions in which the ship thats being hit can be located
let dirRes: { firstDir: string; arr: string[] } = { firstDir: "up", arr: [] };
// array for when another ship is being hit while the current one is not sunk yet
let waitingList: { row: number; column: number }[] = [];

export class Player {
  private gameBoard: Gameboard;
  name: string;
  allKnownPositions: number[][];
  constructor(name: string) {
    this.gameBoard = new Gameboard();
    this.name = name;
    this.allKnownPositions = [];
  }

  get board() {
    return this.gameBoard;
  }

  makeMove(coords: number[] | null, player: Player) {
    if (!coords) {
      let computerResponse;
      let row: number;
      let column: number;
      do {
        // if there is currently no ship hit
        if (previousGuessArr.length === 0) {
          row = Math.floor(Math.random() * 10);
          column = Math.floor(Math.random() * 10);
          computerResponse = player.board.receiveAttack([row, column]);
        } // else if there is currently a hit on a ship, but just a single one
        else if (previousGuessArr.length === 1) {
          // if the possible directions in which the ship hit can be located are not yet defined
          if (dirRes.arr.length === 0) {
            // define the possible directions
            dirRes = getFirstDir(previousGuessArr[0].row, previousGuessArr[0].column, player);
          }
          // handle the different directions
          switch (dirRes.firstDir) {
            case "up":
              // set the new coords to hit
              row = previousGuessArr[0].row - 1;
              column = previousGuessArr[0].column;
              // if the position is already known
              if (positionAlreadyKnown(row, column, player)) {
                // cut the direction out of the array
                let indexOfUp = dirRes.arr.indexOf("up");
                dirRes.arr.splice(indexOfUp, 1);
                // get a new direction
                let rndmNmbr = Math.floor(Math.random() * dirRes.arr.length);
                dirRes.firstDir = dirRes.arr[rndmNmbr];
              }
              break;
            case "down":
              row = previousGuessArr[0].row + 1;
              column = previousGuessArr[0].column;
              if (positionAlreadyKnown(row, column, player)) {
                let indexOfDown = dirRes.arr.indexOf("down");
                dirRes.arr.splice(indexOfDown, 1);
                let rndmNmbr = Math.floor(Math.random() * dirRes.arr.length);
                dirRes.firstDir = dirRes.arr[rndmNmbr];
              }
              break;
            case "left":
              row = previousGuessArr[0].row;
              column = previousGuessArr[0].column - 1;
              if (positionAlreadyKnown(row, column, player)) {
                let indexOfLeft = dirRes.arr.indexOf("left");
                dirRes.arr.splice(indexOfLeft, 1);
                let rndmNmbr = Math.floor(Math.random() * dirRes.arr.length);
                dirRes.firstDir = dirRes.arr[rndmNmbr];
              }
              break;
            case "right":
              row = previousGuessArr[0].row;
              column = previousGuessArr[0].column + 1;
              if (positionAlreadyKnown(row, column, player)) {
                let indexOfRight = dirRes.arr.indexOf("right");
                dirRes.arr.splice(indexOfRight, 1);
                let rndmNmbr = Math.floor(Math.random() * dirRes.arr.length);
                dirRes.firstDir = dirRes.arr[rndmNmbr];
              }
              break;
          }
          computerResponse = player.board.receiveAttack([row, column]);
          // for further guesses
        } else if (previousGuessArr.length > 1) {
          // handle the different directions
          switch (dirRes.firstDir) {
            case "up":
              // set the new coords for the next guess bases on the last guess
              row = previousGuessArr[previousGuessArr.length - 1].row - 1;
              column = previousGuessArr[previousGuessArr.length - 1].column;
              // if the position is already known (was already guessed)
              if (positionAlreadyKnown(row, column, player)) {
                let indexOfUp = dirRes.arr.indexOf("up");
                dirRes.arr.splice(indexOfUp, 1);
                let rndmNmbr = Math.floor(Math.random() * dirRes.arr.length);
                dirRes.firstDir = dirRes.arr[rndmNmbr];
              }
              break;
            case "down":
              row = previousGuessArr[previousGuessArr.length - 1].row + 1;
              column = previousGuessArr[previousGuessArr.length - 1].column;
              if (positionAlreadyKnown(row, column, player)) {
                let indexOfDown = dirRes.arr.indexOf("down");
                dirRes.arr.splice(indexOfDown, 1);
                let rndmNmbr = Math.floor(Math.random() * dirRes.arr.length);
                dirRes.firstDir = dirRes.arr[rndmNmbr];
              }
              break;
            case "left":
              row = previousGuessArr[previousGuessArr.length - 1].row;
              column = previousGuessArr[previousGuessArr.length - 1].column - 1;
              if (positionAlreadyKnown(row, column, player)) {
                let indexOfLeft = dirRes.arr.indexOf("left");
                dirRes.arr.splice(indexOfLeft, 1);
                let rndmNmbr = Math.floor(Math.random() * dirRes.arr.length);
                dirRes.firstDir = dirRes.arr[rndmNmbr];
              }
              break;
            case "right":
              row = previousGuessArr[previousGuessArr.length - 1].row;
              column = previousGuessArr[previousGuessArr.length - 1].column + 1;
              if (positionAlreadyKnown(row, column, player)) {
                let indexOfRight = dirRes.arr.indexOf("right");
                dirRes.arr.splice(indexOfRight, 1);
                let rndmNmbr = Math.floor(Math.random() * dirRes.arr.length);
                dirRes.firstDir = dirRes.arr[rndmNmbr];
              }
              break;
          }
          computerResponse = player.board.receiveAttack([row, column]);
        }
        // do all this until u find a valid guess
      } while (computerResponse != undefined);
      // add the guess to the known positions
      player.allKnownPositions.push([row, column]);
      // if there is no ship hit currently but the recent guess was a hit
      if (previousGuessArr.length === 0 && player.board.board[row][column] instanceof Ship) {
        // look if the ship is sunk
        const ship: Ship = player.board.board[row][column] as Ship;
        if (!ship.isSunk()) {
          // if not, push the guess to the array for for further guesses
          previousGuessArr.push({ row: row, column: column });
        }
        // else if the system is currently on the first guess but the recent guess did not hit the ship that was hit before (so the guess was either water or another ship)
      } else if (
        previousGuessArr.length === 1 &&
        (player.board.board[row][column] === "Sea" ||
          (player.board.board[row][column] instanceof Ship &&
            player.board.board[row][column] !==
              player.board.board[previousGuessArr[0].row][previousGuessArr[0].column]))
      ) {
        // if the recent hit was another ship
        if (
          player.board.board[row][column] instanceof Ship &&
          player.board.board[row][column] !== player.board.board[previousGuessArr[0].row][previousGuessArr[0].column]
        ) {
          let shipNow: Ship = player.board.board[row][column] as Ship;
          let shipInWaiting = false;
          // check if the ship being hit recently is already in the waiting list
          for (let i = 0; i < waitingList.length; i++) {
            let waitingShip: Ship = player.board.board[waitingList[i].row][waitingList[i].column] as Ship;
            if (shipNow.name === waitingShip.name) {
              shipInWaiting = true;
            }
          }
          // if not, push the coords to the waiting list
          if (!shipInWaiting) {
            waitingList.push({ row: row, column: column });
          }
        }
        // get a new direction since the most recent guess didn't hit the right ship
        switch (dirRes.firstDir) {
          case "up":
            let indexOfUp = dirRes.arr.indexOf("up");
            dirRes.arr.splice(indexOfUp, 1);
            if (dirRes.arr.includes("down")) {
              dirRes.firstDir = "down";
            } else {
              let rndmNmbr = Math.floor(Math.random() * dirRes.arr.length);
              dirRes.firstDir = dirRes.arr[rndmNmbr];
            }
            break;
          case "down":
            let indexOfDown = dirRes.arr.indexOf("down");
            dirRes.arr.splice(indexOfDown, 1);
            if (dirRes.arr.includes("up")) {
              dirRes.firstDir = "up";
            } else {
              let rndmNmbr = Math.floor(Math.random() * dirRes.arr.length);
              dirRes.firstDir = dirRes.arr[rndmNmbr];
            }
            break;
          case "right":
            let indexOfRight = dirRes.arr.indexOf("right");
            dirRes.arr.splice(indexOfRight, 1);
            if (dirRes.arr.includes("left")) {
              dirRes.firstDir = "left";
            } else {
              let rndmNmbr = Math.floor(Math.random() * dirRes.arr.length);
              dirRes.firstDir = dirRes.arr[rndmNmbr];
            }
            break;
          case "left":
            let indexOfLeft = dirRes.arr.indexOf("left");
            dirRes.arr.splice(indexOfLeft, 1);
            if (dirRes.arr.includes("right")) {
              dirRes.firstDir = "right";
            } else {
              let rndmNmbr = Math.floor(Math.random() * dirRes.arr.length);
              dirRes.firstDir = dirRes.arr[rndmNmbr];
            }
            break;
        }
      } // check for guesses when the current ship is hit more than once already, but the most recent guess hit another ship
      else if (
        previousGuessArr.length > 0 &&
        player.board.board[row][column] instanceof Ship &&
        player.board.board[row][column] === player.board.board[previousGuessArr[0].row][previousGuessArr[0].column]
      ) {
        const thisShip: Ship = player.board.board[row][column] as Ship;
        const oriShip: Ship = player.board.board[previousGuessArr[0].row][previousGuessArr[0].column] as Ship;
        if (thisShip.name === oriShip.name) {
          if (thisShip.isSunk()) {
            if (waitingList.length > 0) {
              previousGuessArr = [];
              previousGuessArr.push(waitingList[0]);
              waitingList.shift();
            } else {
              previousGuessArr = [];
            }
            dirRes = { firstDir: "up", arr: [] };
          } else {
            previousGuessArr.push({ row: row, column: column });
          }
        }
      } else if (
        previousGuessArr.length > 1 &&
        (player.board.board[row][column] === "Sea" ||
          (player.board.board[row][column] instanceof Ship &&
            player.board.board[row][column] !==
              player.board.board[previousGuessArr[0].row][previousGuessArr[0].column]))
      ) {
        switch (dirRes.firstDir) {
          case "up":
            dirRes.firstDir = "down";
            previousGuessArr.push({ row: previousGuessArr[0].row, column: previousGuessArr[0].column });
            break;
          case "down":
            dirRes.firstDir = "up";
            previousGuessArr.push({ row: previousGuessArr[0].row, column: previousGuessArr[0].column });
            break;
          case "left":
            dirRes.firstDir = "right";
            previousGuessArr.push({ row: previousGuessArr[0].row, column: previousGuessArr[0].column });
            break;
          case "right":
            dirRes.firstDir = "left";
            previousGuessArr.push({ row: previousGuessArr[0].row, column: previousGuessArr[0].column });
            break;
        }
      }
      return true;
    }
    let playerResponse = player.board.receiveAttack(coords);
    if (playerResponse != undefined) {
      return false;
    }
    return true;
  }
}

function getFirstDir(row: number, column: number, player: Player) {
  let dirArr: string[] = [];
  if (row === 0) {
    dirArr.push("down");
    if (column === 0) {
      dirArr.push("right");
    } else if (column === 9) {
      dirArr.push("left");
    } else {
      dirArr.push("right");
      dirArr.push("left");
    }
  } else if (row === 9) {
    dirArr.push("up");
    if (column === 0) {
      dirArr.push("right");
    } else if (column === 9) {
      dirArr.push("left");
    } else {
      dirArr.push("right");
      dirArr.push("left");
    }
  } else {
    dirArr.push("up");
    dirArr.push("down");
    if (column === 0) {
      dirArr.push("right");
    } else if (column === 9) {
      dirArr.push("left");
    } else {
      dirArr.push("right");
      dirArr.push("left");
    }
  }
  if (dirArr.includes("left")) {
    if (positionAlreadyKnown(row, column - 1, player)) {
      let indexOfLeft = dirArr.indexOf("left");
      dirArr.splice(indexOfLeft, 1);
    }
  }
  if (dirArr.includes("right")) {
    if (positionAlreadyKnown(row, column + 1, player)) {
      let indexOfRight = dirArr.indexOf("right");
      dirArr.splice(indexOfRight, 1);
    }
  }
  if (dirArr.includes("up")) {
    if (positionAlreadyKnown(row - 1, column, player)) {
      let indexOfUp = dirArr.indexOf("up");
      dirArr.splice(indexOfUp, 1);
    }
  }
  if (dirArr.includes("down")) {
    if (positionAlreadyKnown(row + 1, column, player)) {
      let indexOfDown = dirArr.indexOf("down");
      dirArr.splice(indexOfDown, 1);
    }
  }
  let rndmNmbr = Math.floor(Math.random() * dirArr.length);
  return { firstDir: dirArr[rndmNmbr], arr: dirArr };
}

function positionAlreadyKnown(row: number, column: number, player: Player): boolean {
  return player.allKnownPositions.some((e) => {
    if (e[0] === row) {
      if (e[1] === column) {
        return true;
      }
    }
    return false;
  });
}

