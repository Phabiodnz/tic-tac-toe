const gameContainer = document.getElementById("game-container");

function createBoard(){
    let board = ["", "", "", "", "", "", "", "", ""];

    const getBoardElement = (position) => board[position];

    const setBoardElement = (value, position) => {
        board[position] = value;
    };

    const displayBoard = (container) => {
        container.innerHTML = "";

        board.forEach((value, index) => {
            const boardBlock = document.createElement("div");
            boardBlock.classList.add("board-block");
            boardBlock.dataset.id = index;
            boardBlock.textContent = value;

            container.appendChild(boardBlock);
        });
    };

    return { board, getBoardElement, setBoardElement, displayBoard };
}


function checkWin(board) {
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

    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {
            return board[a];
        }
    }

    return null;
}


function getTurn(turn) {
    return turn % 2 === 1 ? "X" : "O";
}


function playGame() {
    let boardObj = createBoard();

    for (let i = 1; i <= 9; i++) {

        let currentPlayer = getTurn(i);
        let position = prompt("Select a position (0–8): ");
        position = Number(position);

        if (isNaN(position) || position < 0 || position > 8) {
            alert("Invalid position!");
            i--;
            continue;
        }

        if (boardObj.getBoardElement(position) !== "") {
            alert("Position already taken!");
            i--;
            continue;
        }

        boardObj.setBoardElement(currentPlayer, position);

        boardObj.displayBoard(gameContainer);

        let winner = checkWin(boardObj.board);

        if (winner !== null) {
            alert("Winner is: " + winner);
            return winner;
        }
    }

    alert("It's a draw!");
    return "draw";
}
