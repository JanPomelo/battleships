import Background from "./img/background.jpeg";
import { startNewGame } from "./game";
import { Player } from "./player";
import { Game, checkEnd } from "./game";
import { Ship } from "./ship";
import "drag-drop-touch";
import { Gameboard } from "./gameboard";

const main: HTMLDivElement = document.getElementById("main") as HTMLDivElement;
let game = startNewGame();
let horVer: "Horizontal" | "Vertical" = "Horizontal";
let length: number;

// Function to load the background image
export function loadBGImg() {
  const img: HTMLImageElement = document.createElement("img");
  img.src = Background;
  main.appendChild(img);
  img.id = "bgIMG";
}
// Function to write the Introduction test
export function writeIntroduction() {
  // create element
  const div: HTMLDivElement = document.createElement("div");
  // style element
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
  // -- create child elements //
  // First //
  // create element
  const introParagraph: HTMLParagraphElement = document.createElement("p");
  // give it characteristics
  introParagraph.innerText =
    "Are you ready for an epic battleship fight? Destroy all of the enemy ships before your enemy destroys yours to win. Sounds easy? Well, try it out captain and press the play button!";
  introParagraph.id = "introPar";
  // style element
  introParagraph.classList.add("font-bold", "h-fit-content", "sm:h-16", "xl:h-6");
  // Second //
  // create element
  const playButton: HTMLButtonElement = document.createElement("button");
  // give it characteristics
  playButton.addEventListener("click", () => {
    // when the Play Button is pressed, change the intro text and start the game. Also remove the button from the DOM
    changeIntroText(introParagraph);
    createGameDiv(game);
    playButton.remove();
  });
  playButton.innerText = "Play";
  // style element
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
  // append child elements to the element
  div.appendChild(introParagraph);
  div.appendChild(playButton);
  // append element to the DOM
  main.appendChild(div);
}

// function to change the intro Text after the play button is pressed
function changeIntroText(paragraph: HTMLParagraphElement): void {
  paragraph.innerText = "Place your ships on your Board. Choose wisely! Good luck captain!";
}

// function to create the overall game div
function createGameDiv(game: Game): void {
  // create element
  const div: HTMLDivElement = document.createElement("div");
  // give it characteristics
  div.id = "gameDiv";
  // style element
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
  // -- create child elements //
  const computerBoard: HTMLDivElement = loadPlayerDiv(game.computer, "Enemy");
  const playerBoard: HTMLDivElement = loadPlayerDiv(game.player, "You");

  // append child elements to elements
  div.appendChild(computerBoard);
  div.appendChild(playerBoard);
  // append the div to the DOM
  main.appendChild(div);
  // function to make the ships for the player draggable
  makeShipsPlaceable(game.player);
}

// function to create the player div including the gameboard and the ships on the right side of it
function loadPlayerDiv(player: Player, name: String): HTMLDivElement {
  // create element
  const div: HTMLDivElement = document.createElement("div");
  // style element
  div.classList.add("p-2", "bg-black/30", "rounded-xl", "flex-grow");
  // -- create child elements //
  // First child //
  // create element
  const headingdiv: HTMLDivElement = document.createElement("div");
  // give it characteristics
  headingdiv.id = "playerHeadingDiv";
  // style element
  headingdiv.classList.add("flex", "justify-between");
  // -- create grandchild elements //
  // First grandchild //
  // create element
  const heading: HTMLHeadingElement = document.createElement("h3");
  // give it characteristics
  heading.innerText = name === "Enemy" ? "Enemy Board" : "Your Board";
  // style element
  heading.classList.add("font-bold");
  // Second grandchild //
  // create element
  const horVerBut: HTMLDivElement | null = player.name === "Player" ? createHorVerButton() : null;
  // append grandchild elements to child element
  headingdiv.appendChild(heading);
  if (player.name === "Player") headingdiv.appendChild(horVerBut);
  // Second child //
  // create element
  const subDiv: HTMLDivElement = document.createElement("div");
  // give it characteristics
  subDiv.id = `${player.name}-subDiv`;
  // style element
  subDiv.classList.add("flex", "gap-3");
  // append granchild elements to child element
  subDiv.appendChild(loadGameBoard(player));
  if (player.name === "Player") subDiv.appendChild(createShipsDiv(player));

  // append child elements to element
  div.appendChild(headingdiv);
  div.appendChild(subDiv);
  // return div
  return div;
}

