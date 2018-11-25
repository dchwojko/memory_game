/*
 * Create a list that holds all of your cards
 */
var cards = document.querySelectorAll('.card');
var hasWon = false;
const maxMoves = 3;
let remainingMoves = 3;

var openCards = [];

var restartButton = document.querySelector('.restart');
restartButton.addEventListener('click', function() {
    handleRestart();
});

var scorePanel = document.querySelector('.score-panel');
var stars = document.querySelector('.stars');
var moves = document.querySelector('.moves');

function updateMoves() {
    
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 for (let card of cards) {
     addEventListenerForCard(card);
 }

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function resetCards() {
    for (let card of cards) {
        card.classList = "card"
    }
}

function handleRestart() {
    resetMoves();
    resetCards();
}

function resetMoves() {
    remainingMoves = maxMoves;
}



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 function handleCardClick(card) {
     console.log('card was clicked');
     if (openCards.length < 2) {
        openCards.push(card);
        card.classList.toggle("open");
        card.classList.toggle("show");
        removeEventListenerForCard(card);
        if (openCards.length == 2) {
            // TO DO: if match
            console.log(card);
            const first = openCards[0].innerHTML;
            const second = openCards[1].innerHTML;
            console.log(first);
            console.log(second);
            
            if (first == second) {
                for (card of openCards) {
                    card.classList.toggle("open");
                    card.classList.toggle("show");
                    card.classList.toggle("match");
                    removeEventListenerForCard(card);
                }
                openCards = [];

            } else {
                // TO DO: not match
                for (card of openCards) {
                    card.classList.toggle("open");
                    card.classList.toggle("show");
                    addEventListenerForCard(card);    
                }
                openCards = [];
                decrementNumberOfMoves();
                isGameOver();

            }
        } else {
            console.log('to do - less than 2 cards selected');
        }
     } else {

     } 
 }

 function isGameOver() {
     if (remainingMoves == 0) {
         console.log('game over');
         // TO DO
     }
 }

 function decrementNumberOfMoves() {
     // TO DO:
 }

 function addEventListenerForCard(card) {
    card.addEventListener('click', function() {
        handleCardClick(card)
    });
 }

 function removeEventListenerForCard(card) {
    card.removeEventListener('click', function() {
        handleCardClick(card)
    });
 }