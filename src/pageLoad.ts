const main: HTMLDivElement = document.getElementById("main") as HTMLDivElement;

export function writeIntroduction() {
  const introParagraph: HTMLParagraphElement = document.createElement("p");
  introParagraph.innerText =
    "Are you ready for an epic battleship fight? Destroy all of the enemy ships before your enemy destroys yours to win. Sounds easy? Well, try it out captain and place your ships!";
  main.appendChild(introParagraph);
}
