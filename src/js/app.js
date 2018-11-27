

var openCards = [];
var selectedCards = [];
var match = false;

initializeGame();

function initializeGame() {
    console.log('initializing game');
    initializeCards();
}

function initializeCards() {
    console.log('initializing cards')
    let deck = document.querySelector('.deck');
    let cards = document.querySelectorAll('.card');
    deck.innerHTML = "";
    var indexes = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
    indexes = shuffle(indexes);
    for (let index of indexes) {
        let card = cards[index];
        card.className = "card"
        addEventListenerToCard(card);
        addShakeEventListenerToCard(card);
        deck.appendChild(card);
    } 
}

function addEventListenerToCard(card) {
    card.addEventListener('click', function() {
        if (openCards.includes(card) || selectedCards.includes(card)) {
            // DON'T DO ANYTHING
            return;
        } else {
            card.className = "card open show";
            selectedCards.push(card);
            if (selectedCards.length == 2) {
                // check for match
                if (selectedCards[0].innerHTML == selectedCards[1].innerHTML) {
                    match = true;
                    console.log('cards match');
                    openCards.push(selectedCards[0]);
                    openCards.push(selectedCards[1]);
                    console.log(`${openCards.length} of ${document.querySelectorAll('.card').length} matched`)
                    selectedCards[0].className = "card open show match apply-shake";
                    selectedCards[1].className = "card open show match apply-shake";
                } else {
                    match = false;
                    console.log('cards do NOT match');
                    selectedCards[0].className = "card open show apply-shake";
                    selectedCards[1].className = "card open show apply-shake";
                }
                selectedCards = [];
            }
        }
    })
}

function addShakeEventListenerToCard(card) {
    card.addEventListener('animationend', function() {
        // hide card if it is not part of a found match
        if (!openCards.includes(card)) {
            card.className = "card";
        }
    });
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