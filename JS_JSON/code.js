let gridContainer = document.querySelector(".grid-container");
let cards = [];
let firstCard, secondCard;
let lockBoard = false;
let score = 0;

document.querySelector(".score").textContent = score;

fetch("../JS_JSON/memory.json")
    .then((res) => res.json())
    .then((data) => {
        cards = [...data];
        shuffleCards();
        generateCards();
    });

function shuffleCards() {
    let currentIndex = cards.length, randomIndex, temporaryValue;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = temporaryValue;
    }
}

function generateCards() {
    for (let card of cards) {
        let cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.setAttribute("data-name", card.name);

        cardElement.innerHTML = `
            <div class="front">
                <img class="front-image" src="${card.image}">
            </div>
            <div class="back ${currentBackgroundClass}"></div> 
        `;
        
        gridContainer.appendChild(cardElement);
        cardElement.addEventListener("click", flipcard);
    }
}

function flipcard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add("flipped");

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

    checkForMath();
}

function checkForMath() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener("click", flipcard);
    secondCard.removeEventListener("click", flipcard);

    score++;
    document.querySelector(".score").textContent = score;

    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        resetBoard();
    }, 1000)
}

function resetBoard() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

function restart() {
    const allCards = document.querySelectorAll(".card");
    allCards.forEach(card => card.classList.remove("flipped"));

    setTimeout(() => {
        resetBoard();
        shuffleCards();
        score = 0;
        document.querySelector(".score").textContent = score;
        
        gridContainer.innerHTML = "";
        
        generateCards();
    }, 600);
}




const backgroundClasses = {
    Pottyos: 'pottyos-hatter',
    Szivecske: 'szivecske-hatter',
    Vonalas: 'vonalas-hatter',
};
let currentBackgroundClass = backgroundClasses.Pottyos;

function setCardBackground(newClass) {
    const kartyaHatulja = document.querySelectorAll(".card .back");

    kartyaHatulja.forEach(kartya => {
        kartya.classList.remove(currentBackgroundClass);
        kartya.classList.add(newClass);
    });
    
    currentBackgroundClass = newClass;
}

function Pottyos() {
    setCardBackground(backgroundClasses.Pottyos);
}

function Szivecske() {
    setCardBackground(backgroundClasses.Szivecske);
}

function Vonalas() {
    setCardBackground(backgroundClasses.Vonalas);
}