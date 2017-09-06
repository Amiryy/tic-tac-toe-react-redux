import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { setGrid, setVs, setDiff } from "../actions/interfaceActions";
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
                    <SettingsTable grid={this.props.grid}
                        versus={this.props.versus}
                        difficulty={this.props.difficulty}
                        setGrid={this.props.setGrid}
                        setVs={this.props.setVs}
                        setDiff={this.props.setDiff}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    grid: state.game.grid,
    versus: state.game.versus,
    difficulty: state.game.difficulty
});
const matchDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            setGrid: setGrid,
            setVs: setVs,
            setDiff: setDiff
        }, dispatch)
};

export default connect(mapStateToProps, matchDispatchToProps)(Settings);
