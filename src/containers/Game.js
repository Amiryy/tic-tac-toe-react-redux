import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { playerMove, timeTravel, toggleHistory } from "../actions/gameActions";
import { newGame } from '../actions/interfaceActions';
import Board from '../components/Board';

class Game extends Component {
    constructor (props) {
        super (props);
        this.playerMove = this.playerMove.bind(this);
        this.calculateWinner = this.calculateWinner.bind(this);
    }
    playerMove (i) {
        const history = this.props.history.slice(0, this.props.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (this.calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.props.xTurn ? 'X' : 'O';
        this.props.playerMove(history, squares); //redux action
    }
    calculateWinner(squares) {
       if(this.props.grid === 9) {
           const streaks = [ // all the possible line streaks that could make a winner.
               [0, 1, 2],
               [3, 4, 5],
               [6, 7, 8],
               [0, 3, 6],
               [1, 4, 7],
               [2, 5, 8],
               [0, 4, 8],
               [2, 4, 6],
           ];
           for (let i = 0; i < streaks.length; i++) {
               const [a, b, c] = streaks[i];
               if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                   return squares[a];
               }
           }
       } else if (this.props.grid === 16) {
           const streaks = [
               [0, 1, 2, 3],
               [4, 5, 6, 7],
               [8, 9, 10, 11],
               [12, 13, 14, 15],
               [0, 4, 8, 12],
               [1, 5, 9, 13],
               [2, 6, 10, 14],
               [3, 7, 11, 15],
               [0, 5, 10, 15],
               [3, 6, 9, 12]
           ];
           for (let i = 0; i < streaks.length; i++) {
               const [a, b, c, d] = streaks[i];
               if (squares[a] && squares[a] === squares[b] && squares[a]
                   === squares[c] && squares[d]) {
                   return squares[a];
               }
           }
       }
        return null;
    }
    jumpTo (move) {
        this.props.timeTravel(move);
    }
    render () {
        const history = this.props.history;
        const current = history[this.props.stepNumber];
        const winner = this.calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const description = move ?
                'Move #' + move : 'Game Start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{description}</button>
                </li>
            )
        });

        let status;
        if (winner) {
            status = winner + ' is the winner!';
        } else {
            status = (this.props.xTurn ? 'X' : 'O') + "'s turn."
        }
        return (
            <div className="game_page">
                <hr />
               <div className='left_col_game'>
                       <Link to='/'>
                           <button className="exit_game">Main Menu</button>
                       </Link>
                   <button onClick={() => this.props.newGame(this.props.grid)}
                           className="exit_game">
                       New Game
                   </button>
               </div>
                <div className='mid_col_game'>
                   <div className="game_status"><p>{status}</p></div>
                    <Board
                        grid={this.props.grid}
                        squares={current.squares}
                        playerMove={(i) => this.playerMove(i)}/>
               </div>
                <div className='right_col_game'>
                    <div className="game_history">
                        <button className='show_history'
                                onClick={this.props.toggleHistory}>
                            Wish You Could Time Travel?
                        </button>
                        <div className={this.props.showHistory ? 'list' : 'list_hidden'}>
                            <ul>{moves}</ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    grid: state.game.grid,
    history: state.game.history,
    xTurn: state.game.xTurn,
    stepNumber: state.game.stepNumber,
    showHistory: state.game.showHistory
});
const matchDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            playerMove: playerMove,
            toggleHistory: toggleHistory,
            timeTravel: timeTravel,
            newGame: newGame
        }, dispatch)
};

export default connect(mapStateToProps, matchDispatchToProps)(Game);
