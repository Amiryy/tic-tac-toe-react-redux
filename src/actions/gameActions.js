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
export const timeTravel = (move) => {
    return {
        type: 'TIME_TRAVEL',
        move: move
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