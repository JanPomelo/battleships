import Background from "./img/background.jpeg";
import { startNewGame } from "./game";
import { Player } from "./player";
import { Game, checkEnd } from "./game";
import { Ship } from "./ship";
const main: HTMLDivElement = document.getElementById("main") as HTMLDivElement;
let game = startNewGame();

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
}

function loadPlayerDiv(player: Player, name: String): HTMLDivElement {
  const div: HTMLDivElement = document.createElement("div");
  div.classList.add("p-2", "bg-black/30", "rounded-xl", "flex-grow");
  const heading: HTMLHeadingElement = document.createElement("h3");
  heading.innerText = name === "Enemy" ? "Enemy Board" : "Your Board";
  heading.classList.add("font-bold");
  const subDiv: HTMLDivElement = document.createElement("div");
  subDiv.classList.add("flex", "gap-3");
  div.appendChild(heading);
  div.appendChild(subDiv);
  subDiv.appendChild(loadGameBoard(player));
  createShipsDiv(subDiv, player);
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
      if (player.name === "Player") {
      } else {
        miniDiv.addEventListener("click", () => {
          if (!player.board.receiveAttack([i, j])) {
            player.makeMove(null, game.player);
            printGameBoard(game.computer, div);
            printGameBoard(game.player, document.getElementById("Player") as HTMLDivElement);
            checkSunkStatus(game.computer);
            checkSunkStatus(game.player);
            createEndScreen();
          }
        });
      }
    }
  }
  if (player.name === "Player") {
    printGameBoard(player, div);
  }
  return div;
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

function createShipsDiv(bigDiv: HTMLDivElement, player: Player) {
  const div: HTMLDivElement = document.createElement("div");
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

function checkSunkStatus(player: Player) {
  const boats: HTMLDivElement[] = [];
  boats.push(document.getElementById(`${player.name}-carrier`) as HTMLDivElement);
  boats.push(document.getElementById(`${player.name}-battleship`) as HTMLDivElement);
  boats.push(document.getElementById(`${player.name}-cruiser`) as HTMLDivElement);
  boats.push(document.getElementById(`${player.name}-submarine`) as HTMLDivElement);
  boats.push(document.getElementById(`${player.name}-destroyer`) as HTMLDivElement);

  for (let i = 0; i < player.board.ships.length; i++) {
    if (player.board.ships[i].isSunk()) {
      //console.log(boats[i].children[0].classList);
      for (let j = 0; j < boats[i].children.length; j++) {
        boats[i].children[j].classList.remove("bg-green-400");
        boats[i].children[j].classList.add("bg-red-400");
      }
    }
  }
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
