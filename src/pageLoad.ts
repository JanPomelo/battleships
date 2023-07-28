"use strict";

import { Player } from "./player";
import Duck from "./img/duck.jpg";
export function createPlayerDiv(id: string, player: Player): HTMLDivElement {
  const div: HTMLDivElement = document.createElement("div");
  div.classList.add("flex", "flex-col", "items-center", "w-full", "p-2", "rounded-xl", "border-4", "border-black");
  div.id = id;
  div.appendChild(createGrid(player));
  return div;
}

function createGrid(player: Player): HTMLDivElement {
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
        gridPoint.classList.add('bg-white');
      }
      div.appendChild(gridPoint);
    }
  }
  return div;
}
