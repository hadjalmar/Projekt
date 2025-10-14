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

  dragSzekcio.innerHTML = '';
    dropSzekcio.innerHTML = '';

  for (let i = 0; i < szakszavak.length; i++) {
        const szo = szakszavak[i];

        dragSzekcio.innerHTML += `<p class="dragElement" draggable="true" data-id="${i}">${szo}</p>`;

        dropSzekcio.innerHTML += 
            `
            <div class="elemek">
                <img src="../parositoKepek/${kepek[i]}" alt="${szakszavak[i]}">
                <div class="dropZone" data-match-id="${i}"></div> 
            </div>
            `;
    }

  addDragListeners(); 
};
Feltolt();

let draggedElement = null;
let originalParent = null; 
function addDragListeners() {
    const dragElements = document.querySelectorAll('.dragElement');
    
    dragElements.forEach(item => {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragend', handleDragEnd);
    });
    
    const dropZones = document.querySelectorAll('.dropZone');
    
    dropZones.forEach(zone => {
        zone.addEventListener('dragover', handleDragOver);
        zone.addEventListener('dragleave', handleDragLeave);
        zone.addEventListener('drop', handleDrop);
    });
}

function handleDragStart(e) {
    draggedElement = this;
    originalParent = this.parentNode;
    e.dataTransfer.setData('text/plain', this.textContent)
    setTimeout(() => this.classList.add('beingDragged'), 0);
}

function handleDragEnd() {
    this.classList.remove('beingDragged');
}

function handleDragOver(e) {
    e.preventDefault();
    this.classList.add('hoverOver');
}

function handleDragLeave() {
    this.classList.remove('hoverOver');
}

let correctMatches = 0; 
function checkMatch(dragElement, dropElement) {
    const dragId = dragElement.dataset.id;
    const dropId = dropElement.dataset.matchId;

    if (dragId === dropId) {
        dropElement.classList.add('match-correct');
        dragElement.classList.add('match-correct');
        
        dragElement.draggable = false;
        dropElement.removeEventListener('drop', handleDrop);
        dropElement.removeEventListener('dragover', handleDragOver);
        
        correctMatches++;
        
        if (correctMatches === szakszavak.length) { alert('Minden párosítás helyes!'); }
    } else {
        dropElement.classList.add('match-incorrect');
        dragElement.classList.add('match-incorrect');
        
        setTimeout(() => {
            dropElement.classList.remove('match-incorrect');
            dragElement.classList.remove('match-incorrect');
            
            // ❗ Visszahelyezés az EREDETI SZÜLŐBE (nem a lista végére)
            if (originalParent) {
                // A szó visszahelyezése a dragSzekcio-ba:
                originalParent.appendChild(dragElement);
                
                // Mivel a szavak sorrendje már random volt, és nincs sorszámuk a DOM-ban, 
                // a szó most a lista végére kerül.
                // Ahhoz, hogy pontosan a régi helyére kerüljön, minden szónak kellene egy indexet tárolnia az eredeti sorrendről, 
                // ami túlkomplikált. A legegyszerűbb megoldás a Flexbox sorrend használata.
            }

            // Ha mégis a lista elejére/egy helyre szeretnéd, hogy ne keveredjen:
            // const dragSzekcio = document.querySelector(".dragZoneSzavak");
            // dragSzekcio.insertBefore(dragElement, dragSzekcio.firstChild);
            
            // Töröljük a .beingDragged osztályt
            dragElement.classList.remove('beingDragged');
            
        }, 800);
    }
}

function handleDrop(e) {
    e.preventDefault();
    this.classList.remove('hoverOver');
    const dropZone = this;

    // Megvizsgáljuk, hogy az ejtési zóna üres-e, és hogy van-e húzott elem
    // A dropZone.children.length === 0 az, ami megakadályozza, hogy egy zónába többet ejtsenek
    if (draggedElement && dropZone.children.length === 0) {
        
        // 1. A szó vizuálisan bekerül a dropZone-ba (mielőtt ellenőrzöd)
        dropZone.appendChild(draggedElement); 

        // 2. Ellenőrzés
        checkMatch(draggedElement, dropZone);

        // A draggedElement-et nullázzuk, mivel a drag művelet véget ért
        draggedElement = null;
        originalParent = null; // Töröljük a szülőt is
    }
}