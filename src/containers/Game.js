import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import {
    playerMove, timeTravel, toggleHistory,
    timeUp, newGame, endGame, turnChangeAnimation
} from "../actions/gameActions";
import { getBestMove, aiMove } from '../actions/aiActions';

import Board from '../components/Board';
import GameStatus from '../components/GameStatus';
import TimeTravel from "../components/TimeTravel";

class Game extends Component {
    constructor (props) {
        super (props);
        this.playerMove = this.playerMove.bind(this);
        this.indicateVictory = this.indicateVictory.bind(this);
        this.movesList = this.movesList.bind(this);
        this.gameStatus = this.gameStatus.bind(this);
    }
    playerMove (i) {
        const history = this.props.history.slice(0, this.props.stepNumber + 1);
        const board = this.props.currentBoard.slice();
        if (this.indicateVictory(board).winner || board[i]
            || (this.props.stepNumber === this.props.grid)) {
            return;
        }
        board[i] = this.props.xTurn ? 'X' : 'O';
        this.props.playerMove(history, board); //Redux action
    }
    indicateVictory(cells) {
        const streaks = this.props.streaks;
        if(this.props.grid === 9) {
            for (let i = 0; i < streaks.length; i++) {
                const [a, b, c] = streaks[i];
                if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
                    return {
                        winner: cells[a], winningLine: [a, b, c]
                    }
                }
            }
        } else if (this.props.grid === 16) {
            for (let i = 0; i < streaks.length; i++) {
                const [a, b, c, d] = streaks[i];
                if (cells[a] && cells[a] === cells[b] && cells[a]
                    === cells[c] && cells[a] === cells[d]) {
                    return {
                        winner: cells[a], winningLine: [a, b, c, d]
                    }
                }
            }
        }
        return {
            winner: null, winningLine: [null, null, null] };
    };

    movesList (history) {
        const winner = this.indicateVictory(this.props.currentBoard.slice()).winner;
        const gameStatus = this.gameStatus(winner);
        const endOfGame = gameStatus.endOfGame;
        return history.map((step, move) => {
            const player = move % 2 ? ' - X' : ' - O';
            const description = move ?
                'Move #' + move + player : 'Game Start';
            return (
                <li key={move}>
                    <button onClick={() =>  this.props.timeTravel(move, endOfGame)}
                            className={(this.props.stepNumber===move) ?
                                'current_step' : ''}>
                        {description}
                    </button>
                </li>
            )
        });
    }
    gameStatus (winner) {
        let status, endGame;
        if (winner) {
            status = winner + ' is the winner!';
            endGame = true;
        } else if (!winner && this.props.stepNumber === this.props.grid) {
            status = "It's a Draw!";
            endGame = true;
        } else {
            status = (this.props.xTurn ? 'X' : 'O') + "'s turn.";
            endGame = false;
        }
        return {status, endGame};
    }

    componentWillMount () {
        const difficulty = this.props.difficulty;
        const xTurn = this.props.xTurn;
        const { playerStarts, versus } = this.props.gameSettings;
        const board = this.props.currentBoard.slice();
        if (this.props.stepNumber === 0) {
            if (!playerStarts && xTurn && versus === 'A') {
                const bestMove = getBestMove(board, this.props.grid, xTurn);
                const move = aiMove(bestMove, board, difficulty);
                setTimeout(() => {
                    this.playerMove(move)
                }, 500)
            }
        }
    }
    componentWillReceiveProps (nextProps) {
        const difficulty = this.props.difficulty;
        const xTurn = nextProps.xTurn;
        const { playerStarts, versus } = nextProps.gameSettings;
        const winner = this.indicateVictory(nextProps.currentBoard.slice()).winner;
        const board = nextProps.currentBoard.slice()
        const endOfGame = nextProps.endOfGame;
        if(xTurn !== this.props.xTurn || endOfGame !== this.props.endOfGame){
            turnChangeAnimation();
        }
        if(nextProps.stepNumber || (nextProps.stepNumber === 0)) {
            if (!endOfGame && !playerStarts && xTurn && versus === 'A') {
                 // if AI plays first (X)
                const bestMove = getBestMove(board, this.props.grid, xTurn);
                const move = aiMove(bestMove, board, difficulty);
                // AI will make his move based on the difficulty level.
                setTimeout(() => {
                    this.playerMove(move)
                }, 500)
            }
            if (!endOfGame && playerStarts && !xTurn && versus === 'A') {
                 // if AI plays second (O)
                const bestMove = getBestMove(board, this.props.grid, xTurn);
                const move = aiMove(bestMove, board, difficulty);
                setTimeout(() => {
                    this.playerMove(move)
                }, 500)
            }
        }
        if (this.gameStatus(winner).endGame) {
            // endGame call from a lifecycle method instead of render
            // to avoid impure setState warnings.
            this.props.endGame();
        }
    }
    render () {
        const history = this.props.history;
        const currentBoard = this.props.currentBoard;
        const winner = this.indicateVictory(currentBoard).winner;
        const winningRow = this.indicateVictory(currentBoard).winningLine;
        const moves = this.movesList(history);
        const status = this.gameStatus(winner).status;
        const endOfGame = this.gameStatus(winner).endGame;

        return (
            <div className="game_page">
                <hr />
               <div className='left_col_game'>
                       <Link to='/'>
                           <button className="exit_game">
                               Main Menu
                           </button>
                       </Link>
                   <button onClick={() => this.props.newGame(this.props.grid)}
                           className="exit_game">
                       New Game
                   </button>
               </div>
                <div className='mid_col_game'>
                   <GameStatus
                        status={status}
                        gameMode={this.props.mode}
                        timerPace={this.props.pace}
                        timeUp={this.props.timeUp}
                        xTurn={this.props.xTurn}
                        gameEnd={endOfGame}
                        firstMove={this.props.stepNumber===0}
                        timeTraveled={this.props.timeTraveled} />
                    <Board
                        grid={this.props.grid}
                        cells={this.props.currentBoard}
                        gameEnd={endOfGame}
                        xTurn={this.props.xTurn}
                        playerMove={(i) => this.playerMove(i)}
                        winningRow={winningRow}
                        playerStarts={this.props.playerStarts}
                        versus={this.props.versus} />
               </div>
                <div className='right_col_game'>
                   <TimeTravel
                       moves={moves}
                       showHistory={this.props.showHistory}
                       toggleHistory={this.props.toggleHistory} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    gameSettings: state.settings,
    difficulty: state.settings.difficulty,
    mode: state.settings.mode,
    pace: state.settings.pace,
    versus: state.settings.versus,
    playerStarts: state.settings.playerStarts,
    grid: state.game.grid,
    streaks: state.game.streaks,
    history: state.game.history,
    currentBoard: state.game.currentBoard,
    xTurn: state.game.xTurn,
    stepNumber: state.game.stepNumber,
    timeTraveled: state.game.timeTraveled,
    showHistory: state.game.showHistory,
    endOfGame: state.game.endOfGame
});
const matchDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            getBestMove: getBestMove,
            playerMove: playerMove,
            timeUp: timeUp,
            toggleHistory: toggleHistory,
            timeTravel: timeTravel,
            newGame: newGame,
            endGame: endGame
        }, dispatch)
};

export default connect(mapStateToProps, matchDispatchToProps)(Game);
