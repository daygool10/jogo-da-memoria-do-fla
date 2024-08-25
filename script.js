const cards = [
    { id: 1, image: 'arrasca.png' },
    { id: 2, image: 'arrasca.png' },
    { id: 3, image: 'pedro.png' },
    { id: 4, image: 'pedro.png' },
    { id: 5, image: 'gabigol.png' },
    { id: 6, image: 'gabigol.png' },
    { id: 7, image: 'carlinhos.png' },
    { id: 8, image: 'carlinhos.png' },
    { id: 9, image: 'luiz-araujo.png' },
    { id: 10, image: 'luiz-araujo.png' },
    { id: 11, image: 'david-luiz.png' },
    { id: 12, image: 'david-luiz.png' },
    { id: 13, image: 'gerson.png' },
    { id: 14, image: 'gerson.png' },
    { id: 15, image: 'erick.png' },
    { id: 16, image: 'erick.png' },
    { id: 17, image: 'cebolinha.png' },
    { id: 18, image: 'cebolinha.png' },
    { id: 19, image: 'ayrton-lucas.png' },
    { id: 20, image: 'ayrton-lucas.png' },
];

let flippedCard = null;
let lockBoard = false;

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function createCard(card) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.image = card.image;

    const cardInner = document.createElement('div');
    cardInner.classList.add('card-inner');

    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');
    cardFront.style.backgroundImage = `url(${card.image})`;

    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');

    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    cardElement.appendChild(cardInner);

    cardElement.addEventListener('click', flipCard);
    return cardElement;
}

function flipCard() {
    if (lockBoard) return;
    if (this === flippedCard) return;

    this.classList.add('is-flipped');

    if (!flippedCard) {
        flippedCard = this;
        return;
    }

    checkForMatch(this);
}

function checkForMatch(currentCard) {
    let isMatch = currentCard.dataset.image === flippedCard.dataset.image;

    if (isMatch) {
        disableCards(currentCard, flippedCard);
    } else {
        unflipCards(currentCard, flippedCard);
    }
}

function disableCards(card1, card2) {
    card1.removeEventListener('click', flipCard);
    card2.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards(card1, card2) {
    lockBoard = true;

    setTimeout(() => {
        card1.classList.remove('is-flipped');
        card2.classList.remove('is-flipped');

        resetBoard();
    }, 1000);
}

function resetBoard() {
    [flippedCard, lockBoard] = [null, false];
}

function startGame() {
    shuffle(cards);
    const gameBoard = document.getElementById('game-board');
    cards.forEach(card => {
        const cardElement = createCard(card);
        gameBoard.appendChild(cardElement);
    });
}

startGame();