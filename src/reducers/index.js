import { combineReducers } from 'redux';
import interfaceReducer from './interfaceReducer';
import gameReducer from './gameReducer';

const allReducers = combineReducers({
    interface: interfaceReducer,
    game: gameReducer
});

export default allReducers;