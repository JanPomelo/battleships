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
  // element divider //
  const div: HTMLDivElement = document.createElement("div");
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
  // element divider //
  const introParagraph: HTMLParagraphElement = document.createElement("p");
  introParagraph.innerText =
    "Are you ready for an epic battleship fight? Destroy all of the enemy ships before your enemy destroys yours to win. Sounds easy? Well, try it out captain and press the play button!";
  introParagraph.id = "introPar";
  introParagraph.classList.add("font-bold", "h-fit-content", "sm:h-16", "xl:h-6");
  // element divider //
  const playButton: HTMLButtonElement = document.createElement("button");
  playButton.addEventListener("click", () => {
    // when the Play Button is pressed, change the intro text and start the game. Also remove the button from the DOM
    changeIntroText(introParagraph);
    createGameDiv(game);
    playButton.remove();
  });
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
  /// element divider //
  const div: HTMLDivElement = document.createElement("div");
  div.id = "gameDiv";
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
  // element divider //
  const div: HTMLDivElement = document.createElement("div");
  div.classList.add("p-2", "bg-black/30", "rounded-xl", "flex-grow");
  // -- create child elements //
  // element divider //
  const headingdiv: HTMLDivElement = document.createElement("div");
  headingdiv.id = "playerHeadingDiv";
  headingdiv.classList.add("flex", "justify-between");
  // -- create grandchild elements //
  // element divider //
  const heading: HTMLHeadingElement = document.createElement("h3");
  heading.innerText = name === "Enemy" ? "Enemy Board" : "Your Board";
  heading.classList.add("font-bold");
  // element divider //
  const horVerBut: HTMLDivElement | null = player.name === "Player" ? createHorVerButton() : null;
  // append grandchild elements to child element
  headingdiv.appendChild(heading);
  if (player.name === "Player") headingdiv.appendChild(horVerBut);
  // element divider //
  const subDiv: HTMLDivElement = document.createElement("div");
  subDiv.id = `${player.name}-subDiv`;
  subDiv.classList.add("flex", "gap-3");
  // append granchild elements to child element
  subDiv.appendChild(loadGameBoard(player));
  if (player.name === "Player") subDiv.appendChild(createShipsDiv(player));
  // append child elements to element
  div.appendChild(headingdiv);
  div.appendChild(subDiv);
  return div;
}

// function to load GameBoard initially
function loadGameBoard(player: Player): HTMLDivElement {
  // element divider //
  const div: HTMLDivElement = document.createElement("div");
  div.id = player.name;
  div.classList.add("playGround", "bg-black");
  // create child elements
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      // element divider //
      const miniDiv: HTMLDivElement = document.createElement("div");
      miniDiv.id = `${player.name}-${i}-${j}`;
      miniDiv.classList.add("rounded", "bg-gray-200", "miniDiv");
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
function addOnClickToEnemyBoard(bigDiv: HTMLDivElement) {
  // for each div
  for (let i = 0; i < bigDiv.children.length; i++) {
    bigDiv.children[i].addEventListener("click", () => {
      // get the row and column which is located in the ID of the div
      const row: number = Number(bigDiv.children[i].id.substr(-3, 1));
      const col: number = Number(bigDiv.children[i].id.substr(-1));
      // if the field clicked is free and can be attacked
      if (!game.computer.board.receiveAttack([row, col])) {
        //make the pc move afterwards
        game.computer.makeMove(null, game.player);
        //print both boards
        printGameBoard(game.computer, bigDiv);
        printGameBoard(game.player, document.getElementById("Player") as HTMLDivElement);
        // check the sunk status of all ships
        checkSunkStatus(game.computer);
        checkSunkStatus(game.player);
        // create EndScreen if necessary
        createEndScreen();
      }
    });
  }
}

// function to print the gameboard after each alternation of the gameboard
export function printGameBoard(player: Player, div: HTMLDivElement) {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      // if the field is undiscovered
      if (player.board.board[i][j] === null) {
        div.children[Number(i.toString() + j.toString())].classList.add("bg-gray-200");
        div.children[Number(i.toString() + j.toString())].classList.remove("bg-green-400");
        // if a ship is placed on this field on the player board
      } else if (player.name === "Player" && player.board.board[i][j] instanceof Ship) {
        div.children[Number(i.toString() + j.toString())].classList.add("bg-green-400");
        div.children[Number(i.toString() + j.toString())].classList.remove("bg-gray-200", "bg-green-800");
      }
      // if a ship is on this field
      if (player.board.board[i][j] instanceof Ship) {
        const shipi: Ship = player.board.board[i][j] as Ship;
        // if the ship is sunk
        if (shipi.isSunk()) {
          div.children[Number(i.toString() + j.toString())].classList.remove(
            "bg-green-400",
            "bg-gray-200",
            "bg-red-300"
          );
          div.children[Number(i.toString() + j.toString())].classList.add("bg-gray-700");
          // if its not sunk, but hit
        } else {
          for (let k = 0; k < shipi.hitCoords.length; k++) {
            if (i === shipi.hitCoords[k][0] && j === shipi.hitCoords[k][1]) {
              div.children[Number(i.toString() + j.toString())].classList.remove("bg-green-400", "bg-gray-200");
              div.children[Number(i.toString() + j.toString())].classList.add("bg-red-300");
            }
          }
        }
        // if the field is discovered, but its just water
      } else if (player.board.board[i][j] === "Sea") {
        div.children[Number(i.toString() + j.toString())].classList.add("bg-blue-400");
        div.children[Number(i.toString() + j.toString())].classList.remove("bg-gray-200");
      }
    }
  }
}

