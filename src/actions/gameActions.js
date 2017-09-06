export const playerMove = (history, squares) => {
    return {
        type: 'PLAYER_MOVE',
        history: history,
        squares: squares
    }
};
export const toggleHistory = () => {
    return {
        type: 'TOGGLE_HISTORY'
    }
}
export const timeTravel = (move) => {
    return {
        type: 'TIME_TRAVEL',
        move: move
    }
};
