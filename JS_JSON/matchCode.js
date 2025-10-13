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
    let dragSzekcio = document.querySelector(".dragZone");
    let dropSzekcio = document.querySelector(".dropZone");

    szakszavak.forEach(szo => {
        dragSzekcio.innerHTML += `<p class="dragElement" draggable="true">${szo}</p>`;
    });

    for (let i = 0; i < kepek.length; i++) {
        dropSzekcio.innerHTML += `<img src="../parositoKepek/${kepek[i]}" alt="${szakszavak[i]}">`;
    }
};

Feltolt();