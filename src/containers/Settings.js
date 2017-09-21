import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { setGrid } from '../actions/gameActions';
import {setMode, setPace, setVs, setDiff, setStarter} from "../actions/settingsActions";
import SettingsTable from "../components/SettingsTable";

class Settings extends Component {
    render () {
        return (
            <div className="settings_page">
                <h2>Settings:</h2>
                <hr />
                <div className='left_col_settings'>
                    <Link to='/'>
                        <button className="exit_game">Main Menu</button>
                    </Link>
                </div>
                <div className='mid_col_settings'>
                    <SettingsTable
                        grid={this.props.grid}
                        mode={this.props.mode}
                        pace={this.props.pace}
                        versus={this.props.versus}
                        difficulty={this.props.difficulty}
                        playerStarts={this.props.playerStarts}
                        setGrid={this.props.setGrid}
                        setMode={this.props.setMode}
                        setPace={this.props.setPace}
                        setVs={this.props.setVs}
                        setDiff={this.props.setDiff}
                        setStarter={this.props.setStarter} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
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
            setGrid: setGrid,
            setMode: setMode,
            setPace: setPace,
            setVs: setVs,
            setDiff: setDiff,
            setStarter: setStarter
        }, dispatch)
};

export default connect(mapStateToProps, matchDispatchToProps)(Settings);
