'use strict'


export function createPlayerDiv(id: string): HTMLDivElement {
  const div: HTMLDivElement = document.createElement('div');
  div.classList.add('h-20', 'w-20', 'rounded-xl', 'border-4', 'border-black');
  div.id = id;
  return div;
}