// function to handle the dragstart event
function handleDragStart(e: DragEvent) {
  // make the div a little bit opac
  this.classList.add("opacity-60");
  // set the length variable for the shipLength to the amount of children of the div
  length = this.children.length;
  // set dataTransfer data
  e.dataTransfer.setData("text/plain", length.toString());
  e.dataTransfer.setData("divID", this.id);
}

// function to handle the dragend event
function handleDragEnd() {
  // remove opac
  this.classList.remove("opacity-60");
}

// function to handle the dragover event
function handleDragOver(e: DragEvent) {
  // prevent default behaviour
  e.preventDefault();
  return false;
}

// function to calculate ship place in terms of rows and columns the ship will occupy
function calcShipRowsAndCols(horVer: 'Horizontal' | 'Vertical', row: number, column: number): {cols: number[], rows: number[]} {
  let shipSpaceRows: number[] = [];
  let shipSpaceCols: number[] = [];
  if (horVer === "Horizontal") {
    // if the ship is placed horizontal, the row will be the constant
    for (let i = 0; i < length; i++) {
      shipSpaceRows.push(row);
    }
    // and the numbers in the column array are not constant
    shipSpaceCols = game.player.board._createShipPlacementArr(length, column);
  } else {
    // else the column will be constant
    for (let i = 0; i < length; i++) {
      shipSpaceCols.push(column);
    }
    // and the numbers in the row array are not constant
    shipSpaceRows = game.player.board._createShipPlacementArr(length, row);
  }
  // return the column and the row array
  return {
    cols: shipSpaceCols,
    rows: shipSpaceRows
  }
}

// function to handle the dragenter event
function handleDragEnter() {
  // get row and column from the ID
  const row: number = Number(this.id.substr(-3, 1));
  const column: number = Number(this.id.substr(-1));
  // get the shipSpace arrays
  const shipSpace: { cols: number[], rows: number[] } = calcShipRowsAndCols(horVer, row, column);
  // check if the space where the boat should be placed is available
  if (game.player.board._checkIfSpaceIsFree(shipSpace.rows, shipSpace.cols)) {
    // if the space is available on the board
    for (let i = 0; i < shipSpace.cols.length; i++) {
      const div = document.getElementById(`${game.player.name}-${shipSpace.rows[i]}-${shipSpace.cols[i]}`);
      // mark the divs on the board
      div.classList.add("bg-green-800");
      div.classList.remove("bg-gray-200", "bg-orange-300");
    }
  }
}

