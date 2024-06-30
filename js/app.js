/*-------------------------------- Constants --------------------------------*/
const squareEls = document.querySelectorAll('.sqr');
const messageE1 = document.querySelector('#message');
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

/*---------------------------- Variables (state) ----------------------------*/
let board = ['', '', '', '', '', '', '', '', ''];
let turn = 'X';
let winner = false;
let tie = false;
/*------------------------ Cached Element References ------------------------*/
const resetBtnE1 = document.querySelector('#reset');
/*-------------------------------- Functions --------------------------------*/
const init = () => {
    board = ['', '', '', '', '', '', '', '', ''];
     winner=false;
    tie=false;
    turn='X';
    render();
}

const render = () => {
    updateBoard();
    updateMessage();
}

const updateBoard = () => {
    board.forEach((value, index) => {
        squareEls[index].textContent = value;
    });
}

const updateMessage = () => {
    if (winner === false && tie === false) {
        messageE1.textContent = `It's ${turn}'s turn`;
    } else if (winner === false && tie === true) {
        messageE1.textContent = "It's a tie!";
    } else {
        messageE1.textContent = `${turn} wins!`;
    }
}

function handleClick(event) {
    const squareIndex = event.target.id;

    if (board[squareIndex] === '' && !winner) {
        placePiece(squareIndex);
        if (checkForWinner()) {
            winner = true;
        } else {
            switchPlayerTurn();
            checkForTie(); 
        }
        render();
    }
}

;

function placePiece(index) {
    board[index] = turn;
}

function switchPlayerTurn() {
    if (turn === 'X') {
        turn = 'O';
    } else {
        turn = 'X';
    }
}

function checkForWinner() {
    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}

function checkForTie() {
    if (checkForWinner()) {
        return;
    }

    tie = true;

    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            tie = false;
            break;
        }
    }

    if (tie) {
        render(); 
    }
}

/*----------------------------- Event Listeners -----------------------------*/

init();
squareEls.forEach(square => {
    square.addEventListener('click', handleClick);
})
resetBtnE1.addEventListener('click' , init);