// function to load GameBoard initially
function loadGameBoard(player: Player): HTMLDivElement {
  // create element
  const div: HTMLDivElement = document.createElement("div");
  // give it characteristics
  div.id = player.name;
  // style element
  div.classList.add("playGround", "bg-black");
  // create child elements
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      // create element
      const miniDiv: HTMLDivElement = document.createElement("div");
      // give it characteristics
      miniDiv.id = `${player.name}-${i}-${j}`;
      // style element
      miniDiv.classList.add("rounded", "bg-gray-200", "miniDiv");
      // append child element to element
      div.appendChild(miniDiv);
      // make the coord div a target for drag and drop
      if (player.name === "Player") {
        miniDiv.addEventListener("dragover", handleDragOver);
        miniDiv.addEventListener("dragenter", handleDragEnter);
        miniDiv.addEventListener("dragleave", handleDragLeave);
        miniDiv.addEventListener("drop", handleDrop);
      }
    }
  }
  return div;
}

// function to add an OnClick event to the divs on the enemy board
function addOnClickToEnemeyBoard(bigDiv: HTMLDivElement) {
  // for each div
  for (let i = 0; i < bigDiv.children.length; i++) {
    bigDiv.children[i].addEventListener("click", () => {
      const row: number = Number(bigDiv.children[i].id.substr(-3, 1));
      const col: number = Number(bigDiv.children[i].id.substr(-1));
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
      if (player.board.board[i][j] === null) {
        div.children[Number(i.toString() + j.toString())].classList.add("bg-gray-200");
        div.children[Number(i.toString() + j.toString())].classList.remove("bg-green-400");
      } else if (player.name === "Player" && player.board.board[i][j] instanceof Ship) {
        div.children[Number(i.toString() + j.toString())].classList.add("bg-green-400");
        div.children[Number(i.toString() + j.toString())].classList.remove("bg-gray-200", "bg-green-800");
      }
      if (player.board.board[i][j] instanceof Ship) {
        const shipi: Ship = player.board.board[i][j] as Ship;
        if (shipi.isSunk()) {
          div.children[Number(i.toString() + j.toString())].classList.remove(
            "bg-green-400",
            "bg-gray-200",
            "bg-red-300"
          );
          div.children[Number(i.toString() + j.toString())].classList.add("bg-gray-700");
        } else {
          for (let k = 0; k < shipi.hitCoords.length; k++) {
            if (i === shipi.hitCoords[k][0] && j === shipi.hitCoords[k][1]) {
              div.children[Number(i.toString() + j.toString())].classList.remove("bg-green-400", "bg-gray-200");
              div.children[Number(i.toString() + j.toString())].classList.add("bg-red-300");
            }
          }
        }
      } else if (player.board.board[i][j] === "Sea") {
        div.children[Number(i.toString() + j.toString())].classList.add("bg-blue-400");
        div.children[Number(i.toString() + j.toString())].classList.remove("bg-gray-200");
      }
    }
  }
}

function handleDragStart(e: DragEvent) {
  this.classList.add("opacity-60");
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
  let shipSpaceRows: number[] = [];
  let shipSpaceCols: number[] = [];
  const row: number = Number(this.id.substr(-3, 1));
  const column: number = Number(this.id.substr(-1));
  if (horVer === "Horizontal") {
    for (let i = 0; i < length; i++) {
      shipSpaceRows.push(row);
    }
    shipSpaceCols = game.player.board._createShipPlacementArr(length, column);
  } else {
    for (let i = 0; i < length; i++) {
      shipSpaceCols.push(column);
    }
    shipSpaceRows = game.player.board._createShipPlacementArr(length, row);
  }
  // check if the space where the boat should be placed is available
  if (game.player.board._checkIfSpaceIsFree(shipSpaceRows, shipSpaceCols)) {
    for (let i = 0; i < shipSpaceCols.length; i++) {
      const div = document.getElementById(`${game.player.name}-${shipSpaceRows[i]}-${shipSpaceCols[i]}`);
      div.classList.add("bg-green-800");
      div.classList.remove("bg-gray-200", "bg-orange-300");
    }
  }
}

function handleDragLeave(e: DragEvent) {
  let shipSpaceRows: number[] = [];
  let shipSpaceCols: number[] = [];
  const row: number = Number(this.id.substr(-3, 1));
  const column: number = Number(this.id.substr(-1));
  if (horVer === "Horizontal") {
    for (let i = 0; i < length; i++) {
      shipSpaceRows.push(row);
    }
    shipSpaceCols = game.player.board._createShipPlacementArr(length, column);
  } else {
    for (let i = 0; i < length; i++) {
      shipSpaceCols.push(column);
    }
    shipSpaceRows = game.player.board._createShipPlacementArr(length, row);
  }
  // check if the space where the boat should be placed is available
  if (game.player.board._checkIfSpaceIsFree(shipSpaceRows, shipSpaceCols)) {
    for (let i = 0; i < shipSpaceCols.length; i++) {
      const div = document.getElementById(`${game.player.name}-${shipSpaceRows[i]}-${shipSpaceCols[i]}`);
      div.classList.remove("bg-green-800");
      div.classList.add("bg-gray-200");
    }
  }
}

function handleDrop(e: DragEvent) {
  e.stopPropagation(); // stops the browser from redirecting.
  printGameBoard(game.player, document.getElementById("Player") as HTMLDivElement);
  const draggedShip: HTMLDivElement = document.getElementById(e.dataTransfer.getData("texto")) as HTMLDivElement;
  const shipName: string = draggedShip.id.substring(7);
  const ship: Ship = new Ship(Number(length), horVer, shipName);
  const row: number = Number(this.id.substr(-3, 1));
  const column: number = Number(this.id.substr(-1));
  if (game.player.board.placeShip(ship, horVer, [row, column]) === undefined) {
    printGameBoard(game.player, document.getElementById("Player") as HTMLDivElement);
    draggedShip.removeEventListener("dragend", handleDragEnd);
    draggedShip.classList.add("opacity-60");
    draggedShip.draggable = false;
    checkShips();
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (game.player.board.board[i][j]) {
          const div = document.getElementById(`Player-${i}-${j}`);
          div.addEventListener("dragstart", handleDragReStart);
          div.draggable = true;
        }
      }
    }
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
    div.appendChild(createShipsDiv(game.computer));
    const buttonDiv: HTMLDivElement = document.getElementById("buttonDiv") as HTMLDivElement;
    buttonDiv.remove();
    const introParagraph: HTMLParagraphElement = document.getElementById("introPar") as HTMLParagraphElement;
    introParagraph.innerText = `Okay, let's go Captain! Lets crush our enemy!`;
  }
}

