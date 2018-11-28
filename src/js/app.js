

var openCards = [];
var selectedCards = [];
var match = false;
const maxStars = 4;
var currentStars = maxStars;
const maxMoves = 3;
var currentMove = 0;
var Interval;
var seconds = 0;
var gameStarted = false;
var starForLessThan30Seconds = true;

setup()
initializeGame();

function setup() {
    addEventListenerToRestartButton();
    insertTimer()
    let cards = document.querySelectorAll('.card');
    for (let card of cards) {
        addEventListenerToCard(card);
        addShakeEventListenerToCard(card);
    }
    
}

function insertTimer() {
    const restart = document.querySelector('.restart');
    restart.insertAdjacentHTML('beforebegin', `<span class="timer">Time: <span id="timer">${seconds}</span> seconds</span>`)
}

function resetTimer() {
    stopTimer();
    seconds = 0;
    let time = document.getElementById("timer");
    time.textContent = seconds;
}

function startTimer() {
    clearInterval(Interval);
    Interval = setInterval(startClock, 1000);
}

function stopTimer() {
    clearInterval(Interval);
}

function startClock() {
    seconds++;
    let time = document.getElementById("timer");
    time.textContent = seconds;
    if (starForLessThan30Seconds) {
        if (seconds > 30) {
            starForLessThan30Seconds = false;
            currentStars -=1;
            updateStars(currentStars);
        }
    }
}

function initializeGame() {
    console.log('initializing game');
    openCards = [];
    selectedCards = [];
    gameStarted = false;
    match = false;
    currentStars = maxStars;
    updateStars(currentStars);
    currentMove = 0;
    updateMoves(currentMove);
    resetTimer();
    initializeCards();
    starForLessThan30Seconds = true;
    if (openCards.length != 0) {console.log('opencards length is not 0');}
    if (selectedCards.length != 0) { console.log('selectedCards lenght is not 0')}
    if (document.querySelector('.moves').textContent != 0) { console.log('moves is not 0')}
}

function addEventListenerToRestartButton() {
    document.querySelector('.restart').addEventListener('click', function() {
        initializeGame();
    })
}


function initializeCards() {
    console.log('initializing cards')
    let deck = document.querySelector('.deck');
    let cards = document.querySelectorAll('.card');
    deck.innerHTML = "";
    if (document.querySelectorAll('.card').length != 0) { console.log('number of cards is not 0')}
    var indexes = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
    indexes = shuffle(indexes);
    for (let index of indexes) {
        let card = cards[index];
        card.className = "card"
        deck.appendChild(card);
    } 
}

function handleCardClick(card) {
    if (!gameStarted) {
        gameStarted = true;
        startTimer();
    }
    if (openCards.includes(card) || selectedCards.includes(card)) {
        // IGNORE CLICK - DON'T DO ANYTHING
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
                currentMove += 1;
                updateMoves(currentMove);
                selectedCards[0].className = "card open show apply-shake";
                selectedCards[1].className = "card open show apply-shake";
            }
            checkGameStatus();
            selectedCards = [];
        }
    }
}

function checkGameStatus() {
    checkWin();
    checkMoves();
}

function addEventListenerToCard(card) {
    card.addEventListener('click', function() {
        handleCardClick(card);
    })
}

function removeEventListenerToCard(card) {
    card.removeEventListener('click', function() {
        handleCardClick(card);
    })
}

function checkMoves() {
    if (currentMove == maxMoves) {
        stopTimer();
        if (confirm('Sorry, you lost!. Would you like to play again?')) {
            initializeGame();
        }
    }
}

function checkWin() {
    if (openCards.length == document.querySelectorAll('.card').length) {
        stopTimer();
        if (confirm(`Congratulations! You won the game in ${seconds} seconds. Would you like to play the game?`)) {
            initializeGame();
        }
    }
}

function updateStars(n) {
    const stars = document.querySelector('.stars');
    let s = "";
    for (i=0; i<n; i++) {
        s += "<li><i class=\"fa fa-star\"></i></li>";
    }
    stars.innerHTML = s;
}

function updateMoves(n) {
    const moves = document.querySelector('.moves');
    moves.textContent = n;
}

function addShakeEventListenerToCard(card) {
    card.addEventListener('animationend', function() {
        handleAnimationEnd(card);
    });
}

function removeShakeEventListenerToCard(card) {
    card.removeEventListener('animationend', function() {
        handleAnimationEnd(card);
    });
}

function handleAnimationEnd(card) {
    // hide card if it is not part of a found match
    if (!openCards.includes(card)) {
        card.className = "card";
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