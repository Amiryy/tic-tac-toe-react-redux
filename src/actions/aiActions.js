const streaks = {
    nine: [ // all the possible line streaks that could make a winner.
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ],
    sixteen: [
        [0, 1, 2, 3],
        [4, 5, 6, 7],
        [8, 9, 10, 11],
        [12, 13, 14, 15],
        [0, 4, 8, 12],
        [1, 5, 9, 13],
        [2, 6, 10, 14],
        [3, 7, 11, 15],
        [0, 5, 10, 15],
        [3, 6, 9, 12]
    ]
};

const indicateVictory = (cells, grid) => {
    if(grid === 9) {
        const possibleStreaks = streaks.nine;
        for (let i = 0; i < possibleStreaks.length; i++) {
            const [a, b, c] = possibleStreaks[i];
            if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
                return {
                    winner: cells[a], winningRow: [a, b, c]
                }
            }
        }
    } else if (grid === 16) {
        const possibleStreaks = streaks.sixteen;
        for (let i = 0; i < possibleStreaks.length; i++) {
            const [a, b, c, d] = possibleStreaks[i];
            if (cells[a] && cells[a] === cells[b] && cells[a]
                === cells[c] && cells[a] === cells[d]) {
                return {
                    winner: cells[a], winningRow: [a, b, c, d]
                }
            }
        }
    }
    return {
        winner: null, winningRow: [null, null, null] };
};
const getGameScore = (winner, movesCount) => {
    let score;
    let urgency = movesCount === 0 ? -20 : movesCount;
    // if its an immediate win return highest score always.
    if (winner === 'X') {
        score = -20 + urgency;
    } else if (winner === 'O') {
        score = 20 - urgency;
    } else {
        score = 0
    }
    return score
};
const getAvailableMoves = (board) => {
    // returns an array of available cells
    let available = [];
    board.forEach((cell, cellIndex) => {
        if (cell === null) {
            available.push(cellIndex)
        }
    });
    return available
};
const minMax = (board, xTurn, maxDepth, depth = 0) => {
    const winner = indicateVictory(board, maxDepth).winner;
    let score = 0;
    if(winner || depth === maxDepth) {
        return getGameScore(winner, depth);
    }
    let moves = getAvailableMoves(board);
    moves.forEach (move => {
        let newBoard = board.slice();
        newBoard[move] = xTurn ? 'X' : 'O';
        let moveScore = minMax(
            newBoard,
            !xTurn,
            maxDepth,
            ++depth);
        if(xTurn){
            if (score === 0 || moveScore < score) {
                score = moveScore;
            }
        } else {
            if (score === 0 || moveScore > score) {
               score = moveScore;
            }
        }
    });
    return score;
};

export const getBestMove = (board, grid, xTurn) => {
  let bestScore = null;
  let bestMove = null;
  const moves = getAvailableMoves(board);
  console.log('available moves: ' + moves.length);
  console.log(moves);
  moves.forEach(move => {
    let newBoard = board.slice();
    newBoard[move] = xTurn ? 'X' : 'O';
    let newScore = minMax(newBoard, !xTurn, grid);
    console.log(move+"'s score: "+newScore);
    if (xTurn){
        if (bestScore === null || newScore < bestScore) {
          bestScore = newScore;
          bestMove = move;
        }

    } else {
        if (bestScore === null || newScore > bestScore) {
          bestScore = newScore;
          bestMove = move;
        }
    }
  });
  console.log('best move: ' + bestMove + ' score: ' + bestScore);
  return bestMove
};

export const aiMove = (bestMove, board, difficulty) => { // AI will make his move based on the difficulty level.
    const moves = getAvailableMoves(board);
    const randomChoice = moves[Math.floor(Math.random() * moves.length)];
    let choice;
    if (difficulty === 'novice') {
        if (Math.random() * 100 <= 60) {
            choice = bestMove;
        } else {
            choice = randomChoice;
        }
        console.log('Novice Move: ' + choice);
    } else if (difficulty === 'easy') {
        if (Math.random() * 100 <= 20) {
            choice = bestMove;
        } else {
            choice = randomChoice;
        }
        console.log('Easy Move: ' + choice);
    } else if (difficulty === 'expert') {
        choice = bestMove;
        console.log('expert Move: ' + choice);
    }
    return choice;
};
