import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { playerMove, timeTravel, toggleHistory } from "../actions/gameActions";
import { newGame } from '../actions/interfaceActions';
import Board from '../components/Board';
import TimeTravel from "../components/TimeTravel";

class Game extends Component {
    constructor (props) {
        super (props);
        this.playerMove = this.playerMove.bind(this);
        this.calculateWinner = this.calculateWinner.bind(this);
    }
    playerMove (i) {
        const history = this.props.history.slice(0, this.props.stepNumber + 1);
        const current = history[this.props.stepNumber];
        const squares = current.squares.slice();
        if (this.calculateWinner(squares).winner || squares[i]) {
            return;
        }
        squares[i] = this.props.xTurn ? 'X' : 'O';
        this.props.playerMove(
            history,
            squares
        ); //Redux action
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
                   return { "winner": squares[a], "winningLine": [a, b, c] }
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
                   === squares[c] && squares[a] === squares[d]) {
                   return { "winner": squares[a], "winningLine": [a, b, c, d] }
               }
           }
       }
        return {"winner": null, "winningLine": [null, null, null] };
    }
    jumpTo (move) {
        this.props.timeTravel(move);
    }
    render () {
        const history = this.props.history;
        const current = history[this.props.stepNumber];
        const winner = this.calculateWinner(current.squares).winner;
        const winningLine = this.calculateWinner(current.squares).winningLine;

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
        }else if (this.props.stepNumber === this.props.grid) {
            status = 'Its a Draw!';
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
                   <button onClick={() => this.props.newGame()}
                           className="exit_game">
                       New Game
                   </button>
               </div>
                <div className='mid_col_game'>
                   <div className="game_status"><p>{status}</p></div>
                    <Board
                        grid={this.props.grid}
                        squares={current.squares}
                        playerMove={(i) => this.playerMove(i)}
                        winningLine={winningLine} />
               </div>
                <div className='right_col_game'>
                   <TimeTravel
                       moves={moves}
                       showHistory={this.props.showHistory}
                       toggleHistory={this.props.toggleHistory}/>
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
