import Background from "./img/background.jpeg";
import { startNewGame } from "./game";
import { Player } from "./player";
import { Game, checkEnd } from "./game";
import { Ship } from "./ship";
const main: HTMLDivElement = document.getElementById("main") as HTMLDivElement;
let game = startNewGame();
let horVer: "Horizontal" | "Vertical" = "Horizontal";

export function loadBGImg() {
  const img: HTMLImageElement = document.createElement("img");
  img.src = Background;
  main.appendChild(img);
  img.id = "bgIMG";
}
// Function to write the Introduction test
export function writeIntroduction() {
  // TODO: font color change to css
  const div: HTMLDivElement = document.createElement("div");
  main.appendChild(div);
  div.classList.add(
    "bg-black/30",
    "text-white",
    "p-2",
    "rounded-lg",
    "text-justify",
    "flex",
    "flex-col",
    "xl:flex-row",
    "items-center",
    "xl:justify-between",
    "xl:gap-10"
  );
  const introParagraph: HTMLParagraphElement = document.createElement("p");
  introParagraph.innerText =
    "Are you ready for an epic battleship fight? Destroy all of the enemy ships before your enemy destroys yours to win. Sounds easy? Well, try it out captain and press the play button!";
  introParagraph.classList.add("font-bold", "h-fit-content", "sm:h-16", "xl:h-6");
  introParagraph.id = "introPar";
  div.appendChild(introParagraph);
  const playButton: HTMLButtonElement = document.createElement("button");
  playButton.innerText = "Play";
  playButton.classList.add(
    "rounded-lg",
    "text-black",
    "bg-white",
    "w-16",
    "font-bold",
    "border-2",
    "border-black",
    "drop-shadow-md",
    "hover:bg-gray-200",
    "active:bg-gray-400"
  );
  playButton.addEventListener("click", () => {
    changeIntroText(introParagraph);
    startGame();
    playButton.classList.toggle("invisible");
  });
  div.appendChild(playButton);
}

function changeIntroText(paragraph: HTMLParagraphElement): void {
  paragraph.innerText = "Place your ships on your Board. Choose wisely! Good luck captain!";
}

function startGame() {
  createGameDiv(game);
}

function createGameDiv(game: Game): void {
  const div: HTMLDivElement = document.createElement("div");
  div.classList.add(
    "bg-black/30",
    "rounded-xl",
    "mt-2",
    "flex",
    "gap-4",
    "flex-col",
    "lg:flex-row",
    "p-2",
    "flex-grow"
  );
  div.id = "gameDiv";
  main.appendChild(div);
  const computerBoard: HTMLDivElement = loadPlayerDiv(game.computer, "Enemy");
  const playerBoard: HTMLDivElement = loadPlayerDiv(game.player, "You");
  div.appendChild(computerBoard);
  div.appendChild(playerBoard);
  makeShipsPlaceable(game.player);
}

function loadPlayerDiv(player: Player, name: String): HTMLDivElement {
  const div: HTMLDivElement = document.createElement("div");
  div.classList.add("p-2", "bg-black/30", "rounded-xl", "flex-grow");
  const headingdiv: HTMLDivElement = document.createElement("div");
  headingdiv.classList.add("flex", "justify-between");
  headingdiv.id = "playerHeadingDiv";
  const heading: HTMLHeadingElement = document.createElement("h3");
  heading.innerText = name === "Enemy" ? "Enemy Board" : "Your Board";
  heading.classList.add("font-bold");
  const subDiv: HTMLDivElement = document.createElement("div");
  subDiv.classList.add("flex", "gap-3");
  subDiv.id = `${player.name}-subDiv`;
  div.appendChild(headingdiv);
  headingdiv.appendChild(heading);
  div.appendChild(subDiv);
  subDiv.appendChild(loadGameBoard(player));
  if (player.name === "Player") {
    createShipsDiv(subDiv, player);
    createHorVerButton(headingdiv);
  }
  return div;
}

function loadGameBoard(player: Player): HTMLDivElement {
  const div: HTMLDivElement = document.createElement("div");
  div.classList.add("playGround", "bg-black");
  div.id = player.name;
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const miniDiv: HTMLDivElement = document.createElement("div");
      miniDiv.classList.add("rounded", "bg-gray-200", "miniDiv");
      div.appendChild(miniDiv);
      miniDiv.id = `${i}-${j}`;
      if (player.name === "Player") {
        miniDiv.addEventListener("dragover", handleDragOver);
        miniDiv.addEventListener("dragenter", handleDragEnter);
        miniDiv.addEventListener("dragleave", handleDragLeave);
        miniDiv.addEventListener("drop", handleDrop);
      }
    }
  }
  if (player.name === "Player") {
    printGameBoard(player, div);
  }
  return div;
}

