/* eslint-disable no-unreachable */
const initialState =
    {
        versus: 'A',
        difficulty:'easy',
        playerStarts: true,
        mode: 'normal',
        pace: null
    };

const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_MODE':
            return {...state,
                mode: action.mode,
                pace: action.initialPace
            };
            break;
        case 'SET_PACE':
            return {...state,
                pace: action.pace
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
        case 'SET_STARTER':
            return {...state,
                playerStarts: action.starter
            };
            break;
        default:
            return state;
    }
};

export default gameReducer;
/* eslint-enable no-unreachable */