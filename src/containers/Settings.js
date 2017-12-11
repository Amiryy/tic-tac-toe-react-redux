import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, withRouter } from 'react-router-dom';

import { setGrid } from '../actions/gameActions';
import {setTheme, setMode, setPace, setVs, setDiff, setStarter} from "../actions/settingsActions";
import SettingsTable from "../components/SettingsTable";

const Settings = (props) => {
    return (
        <div className="settings_page">
            <h2>Settings:</h2>
            <div className='left_col_settings'>
                <Link to='/'>
                    <button className="exit_settings">Back</button>
                </Link>
            </div>
            <div className='mid_col_settings'>
                <SettingsTable settings={props} />
            </div>
        </div>
    )
};

const mapStateToProps = (state) => ({
    theme: state.settings.theme,
    grid: state.game.grid,
    mode: state.settings.mode,
    pace: state.settings.pace,
    versus: state.settings.versus,
    difficulty: state.settings.difficulty,
    playerStarts: state.settings.playerStarts
});
const matchDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            setTheme: setTheme,
            setGrid: setGrid,
            setMode: setMode,
            setPace: setPace,
            setVs: setVs,
            setDiff: setDiff,
            setStarter: setStarter
        }, dispatch)
};

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(Settings));
