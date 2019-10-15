var GHOST1 = '<img src="img/g1.webp">';
var GHOST2 = '<img src="img/g2.webp">';
var GHOST3 = '<img src="img/g3.webp">';
var EDIBLE_G = '<img src="img/edibleG.webp">';

var gIntervalGhosts;
var gGhosts;
var ghostId = 0;

function createGhost(board) {
    var ghost = {
        id: ghostId++,
        location: {
            i: getRandomIntInclusive(2, 7),
            j: getRandomIntInclusive(1, 2)
        },
        currCellContent: FOOD
    };
    gGhosts.push(ghost);
    var imgNum = getRandomIntInclusive(1, 3);
    if (imgNum === 1) {
        board[ghost.location.i][ghost.location.j] = GHOST1;
        ghost.name = 'GHOST1';
    } else if (imgNum === 2) {
        board[ghost.location.i][ghost.location.j] = GHOST2;
        ghost.name = 'GHOST2';
    } else {
        board[ghost.location.i][ghost.location.j] = GHOST3;
        ghost.name = 'GHOST3';
    }
}


function createGhosts(board) {
    gGhosts = [];

    // empty the gGhosts array, create some ghosts
    createGhost(board)
    createGhost(board)
    createGhost(board)
    //  and run the interval to move them
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        // Create the moveDiff
        var moveDiff = getMoveDiff();
        var nextLocation = {
            i: ghost.location.i + moveDiff.i,
            j: ghost.location.j + moveDiff.j
        };
        // console.log('ghost.location', ghost.location, 'nextLocation', nextLocation, 'moveDiff', moveDiff)

        // if WALL return
        if (gBoard[nextLocation.i][nextLocation.j] === WALL) return;

        // if PACMAN - gameOver, return
        if (gBoard[nextLocation.i][nextLocation.j] === PACMAN && !gPacman.isSuper) {
            gameOver();
            return;
        } else if (gBoard[nextLocation.i][nextLocation.j] === PACMAN && gPacman.isSuper) {
            eatGhost(ghost.name);

        }
        // if GHOST - give up
        if (gBoard[nextLocation.i][nextLocation.j] === 'GHOST1' ||
            gBoard[nextLocation.i][nextLocation.j] === 'GHOST2' ||
            gBoard[nextLocation.i][nextLocation.j] === 'GHOST3') {
            return;
        }

        // set back what we stepped on: update Model, DOM
        if (ghost.currCellContent === 'ᗧ' || ghost.currCellContent === 'ᗢ' ||
            ghost.currCellContent === 'ᗣ' || ghost.currCellContent === 'ᗤ') ghost.currCellContent = '';
        gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent;
        renderCell(ghost.location, ghost.currCellContent);

        // move the ghost
        ghost.location = nextLocation;

        // keep the contnet of the cell we are going to
        ghost.currCellContent = gBoard[nextLocation.i][nextLocation.j];

        // move the ghost and update model and dom
        gBoard[ghost.location.i][ghost.location.j] = ghost.name;

        renderCell(ghost.location, getGhostHTML(ghost));
    }
}

function getMoveDiff() {
    var randNum = getRandomIntInclusive(0, 100);
    if (randNum < 25) {
        return {
            i: 0,
            j: 1
        };
    } else if (randNum < 50) {
        return {
            i: -1,
            j: 0
        };
    } else if (randNum < 75) {
        return {
            i: 0,
            j: -1
        };
    } else {
        return {
            i: 1,
            j: 0
        };
    }
}

function getGhostHTML(ghost) {
    if (gPacman.isSuper) {
        return `<span>${EDIBLE_G}</span>`;
    } else {
        if (ghost.name === 'GHOST1') return `<span>${GHOST1}</span>`;
        if (ghost.name === 'GHOST2') return `<span>${GHOST2}</span>`;
        if (ghost.name === 'GHOST3') return `<span>${GHOST3}</span>`;
    }
}

function eatGhost(location) {
    for (var i = 0; i < gGhosts.length; i++) {
        if (gGhosts[i].location.i === location.i && gGhosts[i].location.j === location.j) {
            if (gGhosts[i].currCellContent === FOOD) gFoodCount++;
            gGhosts.splice(i, i + 1);
            return;
        }

    }
}

function makeGhostsEdibleOrNot() {
    for (var i = 0; i < gGhosts.length; i++) {
        renderCell(gGhosts[i].location, getGhostHTML(gGhosts[i]));
    }
    console.log('done');

}