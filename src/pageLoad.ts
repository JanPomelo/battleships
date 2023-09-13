import Background from "./img/background.jpeg";
import { startNewGame } from "./game";
import { Player } from "./player";
import { Game } from "./game";
import { Ship } from "./ship";
const main: HTMLDivElement = document.getElementById("main") as HTMLDivElement;
const game = startNewGame();

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
        div.children[Number(i.toString() + j.toString())].classList.remove("bg-green-400");
        div.children[Number(i.toString() + j.toString())].classList.add("bg-red-300");
      } else if (player.board.board[i][j] === "Sea") {
        div.children[Number(i.toString() + j.toString())].classList.add("bg-blue-400");
      } else if (player.name === "Player" && player.board.board[i][j] instanceof Ship) {
        div.children[Number(i.toString() + j.toString())].classList.add("bg-green-400");
      }
    }
  }
}
