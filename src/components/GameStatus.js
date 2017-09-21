import React from 'react';
import CountdownTimer from './CountdownTimer';

const GameStatus = (props) => {
    const shouldShowTimer = (
        props.gameMode === 'timed'
        && !props.gameEnd) ?
        'timer_shown' : 'timer_hidden';
    return (
        <div className="game_status">
            <div className={shouldShowTimer}>
                <CountdownTimer
                    time={props.timerPace}
                    timeUp={props.timeUp}
                    turnChange={props.xTurn}
                    gameEnd={props.gameEnd}
                    firstMove={props.firstMove} />
            </div>
            <p>{props.status}</p>
        </div>
    );
};

export default GameStatus;
