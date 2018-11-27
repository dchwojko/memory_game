/*
 * Create a list that holds all of your cards
 */

var hasWon = false;
const maxMoves = 9;
let movesMade = 0;
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
    movesMade = 0;
    updateMoves(movesMade);
}
function initializeCards() {
    resetCards();
    shuffleCards();
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

function algorithmForRemovingStars() {
    if (1 == 2) {
        numberOfStars -=1;
        updateStars(numberOfStars);
    }
}

function updateMoves(numberOfMoves) {
    moves = document.querySelector('.moves');
    moves.textContent = numberOfMoves;
}

function incrementMoves() {
    movesMade += 1;
    updateMoves(movesMade);
}

function shuffleCards() {
    const deck = document.querySelector('.deck');
    deck.innerHTML = "";
    indexes = shuffle(indexes);

    for (index of indexes) {
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
     if (openCards.includes(card) || selectedCards.includes(card)) {
         console.log('card is selected or open already')
         return;
     } else {
        if (selectedCards.length < 2) {
            console.log('less than 2 cards selected')
            setCardClassListToShow(card);
            selectedCards.push(card);
        }
        if (selectedCards.length == 2) {
            console.log('we have 2 cards selected')
            if (selectedCards[0].innerHTML == selectedCards[1].innerHTML) {
                console.log('cards match');
                updateMatchingCards(selectedCards);
                openCards.push(card);
            } else {
                console.log('cards do not match');
                incrementMoves();
                setTimeout(function () {
                    console.log('timeout');
                    for (card of selectedCards) {
                        setCardClassListToMismatch(card);
                    }
                }, 5000);
                for (card of selectedCards) {
                    setCardClassListToCard(card);
                }
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

var updateMismatchingCards = function (mismatchCards) {
    for (mismatchCard of selectedCards) {
        setCardClassListToMismatch(mismatchCard);
    }
}
function xyz() {
    for (mismatchCard of selectedCards) {
        setCardClassListToCard(mismatchCard);
    }
}

 function checkGameStatus() {
     if (openCards.length == cards.length) {
         console.log('you won!');
         var shouldRestart = confirm('Congratulations! Would you like to play again?');
         if (shouldRestart) {
             initializeGame();
         }
     }
     if (movesMade == maxMoves) {
         console.log('you lost!');
         var shouldRestart = confirm('Sorry, you lost. Would you like to play again?');
         if (shouldRestart) {
             initializeGame();
         }
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

 

 function removeEventListenerForCard(card) {
     //console.log('removing event listener');
     card.removeEventListener('click', function() {
        handleCardClick(card);
    });
 }

