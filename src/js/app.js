/*
 * Create a list that holds all of your cards
 */

var hasWon = false;
const maxMoves = 9;
let remainingMoves = maxMoves;
const maxStars = 5;

var cards = getCards();
var selectedCards = [];
var openCards = [];
var indexes = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

var restartButton;

setup();

function setup() {
    setupRestartButton();
    initializeGame();
}

function initializeGame() {
    initializeStars();
    initializeTimer();
    initializeMoves();
    initializeCards();
}

function initializeStars() {
    updateStars(maxStars);
}
function initializeTimer() {}
function initializeMoves() {
    remainingMoves = maxMoves;
    updateMoves(maxMoves);
}
function initializeCards() {
    handleRestart();
}

function setupRestartButton() {
    restartButton = document.querySelector('.restart');
    restartButton.addEventListener('click', function() {
        initializeGame();
    });
}

function getCards() {
    return document.querySelectorAll('.card');
}

function updateStars(numberOfStars) {
    stars = document.querySelector('.stars');
    str = "";
    for (i = 0; i < numberOfStars; i++) {
        str += "<li><i class=\"fa fa-star\"></i></li>"
    }
    stars.innerHTML = str;
}

function updateMoves(numberOfMoves) {
    moves = document.querySelector('.moves');
    moves.textContent = numberOfMoves;
}

function decrementMoves() {
    remainingMoves -= 1;
    updateMoves(remainingMoves);
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
    card.className = "card";
}

function setCardClassListToShow(card) {
    card.className = "card open show";
}

function setCardClassListToMatch(card) {
    card.className = "card open show match apply-shake";
}

function setCardClassListToMismatch(card) {
    card.className = "card open show apply-shake";
}

function handleRestart() {
    resetCards();
    deal();
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
                console.log('hi');
                decrementMoves();
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
        setCardClassListToMismatch(mismatchCard);
    }
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

 function addEventListenerForCard(card) {
     //console.log('adding event listener');
     card.addEventListener('click', function() {
         //revealCard(card);
         
        handleCardClick(card);
        
    });
    card.addEventListener("animationend", (e) => {
        //card.classList.remove("apply-shake");
        setCardClassListToCard(card);
    });
 }

 function checkSelectedCards() {
     if (selectedCards.length == 2) {
         if (selectedCards[0].innerHTML == selectedCards[1].innerHTML) {
             for (selectedCard of selectedCards) {
                 setCardClassListToMatch(selectedCard)
             }
         } else {
             for (selectedCard of selectedCards) {
                 setCardClassListToMismatch(selectedCards);
                 //setCardClassListToCard(selectedCard);
             }
       }
         selectedCards = [];
     }
 }

 function revealCard(card) {
     if (openCards.includes(card) || selectedCards.includes(card)) {
         console.log('either open or selected')
         return;
     } else {
         if (selectedCards.length < 2) {
             selectedCards.push(card);
             setCardClassListToShow(card);
         } else {
             checkSelectedCards();
         }
     }
 }

 function setCardClassListToMismatch(card) {

 }

 function removeEventListenerForCard(card) {
     //console.log('removing event listener');
     card.removeEventListener('click', function() {
        handleCardClick(card);
    });
 }

