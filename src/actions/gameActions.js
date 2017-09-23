export const newGame = () => {
    return {
        type: 'NEW_GAME'
    }
};
export const endGame = () => {
    return {
        type: 'END_GAME'
    }
};
export const playerMove = (history, cells) => {
    return {
        type: 'PLAYER_MOVE',
        history: history,
        cells: cells
    }
};
export const timeUp = () => {
    return {
        type: 'TIME_UP'
    }
};
export const toggleHistory = () => {
    return {
        type: 'TOGGLE_HISTORY'
    }
};
export const timeTravel = (move, end) => {
    return {
        type: 'TIME_TRAVEL',
        move: move,
        endOfGame: end
    }
};

export const setGrid = (grid) => {
    if (grid === 16) {
        return {
            type: 'SET_GRID_16'
        }
    }
    return {
        type: 'SET_GRID_9'
    }
};

// an Animation to emphasize a turn change.
export const turnChangeAnimation = () => {
    let gameStatus = document.getElementById('status');
    gameStatus.className = 'turnChange';
    setTimeout(() => {
        gameStatus.className = '';
    }, 250)
};