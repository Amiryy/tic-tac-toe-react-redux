import { combineReducers } from 'redux';
import gameReducer from './gameReducer';
import settingsReducer from './settingsReducer';

const allReducers = combineReducers({
    game: gameReducer,
    settings: settingsReducer
});

export default allReducers;