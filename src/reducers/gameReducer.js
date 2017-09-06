/* eslint-disable no-unreachable */
const initialState =
    {
        versus: 'P',
        difficulty:'easy',
        grid: 9,
        history: [{
            squares: new Array(9).fill(null)
        }],
        showHistory: false,
        stepNumber: 0,
        xTurn: true,
    };

const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_GRID':
            return {...state,
                grid: action.grid
            };
            break;
        case 'SET_VS':
            return {...state,
                versus: action.vs
            };
            break;
        case 'SET_DIFFICULTY':
            return {...state,
                difficulty: action.diff
            };
            break;
        case 'NEW_GAME':
            return {...state,
                history:[{
                    squares: new Array(state.grid).fill(null)
                }],
                showHistory: false,
                stepNumber: 0,
                xTurn: true
            };
            break;
        case 'PLAYER_MOVE':
            return {...state,
                history: action.history.concat([{
                    squares: action.squares
                }]),
                xTurn: !state.xTurn,
                stepNumber: action.history.length
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
                xTurn: !(action.move % 2)
            };
            break;
        default:
            return state;
    }
};

export default gameReducer;
/* eslint-enable no-unreachable */