function addOnClickToEnemeyBoard(bigDiv: HTMLDivElement) {
  for (let i = 0; i < bigDiv.children.length; i++) {
    bigDiv.children[i].addEventListener("click", () => {
      const row: number = Number(bigDiv.children[i].id.substring(0, 1));
      const col: number = Number(bigDiv.children[i].id.substring(2));
      if (!game.computer.board.receiveAttack([row, col])) {
        game.computer.makeMove(null, game.player);
        printGameBoard(game.computer, bigDiv);
        printGameBoard(game.player, document.getElementById("Player") as HTMLDivElement);
        checkSunkStatus(game.computer);
        checkSunkStatus(game.player);
        createEndScreen();
      }
    });
  }
}

export function printGameBoard(player: Player, div: HTMLDivElement) {
  //
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (player.board.board[i][j] === "Hit") {
        div.children[Number(i.toString() + j.toString())].classList.remove("bg-green-400", "bg-gray-200");
        div.children[Number(i.toString() + j.toString())].classList.add("bg-red-300");
      } else if (player.board.board[i][j] === "Sea") {
        div.children[Number(i.toString() + j.toString())].classList.add("bg-blue-400");
        div.children[Number(i.toString() + j.toString())].classList.remove("bg-gray-200");
      } else if (player.name === "Player" && player.board.board[i][j] instanceof Ship) {
        div.children[Number(i.toString() + j.toString())].classList.add("bg-green-400");
        div.children[Number(i.toString() + j.toString())].classList.remove("bg-gray-200");
      }
    }
  }
}

function handleDragStart(e: DragEvent) {
  this.classList.add("opacity-60");
  let length: number;
  switch (this.children.length) {
    case 5:
      length = 5;
      break;
    case 4:
      length = 4;
      break;
    case 2:
      length = 2;
      break;
    default:
      length = 3;
      break;
  }
  e.dataTransfer.setData("text/plain", length.toString());
  e.dataTransfer.setData("texto", this.id);
}

function handleDragEnd() {
  this.classList.remove("opacity-60");
}

function handleDragOver(e: DragEvent) {
  e.preventDefault();
  return false;
}

function handleDragEnter(e: DragEvent) {
  this.classList.add("over");
}

function handleDragLeave() {
  this.classList.remove("over");
}

function handleDrop(e: DragEvent) {
  this.style.opacity = 1;
  e.stopPropagation(); // stops the browser from redirecting.
  let length: string = e.dataTransfer.getData("text/plain");
  const ship: Ship = new Ship(Number(length));
  const row: number = Number(this.id.substring(0, 1));
  const column: number = Number(this.id.substring(2));
  if (game.player.board.placeShip(ship, horVer, [row, column]) === undefined) {
    printGameBoard(game.player, document.getElementById("Player") as HTMLDivElement);
    const draggedShip: HTMLDivElement = document.getElementById(e.dataTransfer.getData("texto")) as HTMLDivElement;
    draggedShip.removeEventListener("dragend", handleDragEnd);
    draggedShip.classList.add("opacity-60");
    draggedShip.draggable = false;
    checkShips();
  }
  return false;
}

function checkShips() {
  if (game.player.board.ships.length > 4) {
    const shipsDiv = document.getElementById("shipsDiv");
    shipsDiv.classList.remove("mb-auto");
    shipsDiv.classList.add("flex-col");
    for (let i = 0; i < shipsDiv.children.length; i++) {
      shipsDiv.children[i].classList.remove("flex-col");
      shipsDiv.children[i].classList.remove("mb-auto");
      shipsDiv.children[i].classList.remove("opacity-60");
    }
    const gameBoardDiv: HTMLDivElement = document.getElementById("Enemy") as HTMLDivElement;
    addOnClickToEnemeyBoard(gameBoardDiv);
    const div: HTMLDivElement = document.getElementById("Enemy-subDiv") as HTMLDivElement;
    createShipsDiv(div, game.computer);
    const buttonDiv: HTMLDivElement = document.getElementById("buttonDiv") as HTMLDivElement;
    buttonDiv.remove();
  }
}