function createShipsDiv(player: Player): HTMLDivElement {
  const div: HTMLDivElement = document.createElement("div");
  div.id = "shipsDiv";
  div.classList.add("flex", "flex-col", "gap-1", "sm:gap-3", "flex-wrap", "sm:flex-nowrap");
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

  return div;
}

function createHorVerButton(): HTMLDivElement {
  const div: HTMLDivElement = document.createElement("div");
  div.id = "buttonDiv";
  horVer = "Horizontal";
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
  return div;
}

function makeShipsPlaceable(player: Player) {
  const boats: HTMLDivElement[] = [];
  boats.push(document.getElementById(`${player.name}-carrier`) as HTMLDivElement);
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

  for (let i = 0; i < playerBoardShipsSorted.length; i++) {
    if (playerBoardShipsSorted[i].isSunk()) {
      for (let j = 0; j < boats[i].children.length; j++) {
        boats[i].children[j].classList.remove("bg-green-400");
        boats[i].children[j].classList.add("bg-gray-700");
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
      createGameDiv(game);
      const introPar: HTMLParagraphElement = document.getElementById("introPar") as HTMLParagraphElement;
      changeIntroText(introPar);
    });
  }
}

function handleDragReStart(e: DragEvent) {
  const board: Gameboard = game.player.board;
  const row: number = Number(this.id.substr(-3, 1));
  const column: number = Number(this.id.substr(-1));
  const ship: Ship = board.board[row][column] as Ship;
  length = ship.length;
  console.log("hello");
  board.removeShip(ship);
  printGameBoard(game.player, document.getElementById("Player") as HTMLDivElement);
  const shipDiv: HTMLDivElement = document.getElementById(`Player-${ship.name}`) as HTMLDivElement;
  e.dataTransfer.setData("texto", shipDiv.id);
  shipDiv.classList.remove("opacity-60");
  shipDiv.draggable = true;
}
