import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { newGame } from '../actions/interfaceActions';

class MainMenu extends Component {
    render() {
        return(
            <div className="main_menu">
                <h2>Welcome!</h2>
                <hr />
                <Link to='/game'>
                   <p>
                       <button onClick={() => this.props.newGame(this.props.grid)}
                            className='menu_button' >
                        New Game
                       </button>
                   </p>
                </Link>
                <Link to='/settings'>
                    <p>
                        <button className='menu_button'>Settings</button>
                    </p>
                </Link>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    grid: state.game.grid,
    history: state.game.history
});
const matchDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            newGame: newGame
        }, dispatch)
};

export default connect(mapStateToProps,matchDispatchToProps)(MainMenu);