"use strict";
import { Gameboard } from "./gameboard";
import { calcAllPossMoves } from "./smartCom";
import { Ship } from "./ship";

let previousGuessArr: { row: number; column: number }[] = [];
let dirRes: { firstDir: string; arr: string[] } = { firstDir: "up", arr: [] };
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
        if (previousGuessArr.length === 0) {
          row = Math.floor(Math.random() * 10);
          column = Math.floor(Math.random() * 10);
          computerResponse = player.board.receiveAttack([row, column]);
        } else if (previousGuessArr.length === 1) {
          if (dirRes.arr.length === 0) {
            dirRes = getFirstDir(previousGuessArr[0].row, previousGuessArr[0].column, player);
            //console.log(dirRes);
          }
          switch (dirRes.firstDir) {
            case "up":
              row = previousGuessArr[0].row - 1;
              column = previousGuessArr[0].column;
              if (player.allKnownPositions.some((e) => {
                if (e[0] === row) {
                  if (e[1] === column) {
                    return true;
                  } 
                }
                return false;
              })) {
                let indexOfUp = dirRes.arr.indexOf("up");
                dirRes.arr.splice(indexOfUp, 1);
                let rndmNmbr = Math.floor(Math.random() * dirRes.arr.length);
                dirRes.firstDir = dirRes.arr[rndmNmbr];
              }
              break;
            case "down":
              row = previousGuessArr[0].row + 1;
              column = previousGuessArr[0].column;
              if (
                player.allKnownPositions.some((e) => {
                  if (e[0] === row) {
                    if (e[1] === column) {
                      return true;
                    }
                  }
                  return false;
                })
              ) {
                let indexOfDown = dirRes.arr.indexOf("down");
                dirRes.arr.splice(indexOfDown, 1);
                let rndmNmbr = Math.floor(Math.random() * dirRes.arr.length);
                dirRes.firstDir = dirRes.arr[rndmNmbr];
              }
              break;
            case "left":
              row = previousGuessArr[0].row;
              column = previousGuessArr[0].column - 1;
              if (
                player.allKnownPositions.some((e) => {
                  if (e[0] === row) {
                    if (e[1] === column) {
                      return true;
                    }
                  }
                  return false;
                })
              ) {
                let indexOfLeft = dirRes.arr.indexOf("left");
                dirRes.arr.splice(indexOfLeft, 1);
                let rndmNmbr = Math.floor(Math.random() * dirRes.arr.length);
                dirRes.firstDir = dirRes.arr[rndmNmbr];
              }
              break;
            case "right":
              row = previousGuessArr[0].row;
              column = previousGuessArr[0].column + 1;
              if (
                player.allKnownPositions.some((e) => {
                  if (e[0] === row) {
                    if (e[1] === column) {
                      return true;
                    }
                  }
                  return false;
                })
              ) {
                let indexOfRight = dirRes.arr.indexOf("right");
                dirRes.arr.splice(indexOfRight, 1);
                let rndmNmbr = Math.floor(Math.random() * dirRes.arr.length);
                dirRes.firstDir = dirRes.arr[rndmNmbr];
              }
              break;
          }
          computerResponse = player.board.receiveAttack([row, column]);
        } else if (previousGuessArr.length > 1) {
          switch (dirRes.firstDir) {
            case "up":
              row = previousGuessArr[previousGuessArr.length - 1].row - 1;
              column = previousGuessArr[previousGuessArr.length - 1].column;
              if (
                player.allKnownPositions.some((e) => {
                  if (e[0] === row) {
                    if (e[1] === column) {
                      return true;
                    }
                  }
                  return false;
                })
              ) {
                let indexOfUp = dirRes.arr.indexOf("up");
                dirRes.arr.splice(indexOfUp, 1);
                let rndmNmbr = Math.floor(Math.random() * dirRes.arr.length);
                dirRes.firstDir = dirRes.arr[rndmNmbr];
              }
              break;
            case "down":
              row = previousGuessArr[previousGuessArr.length - 1].row + 1;
              column = previousGuessArr[previousGuessArr.length - 1].column;
              if (
                player.allKnownPositions.some((e) => {
                  if (e[0] === row) {
                    if (e[1] === column) {
                      return true;
                    }
                  }
                  return false;
                })
              ) {
                let indexOfDown = dirRes.arr.indexOf("down");
                dirRes.arr.splice(indexOfDown, 1);
                let rndmNmbr = Math.floor(Math.random() * dirRes.arr.length);
                dirRes.firstDir = dirRes.arr[rndmNmbr];
              }
              break;
            case "left":
              row = previousGuessArr[previousGuessArr.length - 1].row;
              column = previousGuessArr[previousGuessArr.length - 1].column - 1;
              if (
                player.allKnownPositions.some((e) => {
                  if (e[0] === row) {
                    if (e[1] === column) {
                      return true;
                    }
                  }
                  return false;
                })
              ) {
                let indexOfLeft = dirRes.arr.indexOf("left");
                dirRes.arr.splice(indexOfLeft, 1);
                let rndmNmbr = Math.floor(Math.random() * dirRes.arr.length);
                dirRes.firstDir = dirRes.arr[rndmNmbr];
              }
              break;
            case "right":
              row = previousGuessArr[previousGuessArr.length - 1].row;
              column = previousGuessArr[previousGuessArr.length - 1].column + 1;
              if (
                player.allKnownPositions.some((e) => {
                  if (e[0] === row) {
                    if (e[1] === column) {
                      return true;
                    }
                  }
                  return false;
                })
              ) {
                let indexOfRight = dirRes.arr.indexOf("right");
                dirRes.arr.splice(indexOfRight, 1);
                let rndmNmbr = Math.floor(Math.random() * dirRes.arr.length);
                dirRes.firstDir = dirRes.arr[rndmNmbr];
              }
              break;
          }
          computerResponse = player.board.receiveAttack([row, column]);
        }
      } while (computerResponse != undefined);
      player.allKnownPositions.push([row, column]);
      if (previousGuessArr.length === 0 && player.board.board[row][column] instanceof Ship) {
        const ship: Ship = player.board.board[row][column] as Ship;
        if (!ship.isSunk()) {
          previousGuessArr.push({ row: row, column: column });
        }
      } else if (
        previousGuessArr.length === 1 &&
        (player.board.board[row][column] === "Sea" ||
          (player.board.board[row][column] instanceof Ship &&
            player.board.board[row][column] !==
              player.board.board[previousGuessArr[0].row][previousGuessArr[0].column]))
      ) {
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
      } else if (previousGuessArr.length > 0 && player.board.board[row][column] instanceof Ship) {
        const thisShip: Ship = player.board.board[row][column] as Ship;
        const oriShip: Ship = player.board.board[previousGuessArr[0].row][previousGuessArr[0].column] as Ship;
        if (thisShip.name === oriShip.name) {
          if (thisShip.isSunk()) {
            previousGuessArr = [];
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
  console.log(player.allKnownPositions);
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
    if (
      player.allKnownPositions.some((e) => {
        if (e[0] === row) {
          if (e[1] === column -1) {
            return true;
          }
        }
        return false;
      })
    ) {
      let indexOfLeft = dirArr.indexOf("left");
      dirArr.splice(indexOfLeft, 1);
    }
  }
  if (dirArr.includes("right")) {
    if (player.allKnownPositions.some((e) => {
      if (e[0] === row ) {
        if (e[1] === column + 1) {
          return true;
        }
      }
      return false;
    })) {
      let indexOfRight = dirArr.indexOf("right");
      dirArr.splice(indexOfRight, 1);
    }
  }
  if (dirArr.includes("up")) {
    console.log([row - 1, column]);
    if (player.allKnownPositions.some((e) => {
      if (e[0] === row - 1) {
        if (e[1] === column) {
          return true;
        }
      }
      return false;
    })) {
      let indexOfUp = dirArr.indexOf("up");
      dirArr.splice(indexOfUp, 1);
    }
  }
  if (dirArr.includes("down")) {
    if (player.allKnownPositions.some((e) => {
      if (e[0] === row + 1) {
        if (e[1] === column) {
          return true;
        }
      }
      return false;
    })) {
      let indexOfDown = dirArr.indexOf("down");
      dirArr.splice(indexOfDown, 1);
    }
  }
  let rndmNmbr = Math.floor(Math.random() * dirArr.length);
  return { firstDir: dirArr[rndmNmbr], arr: dirArr };
}