function createShipsDiv(bigDiv: HTMLDivElement, player: Player) {
  const div: HTMLDivElement = document.createElement("div");
  div.id = "shipsDiv";
  div.classList.add("flex", "flex-col", "gap-3");
  bigDiv.appendChild(div);
  const carrier: HTMLDivElement = document.createElement("div");
  carrier.classList.add("flex", "boat", "bg-black");
  for (let i = 0; i < 5; i++) {
    const miniDiv: HTMLDivElement = document.createElement("div");
    miniDiv.classList.add("miniDiv", "bg-green-400");
    carrier.appendChild(miniDiv);
  }
  carrier.id = `${player.name}-carrier`;
  div.appendChild(carrier);
  const battleship: HTMLDivElement = document.createElement("div");
  battleship.classList.add("flex", "boat", "bg-black");
  for (let i = 0; i < 4; i++) {
    const miniDiv: HTMLDivElement = document.createElement("div");
    miniDiv.classList.add("miniDiv", "bg-green-400");
    battleship.appendChild(miniDiv);
  }
  battleship.id = `${player.name}-battleship`;
  div.appendChild(battleship);
  const cruiser: HTMLDivElement = document.createElement("div");
  cruiser.classList.add("flex", "boat", "bg-black");
  for (let i = 0; i < 3; i++) {
    const miniDiv: HTMLDivElement = document.createElement("div");
    miniDiv.classList.add("miniDiv", "bg-green-400");
    cruiser.appendChild(miniDiv);
  }
  cruiser.id = `${player.name}-cruiser`;
  div.appendChild(cruiser);
  const submarine: HTMLDivElement = document.createElement("div");
  submarine.classList.add("flex", "boat", "bg-black");
  for (let i = 0; i < 3; i++) {
    const miniDiv: HTMLDivElement = document.createElement("div");
    miniDiv.classList.add("miniDiv", "bg-green-400");
    submarine.appendChild(miniDiv);
  }
  submarine.id = `${player.name}-submarine`;
  div.appendChild(submarine);
  const destroyer: HTMLDivElement = document.createElement("div");
  destroyer.classList.add("flex", "boat", "bg-black");
  for (let i = 0; i < 2; i++) {
    const miniDiv: HTMLDivElement = document.createElement("div");
    miniDiv.classList.add("miniDiv", "bg-green-400");
    destroyer.appendChild(miniDiv);
  }
  destroyer.id = `${player.name}-destroyer`;
  div.appendChild(destroyer);
}

function createHorVerButton(bigDiv: HTMLDivElement) {
  const div: HTMLDivElement = document.createElement("div");
  div.id = "buttonDiv";
  const horizontalBut: HTMLButtonElement = document.createElement("button");
  horizontalBut.id = "hori";
  horizontalBut.innerText = "Horizontal";
  const verticalBut: HTMLButtonElement = document.createElement("button");
  verticalBut.id = "verti";
  verticalBut.innerText = "Vertical";
  div.appendChild(horizontalBut);
  div.appendChild(verticalBut);
  div.classList.add("flex");
  horizontalBut.classList.add("border", "border-black", "px-1", "bg-gray-400", "text-black", "rounded-l", "mb-1");
  verticalBut.classList.add("border", "border-black", "px-1", "bg-white", "text-black", "rounded-r", "mb-1");
  bigDiv.appendChild(div);

  function makeThingsHorizontal() {
    horizontalBut.classList.toggle("bg-gray-400");
    horizontalBut.classList.toggle("bg-white");
    verticalBut.classList.toggle("bg-gray-400");
    verticalBut.classList.toggle("bg-white");
    horizontalBut.removeEventListener("click", makeThingsHorizontal);
    verticalBut.addEventListener("click", makeThingsVertical);
    horVer = "Horizontal";
    const shipsDiv = document.getElementById("shipsDiv");
    shipsDiv.classList.toggle("flex-col");
    for (let i = 0; i < shipsDiv.children.length; i++) {
      shipsDiv.children[i].classList.toggle("flex-col");
      shipsDiv.children[i].classList.toggle("mb-auto");
    }
  }

  function makeThingsVertical() {
    horizontalBut.classList.toggle("bg-gray-400");
    horizontalBut.classList.toggle("bg-white");
    verticalBut.classList.toggle("bg-gray-400");
    verticalBut.classList.toggle("bg-white");
    verticalBut.removeEventListener("click", makeThingsVertical);
    horizontalBut.addEventListener("click", makeThingsHorizontal);
    const shipsDiv = document.getElementById("shipsDiv");
    shipsDiv.classList.toggle("flex-col");
    horVer = "Vertical";
    for (let i = 0; i < shipsDiv.children.length; i++) {
      shipsDiv.children[i].classList.toggle("flex-col");
      shipsDiv.children[i].classList.toggle("mb-auto");
    }
  }

  verticalBut.addEventListener("click", makeThingsVertical);
  horizontalBut.addEventListener("click", makeThingsHorizontal);
}

