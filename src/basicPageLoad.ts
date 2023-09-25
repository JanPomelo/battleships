import Background from "./img/background.jpeg";
import { createGameDiv } from "./UserInterface";
const main: HTMLDivElement = document.getElementById("main") as HTMLDivElement;

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
    createGameDiv();
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
export function changeIntroText(paragraph: HTMLParagraphElement): void {
  paragraph.innerText = "Place your ships on your Board. Choose wisely! Good luck captain!";
}


