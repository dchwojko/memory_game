/*
 * Create a list that holds all of your cards
 */

var hasWon = false;
const maxMoves = 3;
let remainingMoves = 3;

var cards = getCards();
var selectedCards = [];
var openCards = [];
var indexes = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

var restartButton;

handleRestart();

function setupRestartButton() {
    restartButton = document.querySelector('.restart');
    restartButton.addEventListener('click', function() {
    handleRestart();
    });
}

function getCards() {
    return document.querySelectorAll('.card');
}



/* TO DO
var scorePanel = document.querySelector('.score-panel');
var stars = document.querySelector('.stars');
var moves = document.querySelector('.moves');

function updateMoves() {
    
}
*/

function deal() {
    //console.log("dealing");
    const deck = document.querySelector('.deck');
    deck.innerHTML = "";
    indexes = shuffle(indexes);

    for (index of indexes) {
      //  console.log(cards[index]);
        deck.appendChild(cards[index]);
    }
    cards = getCards();
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 

 function addEventListenerForDeck() {
     for (card of cards) {
         addEventListenerForCard(card);
     }
 }

 function removeEventListenerForDeck() {
     for (card of cards) {
         removeEventListenerForCard(card);
     }
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
        removeEventListenerForCard(card);
        addEventListenerForCard(card);
        setCardClassListToCard(card);  
    }
}

function setCardClassListToCard(card) {
    card.classList = "card";
    //console.log(card.classList);
}

function setCardClassListToShow(card) {
    card.classList.toggle('open');
    card.classList.toggle('show');
    //console.log(card.classList);
}

function setCardClassListToMatch(card) {
    card.classList.toggle('open');
    card.classList.toggle('show');
    card.classList.toggle('match');
    //console.log(card.classList);
}

function handleRestart() {
    //resetMoves();
    resetCards();
    deal();
}

function resetMoves() {
    // TO DO
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
     if (openCards.includes(card) || selectedCards.includes(card)) {
         return;
     } else {
        if (selectedCards.length < 2) {
            setCardClassListToShow(card);
            selectedCards.push(card);
        } else {
            if (selectedCards[0].innerHTML == selectedCards[1].innerHTML) {
                updateMatchingCards(selectedCards);
            } else {
                updateMismatchingCards(selectedCards);
            }
            selectedCards = [];
        }
     }
     checkGameStatus();
 }

function updateMatchingCards(matchCards) {
    for (matchCard of matchCards) {
        setCardClassListToMatch(matchCard);
        openCards.push(matchCard);
    }
}

function updateMismatchingCards(mismatchCards) {
    for (mismatchCard of mismatchCards) {
        setCardClassListToCard(mismatchCard);
    }
}

 function checkGameStatus() {
     if (openCards.length == cards.length) {
         console.log('you won!');
     }
     if (remainingMoves == 0) {
         console.log('you lost!');
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
     //console.log('adding event listener');
     card.addEventListener('click', function() {
        handleCardClick(card);
    });
 }

 function removeEventListenerForCard(card) {
     //console.log('removing event listener');
     card.removeEventListener('click', function() {
        handleCardClick(card);
    });
 }

