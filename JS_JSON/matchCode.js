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
  "../parositoKepek/alkarFekvo.png",
  "../parositoKepek/hasonFekvesOldalso.png",
  "../parositoKepek/hatsoFugges.png",
  "../parositoKepek/jobbTerdeles.png",
  "../parositoKepek/mellsoFugges.png",
  "../parositoKepek/szogallasHatso.png",
  "../parositoKepek/szogallasMellso.png",
  "../parositoKepek/terdeloTamasz.png",
  "../parositoKepek/terpeszHatulTamasz.png",
  "../parositoKepek/zsugorFejallas.png",
];

function SzakszoFeltoltes() {
    let szekcio = document.querySelector(".dragZone");
    szakszavak.forEach(szo => {
        szekcio.innerHTML += `<p>${szo}</p>`;
    });
};

SzakszoFeltoltes();