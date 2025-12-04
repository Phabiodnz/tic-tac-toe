# Tic-Tac-Toe

Simple Tic-Tac-Toe game built with HTML, CSS and JavaScript, using a factory function to control game state and UI updates.

## Features
- Dynamic board rendering  
- Turn alternator (X/O)  
- Win & draw detection  
- Score counter  
- Board lock after match  
- Play / Reset controls  
- No global variables

## Files
- index.html  
- style.css  
- script.js

## How to Run
Open index.html in any browser.

## Core Structure
- createBoard() → board state + actions  
- checkWin() → win logic  
- initGame() → setup & event bindings  
- turnAlternator() → visual turn highlight  
- winnerCounter() → updates scoreboard  
