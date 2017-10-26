import React from 'react';

const TimeTravel = (props) => {
    const showHistory = props.showHistory ?
        'show_history_active' : 'show_history_closed';
    return (
        <div className="game_history">
            <button className={showHistory}
                    onClick={props.toggleHistory}>
                Wish you could time travel?
            </button>
            <div className={props.showHistory ? 'list' : 'list_hidden'}>
                <ul>{props.moves}</ul>
            </div>
        </div>
    );
};

export default TimeTravel;
