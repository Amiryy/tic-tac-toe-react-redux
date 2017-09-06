import { combineReducers } from 'redux';
import gameReducer from './gameReducer';

const allReducers = combineReducers({
    game: gameReducer
});

export default allReducers;