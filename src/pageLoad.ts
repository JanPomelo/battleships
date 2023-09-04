import Background from "./img/background.jpeg"

const main: HTMLDivElement = document.getElementById("main") as HTMLDivElement;

export function loadBGImg() {
  const img: HTMLImageElement = document.createElement('img');
  img.src = Background;
  main.appendChild(img);
  img.id = 'bgIMG';
}

export function writeIntroduction() {
  // TODO: font color change to css
  const div: HTMLDivElement = document.createElement('div');
  main.appendChild(div);
  div.classList.add('bg-black/30', 'text-white', 'p-2', 'rounded-lg',
    'text-justify', 'flex', 'flex-col',
    'xl:flex-row', 'items-center', 'xl:justify-between', 'xl:gap-10');
  const introParagraph: HTMLParagraphElement = document.createElement("p");
  introParagraph.innerText =
    "Are you ready for an epic battleship fight? Destroy all of the enemy ships before your enemy destroys yours to win. Sounds easy? Well, try it out captain, press the play button and place your ships!";
  introParagraph.classList.add('font-bold')
  div.appendChild(introParagraph);
  const playButton: HTMLButtonElement = document.createElement('button');
  playButton.innerText = 'Play';
  playButton.classList.add('rounded-lg', 'text-black', 'bg-white',
    'w-16', 'font-bold', 'border-2', 'border-black', 'drop-shadow-md',
    'hover:bg-gray-200', 'active:bg-gray-400');
  div.appendChild(playButton);
}

function enemyBoard() {

}