/* eslint-disable no-unreachable */
const initialState =
    {

    };

const interfaceReducer = (state = initialState, action) => {
    switch (action.type) {
        case '_':
            return {...state,
                // change of state
            };
            break;
        default:
            return state;
    }
};

export default interfaceReducer;
/* eslint-enable no-unreachable */