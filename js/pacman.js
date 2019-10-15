var gPacman;

var PACMAN = '<img src="img/pacmanD.gif">';
var PACMANU = '<img src="img/pacmanU.gif">';
var PACMANR = '<img src="img/pacmanR.gif">';
var PACMANL = '<img src="img/pacmanL.gif">';
var gFoodCount = 0;

function createPacman(board) {
  gPacman = {
    location: {
      i: 3,
      j: 5
    },
    isSuper: false
  };
  board[gPacman.location.i][gPacman.location.j] = PACMAN;
}


function movePacman(eventKeyboard) {
  if (!gGame.isOn) return;
  // console.log('eventKeyboard:', eventKeyboard);

  var nextLocation = getNextLocation(eventKeyboard);
  // User pressed none-relevant key in the keyboard
  if (!nextLocation) return;

  var nextCell = gBoard[nextLocation.i][nextLocation.j];

  // Hitting a WALL, not moving anywhere
  if (nextCell === WALL) return;

  // Hitting FOOD? update score
  if (nextCell === FOOD) {
    gFoodCount++;
    console.log('Food count: ' + gFoodCount);
    updateScore(1);
    if (gFoodCount === 56) gameOver();
  }
  if (nextCell === CHERRY) {
    updateScore(15);
  }
  if (nextCell === SUPER) {
    gPacman.isSuper = true;
    console.log('pacman is super: ' + gPacman.isSuper);
    makeGhostsEdibleOrNot();
    setTimeout(function () {
      gPacman.isSuper = false;
      console.log('pacman is super: ' + gPacman.isSuper);
      makeGhostsEdibleOrNot();
      if (gGhosts.length < 3) {
        for (var i = 0; i < 3 - gGhosts.length; i++) {
          createGhost(gBoard);
        }
      }
    }, 5000);
  }
  if (nextCell === 'GHOST1' || nextCell === 'GHOST2' || nextCell === 'GHOST3') {
    if (gPacman.isSuper) {
      eatGhost(nextLocation)
      updateScore(15);
    } else {
      gameOver();
      renderCell(gPacman.location, EMPTY);
      return;
    }
  }

  // Update the model to reflect movement
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
  // Update the DOM
  renderCell(gPacman.location, EMPTY);

  // Update the pacman MODEL to new location  
  gPacman.location = nextLocation;

  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
  // Render updated model to the DOM
  renderCell(gPacman.location, PACMAN);

}

function getNextLocation(keyboardEvent) {
  var nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j
  };

  switch (keyboardEvent.code) {
    case 'ArrowUp':
      nextLocation.i--;
      PACMAN = PACMANU;
      break;
    case 'ArrowDown':
      nextLocation.i++;
      PACMAN = PACMAN;
      break;
    case 'ArrowLeft':
      nextLocation.j--;
      PACMAN = PACMANL;
      break;
    case 'ArrowRight':
      nextLocation.j++;
      PACMAN = PACMANR;
      break;
    default:
      return null;
  }

  return nextLocation;
}