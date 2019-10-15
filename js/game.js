'use strict';
var WALL = '<img src="img/wall.gif">';
var FOOD = '.';
var EMPTY = '';
var CHERRY = '<img src="img/cherry.webp">';
var SUPER = '<img src="img/1.gif">';
var gBoard;
var gGame = {
  score: 0,
  isOn: false
};

var gIntervalCherry = null;

function init() {
  var replayBtn = document.querySelector('.modal');
  replayBtn.style.display = 'none';

  gBoard = buildBoard();

  createPacman(gBoard);
  createGhosts(gBoard);

  printMat(gBoard, '.board-container');
  // console.table(gBoard);

  gGame.isOn = true;
  gGame.score = 0;
  gFoodCount = 0;
  document.querySelector('header h3 span').innerText = gGame.score;
  addCherry();
}

function buildBoard() {
  var SIZE = 10;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      board[i][j] = FOOD;

      if (i === 0 || i === SIZE - 1 ||
        j === 0 || j === SIZE - 1 ||
        (j === 3 && i > 4 && i < SIZE - 2)) {

        board[i][j] = WALL;
      }
    }
  }
  board[1][1] = SUPER;
  board[1][8] = SUPER;
  board[8][1] = SUPER;
  board[8][8] = SUPER;
  return board;
}

function addCherry() {
  gIntervalCherry = setInterval(function () {
    var i = (getRandomIntInclusive(1, 8));
    var j = (getRandomIntInclusive(1, 8));
    var cherry = {
      location: {
        i: i,
        j: j
      }
    };
    if (gBoard[i][j] === EMPTY) {
      gBoard[i][j] = CHERRY;
      renderCell(cherry.location, CHERRY)
    }
  }, 4000);
}



function updateScore(value) {
  // Update both the model and the dom for the score
  gGame.score += value;
  document.querySelector('header h3 span').innerText = gGame.score;
}


function gameOver() {
  var modal = document.querySelector('.modal');
  modal.style.display = 'block';
  if (gFoodCount === 56) {
    console.log('Victory!');
    modal.querySelector('h3').innerText = 'You Won!\n Screw These Ghosts!';
    modal.querySelector('button').innerText = 'Play again!'
  } else {
    console.log('Game Over');
    modal.querySelector('h3').innerText = 'Loser! \nYou Can\'t Overcome Ghosts!';
    modal.querySelector('button').innerText = 'Yes I Can';
  }

  gGame.isOn = false;
  clearInterval(gIntervalGhosts);
  clearInterval(gIntervalCherry);
  gIntervalCherry = null;
}