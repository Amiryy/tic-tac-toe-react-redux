export const newGame = (grid) => {
    return {
        type: 'NEW_GAME',
        grid: grid
    }
};
export const setGrid = (grid) => {
    return {
        type: 'SET_GRID',
        grid: grid
    }
};
export const setVs = (vs) => {
    return {
        type: 'SET_VS',
        vs: vs
    }
};
export const setDiff = (diff) => {
    return {
        type: 'SET_DIFFICULTY',
        diff: diff
    }
};
