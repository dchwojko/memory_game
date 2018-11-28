# Memory Game Project

## Table of Contents

* [Instructions](#instructions)
* [Contributing](#contributing)

## Goal of the Game
The goal of the game is to match the identical card pairs until there is no more
cards to match and within the number of moves limit. The faster you complete this
goal and using fewer moves will result in a better star rating (0 stars for 
losing, 1-4 stars if you win and based on time/number of moves used). If you exceed
the max number of moves (3), then you lose the game.

## Instructions

To start the game simply click any of the cards. The timer will begin. Clicking a card
will reveal the card. After you select a second card, if the 2 revealed cards match, then
they will stay open. If the 2 revealed cards do not match, then they will be hidden.

## How to Win
The player will win, when all cards have been matched. When this happens, a popup will appear
with the elapsed time, number of moves and star rating. The player can restart the game by
clicking OK.

## How to Lose
The player will lose, if the number of moves exceeds the maximum number of moves (10).
A popup will appear indicating the player has lost. The player can restart the game by
clicking OK.

## Star Rating
The player starts with 3 stars. The player will lose 1 star if the time exceeds 30 seconds.
The player will lose another star if the number of moves is 5 or greater. Move counter increments
when 2 cards are selected but do not match.

## Starter Code

Starter code was provided by udacity at https://github.com/udacity/fend-project-memory-game

## Dependencies
- https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css
- https://fonts.googleapis.com/css?family=Coda
