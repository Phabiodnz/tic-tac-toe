// Main container where the game board will be rendered
const gameContainer = document.getElementById("game-container");

/**
 * Factory function responsible for creating and managing a tic-tac-toe board instance.
 * Provides private state through closure and exposes controlled methods.
 */
function createBoard() {
    // --- Private State (not directly accessible outside the factory) ---
    let board = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "X";
    let locked = false;

    // --- Getters & Setters ---

    // Returns the value stored at a given board position
    const getBoardElement = (position) => board[position];

    // Updates a position on the board
    const setBoardElement = (value, position) => {
        board[position] = value;
    };

    // --- Control Methods ---

    // Prevents any further interaction with the board
    const lockBoard = () => { locked = true; };

    // Reallows interaction with the board
    const unlockBoard = () => { locked = false; };

    /**
     * Resets board state and re-renders the UI
     */
    const resetBoard = (container, boardObj) => {
        // Clear UI
        container.innerHTML = "";

        // Unlock interaction
        unlockBoard();

        // Reset internal board
        board = ["", "", "", "", "", "", "", "", ""];
        boardObj.board = board;

        // Reset player turn
        boardObj.currentPlayer = "X";

        // Render the clean board
        displayBoard(container, boardObj);
    };

    /**
     * Renders the board visually and attaches click logic to each square.
     */
    const displayBoard = (container, boardObj) => {
        // Clear previous render
        container.innerHTML = "";

        turnAlternator(boardObj.currentPlayer);

        // Loop through all board cells and create UI blocks
        board.forEach((value, index) => {
            const boardBlock = document.createElement("div");
            boardBlock.classList.add("board-block");
            boardBlock.dataset.id = index;
            boardBlock.textContent = value;

            
            // Attach game logic to each block
            boardBlock.addEventListener("click", () => {
                // Block interaction if game ended
                if (locked) return;


                // Prevent overwriting an existing move
                if (boardObj.getBoardElement(index) !== "") {
                    alert("That position is already occupied.");
                    return;
                }

                // Place current player's mark
                boardObj.setBoardElement(boardObj.currentPlayer, index);

                // After marking, switch players
                boardObj.currentPlayer =
                    boardObj.currentPlayer === "X" ? "O" : "X";

                // Re-render the updated board
                boardObj.displayBoard(container, boardObj);

                // Check if game has a winner
                const winner = checkWin(boardObj.board);
                if (winner !== null) {
                    alert("Winner is: " + winner);
                    winnerCounter(winner);
                    boardObj.lockBoard();
                    return winner;
                }

                // Check for draw (no empty cells left)
                const isDraw = boardObj.board.every(cell => cell !== "");
                if (isDraw) {
                    alert("DRAW");
                    boardObj.lockBoard();
                    return "draw";
                }
            });

            // Add block to the board container
            container.appendChild(boardBlock);
        });
    };

    return {
        board,
        currentPlayer,
        getBoardElement,
        setBoardElement,
        displayBoard,
        lockBoard,
        unlockBoard,
        resetBoard
    };
}

function turnAlternator(turn){
    const turnX = document.getElementById("turn-alternator-x")
    const turnO = document.getElementById("turn-alternator-o")

    if (turn === "X"){
        turnX.style.backgroundColor = "#FF4848";
        turnO.style.backgroundColor = "#000000";
    }else{
        turnO.style.backgroundColor = "#FF4848";
        turnX.style.backgroundColor = "#000000";
    }
}

function winnerCounter(winner){
    const winsX = document.getElementById("x-wins");
    const winsO = document.getElementById("o-wins");

    if (winner === "X") {
        const newWinValue = Number(winsX.textContent) + 1;
        winsX.textContent = newWinValue;
    } else {
        const newWinValue = Number(winsO.textContent) + 1;
        winsO.textContent = newWinValue;
    }
}

// Checks whether the current board state contains a winning combination.

function checkWin(board) {
    // List of all possible winning line combinations (rows, columns, diagonals)
    const winConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    // Iterate through all winning combinations
    for (let condition of winConditions) {
        const [a, b, c] = condition;

        // Check if all three positions have the same non-empty value
        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {
            // Return the symbol of the winning player
            return board[a];
        }
    }

    // No winner found
    return null;
}

/**
 * Initializes the game by setting up UI elements, attaching event listeners,
 * and managing the lifecycle of the board instance.
 */
function initGame() {
    // Buttons used to start the game and reset the board
    const resetButton = document.getElementById("reset-btn");
    const playButton = document.getElementById("play-btn");

    // Holds the active game instance created by `createBoard`
    let game = null;

    // Start a new game when the Play button is clicked
    playButton.addEventListener("click", () => {
        // Create a fresh board instance
        game = createBoard();

        // Render the initial empty board
        game.displayBoard(gameContainer, game);
    });

    // Reset the current game when the Reset button is clicked
    resetButton.addEventListener("click", () => {
        // If no game has been started yet, ignore the action
        if (!game) return;

        // Reset the board state and re-render
        game.resetBoard(gameContainer, game);
    });
}

// Bootstraps the entire application
initGame();