let szakszavakData = [
  { id: 0, szo: "Alkar-fekvőtámasz" },
  { id: 1, szo: "Terpeszülés támasz hátul" },
  { id: 2, szo: "Jobb térdelés" },
  { id: 3, szo: "Zsugor fejállás" },
  { id: 4, szo: "Mellső függés" },
  { id: 5, szo: "Hátsó függés" },
  { id: 6, szo: "Hasonfekvés oldalsó középtartás" },
  { id: 7, szo: "Szögállás mellső középtartás" },
  { id: 8, szo: "Térdelőtámasz" },
  { id: 9, szo: "Szögállás hátsó rézsutos mélytartás" },
];

let kepek = [
  "alkarFekvo.png",
  "terpeszHatulTamasz.png",
  "jobbTerdeles.png",
  "zsugorFejallas.png",
  "mellsoFugges.png",
  "hatsoFugges.png",
  "hasonFekvesOldalso.png",
  "szogallasMellso.png",
  "terdeloTamasz.png",
  "szogallasHatso.png",
];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
shuffleArray(szakszavakData);

function Feltolt() {
  let dragSzekcio = document.querySelector(".dragZoneSzavak");
  let dropSzekcio = document.querySelector(".dragZoneKepek");

  dragSzekcio.innerHTML = "";
  dropSzekcio.innerHTML = "";
  szakszavakData.forEach((item, index) => {
    dragSzekcio.innerHTML += `<p class="dragElement" draggable="true" data-id="${item.id}" data-current-index="${index}">${item.szo}</p>`;
  });

  for (let i = 0; i < kepek.length; i++) {
    dropSzekcio.innerHTML += `
        <div class="elemek">
            <div class="image-container">
                <img src="../parositoKepek/${kepek[i]}" alt="${szakszavakData.find((d) => d.id === i).szo}">
            </div>
            <div class="dropZone" data-match-id="${i}"></div> 
        </div>
        `;
  }

  addDragListeners();
}
Feltolt();

let draggedElement = null;
let originalParent = null;
function addDragListeners() {
  const dragElements = document.querySelectorAll(".dragElement");

  dragElements.forEach((item) => {
    item.addEventListener("dragstart", handleDragStart);
    item.addEventListener("dragend", handleDragEnd);
  });

  const dropZones = document.querySelectorAll(".dropZone");

  dropZones.forEach((zone) => {
    zone.addEventListener("dragover", handleDragOver);
    zone.addEventListener("dragleave", handleDragLeave);
    zone.addEventListener("drop", handleDrop);
  });
}

function handleDragStart(e) {
  draggedElement = this;
  originalParent = this.parentNode;
  e.dataTransfer.setData("text/plain", this.textContent);
  setTimeout(() => this.classList.add("beingDragged"), 0);
}

function handleDragEnd() {
  this.classList.remove("beingDragged");
}

function handleDragOver(e) {
  e.preventDefault();
  this.classList.add("hoverOver");
}

function handleDragLeave() {
  this.classList.remove("hoverOver");
}

let correctMatches = 0;
function checkMatch(dragElement, dropElement) {
  const dragId = dragElement.dataset.id;
  const dropId = dropElement.dataset.matchId;
  const dragIndex = parseInt(dragElement.dataset.index);

  if (dragId === dropId) {
    dropElement.classList.add("match-correct");
    dragElement.classList.add("match-correct");

    dragElement.draggable = false;
    dropElement.removeEventListener("drop", handleDrop);
    dropElement.removeEventListener("dragover", handleDragOver);

    correctMatches++;
  } else {
    dropElement.classList.add("match-incorrect");
    dragElement.classList.add("match-incorrect");

    setTimeout(() => {
      dropElement.classList.remove("match-incorrect");
      dragElement.classList.remove("match-incorrect");

      const dragSzekcio = document.querySelector(".dragZoneSzavak");

      let nextElement = null;
      for (let child of dragSzekcio.children) {
        if (parseInt(child.dataset.index) > dragIndex) {
          nextElement = child;
          break;
        }
      }

      dragSzekcio.insertBefore(dragElement, nextElement);
      dragElement.classList.remove("beingDragged");
    }, 100);
  }
}

function handleDrop(e) {
  e.preventDefault();
  this.classList.remove("hoverOver");
  const dropZone = this;

  if (draggedElement && dropZone.children.length === 0) {
    dropZone.appendChild(draggedElement);
    checkMatch(draggedElement, dropZone);

    draggedElement = null;
    originalParent = null;
  }
}
