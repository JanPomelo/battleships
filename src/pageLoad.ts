"use strict";

import { Player } from "./player";
import Duck from "./img/duck.jpg";
import { Game } from "./game";
export function createPlayerDiv(id: string, player: Player, game: Game): HTMLDivElement {
  const div: HTMLDivElement = document.createElement("div");
  div.classList.add("flex", "flex-col", "items-center", "w-full", "p-2", "rounded-xl", "border-4", "border-black");
  div.id = id;
  div.appendChild(createGrid(player, game));
  return div;
}

function createGrid(player: Player, game: Game): HTMLDivElement {
  const div: HTMLDivElement = document.createElement("div");
  div.classList.add("battleGrid");
  for (let i = 0; i < player.board.board.length; i++) {
    for (let j = 0; j < player.board.board[i].length; j++) {
      const gridPoint = document.createElement("div");
      if (player.name === "Player") {
        gridPoint.classList.add("bg-blue-100");
        if (player.board.board[i][j]) {
          const bckgrndIMG: HTMLImageElement = document.createElement("img");
          gridPoint.classList.add("overflow-hidden");
          bckgrndIMG.src = Duck;
          gridPoint.appendChild(bckgrndIMG);
          bckgrndIMG.classList.add("h-full", "w-full");
          if (player.board.board[i][j - 1] || player.board.board[i][j + 1]) {
            bckgrndIMG.classList.add("rotate-90");
          } else {
            bckgrndIMG.classList.add("rotate-180");
          }
        }
      } else {
        gridPoint.classList.add("bg-white");
        gridPoint.addEventListener("click", function revealItem() {
          player.board.receiveAttack([i, j]);
          player.makeMove(null, game.player);
          reloadGrids(game);
          gridPoint.removeEventListener("click", revealItem);
        });
      }

      div.appendChild(gridPoint);
    }
  }
  return div;
}

function reloadGrids(game: Game) {
  const playerGrid = document.querySelector("#player").querySelector("div");
  const computerGrid = document.querySelector("#computer").querySelector("div");
  iterateThroughGrids(computerGrid, game.computer);
  iterateThroughGrids(playerGrid, game.player);
}

function iterateThroughGrids(grid: HTMLDivElement, player: Player) {
  console.log(player.board.allSunk());
  for (let i = 0; i < grid.children.length; i++) {
    //if (grid.children[i].classList.contains("revealed")) {
      const row = Math.floor(i / 10);
      const col = i % 10;
      if (player.board.board[row][col] === "Hit") {
        grid.children[i].classList.add("bg-red-300");
      }
      if (player.board.board[row][col] === "Sea") {
        grid.children[i].classList.add("bg-blue-300");
      }
    //}
  }
}
