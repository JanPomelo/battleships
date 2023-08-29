"use strict";

import { Player } from "./player";
import Duck from "./img/duck.jpg";
import { Game, endGame } from "./game";
import Iron from "./img/rusty-iron.jpg";
import { Ship } from "./ship";

let horVert: "Vertical" | "Horizontal" = "Horizontal";

export function createPlayerDiv(id: string, player: Player, game: Game): HTMLDivElement {
  const div: HTMLDivElement = document.createElement("div");
  div.classList.add(
    "player-display",
    "relative",
    "w-full",
    "p-2",
    "rounded-xl",
    "border-4",
    "flex",
    "flex-col",
    "gap-2",
    "border-black",
    "overflow-hidden"
  );
  div.id = id;
  const img = document.createElement("img");
  img.src = Iron;
  img.classList.add("backgroundIMG");
  div.appendChild(img);
  div.appendChild(createGrid(player, game));
  if (player.name === "Player") {
    div.appendChild(createBoatPanel());
    div.appendChild(createHoriVertButton());
  }
  return div;
}

function createHoriVertButton(): HTMLDivElement {
  const div: HTMLDivElement = document.createElement("div");
  const hor: HTMLButtonElement = document.createElement("button");
  hor.classList.add("w-3", "h-3", "bg-gray-300");
  hor.addEventListener("click", () => {
    const boatPanel = document.getElementById("boatPanel");

    //boatPanel.classList.add("flex-col");
    boatPanel.classList.add("flex-col");
    horVert = "Horizontal";
    for (let i = 0; i < boatPanel.children.length; i++) {
      boatPanel.children[i].classList.remove("flex-col");
      const imgs: HTMLCollection = boatPanel.children[i].getElementsByTagName("img");
      //console.log(imgs);
      for (let j = 0; j < imgs.length; j++) {
        imgs[j].classList.add('rotate-90');
        imgs[j].classList.remove("rotate-180");
      }
    }
  });
  const vert: HTMLButtonElement = document.createElement("button");
  vert.addEventListener("click", () => {
    const boatPanel = document.getElementById("boatPanel");
    boatPanel.classList.remove("flex-col");
    horVert = "Vertical";
    for (let i = 0; i < boatPanel.children.length; i++) {
      boatPanel.children[i].classList.add("flex-col");
      const imgs: HTMLCollection = boatPanel.children[i].getElementsByTagName("img");
      for (let j = 0; j < imgs.length; j++) {
        imgs[j].classList.remove("rotate-90");
        imgs[j].classList.add("rotate-180");
      }
    }
    //boatPanel.classList.add("flex-col");
  });
  vert.classList.add("w-3", "h-3", "bg-gray-300");
  div.appendChild(hor);
  div.appendChild(vert);
  return div;
}

function createGrid(player: Player, game: Game): HTMLDivElement {
  const div: HTMLDivElement = document.createElement("div");
  div.classList.add("battleGrid");
  for (let i = 0; i < player.board.board.length; i++) {
    for (let j = 0; j < player.board.board[i].length; j++) {
      const gridPoint = document.createElement("div");
      gridPoint.ondragover = (event) => {
        event.preventDefault();
      };
      gridPoint.id = `${i},${j}`;
      gridPoint.ondrop = (ev) => {
        ev.preventDefault();
        const length: number = Number(ev.dataTransfer.getData("text"));
        let shipPlaced = player.board.placeShip(new Ship(length), horVert, [i, j]);
        if (shipPlaced === undefined) {
          const divo = document.getElementById(ev.dataTransfer.getData("ID"));
          divo.draggable = false;
          divo.classList.add("opacity-50");
        }
        console.log(game.player.board.ships);
        reloadGrids(game);
      };
      gridPoint.classList.add("rounded");
      if (player.name === "Player") {
        gridPoint.classList.add("bg-gray-200");
        if (player.board.board[i][j]) {
          const bckgrndIMG: HTMLImageElement = document.createElement("img");
          gridPoint.classList.add("overflow-hidden");
          bckgrndIMG.src = Duck;
          gridPoint.appendChild(bckgrndIMG);
          bckgrndIMG.classList.add("h-full", "w-full");
          if (
            player.board.board[i][j - 1] === player.board.board[i][j] ||
            player.board.board[i][j + 1] === player.board.board[i][j]
          ) {
            bckgrndIMG.classList.add("rotate-90");
          } else {
            bckgrndIMG.classList.add("rotate-180");
          }
        }
      } else {
        gridPoint.classList.add("bg-gray-200");
        gridPoint.addEventListener("click", function revealItem() {
          player.board.receiveAttack([i, j]);
          reloadGrids(game);
          if (endGame(game)) {
            return;
          }
          player.makeMove(null, game.player);
          reloadGrids(game);
          if (endGame(game)) {
            return;
          }
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
    if (player.name === "Player") {
      if (player.board.board[row][col] && typeof player.board.board[row][col] != "string") {
        if (grid.children[i].children.length === 0) {
          const bckgrndIMG: HTMLImageElement = document.createElement("img");
          grid.children[i].classList.add("overflow-hidden");
          bckgrndIMG.src = Duck;
          grid.children[i].appendChild(bckgrndIMG);
          bckgrndIMG.classList.add("h-full", "w-full");
          if (
            player.board.board[row][col - 1] === player.board.board[row][col] ||
            player.board.board[row][col + 1] === player.board.board[row][col]
          ) {
            bckgrndIMG.classList.add("rotate-90");
          } else {
            bckgrndIMG.classList.add("rotate-180");
          }
        }
      }
    }
    //}
  }
}

function createBoatPanel(): HTMLDivElement {
  const div: HTMLDivElement = document.createElement("div");
  div.id = "boatPanel";
  div.classList.add(
    "flex",
    "flex-col",
    "gap-2",
    "pl-2",
    "py-2",
    "bg-gray-200",
    "w-44",
    "h-44",
    "rounded-lg",
    "border-black"
  );
  div.appendChild(createShip(5, "carrier"));
  div.appendChild(createShip(4, "battleShip"));
  div.appendChild(createShip(3, "uboot"));
  div.appendChild(createShip(3, "bomba"));
  div.appendChild(createShip(2, "destroyer"));
  return div;
}

function createShip(length: number, name: string): HTMLDivElement {
  const div: HTMLDivElement = document.createElement("div");
  div.classList.add("flex", "mb-auto");
  div.draggable = true;
  div.id = name;
  div.ondragstart = (ev) => {
    ev.dataTransfer.setData("text", length.toString());
    ev.dataTransfer.setData("ID", div.id);
  };
  for (let i = 0; i < length; i++) {
    const mDiv = document.createElement("div");
    mDiv.classList.add("boatsens");
    const bckgrndIMG: HTMLImageElement = document.createElement("img");
    mDiv.classList.add("overflow-hidden");
    bckgrndIMG.src = Duck;
    bckgrndIMG.draggable = false;
    mDiv.draggable = false;
    mDiv.appendChild(bckgrndIMG);
    bckgrndIMG.classList.add("h-full", "w-full", "rotate-90");

    div.appendChild(mDiv);
  }
  return div;
}
