
/*
 *  Global variables
 */

// open cards means cards that are matched
let openCards = [];

// selected cards means cards that have been revealed
let selectedCards = [];

let match = false;

// Maximum # of stars
const maxStars = 3;
let currentStars = maxStars;

// Maximum number of moves before user loses the game
const maxMoves = 15;
let currentMove = 0;
const movesStarThreshhold = 3;

let Interval;
let seconds = 0;

let gameStarted = false;
let gameOver = false;

// Boolean for determining whether or not to lose a star for time penalty
let starForLessThan30Seconds = true;

// Run setup and initialize the game. Game starts when user makes first card selection
setup()
initializeGame();

/*
 * Use for one time setup of the game
 */
function setup() {
    // Add event listener to the restart button
    addEventListenerToRestartButton();

    // By default, there is no timer in the html. Add the timer.
    insertTimer();

    // Add event listeners to the cards
    let cards = document.querySelectorAll('.card');

    const deck = document.querySelector('.deck');
    deck.addEventListener('click', handleCardClick);
    deck.addEventListener('animationend', handleAnimationEnd);
}

/*
 * Inserts the timer into the html
 */
function insertTimer() {
    const restart = document.querySelector('.restart');
    restart.insertAdjacentHTML('beforebegin', `<span class="timer">Time: <span id="timer">${seconds}</span> seconds</span>`)
}

/*
 * Resets the timer
 */
function resetTimer() {
    stopTimer();
    seconds = 0;
    let time = document.getElementById("timer");
    time.textContent = seconds;
}

/*
 * Starts time timer
 */
function startTimer() {
    clearInterval(Interval);
    Interval = setInterval(startClock, 1000);
}

/*
 * Stops the timer
 */
function stopTimer() {
    clearInterval(Interval);
}

/*
 * Actual running of the timer.
 * Deducts 1 star if time exceeds 30 seconds
 */
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

/*
 * Game initialization
 */
function initializeGame() {
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
    gameOver = false;
}

/*
 * Restart button event handler
 */
function addEventListenerToRestartButton() {
    document.querySelector('.restart').addEventListener('click', initializeGame);
}

/*
 * Get deck and cards, shuffle and deal cards
 */
function initializeCards() {
    let deck = document.querySelector('.deck');
    const fragment = document.createDocumentFragment();
    let cards = document.querySelectorAll('.card');
    deck.innerHTML = "";
    var indexes = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
    indexes = shuffle(indexes);
    for (let index of indexes) {
        let card = cards[index];
        card.className = "card"
        fragment.appendChild(card);
    } 
    deck.appendChild(fragment);
}

/*
 *  Handle card click
 */
function handleCardClick(event) {
    
    // only handle click events for LI elements that are part of the deck node.
    if (event.target.nodeName === 'LI') {

        // Ignore card clicks if game is over
        if (gameOver) {
            return;
        }

        let card = event.target;

        // Start the timer only when user makes first selection
        if (!gameStarted) {
            gameStarted = true;
            startTimer();
        }
        
        // Ignore card clicks for cards that have been matched or are currently selected
        if (openCards.includes(card) || selectedCards.includes(card)) {
            return;
        } else {
            // Reveal the card
            card.className = "card open show";

            // Add card to selected cards array
            selectedCards.push(card);

            // If we have 2 selected cards that start processing for match
            if (selectedCards.length == 2) {
                // check for match
                if (selectedCards[0].innerHTML == selectedCards[1].innerHTML) {
                    // cards match
                    match = true;

                    // add cards to list of matched cards
                    openCards.push(selectedCards[0]);
                    openCards.push(selectedCards[1]);

                    // mark cards as matched cards using styling
                    selectedCards[0].className = "card open show match apply-shake";
                    selectedCards[1].className = "card open show match apply-shake";
                } else {
                    // cards do not match
                    match = false;

                    // increment move counter and update ui
                    currentMove += 1;
                    updateMoves(currentMove);

                    // lose a star when user hits max moves
                    if (currentMove == movesStarThreshhold) {
                        currentStars -=1;
                        updateStars(currentStars);
                    }
                    
                    // update styling
                    selectedCards[0].className = "card open show apply-shake";
                    selectedCards[1].className = "card open show apply-shake";
                }

                // check game status
                checkGameStatus();

                // null out the seleted cards array
                selectedCards = [];
            }
        }
    }
}

/*
 * Check game status: did player win? did player run out of moves?
 */
function checkGameStatus() {
    checkWin();
    checkMoves();
}

/*
 * Add card click event handler
 */
function addEventListenerToCard(card) {
    card.addEventListener('click', function() {
        handleCardClick(card);
    })
}

/*
 *  Check if player is out of moves.
 *  If out of moves, set stars to 1, stop tiemr and throw a popup message
 */
function checkMoves() {
    if (currentMove == maxMoves) {
        gameOver = true;
        currentStars = 1;
        updateStars(currentStars);
        stopTimer();
        if (confirm(`Sorry, you exceeded the maximum number of ${maxMoves} moves!. Would you like to play again?`)) {
            initializeGame();
        }
    }
}

/*
 *  Check if player won.
 *  If player won, then stop timer and throw a popup message
 */
function checkWin() {
    if (openCards.length == document.querySelectorAll('.card').length) {
        stopTimer();
        if (confirm(`Congratulations! You won the game in ${seconds} seconds and ${currentMove} moves.
Your rating is ${currentStars} star(s). Would you like to play the game?`)) {
            initializeGame();
        }
    }
}

/*
 *  Updates the number of stars in the UI
 */
function updateStars(n) {
    const stars = document.querySelector('.stars');
    let s = "";
    for (i=0; i<n; i++) {
        s += "<li><i class=\"fa fa-star\"></i></li>";
    }
    stars.innerHTML = s;
}

/*
 *  Updates the number of moves in the UI
 */
function updateMoves(n) {
    const moves = document.querySelector('.moves');
    moves.textContent = n;
}

/*
 * Add animationend event handler
 */
function addShakeEventListenerToCard(card) {
    card.addEventListener('animationend', function() {
        handleAnimationEnd(card);
    });
}

/*
 * When cards are done shaking and if card is not part of a match, then hide card via styling
 */
function handleAnimationEnd(event) {
    let card = event.target;
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