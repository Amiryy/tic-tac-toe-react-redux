/* eslint-disable no-unreachable */
export const initialState =
    {
        grid: 9,
        streaks: [ // all the possible line streaks that could make a winner.
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ],
        history: [{
            cells: new Array(9).fill(null)
        }],
        currentBoard: new Array(9).fill(null),
        stepNumber: 0,
        timeTraveled: false,
        xTurn: true,
        showHistory: false,
        endOfGame: false
    };

export const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_GRID_9':
            return {...state,
                grid: 9,
                streaks: [
                    [0, 1, 2],
                    [3, 4, 5],
                    [6, 7, 8],
                    [0, 3, 6],
                    [1, 4, 7],
                    [2, 5, 8],
                    [0, 4, 8],
                    [2, 4, 6]
                ]
            };
            break;
        case 'SET_GRID_16':
            return {...state,
                grid: 16,
                streaks: [
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
            break;
        case 'NEW_GAME':
            return {...state,
                history:[{
                    cells: new Array(state.grid).fill(null)
                }],
                currentBoard: new Array(state.grid).fill(null),
                showHistory: false,
                stepNumber: 0,
                xTurn: true,
                endOfGame: false
            };
            break;
        case 'END_GAME':
            return {...state,
                endOfGame: true
            };
            break;
        case 'PLAYER_MOVE':
            return {...state,
                history: action.history.concat([{
                    cells: action.cells
                }]),
                currentBoard: action.cells,
                xTurn: !state.xTurn,
                stepNumber: action.history.length,
                endOfGame: false,
                timeTraveled: false
            };
            break;
        case 'TIME_UP':
            return {...state,
                xTurn: !state.xTurn
            };
            break;
        case 'TOGGLE_HISTORY':
            return {...state,
                showHistory: !state.showHistory
            };
            break;
        case 'TIME_TRAVEL':
            return {...state,
                stepNumber: action.move,
                currentBoard: state.history[action.move].cells,
                xTurn: !(action.move % 2),
                timeTraveled: true,
                endOfGame: action.endOfGame
            };
            break;
        default:
            return state;
    }
};

export default gameReducer;
/* eslint-enable no-unreachable */