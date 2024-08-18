let cards = document.querySelectorAll('.card');
let matched = 0;
let cardOne, cardTwo;
let disabled = false;
shuffleCards();
function flipCard(event) {
    const clickedCard = event.currentTarget;

    if  (cardOne !== clickedCard && !disabled) {
        clickedCard.classList.add('flip');

   
        if (!cardOne) {
            cardOne = clickedCard;
            console.log("Первая карта:", cardOne, "с изображением:", cardOne.querySelector('.back-view img').src);
            return;
        } 
        

        cardTwo = clickedCard;
        console.log("Вторая карта:", cardTwo, "с изображением:", cardTwo.querySelector('.back-view img').src);
        disabled = true; 
        matchedCards(cardOne, cardTwo);
    }
}

cards.forEach(element => {
    element.addEventListener('click', flipCard);
});

function matchedCards(cardOne, cardTwo) {
    const imgOne = cardOne.querySelector('.back-view img').src; 
    const imgTwo = cardTwo.querySelector('.back-view img').src; 

    if (imgOne === imgTwo) {
        matched++;

        cardOne.removeEventListener('click', flipCard);
        cardTwo.removeEventListener('click', flipCard);

        if (matched === 8) {
            setTimeout(() => {
                resetGame();
            }, 1000);
        }
   
        resetCards();
    } else {
        setTimeout(() => {
            endAttempt();
        }, 1000); 
    }
}

function endAttempt() {
    cardOne.classList.remove('flip');
    cardTwo.classList.remove('flip');
    resetCards(); 
}

function resetCards() {
    cardOne = null; 
    cardTwo = null; 
    disabled = false; 
}

function shuffleCards() {
    cards.forEach(card => {
        const randomPos = Math.floor(Math.random() * cards.length);
        card.style.order = randomPos; 
    });
}
function resetGame() {
    matched = 0;
    cardOne = null;
    cardTwo = null;
    disabled = false;

    shuffleCards();

    cards.forEach(card => {
        card.classList.remove('flip');
        card.addEventListener('click', flipCard);
    });
}