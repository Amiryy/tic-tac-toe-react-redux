export const setMode = (mode, initialPace) => {
    return {
        type: 'SET_MODE',
        mode: mode,
        initialPace: initialPace
    }
};
export const setPace = (pace) => {
    return {
        type: 'SET_PACE',
        pace: pace
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

export const setStarter = (starter) => {
    return {
        type: 'SET_STARTER',
        starter: starter
    }
};
export const setTheme = (theme) => {
    return {
        type: 'SET_THEME',
        theme: theme
    }
};