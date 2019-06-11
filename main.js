let $squares;
let $msg;
let $play;

let gameBoard = new Array(9);
let player = true;
let winner = '';
let tie = false;


window.onload = () => {
  $squares = document.querySelectorAll('.square');
  $msg = document.querySelector('#msg');
  $play = document.querySelector('#play');

  document.addEventListener('click', (event) => {
    const $square = event.target.closest('.square');
    if (!winner && $square && !$square.innerText) {
      const y = Array.from($square.parentNode.children).indexOf($square);
      const x = Array.from($square.parentNode.parentNode.children).indexOf($square.parentNode);
      const currPlayer = player ? 'O' : 'X';

      // Add Piece
      gameBoard[x * 3 + y] = currPlayer;

      // Update Status
      winner = checkWin(x, y) ? currPlayer : '';
      tie = checkTie();

      // Update Board
      updateBoard();

      // Change Player
      player = !player;
    }
  });

  $play.addEventListener('click', resetBoard)
}

function updateBoard () {
  const currPlayer = player ? 'O' : 'X';
  Array.from($squares).forEach(($square, index) => {
    $square.innerText = gameBoard[index] || '';
  });

  if (winner) $msg.innerText = `${currPlayer} won!`;
  if (tie) $msg.innerText = `It's a Tie!`;

  if (winner || tie) {
    $play.classList.remove('hide');
  } else {
    $play.classList.add('hide');
  }
}

function checkWin (x, y) {
  const vertical = gameBoard[x * 3] && gameBoard[x * 3] === gameBoard[x * 3 + 1] && gameBoard[x * 3] === gameBoard[x * 3 + 2];
  const horizontal = gameBoard[y] && gameBoard[y] === gameBoard[y + 3] && gameBoard[y] === gameBoard[y + 6];
  const diagonal = x === y && gameBoard[0] && gameBoard[0] === gameBoard[4] && gameBoard[0] === gameBoard[8];
  const altdiagonal = (x + y) === 2 && gameBoard[2] && gameBoard[2] === gameBoard[4] && gameBoard[2] === gameBoard[6];

  return vertical || horizontal || diagonal || altdiagonal;
}

function checkTie () {
  return gameBoard.reduce((acc) => {
    return acc + 1;
  }, 0) === 9;
}

function resetBoard () {
  gameBoard = new Array(9);
  player = true;
  winner = '';
  tie = false;
  $msg.innerText = '';
  updateBoard();
}