function makeShipsPlaceable(player: Player) {
  const boats: HTMLDivElement[] = [];
  boats.push(document.getElementById(`${player.name}-carrier`) as HTMLDivElement);
  console.log(document.getElementById(`${player.name}-carrier`));
  boats.push(document.getElementById(`${player.name}-battleship`) as HTMLDivElement);
  boats.push(document.getElementById(`${player.name}-cruiser`) as HTMLDivElement);
  boats.push(document.getElementById(`${player.name}-submarine`) as HTMLDivElement);
  boats.push(document.getElementById(`${player.name}-destroyer`) as HTMLDivElement);
  for (let i = 0; i < boats.length; i++) {
    boats[i].draggable = true;
    boats[i].classList.add("cursor-move");
    boats[i].addEventListener("dragstart", handleDragStart);
    boats[i].addEventListener("dragend", handleDragEnd);
  }
}

function checkSunkStatus(player: Player) {
  const boats: HTMLDivElement[] = [];
  boats.push(document.getElementById(`${player.name}-carrier`) as HTMLDivElement);
  boats.push(document.getElementById(`${player.name}-battleship`) as HTMLDivElement);
  boats.push(document.getElementById(`${player.name}-cruiser`) as HTMLDivElement);
  boats.push(document.getElementById(`${player.name}-submarine`) as HTMLDivElement);
  boats.push(document.getElementById(`${player.name}-destroyer`) as HTMLDivElement);

  const playerBoardShipsSorted = player.board.ships.sort(compare);
  console.log(playerBoardShipsSorted);
  for (let i = 0; i < playerBoardShipsSorted.length; i++) {
    if (playerBoardShipsSorted[i].isSunk()) {
      //console.log(boats[i].children[0].classList);
      for (let j = 0; j < boats[i].children.length; j++) {
        boats[i].children[j].classList.remove("bg-green-400");
        boats[i].children[j].classList.add("bg-red-400");
      }
    }
  }
}

function compare(a: Ship, b: Ship) {
  if (a.length < b.length) {
    return 1;
  }
  if (a.length > b.length) {
    return -1;
  }
  return 0;
}

export function createEndScreen() {
  const endCheck: string = checkEnd(game);
  if (endCheck === "not yet") {
    return;
  } else {
    const div: HTMLDivElement = document.createElement("div");
    div.classList.add(
      "absolute",
      "endGameScreen",
      "bg-white",
      "border-2",
      "rounded-lg",
      "border-black",
      "p-2",
      "flex",
      "flex-col",
      "justify-between"
    );
    main.appendChild(div);
    const playerBoard: HTMLDivElement = document.getElementById("Player") as HTMLDivElement;
    const computerBoard: HTMLDivElement = document.getElementById("Enemy") as HTMLDivElement;
    playerBoard.style.pointerEvents = "none";
    computerBoard.style.pointerEvents = "none";
    const p: HTMLParagraphElement = document.createElement("p");
    p.innerHTML =
      endCheck === "win"
        ? "Unbelievable, captain! You won the game!"
        : "What a shame. You lost the game! Lousy captain.";
    p.classList.add("font-bold", "text-lg", "text-black");
    div.appendChild(p);
    const newGameBut: HTMLButtonElement = document.createElement("button");
    newGameBut.innerText = "New Game";
    newGameBut.classList.add("border", "rounded-lg", "border-black", "text-lg", "bg-black");
    div.appendChild(newGameBut);
    newGameBut.addEventListener("click", () => {
      div.remove();
      const gameDiv: HTMLDivElement = document.getElementById("gameDiv") as HTMLDivElement;
      game = startNewGame();
      gameDiv.remove();
      startGame();
    });
  }
}