function handleDragLeave() {
  // get the row and column from the IDs
  const row: number = Number(this.id.substr(-3, 1));
  const column: number = Number(this.id.substr(-1));
  // create shipSpace arrays
  const shipSpace: { cols: number[]; rows: number[] } = calcShipRowsAndCols(horVer, row, column);
  // check if the space where the boat should be placed is available
  if (game.player.board._checkIfSpaceIsFree(shipSpace.rows, shipSpace.cols)) {
    for (let i = 0; i < shipSpace.cols.length; i++) {
      // remove the marks
      const div = document.getElementById(`${game.player.name}-${shipSpace.rows[i]}-${shipSpace.cols[i]}`);
      div.classList.remove("bg-green-800");
      div.classList.add("bg-gray-200");
    }
  }
}

// function to handle the drop event
function handleDrop(e: DragEvent) {
  e.stopPropagation(); // stops the browser from redirecting.
  // reprint the gameboard
  printGameBoard(game.player, document.getElementById("Player") as HTMLDivElement);
  // get the div from the ship on the right side of the board
  const draggedShip: HTMLDivElement = document.getElementById(e.dataTransfer.getData("divID")) as HTMLDivElement;
  // get the shipName
  const shipName: string = draggedShip.id.substring(7);
  const ship: Ship = new Ship(Number(length), horVer, shipName);
  const row: number = Number(this.id.substr(-3, 1));
  const column: number = Number(this.id.substr(-1));
  // try to place the ship
  if (game.player.board.placeShip(ship, horVer, [row, column]) === undefined) {
    // if it can be placed, reprint the gameboard
    printGameBoard(game.player, document.getElementById("Player") as HTMLDivElement);
    // remove the eventlisteners on the div on the right side of the gameboard
    draggedShip.removeEventListener("dragend", handleDragEnd);
    draggedShip.classList.add("opacity-60");
    draggedShip.draggable = false;
    // check if all ships were placed
    checkShips();
    // add eventlisteners to the shipDivs on the gameboard
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

// function to check if all ships are placed so far and initiating the gamestart if thats the case
export function checkShips() {
  // if all ships are placed
  if (game.player.board.ships.length > 4) {
    // make the ships on the right side of the gameboard be horizontal again
    const shipsDiv = document.getElementById("shipsDiv");
    shipsDiv.classList.remove("mb-auto");
    shipsDiv.classList.add("flex-col");
    for (let i = 0; i < shipsDiv.children.length; i++) {
      shipsDiv.children[i].classList.remove("flex-col");
      shipsDiv.children[i].classList.remove("mb-auto");
      shipsDiv.children[i].classList.remove("opacity-60");
    }
    // add the onclick event to receive an attack on the enemy board
    const gameBoardDiv: HTMLDivElement = document.getElementById("Enemy") as HTMLDivElement;
    addOnClickToEnemyBoard(gameBoardDiv);
    // add the shipsDiv on the right side of the enemy gameboard
    const div: HTMLDivElement = document.getElementById("Enemy-subDiv") as HTMLDivElement;
    div.appendChild(createShipsDiv(game.computer));
    // remove the hori/verti buttons from the document
    const buttonDiv: HTMLDivElement = document.getElementById("buttonDiv") as HTMLDivElement;
    buttonDiv.remove();
    // change the text in the intro paragraph
    const introParagraph: HTMLParagraphElement = document.getElementById("introPar") as HTMLParagraphElement;
    introParagraph.innerText = `Okay, let's go Captain! Lets crush our enemy!`;
  }
}

// function to create the ship overview div on the right side of the gameboard
function createShipsDiv(player: Player): HTMLDivElement {
  // create Element
  const div: HTMLDivElement = document.createElement("div");
  div.id = "shipsDiv";
  div.classList.add("flex", "flex-col", "gap-1", "sm:gap-3", "flex-wrap", "sm:flex-nowrap");
  // create carrier div
  const carrier: HTMLDivElement = document.createElement("div");
  carrier.classList.add("flex", "boat", "bg-black");
  for (let i = 0; i < 5; i++) {
    const miniDiv: HTMLDivElement = document.createElement("div");
    miniDiv.classList.add("miniDiv", "bg-green-400");
    carrier.appendChild(miniDiv);
  }
  carrier.id = `${player.name}-carrier`;
  div.appendChild(carrier);
  // create battleship div
  const battleship: HTMLDivElement = document.createElement("div");
  battleship.classList.add("flex", "boat", "bg-black");
  for (let i = 0; i < 4; i++) {
    const miniDiv: HTMLDivElement = document.createElement("div");
    miniDiv.classList.add("miniDiv", "bg-green-400");
    battleship.appendChild(miniDiv);
  }
  battleship.id = `${player.name}-battleship`;
  div.appendChild(battleship);
  // create cruiser div
  const cruiser: HTMLDivElement = document.createElement("div");
  cruiser.classList.add("flex", "boat", "bg-black");
  for (let i = 0; i < 3; i++) {
    const miniDiv: HTMLDivElement = document.createElement("div");
    miniDiv.classList.add("miniDiv", "bg-green-400");
    cruiser.appendChild(miniDiv);
  }
  cruiser.id = `${player.name}-cruiser`;
  div.appendChild(cruiser);
  // create submarine div
  const submarine: HTMLDivElement = document.createElement("div");
  submarine.classList.add("flex", "boat", "bg-black");
  for (let i = 0; i < 3; i++) {
    const miniDiv: HTMLDivElement = document.createElement("div");
    miniDiv.classList.add("miniDiv", "bg-green-400");
    submarine.appendChild(miniDiv);
  }
  submarine.id = `${player.name}-submarine`;
  div.appendChild(submarine);
  // create destroyer div
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

// function to create the Horizontal Vertical switch Button
function createHorVerButton(): HTMLDivElement {
  // create element
  const div: HTMLDivElement = document.createElement("div");
  div.id = "buttonDiv";
  horVer = "Horizontal";
  // create Horizontal button
  const horizontalBut: HTMLButtonElement = document.createElement("button");
  horizontalBut.id = "hori";
  horizontalBut.innerText = "Horizontal";
  // create Vertical button
  const verticalBut: HTMLButtonElement = document.createElement("button");
  verticalBut.id = "verti";
  verticalBut.innerText = "Vertical";
  div.appendChild(horizontalBut);
  div.appendChild(verticalBut);
  div.classList.add("flex");
  horizontalBut.classList.add("border", "border-black", "px-1", "bg-gray-400", "text-black", "rounded-l", "mb-1");
  verticalBut.classList.add("border", "border-black", "px-1", "bg-white", "text-black", "rounded-r", "mb-1");

  // function to make the ships in the shipsDiv horizontal
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
  
  // function to make the ships in the shipsDiv vertical
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

// function to make the ships placable
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

// check if all the player boats are sunk
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

// function to compare the ships regarding their length
function compare(a: Ship, b: Ship) {
  if (a.length < b.length) {
    return 1;
  }
  if (a.length > b.length) {
    return -1;
  }
  return 0;
}

// function to create the End screen
export function createEndScreen() {
  // check if game has ended
  const endCheck: string = checkEnd(game);
  // if the game has not ended yet, do nothing
  if (endCheck === "not yet") {
    return;
  } else {
    // else create the div
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

// function to handle the dragRestart
function handleDragReStart(e: DragEvent) {
  const board: Gameboard = game.player.board;
  const row: number = Number(this.id.substr(-3, 1));
  const column: number = Number(this.id.substr(-1));
  const ship: Ship = board.board[row][column] as Ship;
  length = ship.length;
  board.removeShip(ship);
  printGameBoard(game.player, document.getElementById("Player") as HTMLDivElement);
  const shipDiv: HTMLDivElement = document.getElementById(`Player-${ship.name}`) as HTMLDivElement;
  e.dataTransfer.setData("divID", shipDiv.id);
  shipDiv.classList.remove("opacity-60");
  shipDiv.draggable = true;
}
