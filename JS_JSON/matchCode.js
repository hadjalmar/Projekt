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
                <img src="parositoKepek/${kepek[i]}" alt="${szakszavakData.find((d) => d.id === i).szo}">
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
let touchStartX = 0;
let touchStartY = 0;
function addDragListeners() {
  const dragElements = document.querySelectorAll(".dragElement");

  dragElements.forEach((item) => {
    item.addEventListener("dragstart", handleDragStart);
    item.addEventListener("dragend", handleDragEnd);

    item.addEventListener("touchstart", handleTouchStart);
  });

  const dropZones = document.querySelectorAll(".dropZone");

  dropZones.forEach((zone) => {
    zone.addEventListener("dragover", handleDragOver);
    zone.addEventListener("dragleave", handleDragLeave);
    zone.addEventListener("drop", handleDrop);
  });

  document.addEventListener("touchmove", handleTouchMove, { passive: false });
  document.addEventListener("touchend", handleTouchEnd);
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

function handleTouchStart(e) {
    if (e.touches.length === 1) {
        e.preventDefault(); 
        
        draggedElement = this;
        originalParent = this.parentNode;
        
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        
        draggedElement.style.position = 'fixed';
        draggedElement.style.zIndex = '1000';
        
        const rect = draggedElement.getBoundingClientRect();
        draggedElement.style.left = `${rect.left}px`;
        draggedElement.style.top = `${rect.top}px`;
        
        draggedElement.classList.add("beingDragged");
    }
}

function handleTouchMove(e) {
    if (!draggedElement) return;

    e.preventDefault();

    const clientX = e.touches[0].clientX;
    const clientY = e.touches[0].clientY;
    
    draggedElement.style.left = `${clientX - draggedElement.offsetWidth / 2}px`;
    draggedElement.style.top = `${clientY - draggedElement.offsetHeight / 2}px`;

    document.querySelectorAll(".dropZone").forEach(zone => zone.classList.remove("hoverOver"));
    const elementUnder = document.elementFromPoint(clientX, clientY);
    
    if (elementUnder && elementUnder.classList.contains("dropZone")) {
        elementUnder.classList.add("hoverOver");
    }
}

function handleTouchEnd(e) {
    if (!draggedElement) return;

    draggedElement.style.position = '';
    draggedElement.style.zIndex = '';
    draggedElement.style.left = '';
    draggedElement.style.top = '';
    
    draggedElement.classList.remove("beingDragged");
    document.querySelectorAll(".dropZone").forEach(zone => zone.classList.remove("hoverOver"));

    const touch = e.changedTouches[0];
    const elementUnder = document.elementFromPoint(touch.clientX, touch.clientY);

    let droppedSuccessfully = false;

    if (elementUnder && elementUnder.classList.contains("dropZone")) {
        const dropZone = elementUnder;
        
        if (dropZone.children.length === 0) {
            dropZone.appendChild(draggedElement);
            checkMatch(draggedElement, dropZone);

            if (draggedElement.classList.contains("match-correct")) {
                 droppedSuccessfully = true;
            }
        }
    }
    if (!droppedSuccessfully) {
        if (draggedElement.parentNode.classList.contains('dragZoneSzavak')) {
          const dragSzekcio = document.querySelector(".dragZoneSzavak");
          const dragIndex = parseInt(draggedElement.dataset.currentIndex);
        
          let nextElement = null;
          for (let child of dragSzekcio.children) {
            if (parseInt(child.dataset.currentIndex) > dragIndex) {
              nextElement = child;
              break;
            }
          }
        
          dragSzekcio.insertBefore(draggedElement, nextElement);
        }
    }
    
    draggedElement.style.position = '';
    draggedElement.style.zIndex = '';
    draggedElement.style.left = '';
    draggedElement.style.top = '';

    draggedElement = null;
    originalParent = null;
}

let correctMatches = 0;
function checkMatch(dragElement, dropElement) {
  const dragId = dragElement.dataset.id;
  const dropId = dropElement.dataset.matchId;
  const dragIndex = parseInt(dragElement.dataset.currentIndex);

  if (dragId === dropId) {
    dropElement.classList.add("match-correct");
    dragElement.classList.add("match-correct");

    dragElement.draggable = false;
    dropElement.removeEventListener("drop", handleDrop);
    dropElement.removeEventListener("dragover", handleDragOver);

    correctMatches++;
    if (correctMatches === 10) { 
      let szekcio = document.getElementById("eredmeny"); 
      szekcio.innerHTML = `<p>Gratulálok! Nagyon ügyes vagy, eltaláltad az összes párt!</p>`; 
    } 
  } else {
    dropElement.classList.add("match-incorrect");
    dragElement.classList.add("match-incorrect");

    setTimeout(() => {
      dropElement.classList.remove("match-incorrect");
      dragElement.classList.remove("match-incorrect");

      const dragSzekcio = document.querySelector(".dragZoneSzavak");

      let nextElement = null;
      for (let child of dragSzekcio.children) {
        if (parseInt(child.dataset.currentIndex) > dragIndex) {
          nextElement = child;
          break;
        }
      }

      dragSzekcio.insertBefore(dragElement, nextElement);
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