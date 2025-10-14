let szakszavak = [
  "Alkar-fekvőtámasz",
  "Terpeszülés támasz hátul",
  "Jobb térdelés",
  "Zsugor fejállás",
  "Mellső függés",
  "Hátsó függés",
  "Hasonfekvés oldalsó középtartás",
  "Szögállás mellső középtartás",
  "Térdelőtámasz",
  "Szögállás hátsó rézsutos mélytartás",
];
let kepek = [
  "alkarFekvo.png",
  "hasonFekvesOldalso.png",
  "hatsoFugges.png",
  "jobbTerdeles.png",
  "mellsoFugges.png",
  "szogallasHatso.png",
  "szogallasMellso.png",
  "terdeloTamasz.png",
  "terpeszHatulTamasz.png",
  "zsugorFejallas.png",
];

function Feltolt() {
  let dragSzekcio = document.querySelector(".dragZoneSzavak");
  let dropSzekcio = document.querySelector(".dragZoneKepek");

  szakszavak.forEach(szo => {
    dragSzekcio.innerHTML += `<p class="dragElement" draggable="true">${szo}</p>`;
  });

  for (let i = 0; i < kepek.length; i++) {
    dropSzekcio.innerHTML += 
        `
          <div class="elemek">
            <img src="../parositoKepek/${kepek[i]}" alt="${szakszavak[i]}">
            <div class="dropZone"></div>
          </div>
        `;
  }
};

let dragItem = document.querySelector('.elemek');
let divs = document.querySelectorAll('.dropZone');
console.log(divs)
let div = document.querySelector('div')
console.log(div)

divs.forEach(dropZone => {
  dropZone.addEventListener('dragover', (e) => {
    console.log(e);
    e.preventDefault();
    dropZone.appendChild(dragItem);
  });

  dropZone.addEventListener('dragover', () => {
    dropZone.classList.add('hoverOver');
  });

  dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('hoverOver');
  });

});

dragItem.addEventListener('drag', () => {
  dragItem.classList.add('beingDragged');
})


dragItem.addEventListener('dragend', () => {
  dragItem.classList.remove('beingDragged');
})

Feltolt();